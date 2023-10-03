---
title: Hackers, Pros, and Teams users can now code for hours without restarts
author: Scott Kennedy
cover: https://blog.replit.com/images/google/replit_google_cloud_header.png
categories: eng,infra
profiles: scottatreplit
date: 2023-04-06
---

![Replit x Google](https://blog.replit.com/images/google/replit_google_cloud_header.png)

### Stay Connected

Starting today, all users on Hacker, Pro, or Teams plans will see a 10x reduction in container restarts while coding in the Workspace. Previously, you would experience a restart at least once an hour. Now you can code for multiple hours straight without restarts. Deep work can stay uninterrupted and you can keep programs running longer while you build.

Repls are computers that live in the cloud. One of the most painful experiences with a cloud computer is losing your network link. Sometimes your network flakes out and things need to reconnect. But the worst version is when your Repl restarts. There are lots of reasons why this can happen. In the background, your container has stopped or died, and our infrastructure quickly starts up a new one to put you in. You can simulate this by typing kill 1 in the Shell.

![](https://blog.replit.com/images/regular-vms/reconnect.mp4)

When that happens, your running process stops, all your services restart, and the working memory of your program is lost. It breaks your flow, the most precious feeling when creating software.

Starting today, that’s going to happen much less often for Hacker, Pro, and Teams users. Instead of multiple restarts per hour, you should only see 1-2 per day (typically because we released new code, we’re working on eliminating those ones).

How did we do this? First, a quick explainer on how Cloud VM pricing works.

### Cloud VMs, spot pricing, and preemptions

Underlying your Repl is a Docker container. We have a system managing those containers called [conman](https://blog.replit.com/geo-part-3-deploy). And conman runs on virtual machines (VMs) on Google Cloud Platform.

Replit’s mission is to bring the next billion software creators online. To do that, we give a free computer in the cloud to anybody who wants to learn to code, earn a Bounty, build a viral app, or start a new business. This is a cost management challenge, and one of the ways we handle it is purchasing VMs at the “[spot rate](https://cloud.google.com/compute/docs/instances/spot)”.

Spot rate machines are essentially spare machines that cloud providers have in any given data center. Providers offer large discounts to use these spare machines. But the catch is that sometimes those spare machines are needed by a user who is willing to pay full price. That means where the spare machines are located can change quickly. So if you’re using a spot rate VM, you can be “[preempted](https://cloud.google.com/compute/docs/instances/preemptible)” and kicked out of the machine when somebody comes along to pay full price for it.

It’s kind of like flying standby with an airline. You’ll get a discount, but no promise you’re getting the flight or route you asked for.

We do a lot of work to hide preemptions and move you to a new, available, spot rate machine quickly and seamlessly. But that dreaded reconnect is the price.

### Spending recent cost savings on making Replit better

We’ve been doing a lot of work to enforce limits on the platform more consistently. You’ve seen us set limits on [concurrently running Repls](https://blog.replit.com/repl-status) and [outbound data transfer](https://blog.replit.com/announcing-outbound-data-transfer-limits), which has led to significant cost savings on abusive use. But we also know having limits enforced can be frustrating.

So now, thanks to those savings and deeper partnership with Google Cloud, we can spend more money on the core product experience. We’ve upgraded all Hacker, Pro, and Teams user VMs from spot rate to regular provisioning when coding in the Workspace.

On the Platform Team, we like to play a game called “guess when the change landed”. See if you can figure out when we moved from spot rate to regular machines from this graph of VM preemptions:

![Guess when the change landed](https://blog.replit.com/images/regular-vms/guess.png)

Enjoy your uninterrupted deep work sessions!