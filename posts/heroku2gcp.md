---
title: Migrating our Web App from Heroku to GCP
author: Matt Iselin
date: 2022-01-11T20:00:00.000Z
categories: eng
cover: https://blog.replit.com/images/heroku_gcp_cover.jpg
---

After many years of running on Heroku, Replit has fully migrated to Google Cloud Platform.

Why leave Heroku in the first place? Heroku served us well, but ultimately we recognized that our mission to bring the next billion software creators online would require an entirely new approach to our infrastructure. Our infrastructure needs to be flexible, and we need to have control across the entire stack - both data and hosting - to make moves to support our mission.

So, what did it take to migrate Replit?

## Step 1: Demo a Prototype
We put together a quick demo of the website running in Google Cloud using a test database (with a fake dataset) to prove the concept would work. In this stage, we also gathered feedback and started to push the boundaries to understand where the problems might lurk later in the project.

We took some time to investigate alternate hosting systems and even clouds. Ultimately, because the rest of Replit's infrastructure is in Google Cloud, it made the most sense to stay with what we know.

## Step 2: Data Migration (Part 1)
The Replit website uses a Postgres database and a handful of Redis caches. Heroku's managed database offerings can serve this use case with deep integration in the platform, but it was time for us to move.

Postgres migration required us to work with Heroku's Data Services team to access the write-ahead-log files for our database. Using a system called [WAL-E](https://github.com/wal-e/wal-e) and access to an S3 bucket provided by Heroku's team, we set up a handful of very powerful GCP VMs running Postgres replicas of our database.

Once we could repeatedly build these replicas in GCP, we tested a handful of failure modes and rehearsed converting these from followers to leaders multiple times. We wrote every step of the process into a repl, so we had a playbook with each step mapped out when we migrated. Any mistake during the migration would extend downtime for our users, so every practice run was crucial to ensure we had the muscle memory to perform the migration.

We used Redis Labs' Google Cloud marketplace product to set up replicas of our Heroku Redis databases and prepare for an active/passive swap there, too. We worked with Redis Labs support to validate our strategy and plan for potential failure modes.

On October 22, we took a 15-minute maintenance window. During this 15-minute window, we brought down the website (to stop all database updates and finalize replication) and then switched everything to the Google Cloud Redis and Postgres databases. When we exited the maintenance window, our website hosted in Heroku was now using databases hosted in Google Cloud.

## Step 3: Data Migration (Part 2)
Now that we had our database running on self-hosted Postgres in Google Cloud, we wanted to move to Google Cloud SQL to offload the Postgres administration to Google.

Immediately after the 15-minute maintenance window on October 22, we began Postgres-native replication from the self-hosted Postgres VMs (`CREATE PUBLICATION ...` on the leader and `CREATE SUBSCRIBER ...` in the Cloud SQL instances) and synchronized the database in full to Cloud SQL.

On October 23, we took another 15-minute maintenance window to bring the site down again. We switched the website to the Cloud SQL databases during this maintenance window.

For the most part, this migration was a seamless experience for our users, but to achieve that, we had to spend weeks rehearsing and exploring the failure modes first. During our rehearsals and tests, we encountered many problems, such as broken database indexes or followers that couldn't synchronize with our new leader. We rebuilt our GCP self-hosted databases numerous times during these rehearsals after we tripped up on a new problem.

## Step 4: Move the Front-end
We use the Cloudflare Load Balancer product to expand our capabilities to direct traffic to our servers. In the future, we will use this to make sure your web requests land on a server that's close to you, and we can use the load balancer to handle fallbacks in case of website outages.

However, the critical feature of the Cloudflare Load Balancer that we utilized for this migration is its controls to redirect requests to backends based on a percentage.

Typically, you might need to update DNS records and wait for the change to propagate to swap front-end servers. If anything goes wrong, you have to change the DNS record back and wait. We can reduce the delay by lowering the TTL of the DNS records in anticipation of the migration, but it is still a 0-100% rollout in a relatively short time window.

We pushed small percentages of production traffic (1-5%) to the new servers to verify them. While we were confident in the system, having spent time testing it (and dogfooding it ourselves), we still wanted to take care as we brought the rest of the world into the environment.

Once those were successful, we went from 5% to 100% Google Cloud - constantly eyeing the pager and our dashboards to make sure everything looked healthy along the way! We kept Heroku in our Cloudflare Load Balancer configuration to quickly bounce back if we discovered a major flaw, as one more safety net in the migration.

## Summary
We migrated our website from Heroku to Google Cloud - a significant project requiring time to plan and practice to succeed. Does this sound like your kind of project? There's more where this came from, and [we're hiring across many roles at Replit](https://replit.com/site/careers)!

In a future Part 2 of this blog post, we'll dig into the extra capabilities we gained from this migration - such as our new deployment system offering vast flexibility beyond a traditional blue/green deployment and performance improvements.