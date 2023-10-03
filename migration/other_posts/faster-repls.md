---
title: Making Replit Faster for Everyone
author: Matt Iselin
date: 2021-09-01T23:00:00.000Z
categories: infra
---

Replit's mission is to make programming accessible and provide computer superpowers. To achieve that goal, repls need to be _fast_. To that end we've been working on a number of improvements in our infrastructure and code to unlock faster repls.

We constantly analyze the speed of our clusters and identify areas of improvement. Here are a few examples.

### Editing Code Just Got Faster

We split repls woken up by hosting (repl.co, custom domains) to different VMs than repls that you access in the workspace. This makes editing code and interacting with your repl in the workspace faster by ensuring your usage isn't competing with nearly as many other repls.

For repls being actively edited in the workspace, we've seen an average 10-20% improvement in speed from this change. This applies across all subscription types including free users.

### More CPU For Your Repl

We made some adjustments to our infrastructure to improve stability and reduce the likelihood of the machine your repl is on shutting down while you're working on it. At the same time, we tweaked the capacity of our clusters to make sure we have room to expand to the back-to-school rush.

### Faster Chips

We upgraded VMs for subscribers to our Teams and Hacker plans to the newer Cascade Lake family of processors, unlocking an immediate 20% speed improvement.

### Ongoing Improvements

We're always analyzing metrics and running our own repls in each environment - including the free ones! - to try and find problems with slow repls and turn those around. If you're seeing slow repls, reach out to us at contact@replit.com with a repl link and we'll dig into it.