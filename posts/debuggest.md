---
title: Debug, Debugger, Debuggest!—A new Collaborative Comprehension Experience
author: Luis Héctor Chávez
date: 2021-04-23T19:00:00.000Z
categories: product
---
Earlier this year, we decided to close the #1 most requested entry in our [Canny](https://replit.canny.io/) board, which requested to improve our previous [debugger](https://blog.replit.com/python-debugger) so that it could also work with multiple files in a project. This was done because it became very clear that there is a need to have better tools to aid with [program comprehension](https://en.wikipedia.org/wiki/Program_comprehension) built directly into Replit. _But_ we also realized that we could go even further. Even though most of our users could be happy with a traditional debugger experience, our mission is to give people [computer superpowers](https://blog.replit.com/seriesa)! So today we are announcing that we are working on a new, reimagined, collaborative debugging experience (or maybe we should call it a "program comprehension experience?").

We plan to tackle this problem from two fronts: the first one is that interactive debugging is very limiting and potentially frustrating, in the sense that it only exposes the state of the program at a single point in time. There are ways to make the program state advance, but if it advances too much, there's no going back, and the program needs to be restarted from the beginning and be placed in the same state again. This process is stressful enough that one very commonly-used alternative is to manually instrument the code to add tracing (also derogatively referred to as [`printf() debugging`](https://everything2.com/title/printf%2528%2529%2520debugging)). Logging/tracing definitely has its merits and is a good practice to do overall, but it's not ideal to have to rebuild the program and re-run it just to know what it's doing.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">What&#39;s your theory for why programmers reach for printf-debugging more frequently than other modes (like step-debugging)?</p>&mdash; Amjad Masad ⠕ (@amasad) <a href="https://twitter.com/amasad/status/1380559800598077440?ref_src=twsrc%5Etfw">April 9, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

All of these problems are the reason why we want to provide a [time-travel debugging](https://en.wikipedia.org/wiki/Time_travel_debugging) experience for our most popular languages, which should make the whole process a lot less stressful. The best thing is that we plan to make this such that there will be very little setup needed, other than enabling debugging on your repl!

The second problem that we want to attack is that whatever we do, it _must_ integrate well with the Replit editor, and that includes features that are mostly unique to it: collaborative code editing. This means that the debugger will also have a way for a group of people to be in this debugging experience at the same time, collaborating in understanding what the code is doing, and _why_ it is doing so. We still have some open questions about what this is going to look like, and the kinds of problems that you are trying to solve, so we are going to reach out to some of you for interviews to gather a better understanding and design tools that will work great for everybody.

Because Replit today is the editor of choice for so many people at the start of their programming journey, if we're successful, we will expand access to debugging tools and increase mindshare and hopefully get the next generation of programmers using advanced debugging techniques. In a sense, this is going to bring us several steps closer to achieving the dream of [learnable programming](http://worrydream.com/LearnableProgramming/)!

<figure>
  <image src="https://blog.replit.com/images/debuggest/learnable.gif" >
  <figcaption>A <a href="https://amasad.github.io/learnable-programming-demo/">proof-of-concept</a> from <a href="https://twitter.com/amasad">@amasad</a> that captures some of the long-term possibilities of <a href=" https://amasad.me/learnable">learnable programming</a>.</figcaption>
</figure>

We know that this is going to be a brand-new concept for a large number of users, so we will also create an [user onboading](https://en.wikipedia.org/wiki/User_onboarding) experience to highlight common use cases together with tutorials to make it easier to know what's possible and how to use this new tool more effectively. And of course we are still going to expose an interactive debugger so that folks that are more familiar with this paradigm don't miss it!

There is a lot of fantastic progress in the time-travel debugging space, so we're going to be drawing on and collaborating with the following projects and companies:

- [rr](https://rr-project.org/)
- [Pernosco](https://pernos.co/)
- [Replay](https://replay.io)

Expect more news in the next months, and happy repling!