---
title: Destroying Stuck Repls
author: Connor Brewster
---

Outline:
  * What is a stuck repl?
    * Different kinds
    * How often this happened
  * First step is to start tracking it
    * Unable to proxy log entries
    * Tracking unable to proxy errors in prom/grafana
    * Used a repl to scrape the logs and look for repls that have proxy errors over a span of time
    * Aggegrate these stuck repls into buckets of "time stuck"
    * Export these metrics to prometheus
    * Add a nice graph in Grafana
  * Core Invariant of Repl.it
    * Only ever 0-1 container alive for a repl
    * Essential for things like multiplayer to work
    * Really bad things can happen if this invariant is broken
  * Fixing repls that get stuck for hours
  * Fixing stuck repls due to slow container destroys on shutdown
    * Preemptible machines
      * Why?
      * Causes 100-200 repl containers to be destroyed at once
    * Maybe talk about systemd dependencies since docker was shutting at the same time as conman?
    * Docker is slow to kill this many containers
      * `docker destroy` vs `docker kill`
        * Destroy is graceful, gives time for container to shutdown gracefully
        * Kill should be immediate
      * Why isn't kill immediate?
        * Docker probably isn't designed to immediately kill hundreds of containers in a few seconds
        * Custom docker install
        * Lock contention
        * Waiting for cleanup of network interfaces
        * Serial interface of netlink was a bottleneck
      * What can we do about it?
        * Kill the container's pid ourselves
        * Since pid1 is the init process in its namespace, killing that kills all processes in the namespace
  * Where are we now?
    * We track both stuck repls and new session error rates
      * New session error rate comfortably below 0.5%
      * Stuck repl rate is very low, the ones that are stuck are only stuck for ~5 sec

[TODO: Come up with a more inspiring intro?]
You may have heard that we recently squashed a gnarly bug on our platform, but you may be curious about what was causing this issue and how we went about fixing it.

<div style="display: flex; justify-content: center;">
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">One of the worst bugs on our platform SQUASHED.<br><br>SMASHED.<br><br>E R A D I C A T E D<br><br>Ahem... so yeah, it&#39;s just gone now. <a href="https://t.co/4z8djrtDW6">pic.twitter.com/4z8djrtDW6</a></p>&mdash; Repl.it (@replit) <a href="https://twitter.com/replit/status/1318777999789969408?ref_src=twsrc%5Etfw">October 21, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 
</div>

We had heard numerous reports of repls that would get stuck in an endless reconnecting loop. Sometimes the repls would be stuck for a couple minutes, other times they could be stuck in this look for multiple hours. This was no good; especially if you were needing to work on a homework assignment or were excited to work on your side project only to find out you can't connect. This is why we spent some time focusing on stability to make sure you can always access your repls.

When we would get reports of stuck repls, it was difficult to figure out the precise root cause. Sometimes the repls would already be working again by the time we went to diagnose the issue. This was clearly a problem, but the root cause was hard to identify. We needed to take a different approach to tracking down these issues. 

One of the best things to do is to collect more metrics. Since this issue causes infinite reconnect loops, that means connections to the backend evaluation server were failing for some reason. In our effort to improve stability, successful connection rate was the first metric we started tracking. While adding new metrics is great, sometimes it uncovers some unfortunate realities that weren't aparent before. In our case, we discovered that our connection failure rate was around 3% [TODO: Verify this number, finding a graph would be great too] with occasional spikes that could go up to 10% or more.

## Breaking it down

While the failure rate was much disappointingly than we expected, it meant that we had room for improvement. We got right to work and began to break the problem down.

While overall failure rate is a great metric to have, it doesn't really tell us the full story. Is the connection failure happening across all repls? Is it due to a smaller set of repls that are continually having connection errors?

To answer these questions, we needed to drill further into the problem. There's no better place to do this than to dig into the logs of a repl that has failed connection attempts. We have nice indexed logs which allow us to quickly investigate a handful of these repls and look for any patterns.

It became clear that there were 2 different classes of stuck repls:
 * **A** Repls that were stuck for less than 2 minutes
 * **B** Repls that were stuck for an hour or more

Manually reading the logs can only get you so far. With the volume of logs and the number of repls we run, it's difficult to tell how frequent class **A** and **B** stuck repls occur. [TODO: wording is a bit awkward] Our logging solution provides some basic aggregation tools, but it doesn't allow us to look at consecutive errors for a specific repl over time.

At repl.it we love using our own product to build tools to make our jobs easier. It's kind of a super power.

To determine how many stuck repls we have, I dumped some logs into a repl and began writing a script to crunch the numbers and spit out a nice table and graph of stuck repls bucketed by how long they have been stuck.

With this log-crunching repl, we knew that class **A** stuck repls happen **extremely** frequently, but class **B** stuck repls only happen 5-6 times a day.

## Fixing Repls that get stuck for hours

Armed with our new information, I set out to find the root cause of the class **B** stuck repls. Since there are so few of these, going back to the logs is a good place to see what went wrong.

[TODO: Talk about tracking down deadlocks]

While the repl I wrote earlier to crunch the logs messages worked, I still had to manually run the thing every day to get the results for the past 24 hours. This was starting to get old, and I really just wanted the data to show up in our Grafana dashboard in real-time. After talking with my team, Mason (a fellow engineer), recommended turning the repl into a hosted repl which serves metrics that our prometheus instance could scrape. I refactored the repl to make use of [repl.it database](TODO: Link it) and to serve a page for prometheus to scrape. With just a couple hours of work, we now had real-time metrics for stuck repls.

## Fixing repls that get stuck for a couple minutes
Now with class **B** repls fixed, we needed to destroy class **A** stuck-ness.

With all of our new metrics it became clear that conman instances shutting down, which happens frequently, correlated with stuck repls. [TODO: Is it okay to talk about conman? Should we use our internal name for it or a different name for it here?]

[TODO: Not sure if I like the question style or not, maybe it helps with flow]
> What is conman? And why do they shutdown frequently?

To answer that, we need to take a quick detour and talk about how repl.it actually works behind the scenes.

[TODO: Maybe add a simplified chart of our infrastructure]

Let's talk about the most fundamental atom in the repl.it universe: the repl. 

[TODO: What is a repl? What is a repl container?]

[TODO: Talk about the importance of single repl container per repl]

When you open up a repl in your browser you are connected to a repl container which is running on our infrastructure. These are custom docker containers that are packed with all sorts of development tools.


To run these docker containers, we need a host machine. This is where conman comes in; it's name is short for container manager. Since we have so many repls running at any given time, a single conman cannot run all of these docker containers. So we have a group of conman instances which manage all the repl containers.

You might have wondered how repl.it is able to provide free containers to anyone to write arbitrary programs in. We run the majority of our conman instances using Google Cloud's preemptible instances. These are machines that can be taken away from us at any time with 30 seconds notice. The important thing is that these machines have an 80% discounted cost. That's a massive savings if we are able to make our infrastructure resilient to random shutdowns. For the most part, we have done just that.


