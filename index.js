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

require('ejs');

marked.setOptions({
	renderer: new marked.Renderer(),
	highlight: (code, lang) => hljs.highlightAuto(code, [lang]).value,
	headerIds: true,
	gfm: true,
});

let previewCache = null;

const buildPostCache = async () => {
	try {
		const ls = await fs.readdir('./posts');

		let posts = [];

		for (const f of ls) {
			posts.push(await readPost(f.slice(0, -3), true));
		}

		posts = posts.filter(p => p.timestamp && p.timestamp < new Date());

		posts.sort((l, r) => r.timestamp - l.timestamp)

		previewCache = posts;
	} catch (e) {
		// Instead of dying, let's try to contain the damage.
		console.error('Failed to build the post cache: ', e);
	}
}

setInterval(buildPostCache, 60000);

const postPreviews = async () => {
	return previewCache || [];
}

const readPost = async (slug, snip = false) => {
	// let em read anything ¯\_(ツ)_/¯
	const p = path.join(__dirname, 'posts', slug) + '.md'

	let raw = await fs.readFile(p, 'utf8');

	let { content: rawContent, data } = gm(raw);

	// try to resolve absolute links back to repl.it
	const contentMd = rawContent.trim().replace(/(\]\()(\/.+\))/g, '$1https://replit.com$2');

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

	const previewHtml = marked(previewMd);
	const previewText = htmlToText.fromString(previewHtml, {
		ignoreHref: true,
		ignoreImage: true,
	})
		.replace(/\n/g, ' ');
	// Get the first 24 words
	const previewParts = previewText.split(/\s+/).slice(0, 24);
	const description = `${previewParts.join(' ')}…`;

	let content;
	if (snip) {
		content = previewHtml;
	} else {
		content = marked(contentMd.replace('[](preview end)', ''));
	}

	//moar categories
	let validCategories = ["all", "eng", "product", "infra", "projects", "edu", "news", "events", "ventures", "other"];

	//if a category doesn't exist, make it 'other'
	let categoriesNew = ( data.categories || 'other' ).split(',').map(c => {
		if (!validCategories.includes(c)) {
			return 'other';
		} else {
			return c;
		}
	});

	//this adds the eng category to something if it doesn't have it, but has product, infra, or projects. why can't our writers do this on our own? idk. don't trust humans to follow your directions.
	let engSubCats = ['product', 'infra', 'projects']; //sorry, no cats here, just catgirls, catboys, and categories
	categoriesNew.every((c, i, a) => {
		if (engSubCats.includes(c)) {
			a[i] = 'eng';
			a.push(c);
		}
	})

	//replace duplicates (edge case if more than one category is other)
	//.every only does the first element in an array for some reason. replaced with a .map.
	let uniqueCategories = [];
	categoriesNew.map((c) => {
		if (uniqueCategories.indexOf(c) < 0) {
			uniqueCategories.push(c);
		}
	});

	return {
		content,
		description,
		snipped: snip,
		title: data.title,
		author: data.author,
		categories: uniqueCategories,
		timestamp: data.date ? new Date(data.date) : null,
		url: slug,
		cover: data.cover,
	}
}

const errPage = (res, err, status) => {
	res.locals.err = err;
	res.status(status || 500);
	res.render('error.ejs')
}

const app = express();

app.use(express.static('static'))

app.use(promMid({
	metricsPath: '/metrics',
	collectDefaultMetrics: true,
	requestDurationBuckets: [0.1, 0.5, 1, 1.5],
	requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
	responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
}));

app.get('/', (req, res) => {
	console.log('GET /')
	postPreviews().then(p => {
		res.set('Cache-Control', 'public, max-age=600, stale-if-error=60, stale-while-revalidate=60')
		res.locals.posts = p;
		res.locals.moment = moment;
		res.locals.beta = req.query.beta | 0;
		res.render('index.ejs');
	}).catch(err => errPage(res, err));
});

app.get('/feed.xml', (req, res) => {
	console.log('GET /feed.xml')
	postPreviews().then(p => {
		res.set('Cache-Control', 'public, max-age=600, stale-if-error=60, stale-while-revalidate=60')
		res.set('Content-Type', 'application/xml')
		res.locals.posts = p;
		res.locals.moment = moment;
		res.locals.striptags = striptags;
		res.render('feed.ejs');
	}).catch(err => errPage(res, err));
});

const filter = new Filter();
app.get('/:slug', (req, res) => {
	const slug = req.params.slug.split('\n').filter(v => v.match(/[^\s]/)).join('\n').replace(/[\x01\x02\x03\x04]/, "");
	;

	

	if (typeof slug === 'string' && slug.length > 0) {
		console.log("\033[0m" + `GET ${filter.clean(slug.slice(0, 500)).replace('\033[2J', '')}`);
	}

	readPost(slug).then(post => {
		res.set('Cache-Control', 'public, max-age=600, stale-if-error=60, stale-while-revalidate=60')
		res.locals.post = post;
		res.locals.moment = moment;
		res.locals.beta = req.query.beta | 0;
		res.render('post-page.ejs');
	}).catch(err => {
		if (err.code === 'ENOENT') {
			errPage(res, err, 404);
		} else {
			errPage(res, err);
		}
	});
});

//moved this here because of an edge case Faris discovered and initially thought was from my code. turns out, this error has been here since probably the beggining of the blog
buildPostCache().then(() => {
	app.listen(3000, () => { console.log('blog is running'); });
})