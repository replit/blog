---
title: "Get Replit Famous"
author: "Søren Rood & Nassim Saboundji"
date: 2022-07-28
cover: https://blog.repl.it/images/following/feed.png
categories: product, eng
profiles: soren,NassimSaboundj1
---

![](https://blog.repl.it/images/following/feed.png)


Replit wouldn't be Replit without our community. Our community is a global group of hackers, learners, educators, and entrepreneurs from all walks of life. It's extremely important to us that they have a space to share their work and collaborate with one another.

Features like [Search](https://blog.replit.com/search), [Profiles](https://blog.replit.com/profile2), and [Publishing](https://blog.replit.com/publishing) were all built with the goal of making the on-platform social experience better.

In the past, if someone you know shared something on Replit, it would get lost in the sea of published Repls. As our community has grown and the number of published Repls has increased, it has become increasingly difficult to discover new content and keep up with the work of your friends. This shouldn't be the case. If one of my friends publishes a cool Repl, I should know about it!

Enter: Following!

Not only can you now follow your friends and other creators on Replit, but their social activity will be broadcasted to the new [“Following feed”](https://replit.com/~) on your Replit homepage.

This feature also gives our top builders a chance to grow their platforms and "get Replit famous".

<img src="https://blog.repl.it/images/following/feed.png" alt="The Following feed" width="100%" style="width:100%"/>

### What shows up on the feed?

You'll now get updates from people you follow, including their latest work, what they like, and the cool people they follow

### How we built it

As you may have already realized, the centerpiece of the following feature is the feed. The work required to build it can be separated into two categories:
  - Building the feed backend with the help of Postgres triggers.
  - Building the feed frontend so that users can have a nice experience viewing content from people they followed.

#### The feed backend

The first step was to create an events table in our database. This table would allow us to track actions and events associated with users (Think following, liking, forking, etc...) and query that data in an efficient manner. 

We initially started with 7 events however not all of them would create events viewable in the feed. In fact, some of these events would cause data to be deleted from the events table. Think  of the case where you publish a Repl and then decide to unpublish it. This would cause your Repl to disappear from your followers view.
  
To pull this off we used PostgreSQL triggers. Mainly of two types.

- A `CREATE` trigger which creates a new event every time a new tracked action is taken.
- An `UPDATE` trigger which updates an existing event every time an action is canceled or modified. For example: deleting, hiding, or un-hiding a comment. 

#### The feed frontend

Once we had a working feed backend we needed to take care of how the content would appear to users. What we noticed immediately was that the following event would flood the feed as it was by far the most performed action. We even had at one point a user who wrote a script to automatically follow as many users as possible.

We solved this problem with with both infrastructure and user experience solutions. Sensible rate-limits prevented any user from dominating the feed, and combining similar events together into expandable cards prevented visual clutter. 

Finally, we directed our focus towards polishing the feed to address user feedback, a notable example being the ability to open repls in context without leaving the home page. 

### What's next
Now that we've given creators the ability to build their social platforms, the next step for us is empowering creators in our community to earn from their awesome creations.

This could be anything from a Replit native app store with apps for sale, to community extensions, to consumer-facing ads. We don't know exactly what the "monetization" avenue looks like, but we're going to be experimenting with it for the remainder of the year.

We'll also keep working on making the core Replit experience [better, faster, and stronger](https://www.youtube.com/watch?v=PsO6ZnUZI0g) while we're at it.. :)

If any of this is interesting to you, feel free to check out our [careers page](https://replit.com/site/careers) or DM me directly on Twitter [here](https://twitter.com/roodsoren).

One last thing for those who have made it this far -- follow us on Replit below!