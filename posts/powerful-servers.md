---
title: Servers just got 4x more powerful
author: Sidney Kochman
cover: https://blog.repl.it/images/powerful-servers/birdbot.png
date: 2020-12-15T21:25:18Z
categories: infra
---

This week, we’ve rolled out a change for our Hacker plan subscribers: your servers have up to 4x the speed!

As Hackers know, every repl they start gets two vCPUs. This is all great when you’re hacking on your latest idea or getting a start on an assignment for school. But what about your [servers](https://docs.repl.it/repls/http-servers)? Previously, these would have received the default starter plan resources unless you were actively editing them on Replit. But no longer: now, any repl that we start on your behalf has the limits that you pay for, even if you’re not actively logged in to Replit. This means that all of your servers will be able to make use of Hacker plan vCPU and memory resources.

If you’ve been looking for more powerful repls, [upgrade to Hacker today](https://repl.it/site/pricing)!

### How we start servers

The backbone of our repl server infrastructure is a component that we dryly call "proxy." Proxy is responsible for terminating all incoming traffic to servers. This traffic is usually directed to hostnames such as "slug.user.repl.co" but proxy also handles custom names such as blog.repl.it (yes, of course [this blog is a repl](https://repl.it/@util/replit-blog#posts/powerful-servers.md)!).

When proxy receives an HTTP request, it first determines the globally-unique identifier for the repl associated with the hostname. It then determines if the repl is already running in a container in another component of our infrastructure called "conman," which is responsible for running repls in Linux containers.

The case we’re interested in here is when proxy receives a request to a repl that is not running. One of my favorite Replit features is that in this case we’ll do a "wakeup" where the proxy tells our infrastructure to start a container for the requested repl and automatically hits the Run button in that repl. When the proxy does this, however, it has no knowledge of repl owner’s plan, meaning that it cannot determine whether the owner has the Hacker plan, and it cannot tell conman what limits to apply to the repl’s container.

To fix this, we started caching the most-recently-used resource limits that we see for every repl owner inside of conman. Conman is then able to refer to these resources when it receives a request to start a container from proxy. The end result is that if someone has Hacker plan, their servers will also be started with Hacker resources.

If this has caught your eye, take a look at [our jobs repl](https://repl.it/site/jobs) and get in touch with us!