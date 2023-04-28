---
title: Why We Switched From Webpack To Vite
author: Sergei Chestakov
date: 2021-04-28
cover: https://blog.replit.com/images/vite/cover.png
categories: product
---

At Replit, our mission is to make programming more accessible. We provide people with free compute in the cloud so that they can build apps on any device. Among the most popular ways to create apps on the web today is React. Historically, however, React tooling has been slow on Replit. While the JavaScript ecosystem has produced excellent tools for professional developers, many of the most popular ones, like Create React App and Webpack, have become increasingly complex and inefficient.

Fortunately, we've seen the JavaScript community recognize this problem and move to build faster and more efficient tooling, which means we can finally deliver the experience our users expect from us.

![vite logo](images/vite/logo.png)

This new experience is powered by [Vite](https://vitejs.dev), a JavaScript build tool that provides a fast and lean development experience. Vite comes with a number of features including [HMR](https://vitejs.dev/guide/features.html#hot-module-replacement), or Hot Module Replacement, a build command that bundles your tools with [Rollup](https://rollupjs.org/guide/en/), and built-in support for TypeScript and JSX.

Vite makes React dev fast. Like really fast. With HMR, changes you make trigger rerenders within milliseconds which makes prototyping UIs really quick. With that in mind, we decided to rewrite our React template using Vite and we were shocked to see just how much faster it was. Here's what it looks like next to our old CRA template:

<div style="display: flex; align-items: center; justify-content: center;">
<blockquote class="twitter-tweet" data-dnt="true" data-theme="light"><p lang="en" dir="ltr">Create React App vs Vite React on <a href="https://twitter.com/Replit?ref_src=twsrc%5Etfw">@replit</a>. <br><br>Vite ran before the container could even boot CRA files. <a href="https://t.co/lZe87brsjv">pic.twitter.com/lZe87brsjv</a></p>&mdash; Amjad Masad ⠕ (@amasad) <a href="https://twitter.com/amasad/status/1355379680275128321?ref_src=twsrc%5Etfw">January 30, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 
</div>

Over the last few weeks, our new React template has helped our designers prototype complex UI components and enabled many of our engineering candidates to build out an entire web app in just a few hours during our (virtual) onsites. When you see it in action, it's easy to see why:

<img src="images/vite/demo.gif" alt="React + Vite on Replit" style="width: 100%;"/>

## How it works

Vite works by treating your source code and your dependencies differently. Unlike your source code, dependencies don't change nearly as often during development. Vite takes advantage of this fact by pre-bundling your dependencies using [esbuild](https://esbuild.github.io/). Esbuild is a JS bundler written in Go that bundles dependencies 10-100x faster than JavaScript based alternatives like Webpack and Parcel.

It then serves your source code over native [ES Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules), or ESM, which allows the browser to handle the actual bundling.

Finally, Vite supports HMR, which ensures only the relevant modules are replaced when a file is edited instead of rebuilding the entire bundle, which triggers a page reload and resets state. Unlike other bundlers, Vite performs HMR over native ES Modules which means it only needs to invalidate affected modules when a file is edited. This ensures that update times are consistently fast instead of scaling linearly as your application grows.

## Getting Started

To get started, simply fork our [React template](https://replit.com/@templates/Reactjs) or select React.js in the languages dropdown when creating a [new repl](https://replit.com/new/).

Vite is also framework agnostic, so if React isn't your thing, you can use our [Vue](https://replit.com/@templates/VueJS-with-Vite) and [Vanilla JS](https://replit.com/@templates/Vanilla-Vite) templates too.

We hope this helps build out your ideas even quicker and look forward to seeing what you build!
