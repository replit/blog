---
title: Changes to Hosting on Replit
author: The Replit Team
date: 2023-09-28
categories: eng, product
---

In April of this year, we released Reserved VM deployments. Then, we shipped Static and Autoscale Deployments. Since then, we’ve noticed even more companies hosting anything from microservices to their entire applications on Replit.

Some of our favorite startups to watch include:

- [HeyDATA](https://blog.replit.com/hey-data-profile)
- [LeapAI](https://tryleap.ai/)
- [LlamaIndex](https://www.llamaindex.ai/)

We built [Deployments](https://blog.replit.com/deployments-updates) because we were unsatisfied with our legacy hosting product, Always On. With Deployments, your applications live in scalable infrastructure built to serve millions of users. In addition to performance enhancements, you'll get improved security and built-in dev/prod environments.

Now that we have a hosting product we’re proud of, we’re beginning the process of deprecating Always On. **Always On will be fully removed from the product on January 1st, 2024. After January 1st, Deployments will be the only way to host applications on Replit.**

But don’t worry, we’re going to do everything we can to make the migration period seamless for you. You’ll have 3 full months to migrate your applications from Always On to Deployments.

**Hacker & Pro customers:**
- You currently have Always On & compute units included in your plans. Hacker has 3 million units and Pro has 6 million.
- Compute units are only consumed during user requests. Using the default configurations, Hacker plan provides 30 hours of request processing time and the Pro plan provides 60 hours.
- To estimate your Autoscale Deployments cost, use the cost estimator on our [pricing page](https://replit.com/pricing). Click “Estimate your cost” under the Autoscale section.
- You can migrate your Always On applications to Deployments using these compute units.

**Cycles Customers:**
- If you were paying for Always On with Cycles, and you weren’t on a plan, we’ll grant you a Pro trial until the end of the year. We want you to get Replit’s best experience.
- With the Pro trial, you’ll have 6 million compute units to try out Autoscale Deployments.
- If you have a bunch of cycles, we’re happy to announce that you can now purchase Hacker & Pro with them. If you already are paying for Hacker or Pro, you can opt to use the cycles as credit towards future plan payments. To use your Cycles for plans, fill out [this form](https://docs.google.com/forms/d/e/1FAIpQLSdYpJaZYFQUamz3RhCfGxKfULjd6ZrO8814uruhj5fz-6y8Ag/viewform?usp=sf_link) and we’ll follow up.

There are some instances where you’ll have to do a bit of refactoring to get your Deployment working. To make this easier, we created a [migration guide](http://docs.replit.com/hosting/deployments/migration-guide) that you can follow

Want to use deployments but don’t want to spend $7/mo for the Hacker plan? We thought about you as well. Starting today, you can now pay for Autoscale & Static Deployment overages without a plan. For most people, this will cost less than 20 cents per month. Also, we now let you configure spending limits so you never have to worry about waking up to an unexpected bill.

**Our plans for repl.co, replit.app, and replit.dev**

On January 1st, 2024, repl.co domains will transition to replit.dev and will only be accessible when someone is in the editor. If you are currently “hosting” anything on repl.co, we strongly recommend that you migrate to Deployments before the new year.

Replit.app will remain our premium domain that autoscale, static, and reserved VM users get.

**Deployment Pricing Tl;DR**
- Static: free up to 10 GiB of outbound transfer (egress).
- Autoscale: compute units are only consumed during user requests. Using the default configurations, Hacker plan provides 30 hours of request processing time and the Pro plan provides 60 hours. Alternatively, you can purchase Autoscale deployments without a plan starting at $0.000024/second. For most people, this will cost less than 20 cents per month.
- Reserved VMs: our cheapest reserved VM starts at $6.20/month (billed daily). Cancel anytime.

Deprecating things is hard. It’s hard for us, and we know it’s hard for you all as well. We want to wrap this up by saying that all of these changes are with your benefit in mind. We built Deployments to make hosting a better experience. If you are unhappy or think we missed something, [please let us know](https://ask.replit.com/t/changes-to-hosting-on-replit/68506). We’re happy to help however we can.

Note: unless you have an active always on Repl, you will not see mentions of it anywhere in the product. It is only available to people who are currently using it.

The Replit Team
