---
title: Announcing File Persistence in Hosted Apps… for Everyone!
author: Luis Héctor Chávez
date: 2022-02-11T19:45:00.000Z
categories: product,eng,infra
cover: https://art.replit.com/images/Multiplayerreplit-4.jpg
---

Replit is your computer — for whatever you need to do. We announced last year that Hackers would be able to have their [hosted apps be able to persist file changes](https://blog.replit.com/replspace-filesystems) since that made it possible to build a lot more apps. But we were not _quite_ satisfied that only Hackers were going to get this new feature.

Today we are announcing that we are opening this up for everyone!

## Why the change?

Back in November, we knew that this new feature was going to have a small, but measurable, impact to our infrastructure. This meant that opening this up for everyone from the get-go was not ideal. We wanted to get this out to users as soon as possible, so we decided to be iterative. We crafted a plan to open this up for Hackers first to observe what a realistic load would look like, while pondering some potential optimizations that we could use to improve it. In addition, we added more monitoring _just in case_ anything came up.

After enabling this and blogging about it, we saw a very small difference between our predictions and reality. The plan had worked! And our hunch about something unexpected appearing was right on the money: the extra monitoring enabled us to find (and fix) an extremely low-probability bug that could only be observed when operating at Replit scale.

With the new data, we could make data-driven decisions. We went through the planned optimizations and the additional load is now in a much better place, so we're comfortable opening this up for everyone.

We're continuing to evolve Replit's platform to make it the most ubiquitous environment that allows people to code anywhere and everywhere at any time. If this is something that drives you, please [consider joining the team](https://replit.com/site/careers)!