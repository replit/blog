---
title: Terminal Links
author: Arnav Bansal
date: 2020-04-30T21:54:00.000Z
cover: https://blog.repl.it/images/terminal-links/clicklinks.png
categories: product
---
Terminals make it hard to copy things: Selecting text works differently to what people are used to, and `^C` aborts the current program. Links are hard to use.

Now you can click on links in the repl.it terminal.

![An example of links in terminal being clickable](images/terminal-links/terminal-links-intro.png)

It's as simple as starting a repl and printing a URL to the terminal.

This is super helpful with languages like Rust, which often print URLs in error messages to help you debug and learn.

![The Rust compiler often prints errors with links to relevant docs](images/terminal-links/rust-debug-link.png)

This also works on repl.run, where you can [publish terminal apps as websites](https://repl.it/talk/announcements/BetaExplorers-Announcing-replrun-publish-your-terminal-apps-as-websites/7802). As an example, here's the repl.it blog available on repl.run [as a terminal website](https://terminalblog.arnavbansal.repl.run/), written in python:

<iframe src="https://terminalblog.arnavbansal.repl.run/" style="border:0px #ffffff none;" name="terminalblog" scrolling="no" frameborder="1" marginheight="0px" marginwidth="0px" height="600px" width="100%" allowfullscreen></iframe>

<!-- Image as backup -->
<!--[![](images/terminal-links/terminal-blog.png)](https://terminalblog.arnavbansal.repl.run/) -->

Now your terminal apps can link to anything on the web!