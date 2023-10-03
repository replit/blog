import { Schema } from '@sanity/schema';
import jsdom from 'jsdom';
const { JSDOM } = jsdom;
import { v4 as uuid } from 'uuid';

import { htmlToBlocks } from '@sanity/block-tools';
import { stringify } from 'ndjson';
import { Marked } from 'marked';
import { readdirSync, readFileSync, writeFileSync, lstatSync } from 'fs';
import fm from 'front-matter';
import { schema } from './schemas';

const ndSerialize = stringify();
let ndJsonLines = '';
ndSerialize.on('data', (line) => (ndJsonLines += `${line}`));
const writeJson = (obj) =>
  ndSerialize.write(obj, 'utf8', () => {
    console.log('done');
    ndSerialize.end();
    writeFileSync('./exports/production.ndjson', ndJsonLines);
  });

// Convert the md docs in posts/ to html using marked js

const mdDocs = readdirSync('./posts');

const processPost = (post) => {
  // if (
  //   fs.lstatSync(`./posts/${post}`).isDirectory() ||
  //   !post.includes('.md')
  // ) {
  //   return '';
  // }

  // Grab the file contents
  let md = readFileSync(`./posts/${post}`, 'utf8');

  // across all md files, efficiently find and replace the following:
  // - `](images/` with `](https://blog.replit.com/images/`
  // - `](/images/` with `](https://blog.replit.com/images/`
  // - `src="images/` with `src="https://blog.replit.com/images/`
  // - `src="/images/` with `src="https://blog.replit.com/images/`
  // you can use a library if needed

  md = md.replace(/]\(images\//g, '](https://blog.replit.com/images/');
  md = md.replace(/]\(\/images\//g, '](https://blog.replit.com/images/');
  md = md.replace(/src="images\//g, 'src="https://blog.replit.com/images/');
  md = md.replace(/src="\/images\//g, 'src="https://blog.replit.com/images/');

  // Parse out the frontmatter and body
  const { attributes: frontmatter, body } = fm<{
    date: string;
    title: string;
    slug?: string;
  }>(md);
  // Convert the body to an html string
  const marked = new Marked();
  const contentHtml = marked.parse(body);
  // Create a head tag with the frontmatter as json
  const head = `<head><script type="application/json" id="frontmatter">${JSON.stringify(
    frontmatter
  )}</script></head>`;
  // Create the html string
  // const html = `<html>${head}<body>${contentHtml}</body></html>`;
  const html = contentHtml.toString();
  // Write the html to a file
  writeFileSync(`./exports/html/${post}.html`, html);

  return {
    html,
    frontmatter: {
      ...frontmatter,
      date: frontmatter.date
        ? new Date(frontmatter.date as string).toISOString()
        : null,
    },
  };
};

// generate html
const htmlDocs = mdDocs.map(async (doc) => {
  // make sure it's not a directory or a non-md file

  if (lstatSync(`./posts/${doc}`).isDirectory()) {
    return null;
  }

  const { frontmatter, html } = processPost(doc);

  // console.log(html);

  const blockContent = await convertHtmlToBlock(html);

  // console.log(blockContent);

  // console.log(html);

  const jsondata = {
    _id: `post-${uuid()}`,
    _type: 'post',
    title: frontmatter.title || undefined,
    slug: {
      _type: 'slug',
      current: frontmatter.slug || doc.replace('.md', ''),
    },
    body: blockContent,
    publishedAt: frontmatter.date || undefined,
  };

  writeJson(jsondata);

  // save json to file
  writeFileSync(`./exports/json/${doc}.json`, JSON.stringify(jsondata));
});

async function convertHtmlToBlock(html) {
  const rootSchema = new Schema(schema);

  const bodyContentType = rootSchema.get('blockContent');

  return htmlToBlocks(html, bodyContentType, {
    parseHtml: (html) => {
      // console.log(html);
      const dom = new JSDOM(html, {
        includeNodeLocations: true,
      }).window.document;
      return dom;
    },
    rules: [
      {
        deserialize(el, next, block) {
          const element = el as HTMLElement;
          // console.log(el)
          // console.log(el.nodeName)
          // This is an example of over-riding the 'pre' tag in our
          // html and returning a custom 'codeBlock' type
          if (element.nodeName.toLowerCase() === 'pre') {
            // the language is stored as a language-* class name
            const code = element.querySelector('code');
            const language = code.className.replace('language-', '');

            return block({
              _type: 'code',
              language,
              filename: '',
              code: element.textContent,
            });
          }

          // img
          if (element.nodeName.toLowerCase() === 'img') {
            // get the url
            let url = element.getAttribute('src');
            return block({
              _type: 'image',
              _sanityAsset: `image@${url}`,
            });
          }

          // if video, return file block
          if (element.nodeName.toLowerCase() === 'video') {
            // get the url
            let url = element.getAttribute('src');
            return block({
              _type: 'file',
              _sanityAsset: `file@${url}`,
            });
          }


          // This is an example of over-riding the 'iframe' tag in our html, detecting
          // that the src is a github gist, then returning the custom '_type' for 'githubGist'
          if (element.nodeName.toLowerCase() === 'iframe') {
            // get the url
            let url = element.getAttribute('src');
            return block({
              _type: 'embed',
              _id: uuid(),
              url: url || undefined,
            });
          }


          return undefined;
        },
      },
    ],
  });
}

// const rootSchema = Schema.compile({
//   name: 'Mux CMS',
//   types,
// })
// const bodyContentType = rootSchema
//   .get('post')
//   .fields.find(field => field.name === 'body').type

// // This is a simplified version of processPost - we take a JSON object
// // that is a 'post' from the Ghost archive and turn it into a 'post' in
// // sanity's world
// async function processPost(post) {
//   const {
//     html,
//     meta_title,
//     meta_description,
//     published_at,
//   } = post
//   // Take html and converts it into the data structure for a post 'body'
//   const body = await convertHtmlToBlock(html)
// writeJson({
//   _id: `post-${post.uuid}`,
//   _type: 'post',
//   title,
//   slug: { _type: 'slug', current: slug },
//   seoTitle: meta_title || undefined,
//   seoDescription: meta_description || undefined,
//   body,
//   publishedAt: published_at,
// })
// }

// // this function takes in html and returns the structured block content that Sanity expects
// // we hook into the `deserialize` function and return custom types
// // one example is how w
