---
title: Hosting Apps with Always On
author: Mason Clayton, Connor Brewster, Sidney Kochman
date: 2-9-2021
cover: https://blog-images.util.repl.co/upm_cover_small.png
categories: product
---

Today we're excited to announce that Always On repls are available to all hackers! Anyone with [Hacker plan](https://repl.it/pricing) can choose up to 5 repls and keep them running all the time. With Always On, you can for example spin up and host an app like a Discord bot in 30 seconds:

<iframe width="560" height="315" src="https://www.youtube.com/embed/isYRG5uC5W8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

As a reminder, Replit gives you most of what you need to rapidly build and ship apps in the cloud -- at lightning speed:

- A blazing fast [online IDE](https://repl.it/site/ide)
- Automatic [Package Management](https://docs.repl.it/repls/packages)
- Automatic [hosting](https://repl.it/site/hosting)
- Automatic [SSL/HTTPS](https://docs.repl.it/repls/web-hosting)
- Domain [linking](https://docs.repl.it/repls/web-hosting)
- A simple and fast [Database for persistence](https://docs.repl.it/misc/database)
- A secure way to [store secrets](https://docs.repl.it/repls/secret-keys)


The one missing piece was a reliable way to keep your apps from going to sleep. Always On means we host your code and keep it running even if you close your Replit browser tab.

Prior to Always On, you might have noticed that when your repl is inactive for a little while it automatically goes to sleep. Because Replit wants to give everyone in the world the ability to code and access cloud computing, this has been a super important cost-saving mechanism and vital to the design of our infrastructure (you can read about the technical details [here](https://blog.repl.it/killing-containers-at-scale)). As much as we'd like it to, hosting 100 million repls all the time for free just wouldn't work out. Instead we've invested in getting really fast at starting repls when they're needed and pretending like they were up the whole time. It has served us and our users well, but doesn't work in every use-case. 

<video controls webkit-playsinline="true" playsinline="" src="/images/quickhosting.mp4"></video>

Some repls expect to be running all the time (things like cron or Discord bots), and some apps can't afford to drop some requests as the repl wakes up. As our users built increasingly ambitious apps, the need for a repl to keep running all the time has become apparent. With Always On your repl will function mostly like before, but now it won't stop running when you close the workspace.

Always On repls can be incredibly useful for a variety of programs and unlocks many long-requested features. The most obvious and commonly requested is for web servers to stay up. If you're tired of waiting for your webserver to wake up every time you visit, Always On is a great way to fix that. But Always On isn't just for web repls, regular old repls work too! If you have a cron job you'd like to run on a schedule, Always On makes it super easy. Discord bots, Slack bots, and other chat bots with a persistent outbound connection are another great use for Always On. And if you have a workload that's taking a long time (like say scraping a site), you can Always On the repl and go one with your life.

Of course, it's worth noting a few limitations of Always On 
- Your repl will be occasionally restarted as it is migrated between physical servers.
- Changes your program makes to the filesystem won't persist, so we suggest you use [Replit Database](https://blog.repl.it/database) rather than, for example, writing to text files.

![Database](images/database/database1.gif)

We also want to make it clear that the use of pinging services will continue to work just as before.

Happy coding! If you create something interesting or novel using this technology then make sure to [share it with us](https://repl.it/talk/ask/Share-your-Always-On-repls/120784).

## One more thing

Oh one more thing. right now replit doesn't differentiate between dev and prod apps. We're going to fix that too, and it will be epic. Stay tuned.

<video controls webkit-playsinline="true" playsinline="" src="/images/deployments.mp4"></video>