---
title: Focusing on a solid foundation
author: Amjad Masad
date: 9-21-2020
categories: infra
---

At Repl.it, our mission is to make programming more accessible, more creative, and more fun. A place away from the modern software development [grind](https://amasad.me/replit_ide). It’s an ambitious mission, and it's already resonated with millions of coders who followed their creative energy to build great apps, like [repl.email](https://repl.email), a free email service built and hosted entirely on Repl.it and available to anyone with a Repl.it account.

Repl.it has grown so much in the past few years:

- To give you an idea of the scale we're operating on, we now serve 120k concurrent containers. That is 120,000 computers started at once
- We doubled our team every year for the past 4 years: 2^4 = 16, and are still [hiring](https://repl.it/jobs)
- Repl.it went from a simple online REPL to a world-leading collaborative coding environment focused on learning and prototyping

However, with growth comes problems:

- The repl has gotten slower and crashes too much
- Disconnects, when they happen, have been terrible user experience
- Hosting could be more reliable, repls should never get stuck
- The website has become hard to navigate and needs a coherent design sense
- Legacy Classroom product is putting a lot of strain on our infrastructure leading to outages


Because of all this, we've decided to pause work on new features until we get the foundations in a good state. We've already started working on addressing all these issues, and have some early wins we can share.  

- Disconnects/reconnects are mostly a transparent experience

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Random disconnects when using our editor has been really annoying -- not anymore!<br><br>✨ You can go online and offline, you could get a new container, and you won&#39;t feel a thing ✨ <a href="https://t.co/d4qHVgjTgK">pic.twitter.com/d4qHVgjTgK</a></p>&mdash; Repl.it (@replit) <a href="https://twitter.com/replit/status/1308219288403079168?ref_src=twsrc%5Etfw">September 22, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

- We made editing much faster

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">We&#39;ve made typing in our editor fast even on the most underpowered machine. <br><br>On a heavily throttled CPU, left is before, and right is after. <a href="https://t.co/WDcDZNlvRL">pic.twitter.com/WDcDZNlvRL</a></p>&mdash; Repl.it (@replit) <a href="https://twitter.com/replit/status/1300496228644347905?ref_src=twsrc%5Etfw">August 31, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

- We've made running much faster

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">As part of our continued focus on performance, we&#39;ve made our run button at least 2x faster for our top languages! <a href="https://t.co/b891naubhu">pic.twitter.com/b891naubhu</a></p>&mdash; Repl.it (@replit) <a href="https://twitter.com/replit/status/1306345215012171776?ref_src=twsrc%5Etfw">September 16, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

- We've reduced repl crashes by more than 80%

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">We crushed a bunch of our IDE crashes and hoping to stamp all!<br><br>If you run into any we&#39;d love to hear about them.</p>&mdash; Repl.it (@replit) <a href="https://twitter.com/replit/status/1283572430171062273?ref_src=twsrc%5Etfw">July 16, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## What does this mean for our users?

You'll notice that things will get faster, better, and more polished. For the majority of our users, that's the extent to which this refocus will impact you. 

We're also going to have to pause new feature work while we work on the foundations. Our plans will likely change, but currently, we've planned to make the following changes:

- We're pausing work on always-on repls, the alpha feature that lets explorers keep their repls up. We'll get back to this later, possibly this year, when the foundations are in a better place (there will be less of a need to keep your repls up if wake-ups are faster, which they will be)
- We will not be adding any new languages for the time being. Polygott, our underlying base OS image that runs your repls, has ballooned to more than 6GB, and suffers from [dependency hell](https://en.wikipedia.org/wiki/Dependency_hell), which makes deploying it like playing Russian roulette. 
- Classroom will be deprecated. Check out [Teams for Education](https://blog.repl.it/teams-for-education) for a transformative way of teaching using Repl.it
- There are undermaintained and underused sections of the website that are worth cleaning up or modernizing. For example, we're will update our social platform to be more integrated with the core coding experience.

Overall, we think this will allow us to build a solid foundation and platform to expand from once we get back to feature development. 

We're committed to building the best possible platform we can build, and we finally have the resources to make something so good it'll make you cry tears of joy. 