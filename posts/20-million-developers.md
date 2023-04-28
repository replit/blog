---
title: Celebrating 20 Million Replit Developers
author: Amjad Masad
date: 2023-02-16T20:20:06+00:00
cover: https://blog.replit.com/images/200-million-developers/cover.jpg
categories: news
profiles: amasad
---

![celebrating 20 million developers](https://blog.replit.com/images/20-million-developers/cover.jpg)

Today, we celebrate **20 million developers on Replit**. They've created **240M+ Repls,** ranging from multiplayer games to production software with the power of real-time collaboration in the cloud and state-of-the-art AI tools. Developers build their businesses on Replit too, from indie hackers to YC-backed startups like [Fig](https://blog.replit.com/fig), [AmpleMarket](https://blog.replit.com/amplemarket), and [BerriAI](https://berri.ai) to unicorns like [Deel](https://blog.replit.com/bounties-deel-case-study).


![chart of replit developer growth 2015 to 2023](https://blog.replit.com/images/20-million-developers/chart.jpg)


## The Replit Story

In 2010, I was a young hacker in Amman, Jordan. I didn't have my own computer, but coding was my life. I’d go to internet cafés or borrow computers, and every time I switched machines, I needed to set up a new development environment from scratch. Worse, I couldn’t save my progress or collaborate with my friends. I’d email myself and others my code so we could work on different machines.

Around that time, Google Docs came out, and it struck me that nothing like it existed for programming. I became obsessed with an idea: to create a world where I could open a browser tab, start coding, write a runnable program, collaborate with others, and access my work from any other device. 

With classic founder zeal (Paul Graham [calls it ignorance](http://paulgraham.com/mit.html)), I started a side project to build an in-browser [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop), but I wanted this experience to be better and work for more languages.

I wanted to create a personal computer in the cloud.

“How hard can it be?” I thought. Turns out, it was hard.

Fast forward 10 years…

My side project is a company now, with a mission to bring the next billion developers online. We are building a [holistic development platform](https://blog.replit.com/holistic) that makes it easy to build, collaborate, and share your creations with the world. And in the process, Replit’s developers have been uniquely able to take advantage of all the recent innovations in software—cloud, mobile, and now AI.

So how did we do it?

### Fast, easy, and consistent package management

Setting up your development environment for a new project on your local computer can be a painful experience. You can be fighting with your operating system and package managers for days just to get your environment up and running. There are literally hundreds of memes about how bad package management is. I think this one captures the sentiment of programmers everywhere:

![inception meme we need a package manager for our package manager](https://blog.replit.com/images/20-million-developers/inception.jpg)

The good news is we built this at Replit with our [Universal Package Manager](https://blog.replit.com/upm), which makes working with packages easy. Today, Replit supports 500+ languages and 200K+ software packages out-of-the-box, and with the power of [Nix](https://blog.replit.com/powered-by-nix), we’re able to keep them up-to-date and conflict-free. We had to build multiple pieces of infrastructure to [make this fast](https://blog.replit.com/nix-perf-improvements) (100x faster [in the case of Python](https://blog.replit.com/python-new-template)) with smart caching. And once you create a working environment, you can make a template out of it and share it with your team.

### Real-time collaboration

Today, real-time collaboration is a default feature people expect from their tools. Developer tools have lagged behind other domains, like document editing. Back in 2019, we built multiplayer as a core primitive with our own [collaborative development protocol](https://blog.replit.com/collab). Replit's unique first-class support for live collaboration allows you to do things like multiplayer [debugging](https://blog.replit.com/debuggest). You can also use [inline threads and built-in chat](https://blog.replit.com/threads-v2) to discuss your project asynchronously. And if Git is your jam, we support that too.

### Zero-to-hosting in ~5 seconds or less

Once you’ve made something and want to share it with the world, you’ve got to host it somewhere. Hosting providers aren't too hard to find, but it’s an extra step. Once you’ve chosen one, the environment you coded your project in likely doesn't match the hosting environment. You can try working around this problem by building Docker containers, but that's yet another tool you need to learn.

Replit takes all the hassle out of the entire software development lifecycle, letting you go from zero-to-hosting in about 5 seconds or less. We provision compute, databases, filesystems, domains, and certificates in seconds, not minutes. Just press Run.


### Intuitive goal-directed design

Beyond the core technical challenges, we’ve prioritized design at Replit from the beginning. In the early days of Replit, our co-founder and my wife, Haya, led design decisions that kept things simple, benefiting seasoned hackers just as much as someone writing their first line of code. Since then, we’ve grown a team of designers obsessed with making every experience on Replit smooth and delightful. Every time we design a feature, we take the perspective of someone new to the concept. That’s what we did with our new [file history feature](https://blog.replit.com/history2-release), and its usage shot up. So we keep doing it.

## Eternal SHPNG SZN: Enabling fast software creation is in our DNA

Since we’ve brought collaborative software creation to the cloud, we’ve been continually working to shorten the loop from idea to product. In 2022 [we shipped a lot](https://blog.replit.com/replit-recap-2022), and to start this year, we’ve continued SHPNG SZN with these recent innovations:

**🚀 More powerful Boosts**

To support resource-intensive apps, we introduced more powerful Boosts, so you can scale your projects up to 16GB of RAM and 16vCPUs.

**🇮🇳 Replit India**

We've added servers in India so developers in the Indo-Pacific region can code with low latency. A lot of deep infrastructure work went into it, and you can read more about that [in this blog post](https://blog.replit.com/geo-part-2-loadbalancing).

**👻✍️ Ghostwriter Chat**

And we just launched a conversational and proactive AI pair programmer with the context of your project built-in to remove the drudgery from coding, making you faster and keeping you in flow.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Announcing Ghostwriter Chat.<br><br>The first conversational AI built right into your IDE, complete with a proactive Debugger.<br><br>Generate, debug, refactor, and understand code faster than ever.<br><br>Available today in Beta. <a href="https://t.co/f9HiUunNb9">pic.twitter.com/f9HiUunNb9</a></p>&mdash; Replit ⠕ (@Replit) <a href="https://twitter.com/Replit/status/1625916916593463296?ref_src=twsrc%5Etfw">February 15, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## What we’re building now

We’re not stopping until we reach the vision of that hacker in Jordan or 1B developers, and maybe not even then. So where do we see the future of software creation going?

**♾️ Infinity Drive**

What do computers need besides compute? More storage. We’re giving developers the power to beef up their Repls with virtually unlimited disk space. Coming in March.

**🤫 SSH**

What if you don’t want to switch editors but you stil want to leverage Replit's cloud environment? We’re building a way to tunnel into your Repl from any local editor. Currently out in Beta.

**🦾 Extensions**

We’re working on a public API and ecosystem of extensions to extend your Repl, like custom file renderers. Currently available as an invite-only Alpha.

**🌐 Hosting**

We're upgrading our hosting product so developers can deploy and host their projects on high-uptime infrastructure in a few clicks. Currently out as an invite-only Alpha.

**🎋 A faster and more powerful Git(Hub) integration.**

We're making version control easier than ever from your editor. Coming very soon.

**🔥 Attach a GPU to your Repl**

This is already out in Beta if you [turn on Explorer mode](https://docs.replit.com/getting-started/faq#how-do-i-turn-on-explorer). We’re working on improvements so we can make it a general release.

## Much more ahead

For now, we celebrate all 20 million developers on Replit. **Thank you**. 

This is just the start. Our mission is to bring the next billion software creators online, and Replit will continue to be the #1 cloud-native platform to build, host, and share software.

If you’d like to be part of this journey, [come work with us](http://replit.com/site/careers).