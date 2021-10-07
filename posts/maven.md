---
title: Packaging Support for Java - Try Maven Packages in Your Browser
date: 2020-03-25T00:00:00.000Z
author: Amjad Masad
cover: https://repl.it/public/images/typing.gif
categories: product
---

Java is one of the most popular languages on Repl.it, and the JVM powers many of our other languages (Java Swing, Clojure, Kotlin). We want to make it as easy as possible to code with other people and build new programs out of programs that already exist. So we've added packaging support for Java!

The [Universal Package Manager](https://github.com/replit/upm) now understands how to add and remove Java packages using [Maven](https://maven.apache.org/). It also can [search](https://search.maven.org/) the Maven central repository for packages.

If you'd like to get familiar with the Java ecosystem, I highly recommend [Andreas Kull](https://chrysanthium.com/about)'s [Awesome Java](https://github.com/akullpp/awesome-java) list. It was while scrolling through this list that I found [Yasser Ganjisaffar
](https://github.com/yasserg)'s [crawler4j](https://github.com/yasserg/crawler4j), a web-crawling library.

## Building something with Java + Packages

To show you how powerful Java Maven packages could be, we're going to build an app to pull down the most interesting Twitter threads. 

To start, I made a [new Java repl](https://repl.it/languages/java), searched for crawler4j, selected the `edu.uci.ics:crawler4j` package, added it, copy-pasted the quickstart example in crawler4j's README, and clicked "run." It started crawling the UCI computer science home page. That's not quite what I wanted, so I pointed the crawler at the [Threader front page](https://threader.app/), to see if I could pull down some interesting Twitter threads. Thanks to Yasser's well-documented examples I soon had a directory of popular threads.

![adding crawler4j](images/maven/add-crawler4j.gif)

As much as I like scrolling through individual HTML files to read a series of tweets, it's nicer to have a single web page. [Jonathan Hedley](https://jhy.io/)'s [jsoup](https://jsoup.org/) made it easy to parse the crawled HTML and output a single page, but we need something to serve the website?

Being able to add a package, quickly try it out, remove it if it isn't working, and try another makes Java feel as light as a scripting language. After a few tries I found [Blade](https://github.com/lets-blade/blade), a simple Java web framework. With only a few copy-pasted lines I was able to start serving web traffic. Here is the final repl, try forking it and playing with it: 

<iframe height="400px" width="100%" src="https://repl.it/@replthru/threaderthreads?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

We're iterating on packaging support for the JVM. If you have a package or a Maven repository you'd really like to see work out of the box on Repl.it, please let us know!