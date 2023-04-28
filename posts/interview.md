---
title: How to Conduct Remote Interviews
author: Amjad Masad
date: 2020-03-20T00:00:00.000Z
cover: https://repl.it/public/images/typing.gif
categories: news
---

Remote interviews can be hard, especially if you’ve never done them before. With the COVID-19 crisis, we’re seeing a lot of teams forced to transition to remote interviewing. Luckily, we’ve done hundreds of remote phone screens, and more recently we’ve been doing what we’re calling “remote onsites.” In this post, we'll describe how we and some of our customers leverage [Repl.it](https://repl.it) [Multiplayer](https://repl.it/site/multiplayer) -- our realtime collaborative development environment -- and other tools to interview candidates remotely.

## The Phone Screen

So much rides on programming interviews. When you're first starting as an interviewee, programming interviews can feel like a performance: you either meet or exceed the bar or you don't. That's much pressure! Teams who interview well do everything they can to put folks at ease so both sides can answer the question: are we excited to work together?

At Repl.it, we want to make programming more accessible, which means making it more social, even casual. We introduced Multiplayer mode so that people can collaboratively work together on the same repl with realtime editing and running, which has been a substantial step-up from screen-sharing. Candidates can start coding in their preferred language in just a few seconds, and we can start writing tests right away in the same file. It often feels more like a collaboration session than an interview, which is an excellent sign.

![interview](images/interviews/tests.gif)

As candidates iterate their way to working code, we get to watch them discover and fix corner cases -- something easily missable in contrived psuedocode interviews. Also, Multiplayer phone screens are great to test hacking and debugging skills. Since Multiplayer works so well for an initial hour-long project, why not use it for the full interview? 

## Remote onsite: Kick-off
After a candidate passes our phone screen, we move to the onsite. Onsites, despite the name, can be conducted remotely. They mimic a full working day at Repl.it. We make sure to let people know what to expect from the day and what aspects of their work we'll judge them on, which goes a long way in making them comfortable enough to shine. 

The first event of the day is an hour-long design session. We start by presenting candidates with a high-level, open-ended prompt. Then we let them drive the design of a system over the hour. At the end, we give them a chance to scope down the project to an MVP they can build in an afternoon, which gives us a good read not only for their design sense but also for their ability to trim a project to its essential components.

![whiteboard](images/interviews/whiteboard.png)

We use a collaborative whiteboard website called [ExcaliDraw](https://excalidraw.com/) and we highly recommend it. 

## Remote onsite: Virtual Lunch
During IRL onsites we take out candidates for lunch, which can be a great opportunity to get to know them, and for them to get to know us. This was important to maintain as we moved to remote onsites. After the design session, we let everyone grab lunch and then hop on a Hangouts session to eat and chat. 

<picture of team on hangouts>

Conversations generally flow naturally, but we also make sure to make time for the candidate to ask us questions.

## Remote onsite: hacking
After lunch, we'll create a Slack room with the candidate which we’ll use to coordinate and keep them company as they hack, answering their questions and checking in to make sure they're on track. Depending on the role and the project, we might have templates on Repl.it for them to fork. Alternatively, one of us can hop into a Multiplayer session with them to get them going. 

![multiplayer](https://repl.it/public/images/typing.gif)

Everyone strikes a different balance between focused coding time and asking questions or sharing their thinking. When you're in the same room, you can sometimes, but not always, tell when someone is stuck and slide over to answer questions. With Multiplayer, you can quickly jump in and help, either by testing thorny functions or trying out corner cases in the console. We've found we get better insight into how someone works over multiplayer than in person because we can explore their work on our own without looking over their shoulder.

## Remote onsite: wrapup
We ask folks to present what they've built to the whole team. It's a great chance to hear them explain their work and also see how they reflect on what they've done. Traditionally, you have to squint to follow their code through a screen-share. And you have to take their word on whether the code runs at all. Multiplayer helps here too -- our team can hop into the Multiplayer session to navigate through the code, explore it, and run it.


## Conclusion

That's how we've been conducting what we lovingly call "remote onsites." It's an evolving process that we tweak after each interview. Look forward to our [Teams product](https://repl.it/pricing) which will have better support for interviews and team templates -- join the [waitlist](https://repl.it/pricing)! If you have advice on running remote interviews, or have a suggestion for how Repl.it could make remote interviewing smoother, please let us know!

Finally, I’ve asked some of our users to share how they use Repl.it for their interview process:

>“Repl.it is the best technical interview experience available: solid collaborative editing plus a real unix system candidates and I can use together if we need it. It’s where I do all my mock interviews. I also use it for teaching and for interviews. Fork from a prepared starting point, make changes in a collaborative environment and use an editor anyone will be comfortable with.” -- [Thomas Ballinger](https://twitter.com/ballingt), Engineer at Observable

>“I think the part of Repl.it that I can speak most to was just how easy it was for us at Lola to port our interview environment over to the platform and get it remote-ready. When we built our technical interview a few months ago, we wanted to design a process that wasn’t just Javascript trivia and puzzles. We wanted to have candidates work with something that resembled a living React application. I thought that it was going to be challenging to run the full development set-up remotely, but a coworker showed me Repl.it and we were able to import the application from Github and run it immediately.” -- [Collin](https://twitter.com/collinmcfresh), Engineer at Lola.com

>“We ask candidate to create an account upfront, send the link during an interview on Skype. And then spend 80% using the shared code editor and 20% as real REPL (compile + run). Works well. Have done several fully remote hires!” -- [Karthick](https://twitter.com/KarthickGururaj), Vayavya Labs.
