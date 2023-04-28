---
title: A Recap of Replit Developer Day
author: The Replit Team
date: 2023-04-25T12:00:00.000Z
cover: https://blog.replit.com/images/replit-developer-day.png
categories: news
---

![Header Image](https://blog.replit.com/images/replit-developer-day.png)

 _Earlier today, we announced our [series B extension](https://blog.replit.com/b-extension). At our first Developer Day, we announced ways we're delivering against our mission to empower a billion developers._

At [Developer Day](https://youtu.be/7TCqGslll-4), we announced:

1. <a href="#Deployments">Production-grade Deployments straight from your IDE</a>
2. <a href="#workspace">A more powerful Workspace</a>
3. <a href="#extensions">Secure Workspace Extensions</a>
4. <a href="#newmodel">Replit’s From-Scratch Trained Code Complete model</a>

<h3 id="Deployments">Production-grade Deployments Straight from your IDE</h3>

We’ve redesigned deployments from the ground up. Powerful and straight from your IDE to live, deployed, production grade in two clicks. The fastest way to go from idea to production.

![Deployments](https://blog.replit.com/images/hosting1.png)


Today, [Replit Deployments](https://blog.replit.com/deployments-launch) are shared, dedicated virtual machines (VMs). We’re launching on-demand and static hosting options soon. All of this infrastructure is powered by Google Cloud Platform, and its reliability and security. The machines hosting the deployments are isolated VMs. The infrastructure is scalable to millions of users (it's what Replit uses!), and it is language agnostic.

![Deployments-2](https://blog.replit.com/images/hosting-coming-soon.png)

<h3 id="workspace">A more powerful Workspace</h3>

Every Replit project begins in the Workspace. We’ve heard your asks for more power and customization of your development environment, and that limits are annoying. 

So we removed them. 

![Workspace](https://blog.replit.com/images/cpu-ram.png)

Until recently, RAM and CPU constraints limited performance. Over the past few months, we introduced scalable development boosts. Now, your Workspace can be boosted up to 16vCPU and 16GB of RAM, so our customers can build more resource-heavy software, faster.

![Expandable_Storage](https://blog.replit.com/images/expandable-storage.jpeg)


Another limitation, has been the 1 GiB per Repl limit on disk space. With recent technical developments, we are slowly rolling out infrastructure changes that allow customers to scale to 256 GiB and beyond.

These are just a few of the most recent changes. We have also introduced machines with higher uptime, new flexible layouts with tabs and splits, SSH, native history, custom themes, and more.

As a result, our customers are building larger, more complex projects. This has made features like code search and Git more important. 

![Search and Replace video](https://blog.replit.com/images/search-and-replace.mp4)

We’re rolling out a new Search and Replace tool that’s faster than VS Code’s, and we completely redesigned our Git tool to be more reliable and easy to use.

<h3 id="extensions">Secure Workspace Extensions</h3>

We’ve also heard from our developers that they want to extend the Workspace to support more use cases. So today, we’re announcing general availability of our Extensions platform. Replit Extensions creators can now build tools for a user base of over 22.5M developers.

![Extensions Video](https://blog.replit.com/images/extensions.mp4)

Oh, and Replit Extensions has a first-of-its-kind permissioned security model for an IDE extensions system with isolated permissions by tab. 

You can [build powerful and secure Extensions today with the APIs today](https://replit.com/templates/replit-extensions). Replit Extensions can access to the file system, theme, database, and more. Build web apps that run like in the browser. To make that experience more ergonomic, we’re providing a set of React hooks. 

We made a point to make Extensions easy to build and publish. Other IDE extensions and plugins systems are difficult to work with. With Replit Extensions, building, and publishing is as easy and fast as building any other project on Replit.

Existing IDE extensions ecosystems also make it hard for their developers to monetize their work. We’ll introduce a native payment layer to solve this problem. Also coming soon: more powerful APIs like CodeMirror so you can build editor extensions and access to the Replit UI (RUI, our UI component system), so you can build Replit-native-looking UIs that seamlessly blend in.

![Expandable_Storage](https://blog.replit.com/images/ai-partners.png)


Independent creators and partner companies are already actively building extensions on Replit with many more to come. Join them!


<h3 id="newmodel">First Complete Code Model</h3>
Finally, Replit announced that we have trained and will be open-sourcing our first Complete Code model. 

Trained on 525B tokens of code, replit-code-v1-3b is a 2.7B parameter model that knows 20 languages, has very low latency, and performs +40% better than comparable models. The smaller model will have lower latency for a better user experience and will soon power [Ghostwriter](https://replit.com/site/ghostwriter). 

![Benchmarks](https://blog.replit.com/images/benchmark.png)
