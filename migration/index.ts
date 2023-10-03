import { Schema } from '@sanity/schema';
import jsdom from 'jsdom';
import { v4 as uuid } from 'uuid';
import { htmlToBlocks } from '@sanity/block-tools';
import fm from 'front-matter';
import { lstatSync, readFileSync, readdirSync, writeFileSync } from 'fs';
import { Marked } from 'marked';
import { stringify } from 'ndjson';
import { schema } from './schemas';
const { JSDOM } = jsdom;

/**
 * NDJSON Serializer logic
 * We use new line delimited JSON to create the ndjson file
 * used by the sanity CLI to import data
 */
const ndSerialize = stringify();
let ndJsonLines = ''; // Stores our output json
ndSerialize.on('data', (line) => (ndJsonLines += `${line}`)); // Called on each addition
const writeNdJson = (obj: Object) =>
  ndSerialize.write(obj, 'utf8', () => {
    console.log('done');
    ndSerialize.end();
    writeFileSync('./exports/production.ndjson', ndJsonLines); // Write the file
  });

// Get all markdown files
const mdDocs = readdirSync('./posts');

// Process a markdown file given a file name
const processPost = async (fileName: string) => {
  // Grab the file contents
  let markdownContent = readFileSync(`./posts/${fileName}`, 'utf8');

  // Ensure all relative asset URLs are converted to absolute URLs
  markdownContent = markdownContent.replace(
    /]\((\/)?(public\/)?images\//g,
    '](https://blog.replit.com/images/'
  );

  // Parse out the frontmatter and body
  const { attributes: frontmatter, body } = fm<{
    title: string;
    author?: string; // sometimes a list, may be separated with commas or &
    date?: string;
    cover?: string;
    categories?: string; // comma separated
    slug?: string;
    profiles?: string; // comma separated
  }>(markdownContent);

  // Convert the body to an html string using the same
  // processor we use on the blog, for 1:1 output
  const marked = new Marked();
  const html = await marked.parse(body);

  // Write the html to a file
  // writeFileSync(`./exports/html/${fileName}.html`, html);

  // Convert the date to ISO format
  const date = frontmatter.date
    ? new Date(frontmatter.date as string).toISOString()
    : null;
  // if author is a string, split it at "," or "&"
  const authors = frontmatter.author ? frontmatter.author.split(/,|&/) : null;
  const categories = frontmatter.categories ? frontmatter.categories.split(',') : null;
  const profiles = frontmatter.profiles ? frontmatter.profiles.split(',') : null;
  const slug = frontmatter.slug || fileName.replace('.md', '');

  return {
    html,
    frontmatter: {
      ...frontmatter,
      date,
      authors,
      categories,
      profiles,
      slug
    },
  };
};

// Process all markdown files
mdDocs.map(async (doc) => {
  // make sure it's not a directory or a non-md file
  if (lstatSync(`./posts/${doc}`).isDirectory()) {
    return null;
  }

  // process the markdown file
  const { frontmatter, html } = await processPost(doc);

  // convert the html to block content
  const blockContent = await convertHtmlToBlock(html);

  // Create a JSON object representing the post
  const entryJson = {
    _id: `post-${frontmatter.slug || doc.replace('.md', '')}`, // persistent id
    _type: 'post', // sanity type
    title: frontmatter.title,
    slug: {
      _type: 'slug',
      current: frontmatter.slug
    },
    body: blockContent,
    publishedAt: frontmatter.date,
  };

  // TODO Create entries for categories and authors
  writeNdJson(entryJson);
});

// This function takes in html and returns the structured block content that Sanity expects
async function convertHtmlToBlock(html) {
  // Create a root schema that we can use to parse the html
  const rootSchema = new Schema(schema);
  // Get the blockContent type we need to parse the html
  const bodyContentType = rootSchema.get('blockContent');

  // Return parsed blocks as an array of portable text blocks
  return htmlToBlocks(html, bodyContentType, {
    parseHtml: (html) => {
      const dom = new JSDOM(html, {
        includeNodeLocations: true,
      }).window.document;
      return dom;
    },
    rules: [
      {
        // Here is where we hook into the 'deserialize' function and return custom types
        deserialize(el, next, block) {
          // Typecast the element as an HTMLElement so we can access the element
          const element = el as HTMLElement;

          // Generate code blocks from <pre><code/></pre> tags.
          // Instances of <code/> without <pre/> will be treated automatically
          // as inline code styles.
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

          // Generate image blocks from <img/> tags.
          if (element.nodeName.toLowerCase() === 'img') {
            let url = element.getAttribute('src');
            return block({
              _type: 'image',
              // We need to prefix the url so Sanity knows how to import them
              _sanityAsset: `image@${url}`,
            });
          }

          // Generate video blocks from <video/> tags.
          if (element.nodeName.toLowerCase() === 'video') {
            let url = element.getAttribute('src');
            return block({
              _type: 'file',
              // We need to prefix the url so Sanity knows how to import them
              _sanityAsset: `file@${url}`,
            });
          }

          // Generate embed blocks from <iframe/> tags.
          if (element.nodeName.toLowerCase() === 'iframe') {
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

