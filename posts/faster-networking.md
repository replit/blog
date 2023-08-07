---
title: "Fewer Restarts and Faster Networking for All"
author: "Scott Kennedy"
cover: https://blog.replit.com/images/faster-networking.png
categories: eng
date: 2023-08-04
---

![](/images/faster-networking.png)

## Stay connected

A few months ago, [we shared](https://blog.replit.com/regular-vms) that we upgraded some of the virtual machines (VMs) that back Repls. This meant that Hacker, Pro, and Teams users were 10x less likely to have to reconnect and lose the running state of their program because the backing container restarted.

We know that the reconnect can be painful and interrupt your state of flow.

![VMs reconnect](/images/regular-vms/reconnect.mp4)

We are now expanding this upgrade to 100% of users. Even if you’re on our free tier, you’ll get to experience longer, uninterrupted, deep work sessions.

How can we afford this? A big enabler was Margarine, our next-generation [storage system](https://blog.replit.com/replit-storage-the-next-generation). The VMs that run your Repls no longer require local SSDs to be attached. This creates two cost savings that afford us the upgrade:
1. We get to reclaim the overhead cost of poorly utilized local SSDs on every VM.
2. We get to access cheaper “diskless” families of VMs, meaning we pay less for the same level of VM performance.
   
We’ve been looking forward to this upgrade for some time, and think you’re going to feel the difference.

## Connect faster

All network connections to Repls now run on Google Cloud’s [Premium Tier of network service](https://cloud.google.com/network-tiers/docs/overview). This applies to both your experience coding in the Workspace, as well as running your Deployments.

According to some [independent analyses](https://medium.com/google-cloud/gcps-standard-tier-networking-performance-c66350cf4763), the Premium tier of networking is 40%+ faster than Standard. We’ve observed similar results in our own experiments.

Why the advantage? Google has spent decades building up their own cabling and network infrastructure. Premium tier uses this network to connect you to your Repl. The Standard tier, by contrast, routes traffic using the public internet. This typically means more distance for your bytes to travel. Many cloud providers simply use the public internet for routing.

![Map of Google's cable routing](/images/google-routing.jpeg)

So why doesn’t everybody do this? Cost. The list price for Premium tier networking is at least 2x the price of Standard tier.

Thanks to our deeper partnership with Google, and our new worst-case cost controls for outbound transfer per user, we can make every user connection to Repls faster.

And as a reminder, we now run our Repl infrastructure on [multiple continents](https://blog.replit.com/geo-part-3-deploy). If you’re closer to Mumbai, India than the Continental US, make sure to switch the continent in your Account Settings to connect even faster.

![Selecting a different continent in account settings](/images/India%20Part%202/Continent%20Selector.mp4)

Enjoy your more reliable, faster connections! Back to building…








