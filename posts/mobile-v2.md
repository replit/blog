---
title: Going Where the Next Billion Creators Are
author: Laima Tazmin
date: 2022-01-21T08:00:00.000Z
cover: https://blog.repl.it/images/mobile/cover-v2.jpg
categories: product,eng
---

Mobile is the future of computing. But building good software creation tools for mobile devices is hard. Luckily, at Replit, we like to run toward the hard things.

This week, we launched a completely rearchitected mobile IDE for web. If you’ve used it before, the new version won’t look much different, but it will likely _feel_ different. 

## Why We Care

Mobile devices are the world’s most ubiquitous computers. At Replit, we have kids coding their next big idea on their phone on the way to school, instead of scrolling through social media. We have local communities in developing countries learning & teaching code together on their phones, in order to get hired for jobs. We have colleagues coding prototypes in multiplayer and demoing their work on their phones, while they are on the go.

We even noticed users sharing Replit coding tutorials on TikTok:

<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@coding4python3/video/6960360386101120261" data-video-id="6960360386101120261" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@coding4python3" href="https://www.tiktok.com/@coding4python3">@coding4python3</a> Antwoorden aan @wewillcum <a title="replit" target="_blank" href="https://www.tiktok.com/tag/replit">#replit</a> <a title="code" target="_blank" href="https://www.tiktok.com/tag/code">#code</a> <a title="coding" target="_blank" href="https://www.tiktok.com/tag/coding">#coding</a> <a title="coding4python3" target="_blank" href="https://www.tiktok.com/tag/coding4python3">#coding4python3</a> <a title="python" target="_blank" href="https://www.tiktok.com/tag/python">#python</a> <a target="_blank" title="♬ origineel geluid - coding4python3" href="https://www.tiktok.com/music/origineel-geluid-6960360619564387078">♬ origineel geluid - coding4python3</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>

The future of personal computing will be on mobile devices. That’s how the next billion software creators will come online.

With this in mind, it’s important that we bring the best of Replit to our diverse community of users, regardless of their device, geolocation or circumstance. We have our work cut out for us!

## The Rebuild

Our previous mobile client was lacking. After the initial build of the mobile IDE in 2020, we started hitting performance problems with our Redux-based [plugin architecture](https://blog.replit.com/ide). 

The system used too much memory and CPU, making the mobile IDE feel laggy. On low-powered devices, it would crash often. Pieces of UI were plugins, arranged in floating windows. This made the UI and interactions feel clunky. It became hard to maintain and debug issues. This drove engineers away from touching it.

We spent the last few months rebuilding the mobile web client using a simpler & faster render tree and abstractions called “services”. Services are single-responsibility APIs for various platform capabilities. Examples include the [filesystem](https://blog.replit.com/replspace-filesystems), shellrunner and presence for multiplayer. We got rid of Redux completely.

The goals for the new iteration were:

* Move the source of truth to the backend. 
  * Services drive the state of the repl UI, including the files and state of the program. They also allow subscriptions so UI components can react to updates right away. This model makes synchronizing clients across devices easier and reduces our memory footprint. With Redux, we had dozens of reducers duplicating state that often drifted and caused unexpected bugs. 

* Use a flexible & maintainable UI.
  * We fought the urge to redesign the mobile UI to keep this project scoped. Instead, we focused on writing modular React components that used our new [design system](https://blog.replit.com/rui-eng), along with Hooks for local view state. 

We now have a lighter & more manageable mobile web client overall.

We tested early with our explorers, who felt it was “so [much] smoother”. While A/B testing the new changes, we saw up to 2x increase in weekly retention on mobile.

## What's Next?

With this big piece of work done, we are focusing on the feedback we hear a lot from our community. These past few months, we've also interviewed users to better understand their pain points and workflows on mobile. We’re excited to bring you the next version of our mobile IDE soon. Our upcoming top projects are:

* Make core mobile ergonomics better
* Make repls run faster across the world

And maybe a surprise or two.

And we’re hiring.

If you are excited by hard and impactful problems like these — and we know you are — [come join our team](https://replit.com/site/careers)!
