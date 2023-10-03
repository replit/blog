---
title: A URL Shortener in 16 Lines of Code with Node.js and nanoexpress
author: Piero Maddaleni
date: 2021-05-11
cover: https://blog.replit.com/images/url-shortener-tutorial/cover.png
categories: product
---
## The Backstory
![The Slack message I received last October](https://blog.replit.com/images/url-shortener-tutorial/slack.png)
In October of 2020, Meghan, our people person, messaged me asking if there was a professional-looking URL shortener. Over the next 48 hours, I created [Replit.sh](https://replit.sh), a URL shortener for use by the Replit team and [published it on Github](https://github.com/replit-discord/Replit.sh/tree/4ea4d708d3d970a63e7dcf980127510ee0bcda75) for anyone to use. For the past few days, I have been working on rewriting the entire system from the ground up and so it just made sense for me to make a tutorial on how it is done.

## The Tools Being Used
To have a nice balance of simplicity and performance , I decided to use a Node.js repl and a library called nanoexpress, a library similar to express, but with some of the features removed and some pretty optimized code to have much lower latency and much higher throughput than regular express. Since nanoexpress doesn't include server rendering of pages and I want to keep this as simple as possible, links will have to be manually entered into `links.json` and then loaded in every time you restart the program. Though it isn't a library, I am also going to be writing this as a `module`, since nanoexpress doesn't support the `require()` function.

## Setting Up
First things first, we need to get our project going. Create a new Node.js repl, and using the package manager, install nanoexpress.

![Installing the package](https://blog.replit.com/images/url-shortener-tutorial/package.png)

Next, we can set up our project as a `node module` by adding `"type": "module"` to our `package.json`. We do this because nanoexpress can't be used with the `request()` function, and using `import` requires your project to be set up as a `node module`. This will also require us to run this project with the `--experimental-modules` tag enabled, which we'll set up in a little bit. In the end, that file should look something like this:
```json
{
  "name": "simple-url-shortener",
  "version": "1.0.0",
  "type": "module",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "nanoexpress": "^3.0.2"
  }
}
```
Then, let's create a `.replit` file, which will allow us to run node with experimental modules, and paste this in:
```py
run = "node index.js --experimental-modules"
```
Last but certainly not least, let's get a `Hello world!` program going in our `index.js` like this:
```js
import nanoexpress from 'nanoexpress'

const app = nanoexpress();

app.get('/', async (req, res) => {
    return res.send("Hello world!");
});

app.listen(3000);
```

## The JSON
Now that we have a simple program going, it is time to move onto the JSON. Wanting to go the easy and straightforward route, I went for a single JSON object to be used, where each key is a URL id (think of `2Q3gfQU` in `https://bit.ly/2Q3gfQU`) and the corresponding value is the URL. It is fast since it is a dictionary lookup, and no `for` loops are involved. This is what the said JSON might look like: 
```json
{
  "piero": "https://piemadd.com/",
  "replit": "https://replit.com/",
  "mark": "https://replit.com/mark/"
}
```

To load this into our program, we'll use the standard js library and then the built-in JSON parsing. First, let's import the library and load the file, which I have `links.json`:
```js
import fs from 'fs';

let rawdata = fs.readFileSync('links.json');
let urls = JSON.parse(rawdata);
```
This will create a global dictionary named `urls` containing our URLs. Since there is no use for the main page, I've decided to use it as an index of all the URLs. To do this, we simply have to replace `"Hello world!"` with `Object.keys(urls)` in our `/` route. Handling specific URLs is not that much different. Our route will be for `/:id`, where `:id` means that anything after the `/` will be passed on as `req.params.id`. We can then use that to find our corresponding URL and redirect the user, like this:
```js
app.get('/:id', async (req, res) => {
    let url = urls[req.params.id];
    return res.redirect(url);
})
```
Now when a user goes to a URL like `/piero` they get redirected to my website, `piemadd.com`.

In the end, our code should look like this:
```js
import nanoexpress from 'nanoexpress';
import fs from 'fs';

const app = nanoexpress();

let urls = JSON.parse(fs.readFileSync('links.json'));

app.get('/', async (req, res) => {
    return res.send(Object.keys(urls));
});

app.get('/:id', async (req, res) => {
    return res.redirect(urls[req.params.id]);
});

app.listen(3000);

```
## Closing Remarks
At 16 lines in length, this URL shortener is impressive, in not only its abilities and size but its speed as well, though you need to add the links directly to the JSON file. If you would like to fork this project for your own use, check out [the repl here](https://replit.com/@piemadd/simple-url-shortener). Any constructive criticism is appreciated, and make sure to follow [our TikTok](https://tiktok.com/@replit) for some tutorials on the very basics of programming on Replit.
