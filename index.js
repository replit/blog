const express = require("express");
const marked = require("marked");
const fs = require("fs").promises;
const path = require("path");
const moment = require("moment");
const hljs = require("highlight.js");
const gm = require("gray-matter");
const htmlToText = require("html-to-text");
const Filter = require("bad-words");
const striptags = require("striptags");
const promMid = require("express-prometheus-middleware");

require("ejs");

marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: (code, lang) => hljs.highlightAuto(code, [lang]).value,
    headerIds: true,
    gfm: true
});

let previewCache = null;
let previewCacheAlt = null;

const buildPostCache = async () => {
    try {
        const ls = await fs.readdir("./posts");

        let posts = [];
        let postsAlt = [];

        for (const f of ls) {
            try {
                posts.push(await readPost(f.slice(0, -3), true));
            } catch (e) {
                // Instead of dying, let's try to contain the damage.
                console.error("Failed to read a post: ", e);
            }
        }

        posts = posts.filter(p => p.timestamp && p.timestamp < new Date());

        posts.sort((l, r) => r.timestamp - l.timestamp);

        for (const p of posts) {
            postsAlt.push({
                title: p.title,
                author: p.author,
                text: p.fullText,
                url: p.url
            });
        }

        previewCache = posts;
        previewCacheAlt = postsAlt;
    } catch (e) {
        // Instead of dying, let's try to contain the damage.
        console.error("Failed to build the post cache: ", e);
    }
};

setInterval(buildPostCache, 60000);

const postPreviews = async () => {
    return previewCache || [];
};

const readPost = async (slug, snip = false) => {
    // let em read anything ¯\_(ツ)_/¯
    const p = path.join(__dirname, "posts", slug) + ".md";

    let raw = await fs.readFile(p, "utf8");

    let { content: rawContent, data } = gm(raw);

    // try to resolve absolute links back to repl.it
    const contentMd = rawContent
        .trim()
        .replace(/(\]\()(\/.+\))/g, "$1https://replit.com$2");

    let previewMd = "";
    const ender = contentMd.indexOf("[](preview end)");
    if (ender != -1) {
        previewMd = contentMd.slice(0, ender);
    } else {
        const nlnl = contentMd.indexOf("\n\n");
        if (nlnl !== -1) {
            previewMd = contentMd.slice(0, nlnl);
        }
    }

    const previewHtml = marked(previewMd);
    const previewText = htmlToText
        .fromString(previewHtml, {
            ignoreHref: true,
            ignoreImage: true
        })
        .replace(/\n/g, " ");
    // Get the first 24 words
    const previewParts = previewText.split(/\s+/).slice(0, 24);
    const description = `${previewParts.join(" ")}…`;

    const fullMd = marked(contentMd);
    const fullText = htmlToText
        .fromString(fullMd, {
            ignoreHref: true,
            ignoreImage: true
        })
        .replace(/\n/g, " ");

    let content;
    if (snip) {
        content = previewHtml;
    } else {
        content = marked(contentMd.replace("[](preview end)", ""));
    }

    //moar categories
    let validCategories = [
        "all",
        "eng",
        "product",
        "infra",
        "projects",
        "design",
        "edu",
        "news",
        "events",
        "ventures",
        "other"
    ];

    //if a category doesn't exist, make it 'other'
    let categoriesNew = (data.categories || "other").split(",").map(c => {
        if (!validCategories.includes(c)) {
            return "other";
        } else {
            return c;
        }
    });

    //this adds the eng category to something if it doesn't have it, but has product, infra, or projects. why can't our writers do this on our own? idk. don't trust humans to follow your directions.
    let engSubCats = ["product", "infra", "projects"]; //sorry, no cats here, just catgirls, catboys, and categories
    //fanks to kognise to finding and fixing bug with this
    if (engSubCats.some(i => categoriesNew.includes(i)))
        categoriesNew.unshift("eng");

    //replace duplicates (edge case if more than one category is other)
    //.every only does the first element in an array for some reason. replaced with a .map.
    let uniqueCategories = [];
    categoriesNew.map(c => {
        if (uniqueCategories.indexOf(c) < 0) {
            uniqueCategories.push(c);
        }
    });


    return {
        content,
        description,
        fullText,
        snipped: snip,
        title: data.title,
        author: data.author,
        categories: uniqueCategories,
        timestamp: data.date ? new Date(data.date) : null,
        url: slug,
        cover: data.cover,
    };
};

const errPage = (res, err, status) => {
    res.locals.err = err;
    res.status(status || 500);
    res.render("error.ejs");
};

const app = express();

// cache static things for a year
app.use(express.static("static", { maxAge: '1y', setHeaders: overrideStaticCacheControl }));

function overrideStaticCacheControl(res, path) {
  const shortMimes = ['text/html', 'text/css', 'application/javascript'];
  if (path.endsWith('.css') || path.endsWith('.html') || path.endsWith('.js')) {
    // don't cache html/css/js as much
    // let a stale version be served for longer while revalidation happens asynchronously
    res.setHeader('Cache-Control', 'public, max-age=300, stale-while-revalidate=600')
  }
}

app.use(
    promMid({
        metricsPath: "/metrics",
        collectDefaultMetrics: true,
        requestDurationBuckets: [0.1, 0.5, 1, 1.5],
        requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
        responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400]
    })
);

app.get("/", (req, res) => {
    console.log("GET /");
    postPreviews()
        .then(p => {
            res.set(
                "Cache-Control",
                "public, max-age=600, stale-if-error=60, stale-while-revalidate=60"
            );
            res.locals.posts = p;
            res.locals.moment = moment;
            res.locals.beta = req.query.beta | 0;
            res.render("index.ejs");
        })
        .catch(err => errPage(res, err));
});

app.get("/feed.xml", (req, res) => {
    console.log("GET /feed.xml");
    postPreviews()
        .then(p => {
            res.set(
                "Cache-Control",
                "public, max-age=600, stale-if-error=60, stale-while-revalidate=60"
            );
            res.set("Content-Type", "application/xml");
            res.locals.posts = p;
            res.locals.moment = moment;
            res.locals.striptags = striptags;
            res.render("feed.ejs");
        })
        .catch(err => errPage(res, err));
});

app.get("/:slug/images/*", (req, res) => {
    let actualPath = req.path
        .replace(req.params.slug, "")
        .substring(1, req.path.length);
    console.log(`ruh roh raggy! bad image path! redirecting to ${actualPath}`);
    res.redirect(actualPath);
});

// Added some redirects for paths that had a space in them.
app.get(
    "/Using%20Replit%20and%20Google%20Sheets%20to%20Make%20a%20Simple%20Google%20Forms%20Alternative",
    (req, res) => {
        res.redirect("/google-forms-alternative");
    }
);

app.get("/setting%20up%20a%20mastodon", (req, res) => {
    res.redirect("/setting-up-a-mastodon");
});

const filter = new Filter();
app.get("/:slug", (req, res) => {
    console.log(req.params.slug);
    const slug = req.params.slug
        .split("\n")
        .filter(v => v.match(/[^\s]/))
        .join("\n")
        .replace(/[\x01\x02\x03\x04]/, "");

    if (typeof slug === "string" && slug.length > 0) {
        console.log(
            "\033[0m" +
            `GET ${filter.clean(slug.slice(0, 500)).replace("\033[2J", "")}`
        );
    }

    readPost(slug)
        .then(post => {
            res.set(
                "Cache-Control",
                "public, max-age=600, stale-if-error=60, stale-while-revalidate=60"
            );
            res.locals.post = post;
            res.locals.moment = moment;
            res.locals.beta = req.query.beta | 0;
            res.render("post-page.ejs");
        })
        .catch(err => {
            if (err.code === "ENOENT") {
                errPage(res, err, 404);
            } else {
                errPage(res, err);
            }
        });
});

app.get("/api/v1/meta", (req, res) => {
    res.send(previewCacheAlt);
});

//moved this here because of an edge case Faris discovered and initially thought was from my code. turns out, this error has been here since probably the beginning of the blog
buildPostCache().then(() => {
    app.listen(3000, () => {
        console.log("blog is running");
    });
});
