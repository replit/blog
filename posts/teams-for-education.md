---
title: Teams for Education
author: Amjad Masad
cover: https://blog.repl.it/images/teams_edu/mention.png
date: 2020-6-30
categories: edu
---

**Edit: As of March 2022, Teams for Education is free for all educators. You can gain access [here](https://replit.com/teams-for-education).*

We started Repl.it to break down what we thought of as needless barriers to start coding. Naturally, our first product was the repl -- a simple editor and console for evaluating code. Turns out that’s all our users needed to learn enough coding to make meaningful programs. From there, Repl.it started to grow incredibly fast among students, developers, and educators. As we watched what our most active users did with the platform, a pattern emerged around coding in the classroom: teachers would prepare a doc or a PDF with instructions and a base repl for their students to fork. Students then would open the PDF side-by-side with the repl and start coding. When finished, they would copy the link and email it back to their teachers. Finally, teachers would block off an afternoon to evaluate and give feedback on their students’ code. The process, while better than using a local IDE and passing around files, seemed tedious and we wanted to solve it -- that’s how [Repl.it Classroom](https://repl.it/classroom) emerged.

Repl.it Classroom digitized and streamlined the workflow teachers already had in the classroom. However, although teachers loved the experience and Classroom began to grow a slight tension emerged: Classroom used a custom environment which was hard to evolve in tandem with the repl environment. Right now repls are so far ahead in terms of IDE and runtime features that it makes more sense to consolidate and build our education platform on top of repls. Especially with the introduction of Multiplayer, we’ve seen teachers use both -- Classroom for small assignments and repls for projects. This works okay but the experience feels disjointed and hard to manage. That’s why today we’re excited to introduce Repl.it Teams, specifically Repl.it Teams for education which is jam-packed with features that will make teaching and collaborating on Repl.it nothing short of a seamless and amazing experience. 

_We believe that by propelling coding out of the old world of IDE setup and emailing code files, Repl.it Teams will be seen as the most significant innovation in CS and programming education._

In this post, we’ll go over what upgrading to Teams for education will get you, some details on pricing, and release timeline and roadmap.

## Multiplayer by default 

Multiplayer is the fastest growing feature on Replit. Teachers and students who already use Google Docs will instantly see how game-changing this is for coding. Especially now, with the rise of distance learning, it’s more important than ever to have a real-time collaboration system. 

Where this gets really interesting with Teams is that repls created in the team are multiplayer by default, which means teachers can “drop-in” into the student repl and see what student(s) are working on and provide direction in real-time. Imagine teachers walking around the class looking at students coding and providing feedback behind their shoulders, but all virtually. We even took it a step further so that teachers have access to their students’ entire codebase and have the ability to run their code or fork it if they need to.

![multiplayer](https://cms.repl.it/assets/typing.gif)

Upgrading to Teams will give you a sense of presence over your classroom and will make collaboration a breeze. 

## Shared folders

Right now in Classroom assignments are a flat list which gives very little in the way of organizing your course into units. With Teams, you’ll be able to create as many folders in your shared Team as you need to. You can also easily create your own private folders and repls and move repls into the shared team folder as needed.

![folders](https://blog.repl.it/images/teams_edu/folders.png)

## Conversations around code

One of the coolest things that Repl.it classrooms introduced to the teacher workflow is the assignment-submission workflow along with the notifications you get when your students submit an assignment. 

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">So glad I made the jump to <a href="https://twitter.com/replit?ref_src=twsrc%5Etfw">@replit</a> for Higher computing. Young folk seem engaged, and I&#39;m getting far too excited every time an assignment notification comes in 😄</p>&mdash; Fraser McKay (@mrmckaycomp) <a href="https://twitter.com/mrmckaycomp/status/1271426729358381057?ref_src=twsrc%5Etfw">June 12, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

We’re looking to go even further with Teams. We want to build a new way to have conversations around code. Comments on code should not be disembodied (like they are in the classroom). They should be contextual, and you should be able to easily mention your student, TA, or collaborator. 

![mentions](https://blog.repl.it/images/teams_edu/mention.png)

This is still in early development, but once it lands, upgrading to Team will give you the ability to give contextual feedback on code. 

## Expanded language support

You may have noticed that Classroom includes only a subset of the [languages](https://repl.it/languages) that we support, and that’s because it takes a lot of effort to integrate a language into a bespoke environment. However, the Repl.it IDE is generic enough that languages are much easier to add. And even if we don’t support your favorite language, you’ll likely be able to get it working on our base bash repl--many of our users have done before. 

Additionally, the repl text editor is based on VSCode’s Monaco which ships a lot of useful editing shortcuts, better syntax highlighting support, and, for some selection of languages, advanced [code intellisense](https://blog.repl.it/intel). 

On top of that, you'll get access to the ever-increasing selection of [starter templates](https://repl.it/templates) -- from frameworks like Rails and Django to personal blogs and bots.

![languages](https://cms.repl.it/assets/templates.png)

In short, upgrading to Repl.it Teams will net you a 2x+ increase in language & template selection and a much smoother editing experience.

## Mobile support

When the pandemic hit and students around the world were forced to stay in and learn from home, we were saddened to hear that many students lost access to desktop computers. Luckily they had access to smartphones, and while mobile support wasn’t the best on Repl.it we worked really hard to improve it. It’s now so easy to code from your phone that you can code and spin up a website all from your phone’s web browser. 

[![mobile](https://blog.repl.it/images/mobile/preview.png)](https://blog.repl.it/mobile)

This is only the start. We’ll continue to invest in mobile coding because making programming more accessible is a core part of our mission. Upgrading to Teams will allow your students to code on the go, and, for those less fortunate who don’t have a computer at home, they will be able to continue learning uninterrupted.

## Native Graphics

As coding moves to the cloud, we risk losing some of what makes programming special. As much as we like web programming, it’s not always the easiest to teach or learn. Graphics and game frameworks like [PyGame](https://repl.it/languages/pygame) or [LOVE2D](https://repl.it/languages/love2d) make making games a joy. That’s why Repl.it not only supports popular game frameworks but also anything that would want to render to native graphics drivers like Python’s [matplotlib](https://docs.repl.it/repls/python-plots).

<video controls webkit-playsinline="true" playsinline="" src="https://repl.it/public/images/blog/gfx.mp4"></video>

Once you upgrade to Teams we bet it would be a lot of fun to build games with your students, teach them plotting, and overall engage in some of the most fun aspects of programming.

## Team profile

It's always cool to show off that you belong to one team or another, that's why you'll get to have a Team Profile complete with an avatar and "pinned" repls. 

![qa](https://blog.repl.it/images/teams_edu/profile.png)

Teachers and students under the team will also get a nice profile icon that shows affiliation with the team!

## GitHub

GitHub being the world’s largest code repository hosting, we made it so that you can bring in any repo, configure it, and run it in under a minute without leaving your browser.

<div class="video-container" style="text-align: center;margin: 30px 0;"><iframe width="560" height="315" src="https://www.youtube.com/embed/O2fZ_B6juNc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

 Not only does Repl.it integrates with Github very well, but we also partnered with the fine folks at GitHub education to make learning to code a breeze with Repl.it + GitHub Classroom. Read more [about it here](https://github.blog/2020-05-26-code-in-the-browser-with-github-classroom/).

![GitHub Integration with Repl.it](images/github-classroom/demo.gif)

In addition to code-hosting, [GitHub Classroom](https://classroom.github.com/) provides auto-grading functionality (similar to Repl.it Classroom) and makes it easy to manage your classroom and assignments.

## The future of Classroom

So now that we’ve walked you through some of the benefits of Teams, let’s talk about what this means for the Classroom product. **First, if you currently depend on the Classroom, don’t worry, we’d never take it away or deprecate before a) giving you ample time to move off, and b) making it easy to upgrade to Teams**. We are, though, building Teams to be a superior experience and a superset of what Classroom currently provides.

If you’re new to Repl.it, or about to introduce it for the first time to your classroom then we suggest you start out with the Teams product, and where it’s lacking -- the biggest thing would be auto-grading and learning management -- supplement it with a combination of [GitHub Classroom](https://classroom.github.com/), or your own LMS like Google Classroom. 

## Teams pricing

It’s our goal to get Repl.it into the hands of every code learner in the world. We really believe there’s not a better tool for teaching or learning to code. 

First, if you currently depend on the Classroom, don’t worry, we’ll never take it away or deprecate it before a) giving you ample time to move off, and b) making it easy to upgrade to Teams. So if you're an existing Repl.it Classroom subscriber (free or paid), this doesn't change anything for you. Any new customers will have to subscribe to teams in order to get access to Classroom.

So that all said, in order to make it easy and so you don’t have to worry about how many students will be in your class from semester to semester, we’ve simplified our pricing for educational institutions with an affordable flat rate. And it's cheaper!

**Pricing tiers***

[Update as of September 29, 2020] We're excited to announce that we've simplified and reduced our Teams pricing to to $35/team/month or $350/team/year (2 months free) with an unlimited number of students. And there are more billing improvements on the roadmap.

## Release timeline

We have a waiting list that we'll slowly start inviting users from starting sometime in July. If you want in then sign-up [here](https://forms.gle/hezg5B8sqWXTEYwc9). If you want priority access then simply tweet this article with the #ReplitTeams hashtag and you'll be one of the first to get invited. 

At Repl.it we were one of the first companies to innovate in the coding education space, and with Teams for Education we're pushing the boundaries again -- learning how to code whether in the physical classroom or at a distance will feel fun and collaborative. We can't wait to get this product out and hear your feedback!