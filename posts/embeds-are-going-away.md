---
title: Embedding an Editable Repl is Going Away
author: David Morgan
date: 2022-06-21
categories: edu, news
---

We've started the process of deprecating editable embedded Repls, these will become read-only from August 1st. You might be wondering why?

![](images/spongebob-bye-bye.gif)

## Abuse of Repls is Problematic
[This blog post](https://blog.replit.com/anon) from 2020 explains the situation well, when you run a Repl from within an embed it is essentially being used anonymously and can therefore have a massive burden on your experience by swamping our servers with abuse. Not having the option to have editable embeds means that we avoid this problem altogether.

## Clickjacking is a Thing
[There's a security risk](https://www.imperva.com/learn/application-security/clickjacking/) when enabling this feature that might let unscrupulous users to force you to download or interact with malicious code. Clearly we don't want that for our community!

## Maintenance > Use
The actual number of our community that are actively using live embeds is astonishingly small, so much so that amount of time taken to maintain this feature is enormously disproportionate to the number of users it involves. If we're not actively having to maintain it then we can direct those resource to better and more exciting features.

For those of our community who *do* use this feature, we see you! Read on for how you can keep using Replit in your classroom.

# It's not all bad
After August 1st any embeds you already have *will still work* but it'll be in read-only mode; you can still read and run the code, but you'll be unable to edit them going forward.

# I'm an Educator, this is going to change things…
If you've been embedding Repls in your VLEs or websites for students to access then now's the time to jump into [Replit Teams for Education](https://replit.com/site/teams-for-education), this is a fully featured product for coordinating, grading and feeding-back on any kind of programming assignment. Recently, we even made it [free](https://blog.replit.com/teamsforedu_free)! Give it a go, it's a much more cohesive and manageable platform to teach with than manually embedding Repls!

We've even got some [training for you](https://www.youtube.com/watch?v=0AOKRBMIiRg) if you'd like!