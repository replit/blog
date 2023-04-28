const express = require('express');
const marked = require('marked');
const fs = require('fs').promises;
const path = require('path');
const moment = require('moment');
const hljs = require('highlight.js');
const gm = require('gray-matter');
const htmlToText = require('html-to-text');
const Filter = require('bad-words');
const striptags = require('striptags');
const promMid = require('express-prometheus-middleware');
const crypto = require('crypto');

require('ejs');

// Very short cache-control.
// Useful for things that are time-sensitive e.g. metrics.
// Caches for 30 seconds, which isn't a lot is still better than no cache.
const cacheControlFleeting =
  'public, max-age=30, s-max-age=30, stale-while-revalidate=0, stale-if-error=0';

// Short cache-control.
// Keeps things fresh while still taking advantage of caching.
// - caches in browser for 10 minutes
// - caches in Cloudflare for 1 minute
// - can be served stale for 10 minutes while revalidation takes place
// - can be served stale for 10 minutes if the server errors out
const cacheControlShort =
  'public, max-age=600, s-max-age=60, stale-while-revalidate=600, stale-if-error=600';

// Long cache-control.
// Allows browsers to cache for longer and ensures Cloudflare regularly revalidates.
// - caches in browser for an hour
// - caches in Cloudflare for 5 minutes
// - can be served stale for an hour while revalidation takes place
// - can be served stale for an hour if the server errors out
const cacheControlLong =
  'public, max-age=3600, s-max-age=300, stale-if-error=3600, stale-while-revalidate=3600';

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: (code, lang) => hljs.highlightAuto(code, [lang]).value,
  headerIds: true,
  gfm: true
});

let previewCache = null;
let feedTimestamp = null;
let previewCacheAlt = null;

function cacheBust(url, timestamp) {
  // handle URLs that already have query params
  if (url.indexOf('?') >= 0) {
    url += '&';
  } else {
    url += '?';
  }
  url += `v=${timestamp}`;
  return url;
}

const buildPostCache = async () => {
  try {
    const ls = await fs.readdir('./posts');

    let posts = [];
    let postsAlt = [];

    for (const f of ls) {
      try {
        if (f.endsWith('.md')) {
          posts.push(await readPost(f.slice(0, -3), true));
        }
      } catch (e) {
        // Instead of dying, let's try to contain the damage.
        console.error('Failed to read a post: ', e);
      }
    }

    posts = posts.filter(p => {
      return p.timestamp && p.timestamp < new Date();
    });

    posts.sort((l, r) => r.timestamp - l.timestamp);

    for (const p of posts) {
      postsAlt.push({
        title: p.title,
        author: p.author,
        text: p.fullText,
        url: p.url
      });
    }

    if (posts.length > 0) {
      feedTimestamp = posts[0].timestamp;
    }

    previewCache = posts;
    previewCacheAlt = postsAlt;
  } catch (e) {
    // Instead of dying, let's try to contain the damage.
    console.error('Failed to build the post cache: ', e);
  }
};

setInterval(buildPostCache, 60000);

const postPreviews = async () => {
  return previewCache || [];
};

const readPost = async (slug, snip = false) => {
  // let em read anything ¯\_(ツ)_/¯
  const p = path.join(__dirname, 'posts', slug) + '.md';
  const stat = await fs.stat(p);

  let raw = await fs.readFile(p, 'utf8');

  let { content: rawContent, data } = gm(raw);

  const renderer = new marked.Renderer();
  const originalRendererLink = renderer.link.bind(renderer);
  const originalRendererImage = renderer.image.bind(renderer);
  renderer.link = (href, title, text) => {
    // try to resolve absolute links back to replit.com
    if (href.startsWith('/')) {
      // todo: consider adding some UTM query params?
      href = `https://replit.com${href}`;
    }
    return originalRendererLink(href, title, text);
  };
  renderer.image = (href, title, text) => {
    let isVideo = href.endsWith('.mp4');

    // add a cache-busting timestamp to the image src
    href = cacheBust(href, stat.mtime.getTime());

    if (isVideo) {
      return `<video title="${title}" src="${href}" muted autoplay playsinline loop controls></video>`;
    }

    return originalRendererImage(href, title, text);
  };

  const contentMd = rawContent;

  let previewMd = '';
  const ender = contentMd.indexOf('[](preview end)');
  if (ender != -1) {
    previewMd = contentMd.slice(0, ender);
  } else {
    const nlnl = contentMd.indexOf('\n\n');
    if (nlnl !== -1) {
      previewMd = contentMd.slice(0, nlnl);
    }
  }

  const previewHtml = marked(previewMd, { renderer });
  const previewText = htmlToText
    .fromString(previewHtml, {
      ignoreHref: true,
      ignoreImage: true
    })
    .replace(/\n/g, ' ');
  // Get the first 24 words
  const previewParts = previewText.split(/\s+/).slice(0, 24);
  const description = `${previewParts.join(' ')}…`;

  const fullMd = marked(contentMd, { renderer });
  const fullText = htmlToText
    .fromString(fullMd, {
      ignoreHref: true,
      ignoreImage: true
    })
    .replace(/\n/g, ' ');

  let content;
  if (snip) {
    content = previewHtml;
  } else {
    content = marked(contentMd.replace('[](preview end)', ''), { renderer });
  }

  //moar categories
  let validCategories = [
    'all',
    'eng',
    'product',
    'infra',
    'projects',
    'design',
    'edu',
    'news',
    'events',
    'ventures',
    'other',
    'ai',
    'security',
  ];

  //if a category doesn't exist, make it 'other'
  let categoriesNew = (data.categories || 'other').split(',').map(c => {
    if (!validCategories.includes(c)) {
      return 'other';
    } else {
      return c;
    }
  });

  //this adds the eng category to something if it doesn't have it, but has product, infra, or projects. why can't our writers do this on our own? idk. don't trust humans to follow your directions.
  let engSubCats = ['product', 'infra', 'projects']; //sorry, no cats here, just catgirls, catboys, and categories
  //fanks to kognise to finding and fixing bug with this
  if (engSubCats.some(i => categoriesNew.includes(i)))
    categoriesNew.unshift('eng');

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
    cover: data.cover
      ? cacheBust(data.cover, stat.mtime.getTime())
      : data.cover,
    profiles: data.profiles
  };
};

const errPage = (res, err, status) => {
  res.locals.err = err;
  res.status(status || 500);
  res.render('error.ejs');
};

// getNewestTimestamp will return the newest timestamp out of either the given
// filename (on disk) or the given feed timestamp.
async function getNewestTimestamp(filename, timestampForFeed) {
  const stat = await fs.stat(filename);

  const statTs = new Date(stat.mtime > stat.ctime ? stat.mtime : stat.ctime);
  return statTs > timestampForFeed ? statTs : timestampForFeed;
}

// getNewestTimestampForAllViews will return the newest timestamp for any file
// in views/*, or the given feed timestamp if it's newer.
async function getNewestTimestampForAllViews(timestampForFeed) {
  let latestTs = timestampForFeed;

  const ls = await fs.readdir('./views');
  for (const f of ls) {
    const stat = await fs.stat(`./views/${f}`);
    const statTs = new Date(stat.mtime > stat.ctime ? stat.mtime : stat.ctime);
    latestTs = statTs > latestTs ? statTs : latestTs;
  }

  return latestTs;
}

function checkIfModifiedSince(req, res, modifiedTimestamp) {
  if (!modifiedTimestamp) {
    // if our timestamp is bad, assume modified
    return true;
  }

  // regardless of IMS header, set the last modified
  res.set('Last-Modified', modifiedTimestamp.toUTCString());

  const ims = req.header('if-modified-since');
  if (!ims) {
    // assume modified, no IMS header
    return true;
  }

  let imsDate = null;
  try {
    imsDate = new Date(ims);
  } catch (e) {
    // assume it has been modified if IMS is invalid
    return true;
  }

  if (modifiedTimestamp > imsDate) {
    // modified!
    return true;
  }

  // not modified!
  res.status(304);
  res.end();
  return false;
}

const app = express();

// add a cache control if one wasn't added by the handler/middleware
app.use(function alwaysRespondWithCacheControl(req, res, next) {
  // other middleware later in the stack would override this.
  // if it's not set by route or middleware, this will be the default
  res.set('Cache-Control', cacheControlFleeting);

  next();
});

// cache static things for a year
app.use(
  express.static('static', {
    maxAge: '1y',
    setHeaders: overrideStaticCacheControl
  })
);

function overrideStaticCacheControl(res, path) {
  if (path.endsWith('.css') || path.endsWith('.html') || path.endsWith('.js')) {
    // don't cache html/css/js as much
    res.setHeader('Cache-Control', cacheControlShort);
  }
}

app.use(
  promMid({
    metricsPath: '/metrics',
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 1.5],
    requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
    responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400]
  })
);

app.get('/', async (req, res) => {
  console.log('GET /');

  const modifiedAt = await getNewestTimestampForAllViews(feedTimestamp);
  if (!checkIfModifiedSince(req, res, modifiedAt)) {
    return;
  }

  let p = null;
  try {
    p = await postPreviews();
  } catch (err) {
    return errPage(res, err);
  }

  res.set('Cache-Control', cacheControlLong);
  res.locals.posts = p;
  res.locals.moment = moment;
  res.locals.beta = req.query.beta | 0;
  res.render('index.ejs');
});

app.get('/feed.xml', async (req, res) => {
  const modifiedAt = await getNewestTimestamp(
    './views/feed.ejs',
    feedTimestamp
  );
  if (!checkIfModifiedSince(req, res, modifiedAt)) {
    return;
  }

  console.log('GET /feed.xml');

  let p = [];
  try {
    p = await postPreviews();
  } catch (err) {
    return errPage(res, err);
  }

  res.set('Cache-Control', cacheControlLong);
  res.set('Content-Type', 'application/xml');
  res.locals.posts = p.map(pp => ({ ...pp, url: encodeURI(pp.url) }));
  res.locals.moment = moment;
  res.locals.striptags = striptags;
  res.render('feed.ejs');
});

app.get('/:slug/images/*', (req, res) => {
  let actualPath = req.path
    .replace(req.params.slug, '')
    .substring(1, req.path.length);
  console.log(`ruh roh raggy! bad image path! redirecting to ${actualPath}`);
  res.redirect(actualPath);
});

// Added some redirects for paths that had a space in them.
app.get(
  '/Using%20Replit%20and%20Google%20Sheets%20to%20Make%20a%20Simple%20Google%20Forms%20Alternative',
  (req, res) => {
    res.redirect('/google-forms-alternative');
  }
);

app.get('/setting%20up%20a%20mastodon', (req, res) => {
  res.redirect('/setting-up-a-mastodon');
});

// fix typo of my post on twitter
app.get('/geo-part-2-loadbalancingsc', (req, res) => {
  res.redirect('/geo-part-2-loadbalancing');
});

app.get('/healthcheck', (req, res) => {
  res.send('ok');
});

const filter = new Filter();
app.get('/:slug', async (req, res) => {
  console.log(req.params.slug);
  const slug = req.params.slug
    .split('\n')
    .filter(v => v.match(/[^\s]/))
    .join('\n')
    .replace(/[\x01\x02\x03\x04]/, '');

  if (typeof slug === 'string' && slug.length > 0) {
    console.log(
      '\033[0m' +
      `GET ${filter.clean(slug.slice(0, 500)).replace('\033[2J', '')}`
    );
  }

  try {
    const baseModifiedAt = await getNewestTimestampForAllViews(feedTimestamp);
    const modifiedAt = await getNewestTimestamp(
      './posts/' + slug + '.md',
      baseModifiedAt
    );
    if (!checkIfModifiedSince(req, res, modifiedAt)) {
      return;
    }
  } catch (err) {
    // drop error and serve (probably a 404)
  }

  let post = null;
  try {
    post = await readPost(slug);
  } catch (err) {
    if (err.code === 'ENOENT') {
      errPage(res, err, 404);
    } else {
      errPage(res, err);
    }

    return;
  }

  res.set('Cache-Control', cacheControlLong);
  res.locals.post = post;
  res.locals.moment = moment;
  res.locals.beta = req.query.beta | 0;
  res.render('post-page.ejs');
});

app.get('/api/v1/meta', (req, res) => {
  if (!checkIfModifiedSince(req, res, feedTimestamp)) {
    return;
  }

  res.set('Cache-Control', cacheControlLong);
  res.send(previewCacheAlt);
});

//moved this here because of an edge case Faris discovered and initially thought was from my code. turns out, this error has been here since probably the beginning of the blog
buildPostCache().then(() => {
  app.listen(3000, () => {
    console.log('blog is running');
  });
});
