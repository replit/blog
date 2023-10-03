---
title: Internship Experience At Replit
author: Nathan Pham
date: 2023-06-25
cover:
categories: news
profiles: nathan-pham
---

Hey! I'm Nathan. It's been a short but exciting few months at Replit, and I wanted to share my experience with you all.

## The Journey Begins

I started programming back in 2018.

![An empty GitHub activity chart](https://blog.replit.com/images/internship-experience-at-replit/github-chart.png)

Since then, I’ve met fantastic people, learned new stuff, and made a lot of wacky projects. What I did not expect was a technical recruiter to reach out to me through Twitter.

> Hey Nathan,
> ... I'm a technical recruiter at Replit. ... Would you be interested in learning more about the opportunity?

I know. I really can't believe it either.

It goes without saying I am incredibly fortunate to have had this opportunity.


## What did I do
Code Search (or Find & Replace or whatever we end up calling it) was my primary project. Even though I was *supposed* to be working on it, I still stuck my hands in a lot of other places. Honestly, one of the main benefits to working and using Replit was being able to fix something on the spot (hey maybe you should come [apply too](https://replit.com/site/careers)!)

- Repl Resources: display resource usage; had to revisit & polish quite a few times
- Repl Badges: embed custom badges into READMEs (https://replit.com/badge)
- [Jupyter Notebook Viewer](https://github.com/nathan-pham/extension-jupyter-notebook): experimenting with the extension developer workflow
- And lots of polish all over the place (Repl DB, packages, old Git, some RUI components)

Although I’ve touched on a lot of random aspects of Replit’s codebase, the engine (just the front-end mind you) that keeps Replit moving is overwhelmingly large. I still have no idea on how everything works.

## Challenges I Faced

Working 8 hours a day after school is hard. If you're wondering how I managed to balance this, I just did what I could (I worked 4 hrs on some days shhh). Unfortunately, my late hours translated into missing out on a lot of interesting internal events - just trying to catch the Weekly Wins on Fridays was a huge struggle. In some cases I ended up just working from school to save time.

Aside from time management difficulties, working with unfamiliar code and technologies really slowed my development speed. With a weekend project, I’d finish in a day working with technologies I’m comfortable with, pretending not to vomit the worst code in existence and accidentally protecting programmers from Copilot for the next 10 years because my code poisoned the training data. Not at Replit. Projects don't take a day, I'm learning libraries I've never seen before, and code is constantly iterated on and reviewed upon. Prior to this internship, I’ve never written a test (ok slight lie I wrote one test in one library a year ago) or had my code reviewed. Looking back at the number of bugs I’ve had to fix in my own code makes me wonder if any of my previous projects even work at this point.

While those challenges might seem out of my control, that doesn't mean I didn't mess up in spectacular fashion. The peeps in the Discord might have noticed Code Search disappeared for a while - that’s because I sent too much data to Repls and crashed them indefinitely. We quickly disabled the feature. Incident resolved right? Well no, I accidentally re-enabled the feature a few days later because I didn’t know how flags worked.

🫠

I'm really sorry if you were affected by this. I'd hate to ruin your experience with Replit.

## What did I Learn
I was constantly learning throughout the experience. New technologies were everywhere - new libraries for state management, managing editors, internal tools like RUI, Jest for testing, and so on. Just digging through CodeMirror documentation and pouring through existing language code to add Ctrl + / functionality for commenting in the Markdown editor took almost an hour. One of my favorite tools that I learned to use was Graphite, which allows you to stack multiple changes on top of each other without waiting for someone else to review your code.

Beyond the technical details, I also learned how to collaborate asynchronously through meetings, demos, and proposing changes through pull requests. In all honesty, before this internship, my only PRs were to Hacktoberfest “Introduce Yourself” repositories, not contributions to actual features. I quickly found the importance of constructive feedback and iterating over code during the review process. A lot of ideas and (crap) code I wrote down fell apart after a second pair of eyes took a look - and that’s a good thing. Failing fast is what makes Replit great.

I’m grateful for what I’ve learned and excited to apply these skills in the future.

## Thank Yous

I've met a lot of super cool people at Replit, and I'd like to thank everyone (in no particular order) for making this experience a great one.

- @Monkatraz & @masad-frost & @cdmistman for basically starting Code Search
- @Talor-A for helping me work out Git
- @gburtini & @lhchavez: for helping me fix crashing Repls
- @masad-frost: being chill and preventing me from creating crap code
- @sergeichestakov: best mentor I could ask for - reviewed most of my crap code
- @Bookie0: brought me up to speed with writing PRs & important links
- 🧀: for always lurking in my PRs (no one asked why apparently)

## Onward

What am I doing next?

I have no idea.
