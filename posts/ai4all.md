---
title: "Announcing Replit AI for All"
author: Replit AI team
date: 2023-10-09
cover: https://blog.replit.com/images/ai4all/ai4all-header.gif
categories: ai,news
---

![](/images/ai4all/ai4all-header.gif)

For every human endeavor, there inevitably arrives a moment when an innovation profoundly elevates the potential for productivity. For instance, communication was revolutionized by the invention of the printing press, and later, the Internet. After decades of steady progress, software is witnessing its disruption phase as well -- AI is redefining the whole software development lifecycle.

AI is one of the key ingredients to go from idea to software, **fast** -- we witnessed this from over a year of experience in pioneering [Ghostwriter Autocomplete](https://blog.replit.com/ai) and [Chat](https://blog.replit.com/gw-chat-launch).

At Replit, we are on a mission to empower the next billion software creators. Over time, we grew full conviction that such a mission can’t be accomplished without putting our AI features in the hands of every Replit developer.

Today, **we’re making Replit AI available for everyone.** Code completion and code assistance are now enabled by default, and available to 23M developers (and counting). Developers on the free plan will have access to our basic AI features, while Pro users will retain exclusive access to the most powerful AI models and advanced features.

This was no easy feat, and required not only all our expertise in scaling distributed systems, but also training low-latency LLMs to serve Replit’s compute-heavy AI workloads. Emboldened by the strong performance we obtained with training and serving [replit-code-v1-3b](https://huggingface.co/replit/replit-code-v1-3b), today we are also releasing `replit-code-v1.5-3b`.
`replit-code-v1.5-3b` is a state-of-the-art 3B LLM with a code-heavy pretraining mixture, trained on 1T tokens. The dataset includes 30 programming languages and a dev-oriented subset of StackExchange. We will gradually roll out our new code LLM in the next few days, making code completion on the Replit editor even more powerful.

Our roadmap for the near future can be summarized in one sentence: **AI will redefine every single Replit feature**. It won’t be necessary to mention that AI plays a fundamental role every time software is being edited or deployed -- soon we will take it for granted.

As part of this, we are saying goodbye to “Ghostwriter” as the name for our AI features. Replit will become a synonym of AI for software creators -- only then we will have accomplished our mission.
