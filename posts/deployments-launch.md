---
title: Replit Deployments - the fastest way from idea → production
author: The Replit Team
cover: https://blog.replit.com/images/deployments-launch/deploy-art.png
categories: eng,infra
date: 2023-04-12
---

![](https://blog.replit.com/images/deployments-launch/deploy-art.png)

After a 5 year Hosting beta, we're ready to Deploy.

### Introducing Replit Deployments

Today we’re releasing [Replit Deployments](https://replit.com/site/deployments), the fastest way to go from idea to production in any language. It’s a ground up rebuild of our application hosting infrastructure. Here’s a list of features we’re releasing today:
* Your hosted VM will rarely restart, keeping your app running and stable. You’re Always On by default. No need to run pingers or pay extra.
* Say goodbye to the “Repl Waking” screen because your VM doesn’t go to sleep.
* Isolated VM resources for your app will give you improved security and performance.
* Control when you release to users so you can fix your app without breaking prod.
* Link your custom domain, or pick a custom subdomain under the .replit.app domain.

Over the coming weeks and months, we’ve got even more features to share with you.

But before we jump into features, let’s look back on the history of Hosting on Replit…

### Hosting on Replit: 5 years in beta

In 2018, Replit enabled the world’s fastest [coding → hosting](https://blog.replit.com/hosting) workflow when we announced the first beta version of Replit Hosting. Replit created a way to run code for any language in the browser. Because of the way Replit is built, it only took sharing a URL to turn it into a hosting platform, too. Over the years, we kept experimenting by adding new features like [Always On](https://blog.replit.com/alwayson), [Boosts](https://blog.replit.com/boosts), [Analytics](https://blog.replit.com/repl-analytics), [a Status Manager](https://blog.replit.com/repl-status), and [PostgreSQL databases](https://blog.replit.com/postgresql-db-launch).

Today, Replit hosts millions of applications and handles tens of billions of monthly requests, so we know you love the ease and simplicity of our hosting.

But we’re not satisfied yet. We want it to be better. And we’ve heard the same from you about legacy Replit Hosting:
* When you edit your code, you don’t want to break your active users
* Our uptime isn’t good enough to build applications you depend on every day
* Your Repls run on [preemptible VMs](https://blog.replit.com/regular-vms) that can be restarted when demand for machines is high
* “Repl Waking” screens when we’re slow to boot your Repl can be frustrating for your users
* Lack of isolation can mean your Discord bot starts getting rate limited unexpectedly

Let’s take a look at how Replit Deployments solves these problems…

### Isolating your production app from development with Deployments

First, we’ve separated your development environment and your production environment. This means you can work on your app without affecting live users. Now you can add features and fix bugs, and only deploy to your users when you’re ready.

**Release** any repl you’re working on into production by running a **Deployment**. You’ll notice a new button in your header:

![Click release](https://blog.replit.com/images/deployments-launch/release-dropdown.png)

Clicking **Deploy your project** will let you pick the size of machine you need.

![Pick your tier](https://blog.replit.com/images/deployments-launch/machine-tier.png)

Select your `.replit.app` domain name, or [attach to your own custom domain](https://docs.replit.com/hosting/deployments/custom-domains) on the Domains tab, and Deploy!

![Pick your sub-domain](https://blog.replit.com/images/deployments-launch/pick-domain.png)

When you’re ready to update the live version, it’s just a single click away with **Redeploy**.

Many Replit templates are already pre-configured for deployment to keep things fast and simple. Advanced users can also:
* Customize the Build command
* Customize the Run command
* Set production-specific secrets values separate from development values

### Debugging your application with logs

Since your development and production environments are now different, you’ll need a way to see what’s happening if something’s not right. You can do that by accessing your Repl’s logs from the Logs tab:

![Logs tab](https://blog.replit.com/images/deployments-launch/view-logs.png)

### Pricing

For small projects like simple web servers and bots, we start as low as $0.20/day per Repl. If you wind up building the next viral generative AI app, you can go up to 4 dedicated CPU and 16 GiB RAM.

Explore all your options at [replit.com/pricing](https://replit.com/pricing).

### Going viral? Scale up to dedicated CPUs.

More and more, we’re seeing startups build their [businesses](http://crear.ai/) [using](https://berri.ai/) [Replit](https://blog.replit.com/fig). When your idea goes from viral sensation to new business, scale up with a simple **Redeploy**.

Our Shared CPU machines are great for apps that get occasional traffic and only need to handle bursts of workload. Shared CPUs are less expensive, but can only fully consume the CPU they are assigned for “bursts” of time based on a [token bucket algorithm](https://en.wikipedia.org/wiki/Token_bucket). They’re great for intermittent traffic where you don’t need to consume a lot of CPU for long periods of time.

When you’re ready to scale up, you’ll want to upgrade to a Dedicated CPU VM. This way you’ll be able to handle steady streams of traffic or chew through large amounts of data with no problem. Want to pin multiple CPUs to 100% all day long? Dedicated CPUs have you covered. We’ve also equipped our Dedicated CPU VMs with 10x more outbound transfer to help you handle increased traffic.

Don’t worry about getting your choice wrong, a new machine type is only a couple of clicks away if you choose to **Manage** your tier.

![Manage your tier](https://blog.replit.com/images/deployments-launch/upgrade.png)

### On the go? Deploy and monitor from the Replit Mobile App.

We’ve all been there. You’re on the go and your on-call pager ringtone goes off. If only you could re-deploy with a quick fix without getting to your primary computer. Not a problem with Replit Hosting. Using the Replit mobile app you can check your logs, fix your code, and re-deploy your application, all from your phone.

### Improved security and isolation

Replit Deployments are built on Google Cloud Platform, so you get [industry leading security features](https://cloud.google.com/security/) like data encryption in transit and at rest. We’ve also kept security in mind for the details of how your application gets deployed:
* When you deploy to a Dedicated VM, you’re getting your own [GCE VM](https://cloud.google.com/compute). This is a more secure boundary than other solutions that rely only on containers.
* All of your resources are kept in a [GCP project](https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy) specific to your user. This adds a resource, permission, and network boundary to keep other users’ code away from yours.
* Your application secrets are stored in [GCP Secret Manager](https://cloud.google.com/secret-manager) to keep them safe from outside users.

### Changes: No more filesystem persistence, Repl Auth coming soon

One consequence of separating development and hosting is that writes to the local filesystem will not persist to the Repl. You can write as normal, but the data will disappear on any following re-deploys and will not show up in your development Repl.

Some users have relied on [this feature](https://blog.replit.com/filesystem-persistence-for-all) in the past to store application data in a local SQLite database, for example. Going forward, you should use remote storage options like [Replit DB](https://docs.replit.com/hosting/databases/replit-database) or [PostgreSQL](https://docs.replit.com/hosting/databases/postgresql-on-replit). We’ll continue to add more storage options based on your feedback. Let us know what you want to see most!

Finally, in this initial launch, we don’t have support for [Repl Auth](https://docs.replit.com/hosting/repl-auth-sidebar). We’ll bring it to Replit Deployments in the next few weeks.

### More features coming soon…

This release is the beginning. We want to hear what you want to see next in hosting and we’ll adjust our roadmap accordingly. Some ideas we’re already playing with:
* On Demand hosting for pay-as-you-go pricing
* Autoscaling and load balancing
* Static hosting where you only pay for bandwidth (outbound transfer)
* Cron jobs to run on your schedule
* Ephemeral deployments that expire when you want
* Hosted Functions for inexpensive request-based pricing
* Custom machine shapes with configurable CPU and RAM
* Larger machines for bigger workloads
* Deploying to multiple regions to better serve users around the world
* More storage options: MongoDB, Redis, object storage, etc
* SSH to your hosted application’s machine

Share your wish list with us on [this post in the Replit Ask forum](https://ask.replit.com/t/introducing-replit-deployments/20856).

---

### FAQ

##### Is the current hosting product (sharing repl.co URLs) being removed?

Legacy Replit Hosting, where application hosting is accomplished by sharing your development environment’s `repl.co` URL, is now in maintenance mode. We will not be adding any new features to Replit Hosting, but applications will continue to run.

Instead, we’ll make Replit Deployments a best in class product. That means adding more features, offering new deployment types, and helping you grow from idea to full fledged business.

##### Is sharing Repls to the Replit community changing?

No. Community sharing will continue to work as it does today. This launch doesn’t impact that. In the future, we’d like to make Deployments the main way to share with the community, but we don’t have those details ready yet.

##### Why isn’t there a free tier for Replit Deployments like there is for Replit Hosting?

We’re still working on how a free tier should be structured for Deployments. We want to make sure:
* You can experiment with lots of small ideas before they take off and need higher levels of resources.
* Sharing to the Replit community remains accessible and exciting.

We’ll have more details to share here soon.

##### What’s happening to repl.co sites?

Nothing is happening to `repl.co` websites today. It’s still possible to share the `repl.co` URL backing your development environment. But we think you’ll have a better experience using the new workflow and explicitly deploying your apps.

##### Are pingers banned from accessing Replit Deployments URLs?

No. Pinger sites like [UpTimeRobot](https://uptimerobot.com/) can be a good way to monitor your app for unexpected crashes. In the past, users also used those sites to keep repls “warm” for smooth wake-ups. That’s no longer necessary with Deployments as the app is always warm and running.

##### Where can I leave feedback?

To give feedback, just respond to [the post on Replit Ask forum](https://ask.replit.com/t/introducing-replit-deployments/20856). We’re eager to hear your feedback on the product and what features you want next.
