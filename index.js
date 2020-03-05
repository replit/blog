const express = require('express');
const marked = require('marked');
const fs = require('fs').promises;
const path = require('path');
const moment = require('moment');
const hljs = require('highlight.js');
const gm = require('gray-matter');

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

  let { content, data } = gm(raw);

  content = content.trim();

	if (snip) {
		const ender = content.indexOf('[](preview end)');
		if (ender !== -1) {
			content = content.slice(0, ender);
		} else {
			const nlnl = content.indexOf('\n\n');
			if (nlnl !== -1) {
				content = content.slice(0, nlnl);
			}
		}
	}

	// try to resolve absolute links back to repl.it
	content = content.replace(/(\]\()(\/.+\))/g, '$1https://repl.it$2');

	return {
    content: marked(content),
    snipped: snip,
    title: data.title,
    author: data.author,
    timestamp: data.date ? new Date(data.date) : null,
    url: slug,
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