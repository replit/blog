---
title: "Expand possibilities on Replit with Expandable Storage"
author: "The Expandable Storage Team"
cover: /images/expandable-storage/es_cover.png
categories: eng, infra
date: 2023-08-08
---

![](https://blog.replit.com/images/expandable-storage/es_cover.png)

We're excited to roll out Expandable Storage, Replit's new storage infrastructure making the 1 GiB per-Repl restrictions a thing of the past.

A couple weeks ago, we announced [the next generation of storage](https://blog.replit.com/replit-storage-the-next-generation) that will allow Repls to reach 256 GiB. This change also included higher account-wide storage limits for everyone:


- Free plan gets 10 GiB
- Hacker plan gets 20 GiB
- Pro plan gets 50 GiB.

For builders who want to go even larger, we’re introducing à la carte storage. With à la carte, builders can scale up to 1 TiB of storage across their Replit account.

In this post we’ll give a quick background on the tech, showcase what you can build with this added capacity, and how to manage your Repls for the best experience.

## Background on back end tech

All Repls use [btrfs](https://en.wikipedia.org/wiki/Btrfs) as their filesystem due to its supported feature of setting quotas (to enforce the 1 GiB per-Repl limit) and that it supported copy-on-write snapshots as the building blocks for storage.

However, whenever a change in any file was made in a Repl, the entire filesystem would need a snapshot to be sent to storage. This was costly, caused latency for users, and made Repls over 1 GiB hard to use (hence, the limit being created).

To move away from persisting disks as snapshots, we introduced Margarine. We've solved this problem by using incremental snapshots, which only capture the changes since the last snapshot. This means that Repls can now be much larger without impacting performance.

If you’d like a deeper dive on the technical aspects of this upgrade, we wrote [a blog post](https://blog.replit.com/replit-storage-the-next-generation) on how the prior snapshot system worked and how it works now with Margarine.

Stay tuned in the coming weeks for more technical deep dives.

## A tebibyte of possibilities

Additional storage capacity has always been one of the most requested Replit features. Every day, we see more and more builders move from prototyping to building real startups on Replit. With this shift, the need to go beyond the 1 GiB Repl storage limit has been stronger than ever.  And with the rise of AI apps, the need is even more evident as they require extra storage for embedded files and large package dependencies.

But how can we be sure Replit is truly built for developing robust startups?  We know because we used Expandable Storage to run our own codebase.

Take a look at Replit running on Replit.

![Replit running on Replit](https://blog.replit.com/images/expandable-storage/replit-on-replit.mp4)

With Expandable Storage, Replit builders no longer have to worry about their project’s codebase hitting 1 GiB. You can now build to your heart’s desire (as long as your heart’s desire remains below 1 TiB).

Check out this bot that has 3.86 GiB of files of programming language textbook PDFs:

![PDF Chatbot running on Replit](https://blog.replit.com/images/expandable-storage/large-storage-chatbot.mp4)

We still wanted to take things up a notch. With the rise of self-hosted LLMs we experimented Llama2-7B running on Replit:

![Llama2-7B running on Replit](https://blog.replit.com/images/expandable-storage/llama2-replit.mp4)

*Note: models like this will run better once GPUs are available on Replit.*

Regardless of the idea you’re working on, Replit is the best place to prototype and scale your ideas until you find product-market fit.

## Increasing Capacity

Anything under your Repls’ “home dir” will count towards your storage limit. In a Repl, that is "~/$REPL_SLUG". In other words, anything that you see in the filetree in the Workspace. Some files may be hidden by default (for example, `.config` and other important folders) so be sure to click on the “**Show hidden files**” option to view everything contributing to storage.

![The  Replit filetree](https://blog.replit.com/images/expandable-storage/filetree.gif)

If you’re a longtime user of Replit, chances are you may have some large, unused Repls taking up storage unnecessarily. To help manage and remove these types of Repls, we recently rolled out a batch management feature. Head to your **My Repls** tab and view your list of Repls. From this page, you can select multiple Repls that are taking up space in your account and hit the delete button to batch-delete them

![Replit batch delete](https://blog.replit.com/images/expandable-storage/batch-delete.mp4)

If you need to recover these Repls, they’ll still be available for 30 days via your [CLUI tool](https://replit.com/~/cli).

![Repl recovery](https://blog.replit.com/images/expandable-storage/repl-recovery.mp4)

You can monitor your storage quota and capacity from within any Repl or from [your account page](https://replit.com/account) in the **Resource Usage** section.

![Repl resources usage](https://blog.replit.com/images/expandable-storage/resource-usage.jpg)

Once you’re ready to upgrade, click on **Upgrade Storage** and select the tier you need.

![Expandable Storage upgrade tiers](https://blog.replit.com/images/expandable-storage/upgrade-storage-tiers.jpg)


## What's next?

Go forth and build bigger! Whether it’s lots of package dependencies or large embedded files, your Repls can now take them all on. Recently, we posted an update on [the state of AI development](https://blog.replit.com/ai-on-replit) on Replit. Over 300,000 distinct projects related to AI were created in Q2 of 2023.

If this many applications were able to get built and started on Replit already, we’re excited to see the expansion of new ideas built with Expandable Storage!

## Work at Replit

Are you interested in Linux and filesystems? What about networking and distributed systems? [Come work with us](https://replit.com/site/careers) to solve challenging problems and enable the next billion software creators online.