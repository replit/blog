---
title: "Replit Deployments: 3x Faster and Even More Features"
author: "The Replit Team"
cover: https://blog.replit.com/images/deployments-update/header.png
categories: eng,infra
date: 2023-07-31
---

![](https://blog.replit.com/images/deployments-update/header.png)


In April, we released [Replit Deployments](https://replit.com/site/deployments), the fastest way to go from software idea to production. We rebuilt our application hosting infrastructure for production-grade applications thanks to your feedback. In this post, we’ll highlight upgrades, bug fixes, and improvements to Deployments since initial release in April.


## Replit Deployments > Always On
 Replit Deployments is a better and more reliable than our previous hosting option, Always On:
- Your app is hosted on Google Cloud VMs making it more reliable and stable.
- Isolated VM resources for your app will give you improved security and performance.
- Control when you release to users so you can fix your app without breaking production.
- All VM logs are streamed directly to the Deployments pane in the workspace.


##  2-3x Faster Time-to-Deploy since April

A primary metric we’re focused on is total time to deploy. With our improvements, Repls with a large number of packages deploy 2-3x faster.

![Deployments Speed Improvements](https://blog.replit.com/images/deployments-update/deployment-speeds.mp4)


Here are the upgrades that made this possible:
- **Removed limits**: There were [IOps limits](https://cloudcasts.io/article/what-you-need-to-know-about-iops) set that led to performance bottlenecks when preparing your Repl to be deployed. We made builds faster by reducing limits when reading from the disk.
- **Upgraded build machines**: Our machines now have more RAM and CPU.
- **Fixed bugs causing delays in the deployment process**: We squashed dozens of bugs that caused slowdowns in the deployment process. A special thank you to users who brought up many of the bugs in our [ask forum](https://ask.replit.com/).


## Fewer Failed Deployments

Nothing takes you out of the flow like a failed deployment. Deploying your product is the final step in bringing your idea to life, so a failed deployment feels akin to someone tripping you before you cross the finish line for a marathon.

We hate failed deployments and are consistently looking for new ways to ensure it feels like magic every time you hit “deploy”. Everything should just work.

Here are the bugs we’ve squashed since our early release in April:
- **Symlink error during build**: Symlinks were not working as intended and caused some unexpected behavior.
- **Container permissions issue**: Containers were previously not able to access or modify certain files or directories due to incorrectly configured permissions.
- **Snapshot error on deployment restart**: Our systems now properly capture and restore container snapshots if a deployment restarted.
- **Errors that allowed you to deploy a crashing app**: Crash-looping bots we’re occurring if the distance from program start to program crash was greater than 10 seconds.
- **Better support for Cloudflare Proxied DNS**: We now use [HTTP01 challenges](https://cert-manager.io/docs/configuration/acme/http01/) instead of [ALPN01 challenges](https://letsencrypt.org/docs/challenge-types/#:~:text=TLS%2DALPN%2D01,will%20respond%20to%20validation%20requests.) in our authentication process when interacting with [Cloudflare Proxied DNS](https://developers.cloudflare.com/dns/manage-dns-records/reference/proxied-dns-records/) (also known as Orange Cloud). This update ensures seamless integration with Cloudflare and enhances security of the authentication process.


## Making Deployments Seamless

We have built deployments to be an all-in-one product. Building and deploying in the same place makes for a seamless experience. We continue to add and adjust features to make sure you can do it all within Replit.

Here a few improvements we shipped since April:
- **Dynamic header button**: You can now see the stage of your deployment and redeploy in a single click without ever opening the deployments pane.

  ![new deployments button](https://blog.replit.com/images/deployments-update/deployments_button.mp4)

- **Switching deployment logs to NATS**: NATS is a messaging system that allows for lightweight communication between different components of a system. Moving logs to NATS has helped them load significantly faster, as well as supporting live reload.
- **Better logging**: We now surface both application and build logs directly into the primary Deployments pane during the build process so you don’t have to switch between tabs.

  ![Video showcasing logs](https://blog.replit.com/images/deployments-update/better_logs.mp4)

- **X-Forwarded-For Header**: Deployments now support the X-Forwarded-For Header which can be used to track the originating IP address of a client connecting to a web server through a proxy or load balancer. This will help you know where your users are connecting from.
- **Domains Injected as an environment variable**: When a deployment is running within Replit, it can now access the domain name it is associated with through the REPLIT_DOMAINS environment variable. This can be useful for applications that need to be aware of the domain they are serving or responding to.


## Why you should try Deployments


Today, Replit hosts millions of applications and handles tens of billions of monthly requests. Replit is still the best platform to prototype and increasingly our builders are moving towards building real startups on Replit, [many of them powered by AI](ai-on-replit). With that comes the need for a hosting product that can support mission-critical applications. Deployments fill the need extremely well. Always-on doesn’t. We’ve heard the same feedback from you:
- You want separate dev and production environment so your app doesn’t break when you edit your code
- Always-on uptime isn’t good enough to build applications you depend on every day
- Your Repls run on preemptible VMs that can be restarted when demand for machines is high

If you scroll back to the top of this blog, you’ll notice Deployments answer each and every one of these issues. And if Deployments is missing a feature, we likely have it coming down the pipeline as well.

## More features coming soon…

We’ve made tons of improvements to Deployments since April, but we have many more powerful features we’re actively working on. Many of which you should be hearing about very soon. Here’s what you should keep your eyes out for:
- On-Demand hosting for pay-as-you-go pricing
- Autoscaling and load balancing
- Static hosting where you only pay for bandwidth (outbound transfer)
- Cron jobs to run on your schedule
- Custom machine shapes with configurable CPU and RAM
- Deploying to multiple regions to better serve users around the world
- More storage options: MongoDB, Redis, object storage, etc
- SSH to your hosted application’s machine

If you’re looking to get started with Deployments, feel free to watch our tutorial video [here](https://www.youtube.com/watch?v=RPpQNsNhivQ).