#!/usr/bin/env node
'use strict';

const readline = require('readline');
const fs = require('fs');
const path = require('path');
const spawn = require('child_process').spawn;
const rl = readline.createInterface(process.stdin, process.stdout);
const posts = require('./posts.json');

const post = {};
const properties = [
  {
    name: 'title',
    question: 'Enter a title: ',
  },
  {
    name: 'url',
    question: 'Enter a url/filename: ',
  },
  {
    name: 'author',
    question: 'Enter author name: ',
  },
  {
    name: 'timestamp',
    question: 'Enter a date (MM/DD/YYYY):',
  },
  {
    name: 'image',
    question: 'Enter a url for image that would appear on social media:',
  },
];

let promptIndex = -1;

prompt();

rl.on('line', line => {
  post[properties[promptIndex].name] = line;

  prompt();
});

function prompt() {
  promptIndex++;
  if (promptIndex === properties.length) {
    updateJSON();
    return;
  }
  rl.setPrompt(properties[promptIndex].question);
  rl.prompt();
}

function updateJSON() {
  posts.unshift({
    title: post.title,
    url: post.url,
    author: post.author,
    timestamp: new Date(post.timestamp).getTime(),
  });
  fs.writeFileSync(
    path.resolve(__dirname, 'posts.json'),
    JSON.stringify(posts, null, 2),
    'utf8',
  );

  const filepath = path.resolve(__dirname, 'posts', post.url + '.md');
  fs.writeFileSync(filepath, '');

  console.log('your blog post is ready to edit at ' + filepath);

  rl.close();
}