---
title: Announcing Outbound Data Transfer Limits
author: Madison Fitch
cover: https://blog.replit.com/images/outbound-data-transfer/cover.jpg
date: 2023-03-22T14:45:00Z
categories: eng,product
---

Beginning April 7th, Replit will begin enforcing limits on the amount of outbound data that developers can transmit from their Repls to users and external services. Inbound data transfer is free.

![Pricing Table](https://blog.replit.com/images/outbound-data-transfer/pricing-table.png)

You can see how much outbound data transfer you've used on [your account page](https://replit.com/account). The meter resets at UTC midnight at the start of every month, and the base limit depends on your plan. Free tier developers will receive 10 GiB, Hacker developers 50 GiB, and Pro developers 100 GiB. These plan limits are captured on our [pricing page](https://replit.com/site/pricing).

You may purchase additional outbound data transfer using Cycles or another payment method at $0.10/GiB. You will receive an email and on-plaform notification when you are approaching and when you have reached your limit so you can take action and keep your Repls running.

![Usage Widget](https://blog.replit.com/images/outbound-data-transfer/usage-widget.png)

If you run out of outbound data transfer, your Repls' ability to transmit data over the network will be throttled (and eventually disabled) until you top off your balance or until a new month begins.

## Feedback Landed

You may have seen lower plan limits over the past few weeks on the account and pricing pages. We heard your feedback during this soft-launch, and are happy to announce that we've found ways to lower costs and 10x the amount of outbound data offered to our free-tier developers. We want to make sure that you can always do your best work on Replit. The limit for Hackers has increased 5x, and Pros can enjoy 2x the limit at 100 GiB.

## Why Now

Our mission is to bring the next billion software creators online, and we offer free cloud compute to make development accessible to everyone. 

Offering cloud computing means that we fight abuse every day. Terms of Service violations like proxies that circumvent firewalls or rate limits, file streaming services, cryptomining, and brute-force attacks of third-party APIs burn through bandwidth. **This degrades the experience for everyone on the platform**. We can't rely on actioning individuals and need to enforce system-wide limits to increase the quality of our service and cut costs.

We don't want to spend our time fighting abuse. We want to offer a generous free tier so that we can focus on building a more powerful experience for our users. We've just started a closed beta for a new way to deploy your Repls that we can't wait to share with you!

Our Terms of Service specified a lifetime limit of 100 GiB of outbound data transfer per account. This wasn't enforced evenly, and we didn't give developers a way to see how much data they were transmitting in order to self-regulate. Offering developers a fresh start every month makes more sense than a lifetime limit, especially for those who have been building with Replit for years.

We chose the plan limits by looking carefully at how much outbound data transfer developers consume every month on Replit, and weighing this against the cost. More than 99% of our users transmit less data than the free-tier limit each month.

## Optimizing Your Repls

If you're concerned about reaching your monthly data transfer limit, there are steps that you can take to make your Repls more efficient. Interested in increasing your data transfer but don't have the funds? Consider checking out the thousands of dollars worth of open Bounties at https://replit.com/bounties. Your skills are in high demand!

### WebSockets

WebSockets can be deceptive: the payloads are usually small, but they make frequent network requests and can add up for Repls with many users. If you're pinging your users on a schedule, consider decreasing the frequency of these pings, or moving to an event-driven system where users receive information only about things that have changed.

Libraries like `socket.io` allow you to configure the `pingInterval`, which can be decreased to lower the amount of outbound data needed to maintain a WebSocket connection to each of your users.

### Pingers

You may need to decrease the frequency of the ping, or make the payload smaller. This will help conserve outbound data on both the Repl being pinged and the pinger itself. If you're bandwidth constrained but want to keep your Repl awake, Always On might serve you better.

### File-sharing

Repls that serve files are permitted on Replit when you own the rights to the content or have permission from the copyright holder. Repls can work well for serving image and text-based content, but you may want to consider a dedicated solution (like YouTube, Vimeo, or Wisita) for serving video content.

### Proxies

You'll need to delete Repls that serve as proxies that circumvent firewalls or other access control measures. This type of Repl is against our Terms of Service, and we will delete them when discovered. Repeat offenders will be banned.

## Feedback & Concerns

One of the best things about Replit is how much you can do for free. The outbound data transfer limits we're introducing should not get in your way, but if you're unsure how to optimize your Repls, please don't hestiate to reach out in [Replit Ask](https://ask.replit.com/). We're happy to help problem solve and make sure that you're unblocked to do your best work on Replit.