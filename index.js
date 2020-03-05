const express = require('express');
const marked = require('marked');
const fs = require('fs').promises;
const path = require('path');
const moment = require('moment');
const hljs = require('highlight.js');
const gm = require('gray-matter');
const htmlToText = require('html-to-text');

require('ejs');

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight:  (code, lang) =>  hljs.highlightAuto(code, [lang]).value,
  headerIds: true,
  gfm: true,
});

let previewCache = null;

const buildPostCache = async () => {
  const ls = await fs.readdir('./posts');

  let posts = [];

	for (const f of ls) {
    posts.push(await readPost(f.slice(0, -3), true));
	}

  posts = posts.filter(p => p.timestamp);

  posts.sort((l, r) => r.timestamp - l.timestamp)

  previewCache = posts;
}

buildPostCache();

const postPreviews = async () => {
  return previewCache || [];
}

const readPost = async (slug, snip=false) => {
  // let em read anything ¯\_(ツ)_/¯
	const p = path.join(__dirname, 'posts', slug) + '.md'

	let raw = await fs.readFile(p, 'utf8');

  let { content: rawContent, data } = gm(raw);

	// try to resolve absolute links back to repl.it
  const contentMd = rawContent.trim().replace(/(\]\()(\/.+\))/g, '$1https://repl.it$2');

  let previewMd = '';
  const ender = contentMd.indexOf('[](preview end)');
  if (ender ! -1) {
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
    content = marked(contentMd);
  }

	return {
    content,
    description,
    snipped: snip,
    title: data.title,
    author: data.author,
    timestamp: data.date ? new Date(data.date) : null,
    url: slug,
    cover: data.cover,
  }
}


const errPage = (res, err) => {
	res.locals.err = err;
	res.render('error.ejs')
}

const app = express();

app.use(express.static('static'))

app.get('/', (req, res) => {
  console.log('GET /')
	postPreviews()
		.then(p => {
			res.locals.posts = p;
			res.locals.moment = moment;
			res.render('index.ejs');
		})
		.catch(err => errPage(res, err));
});

app.get('/:slug', (req, res) => {
	const { slug } = req.params;

  console.log('GET ' + slug)

	readPost(slug)
		.then(post => {
			res.locals.post = post;
			res.locals.moment = moment;
			res.render('post-page.ejs');
		})
		.catch(err => errPage(res, err));
});

app.listen(3000, () => { console.log('blog is running'); });