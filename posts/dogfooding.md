---
title: This Blog Hosts Itself
author: Mason Clayton
categories: projects
---

As Repl.it has become more powerful we've used it to build and host many of our internal tools and parts of the site itself. This gives us a great opportunity to [eat our own dog food](https://en.wikipedia.org/wiki/Eating_your_own_dog_food) and in the process make Repl.it better.

Most recently we moved our blog (the one you're reading right now) into a repl! Notice the "edit on Repl.it" in the upper right corner? That takes you straight to the markdown file for this particular blog post. The same repl is also embedded below, you can explore it right here, even fork and play around with it.

<iframe height="400px" width="100%" src="https://repl.it/@turbio/replit-blog?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

But this isn't the only page build in a repl. When creating any new feature we try to first prototype on Repl.it and, if possible, host it there forever. Pages like our [docs](https://docs.repl.it), [jobs](https://repl.it/site/jobs), and even the [repl.run](https://repl.run) product are all hosted entirely in a repl. We've found repls lend themselves especially well to light self contained services. Many of our internal tools and some parts of the site work very well with the repl model.

## Boops

We've found tracking pull requests across many repositories on Github has a lot of overhead. It isn't always clear what to review. Checking many repositories is time consuming and trying to use Github's notifications is a bit of a mess. To solve this we created [Boops](https://repl.it/@turbio/boops). The concept is very simple: any PR with the label `boop` will be listed on a shared board everyone can see. If you want your PR reviewd you add the `boop` label. This alone might not be very useful but it becomes much more powerful when anyone can create repls to manipulate labels as they see fit. One repl "The Unbooper" goes around removing `boop`s from any PRs with failing tests or unaddressed feedback. Another repl will automatically add `boop` to a PR with the label `preboop` if it passes the checks. There is of course a `superboop` label you can add when you want to ward off the unbooper.

All together this creates a board with very high signal on PRs requiring human attention. Here's what our boop board looks like right now:

<iframe frameborder="no" height="300px" width="100%" src="https://boops.turbio.repl.co"></iframe>

## Flags

<iframe frameborder="no" height="300px" width="100%" src="https://mr-flags.turbio.repl.co"></iframe>

## Repl.run

[Repl.run](https://repl.run) turns any terminal app into a website you can share. To build this we leaned heavily on our existing infrastructure. The page is actually [hosted statically from a repl](https://repl.it/@util/replrun) and starts up a fresh container using [our api](https://crosis.turbio.repl.co/). [](https://repl.it/@util/replrun?fileName=dev/script.js)

## Jobs

Our [jobs page](https://repl.it/site/jobs) is actually just [a bash repl](ttps://repl.it/@util/jerbs). We ues the [repl.run](https://jerbs.util.repl.run/) . You can check out the source repl over here https://repl.it/@util/jerbs.

## self checks

## prometheus exporer
- kue metrics
- log metrics
- bundle checker

- install all of pypi
- deploys
- 

# /deploy

repl forks and runs another repl for every deploy

# map reduce?

- python packge resolver

install every package on pypi to figure out what it provides