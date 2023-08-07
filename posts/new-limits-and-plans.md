---
title: "Why We Changed Our Resource Limits and Plans"
author: "The Replit Team"
cover: https://blog.replit.com/images/resource-limits.png
categories: eng
date: 2023-08-07
---

![](/images/resource-limits.png)

Replit gives users a computer in the cloud so they can code from any device. Our plan from the start has been to be the best place for anyone in the world to bring their idea to life. This is a hugely ambitious goal, one that required nearly a decade of building to realize. Here is our pre-seed pitch deck from 2015 laying out our “master plan”:

![Master plan slide from pitch deck](/images/master-plan.png)

Replit evolved hand-in-hand with the increasing demand for more sophisticated tools from our user base. What started as a tool primarily for learning, then for prototyping and sharing, is now a place where people are building real businesses that depend on Replit being fast, powerful, and reliable.

To meet demand for power, just this year, we added the following:
* [Deployments](https://replit.com/site/deployments) to secure and 99.9% available reserved VMs
* Expandable storage up to 50 GiB in a single Repl
* [Boosts](https://blog.replit.com/new-year-new-replit) for a Repl’s resources up to 16 CPU and 16 GB RAM
* [Ghostwriter AI](https://replit.com/site/ghostwriter) with in-IDE Chat, Code Completion, and debugging
* [PostgreSQL databases](https://blog.replit.com/postgresql-db-launch) available in seconds with a single click
* [Interrupt free coding](https://blog.replit.com/regular-vms) thanks to backing VMs being non-preemptible
* [Faster network traffic](https://blog.replit.com/faster-networking) thanks to Google Cloud’s premium tier networking

## More power for users led to increased operating costs

As we’ve made Replit more and more powerful for users, our cost structure has changed significantly in three ways:

First, a more powerful experience is more expensive to serve. Better machines, premium networking, dynamically resizable filesystems, and professional tier hosting all cost more money to provide. So, increasingly, paid features like the Replit Pro Plan and Deployments will be the best way to experience Replit. Expect us to continue enhancing our paid features as we serve these growing advanced user needs.

Second, our generous free offering attracted abusive users who wanted to mine crypto and harvest bandwidth to steal small profits, a practice affecting every cloud provider. This makes the experience for professional developers worse, and costs time and money we want to spend instead on making the experience better. Historically, abusers also took advantage of generous Always On and Boost allocations in the Hacker plan. Technically, we were offering those at a price below our underlying costs, and it became unsustainable.

Finally, as Replit users started building more advanced apps, they began consuming far more resources than we could support. For years, we were able to prioritize other problems and ignore the lack of bandwidth and storage limits. But now, we have single users unknowingly consuming thousands of dollars of bandwidth a month. As we lift the 1 GiB Repl limit, it will now be possible to consume similar amounts of storage. At the scale of 23 million users, this could quickly lead to Replit having to shut down. To realize our mission of empowering more developers, we need to have a sustainable business. 

So we had to make changes. With the introduction of things like premium networking and session-long persistence, all Replit plans, including the free plan, are more powerful today than they were last year. At the same time we had to start enforcing some of the softer limits in our Terms of Service and make sure the paid plans are priced in a way to better match their underlying cost. To that end we had to reduce the Always On and Boost allocations in our paid plans. But as you’ll see further below we’ll be bundling even more power into the plans. We believe we’re going to end up net net providing a lot more power per dollar paid.

We remain committed to a robust free plan, one that allows students or users who otherwise can’t afford to pay to enter the wonderful world of coding. We also created ways for users to earn a living on the platform so premium features are within reach of anyone who wants to uplevel their programming game. 

## How your feedback is improving Replit

We’ve heard that some of Replit’s biggest fans have been frustrated as we made these changes. Users with hundreds of Repls or many popular projects were more likely to be impacted by our new limits. Others miss having five Always On Repls as part of their plans to show off all their projects. We appreciate the time you’ve taken to give us feedback. It helps us tune the new limits. When we initially rolled out bandwidth limits, working with users helped us adjust the free tier bandwidth limit from 1 GiB/month to 10 GiB/month. We’ll keep listening and evolving.

We already have some plans we can share...

### Even more power 

We’re working to make our power features more accessible and paid plans more valuable. In the coming months:

* Deployments will launch three new modes with more flexible pricing: Static, On Demand, and Cron Jobs.
* Pro and Hacker users will receive On Demand Deployments resources to spend across multiple Repls as part of their monthly subscription.
* Our Postgres database will move to a new, easier-to-access pricing model.
* Improved [package caching](https://blog.replit.com/python-new-template) will save you from expending storage on Python and JavaScript dependencies.
* Users will be able to grow their accounts up to 1 TiB of storage, with individual Repls as large as 256 GiB.

And while we believe the Replit Pro Plan is the best way to experience Replit, we’re still committed to a great experience for all users:
* All Workspace sessions have been upgraded to [non-preemptible VMs](https://blog.replit.com/faster-networking), greatly reducing the number of reconnects. This was previously a paid feature.
* Static hosting on Deployments will be available at no charge.
* On Demand hosting on Deployments will get a competitive free tier

Our mission has not changed. We still want to empower the next  billion software creators. And we still want to offer a free Workspace for anyone in the world to learn to code. Thanks for supporting us while we make Replit even more powerful and ensure we can continue to provide users with cutting edge capabilities.

We’re excited to see what you build as we raise the ceiling on what’s possible in Replit.









