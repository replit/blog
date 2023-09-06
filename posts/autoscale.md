---
title: "Announcing Autoscale and Static Deployments"
author: The Replit Team
date: 2023-09-06
cover: https://blog.replit.com/images/autoscale-launch/header_new.png
categories: news,product
---

![](/images/autoscale-launch/header_new.png)

Today we are announcing two major new hosting products available to all Hacker and Pro subscribers. Scalable hosting infrastructure solidifies Replit as the fastest place to go from idea to production:
1. **Autoscale Deployments** - Infrastructure that scales up when your app goes viral and scales down when your app goes unused. Only pay for the resources you use.
2. **Static Deployments** - Free option to host client-side sites like blogs and websites. 

Best of all, it's directly from the editor. Deploy to scalable infrastructure directly from the place you build. No additional vendors. Just Replit.

For all Deployments information, visit the [deployments page](https://replit.com/deployments) or the [Replit pricing page](https://replit.com/pricing). If you’d like to learn more about how we built this, check out [our technical blog](http://blog.replit.com/deployments-image-streaming). 

## Autoscale Deployments

Imagine that you wake up, and the project you have been working on goes viral. But just as you are gaining traction, the project crashes. Not enough resources. This is the worst scenario possible. You may purchase a powerful reserved VM, but this may be cost-prohibitive and inefficient.

Autoscale Deployments scale up with demand and scale to zero when there is no traffic, solving both problems. Just build your project, and we will take care of the infrastructure.

![Testing Amjad's blog with 2.5M requests](/images/autoscale-launch/amjad-tweet.png)

To prove it, [we tested the infrastructure by blasting Amjad’s blog with 2.5M requests](https://twitter.com/amasad/status/1695951224997384599?s=20). Autoscale scaled resources to handle the load, and immediately afterward, the infrastructure scaled down. In total, this only cost $0.94!

Even better, if you are a Hacker or Pro subscriber, you can now use Autoscale Deployments for no additional charges. Your subscription just became even more valuable. Each bundle receives an allocation of Autoscale compute units:
* **Hacker:** 3 million compute units
* **Pro:** 6 million compute units

![Autoscale pricing](/images/autoscale-launch/autoscale-pricing.gif)

We created a calculator on [replit.com/pricing](http://replit.com/pricing) to help estimate cost. For the average project, Hacker should cover ~5 projects with no additional charge, and Pro should cover ~10 projects. 

Any usage beyond your bundle will be charged starting at $0.000024/second. For more on pricing and limits, visit the [deployments page](https://replit.com/site/deployments) and the [Replit pricing page](https://replit.com/pricing).

If you'd like to build a project with Autoscale 

## Static Deployments

Static deployments are an extremely fast and reliable way to host HTML sites on Replit. Examples include projects like your very own portfolio website.

As of today, Hacker and Pro bundles include free static sites. Quickly fork and launch your first site today with Static Site Generators like [Hugo](https://replit.com/@replit/Hugo?v=1#README.md), [Svelte](https://replit.com/@replit/Svelte?v=1#README.md), and [Vue.js](https://replit.com/@replit/VueJS?v=1#README.md). 

## Customer spotlight: Camp Lingo scaling on Replit Deployments

> _"Building Camp Lingo on Replit has been a wonderful experience! The speed at which one can go from ideas to deployment is absolutely magical. Quality is constantly maintained through great Replit defaults like separation of production and staging environments, Git, and more. Replit's ease of use and rapid stream of continuous improvements has already put it lightyears ahead of its competitors. " - Hando, Founder of CampLingo_


Replit developers are already experiencing the magic of having everything in one place. [Camp Lingo](https://camplingo.com/) is revolutionizing language learning with LLMs. 

For the Camp Lingo founder, Hando, speed of iteration is critical, and he did not want to waste time setting up his local development environment or searching for another hosting provider. Replit is the only place that he could reliably do the entire end-to-end journey. 

Now, Hando is able to quickly iterate and update Camp Lingo, deploying directly where he builds to reliable and scalable infrastructure.

## Get started with Replit Deployments today

![The full suite of Deployment products](/images/autoscale-launch/deployment-skus.png)

With today’s release of two new products, Replit Deployments now offers three total options:
* **Autoscale Deployments** - Infrastructure that scales up and scales to zero, efficiently using resources based on demand. Best for most projects.
* **Reserved VMs** - Servers that stay on. Best for projects with predictable, steady demand.
* **Static Deployments** - Client-side projects. Great for portfolio sites and blogs.

This makes Replit deployments one of the most flexible, dynamic cloud services offerings on the market. And it's directly from your editor.

Autoscale and Static Deployments are only available to Hacker and Pro subscribers. Reserved VMs can be purchased a la carte. For all deployment information, visit the [deployments page](https://replit.com/deployments) or the [Replit pricing page](https://replit.com/pricing).