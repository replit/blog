---
title: React Framework Preboot
author: Amjad Masad
date: 2018-06-13T07:00:00.000Z
categories: product
---

[Two days](react) ago we introduced our beta support for React frameworks, ranging from
static-site generators like GatsbyJS, to fullstack frameworks like
Next.js. Today we're launching a significant performance enhancement that we're
calling **preboot**.

Whenever you land on a repl, you get a container to develop against. Our containers are generic and work for any
language/framework. When you land on a React framework, you had to hit "run"
to start the server (it basically sends a `yarn develop` or similar to the container)
. The container manager will then detect an open port, send an
event to the IDE, which will show you a webview (speeded up gif below) -- afterward, you're on
your way building your app.

<div style='position:relative;padding-bottom:54%'><iframe src='https://gfycat.com/ifr/RingedPerfumedAmericanbittern' frameborder='0' scrolling='no' width='100%' height='100%' style='position:absolute;top:0;left:0' allowfullscreen></iframe></div>

However, this kind of experience is suboptimal because it's slow. We pride
ourselves on setting up the development environment within 2 seconds of selecting
a language/framework so, naturally, we need to do better.

Luckily, we have previously implemented a pooling mechanism on our
infrastructure so that containers are ready and hot when you need them. What was
missing from that is custom "boot" command that gets the container *really* hot,
listening on a port, and ready to start serving. So now, when you land on a
React framework environment, we grab a container for you that's already
running -- your repl IDE will simply attach to it.

Take a look:

![react preboot](/public/images/blog/react-preboot.gif)

As mentioned in the announcement post, we're moving fast on getting this
out of beta into something we're proud of and can, with confidence, offer
to you as, if not your primary development environment, at least your
secondary/prototyping one.

Stay tuned for more updates.