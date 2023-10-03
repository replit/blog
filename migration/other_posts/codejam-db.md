---
title: Databases Built by Students
author: Nathan Zilora
date: 2018-09-24T11:11:40.000Z
categories: events
---

In case you weren't aware, the [repl.it discord server](https://discord.gg/XadDsju) recently had a code jam, with the objective being to **make a database**. Over 14 people finished and submitted a design for the jam. However this jam was a bit different compared to our first and second jams. First of all, we have groups of 2, instead of individual people. This could be viewed and a boon or a bane, but we'll go over that in more detail later. The second set differences were the bonus points. In the past, we've always graded on code quality, efficiency, and creativity.

* **Code Quality**: 10 points
* **Efficiency**: 10 points
* **Creativity**: 10 points
* ***BONUS POINTS:***
* *Logging*: 5 points
* *Unittest*: 5 points
* *Documentation*: 5 points

As you can see, we added 3 more, which we'll also go into more detail later.

## What is a code jam?  

A code jam is a competition between programmers, to create a project based on the criteria, confined to a time limit. In this jam's case, it lasted 48 hours. At first we had them for 24 hours, however after listening to criticism from the community, it became clear more time was necessary. Usually, there will be an example made by the administration team to use as reference. In addition, we include prizes, which mainly include adding an emoji of your choice to the discord server (Which reminds me, I need to ask the winners what they'd like).

## What were the results?

Without further delay, here are this code jam's top 3 winners. (I apologize beforehand, I will be using the discord and repl.it names of these people interchangeably)

- elias & HappyFakeBoulder: This was a pretty great project, and not having logging or unit-tests cost it dearly. The code quality was pretty good, they just needed some comments and doc strings to explain the code. The efficiency was also pretty good, however I feel like there was room for improvement. The project was quite creative, yet it felt like the [attrs](https://www.attrs.org/en/stable/) library turned into a DB. There was no logging or unit-tests sadly, however it did have docs, just no comments. They came in 3rd place with a score of 28 / 45, which you can find [here](https://repl.it/@21natzil/Jam3-elias-and-HappyFakeBuilder).
- JSer & Moopy: This was a pretty amazing project, and I could see it being used in real life applications. The code quality was great, they only needed a few comments to make things more clear. I couldn't tell them how to make it more efficient, it works like a charm. I liked the way they stored information, using urlencodings and what not, however there wasn't that much more. They could have easily gotten the 10 points if they just added 1 more feature that made it stand out. They did logging really well, they just needed levels. No unit-testing sadly, however the documentation was great, just needed more comments. They came in 2nd place with a score of 35 / 45, which you can find [here](https://repl.it/@21natzil/JSDB-JSer-and-Moopy).
- Scoder12 & sdk345: Congrats to our winners! They finished with a score of *44* / 45! This project blew me away. The amount of work these people put into it was amazing. First, they created a database, which stores itself as *images*. And as if that weren't enough, they created a way to encrypt the database, and then make a website so you could create and load databases with ease. My only complaint was that they should have put the templates in files and loaded them, not have them in the .py files themselves. As I've said before, they got 1st place with a score 44 / 45, which you can find [here](https://repl.it/@21natzil/Discord-Code-Jam-3-Scoder12-and-ItaySharon).

## What we can learn from this

First of all, how did the jam go overall? I think the jam was a large success. People were able to receive great feedback, and learn about logging, unit-testing, and documentation. One of the large issues we had in the jam was finding people partners to code with. Some people already knew others on the server, and were able to create partners with ease. Other people had issues, and weren't able to compete due to it. The reason we decided to do then jam this way, is to create cooperative skills. Most students program by themselves, and getting the chance to work together is very rare. And these skills are important, because working with others is used all the time in jobs, or even contributing to open source projects. Some issues people had while working on the project were logging and unit testing. Logging is actually fairly self explanatory, and python has the [logging](https://docs.python.org/3/library/logging.html) library pre-installed. I think that lack of logging was really due to lack of motivation, because people didn't realize how much those points were worth. Unit-testing is a bit harder, and I can see where people might have had issues with it. Once again, going to back to python, it has a great [unittest](https://docs.python.org/3/library/unittest.html) library. Logging is important because it allows developers to identify where a program is breaking quickly, which is great when trying to minimize downtime. Unit-testing can be seen in large projects, to confirm that when a developer is about to release a patch, it doesn't break something unexpectedly.

### Who am I, the person that wrote this article.

My name is Nathan Zilora, I'm moderator for the repl.it discord server, and repl talk. I've been a part of repl.it for a long time now, and will hopefully oversee it's expansion. I helped organize this code jam, and coordinate its objectives and grading, alongside some help from the other moderators in the repl.it team. You can find my profile [here](https://repl.it/@21natzil), with all the cool stuff I've worked on over the years. I hoped you enjoyed the jam, or will continue to participate in future events!
