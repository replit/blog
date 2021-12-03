---
title: Replit Blocks Adult Content and Malware
author: Lincoln Bergeson
date: 2021-12-02T00:00:00.000Z
cover: https://blog.replit.com/images/Random-artworkbots.png
categories: news
---

At Replit, we have created a general purpose computing environment that anyone can use to run whatever programs they want, and access whatever services they want. You can run almost any type of software in a repl, including [Mac OS](https://replit.com/@UniqueOstrich18/MacOSX), [a Commodore 64 emulator](https://replit.com/@mattiselin/C64?v=1), [DOOM](https://replit.com/@programmeruser/DOOM-1993-nix-version?v=1), or even a web browser.

While this is powerful, it poses a few problems for us. There are some types of programs, like cryptocurrency miners and spam bots, that either use too many resources or damage the community as a whole, and as a result we can't allow them.

This is especially important considering that a substantial portion of users on Replit are teenagers, many of whom use Replit at school or under parental supervision. We want to continue giving everyone computing superpowers, while still finding a way to protect our users from inappropriate content.

That's why, starting this week, we are blocking all internet access to adult content and malware. That means if you run a web browser on Replit, you won't be able to access any objectionable or NSFW websites.

How does it work? We did this by enabling the use of [Cloudflare's family-friendly DNS resolver](https://blog.cloudflare.com/introducing-1-1-1-1-for-families/) by default in all user repls. Visit their website for more information on this resolver and the type of content it blocks.

Using Replit as a proxy to bypass school or parental filters violates our [Terms of Service](https://replit.com/site/terms). We actively shut down repls that do this, with both automated tools and manual intervention.

This also means that schools using Replit are compliant with any legal requirements to filter internet content. Schools that previously blocked `*.repl.co` ([details](https://docs.replit.com/teams/it-administrators-toolkit)) to filter all internet content can now unblock it and allow unrestricted access to all of Replit. All objectionable and NSFW content will be blocked by default.

It's a challenge to run one of the largest providers of free compute in the world, but we believe this is a crucial service to empower the next generation of programmers, and we want to make sure we do it right.