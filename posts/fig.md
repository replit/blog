---
title: How Fig Shipped an MVP in Two Weeks During YC
author: Brendan Falk
date: 10-6-2020
cover: https://blog.repl.it/images/fig/fig.png
categories: news
---

My name is [Brendan Falk](https://twitter.com/brendanfalk). I am one of the co-founders of [Fig](http://withfig.com?ref=replit) (YC S20). Fig adds visual apps and shortcuts to your Terminal. We make it easy for developers to build visual apps that streamline terminal workflows. We then let developers share apps with their team and the community. Our website gives a good demo.


After going through various pivots in early 2020, we realised that the Terminal was a huge pain point for us. We wondered if we could build a tool that would make our own lives easier. But rather than creating a new terminal, we wanted to attach to our existing Terminal.

In late April, we started exploring whether building a tool like Fig was even technically possible. On the 15th of May we decided to go all in on Fig. Roughly two weeks later, we had a simple MVP in users' hands. 

YCombinator pushes companies to move fast. Repl.it helped us move fast.

![fig terminal screenshot](https://blog.repl.it/images/fig/fig.png)

### Why Did I Personally Use Repl.it

Before I answer this, here is some quick context on me: I am the CEO of Fig. Before starting YC I was somewhat technical. Up until about March this year, I knew HTML/CSS and a tiny bit of JavaScript. I had no idea what a server was. [Here is my first HN post](https://news.ycombinator.com/item?id=21795041) where I ask how to deploy an ML model haha. My co-founder, [Matt](https://twitter.com/mattschrage), did most of the coding. 



I started learning JavaScript in early May 2020. I had always tried to avoid it. I used no-code tools like Bubble.io instead. Because we were starting YC in a month, I decided it was time to get my act together. We could move faster if I could code too.


I don't know how I came across Repl.it. I thought it looked cool so I gave it a go. 


Within a few minutes, almost by accident, I had a server up and running.



![final_replit_node_demo](https://blog.repl.it/images/fig/final_replit_node_demo.gif)


I thought, wow, not only did I just build a server, it's at a live URL that I can share with people. I can update the app and that URL would update instantly too. I liked that it managed the whole devops / deployment side of things. I could just code. Pretty cool.

Naturally, I just kept building in it. As it turned out, Repl.it was just as helpful to our team. 


### Why Did Fig use Repl.it


**Instant Deploys**

Repl.it let us deploy a live production app to our own domain in a click. Fig is a unique tool. You can think of us like a web browser that attaches to your Terminal. We are a CLI tool that launches a desktop app (built natively in Swift, not Electron) which renders lots of mini web apps (as you can see in the git example below). 


We wanted to move quickly. Setting up dev, testing, and staging environments for the app was going to take us longer than we wanted to implement. We have obviously done this now, but at the time, we wanted to move quickly. 


We wanted a solution that we could set up & deploy to easily, built our app quickly, and pushed to our own custom url. AWS/GCP are too clunky to set up. Heroku is quick to set up, but takes 20 seconds per build and this is really annoying. Repl.it, however, ticked all our boxes. I would change a line of code and it would be live in Fig in 3 seconds.



**Git / Version Control**

I know the basics of git, but Repl.it just made it so easy. I connected a new GitHub repo to my Repl.it app. I clicked a button, typed a commit message, then clicked commit and push. Both my co-founder and I were writing better commit message and were committing more often.

In fact, we loved Repl.it's git extension add-on so much, we copied it and turned it into an app on Fig (thanks Amjad haha).


![fig-git-demo](https://blog.repl.it/images/fig/fig-git-demo.gif)



**Multiplayer**

This one is pretty self explanatory... Being able to do pair programming without the hassle of setting it up in VSCode is very very nice. We were very productive with this.



**Free**

Again, pretty obvious. Premium (Hacker) was free for students (we were still in college when we were doing this). I now pay $7/month for this. It's how much Heroku is but you get a full IDE + speed with it. Totally worth it.



### How do I use Repl.it Now Fig Transitioned to Heroku and AWS

We got really far with Repl.it, but we eventually hit some limits and bugs (that has since been fixed). Repl.it's Github integration is limited and we needed to get serious about our git workflow and devops. We decided it was time for us to move from Repl.it to Heroku, AWS, and S3. We now do most of our coding for our main app on VSCode.

Despite this, I still use Repl.it all the time. Whenever I want to test out a new framework or library, I just open up a new repl. I'm also finding my Google searches are yielding more and more posts from the Repl.it's forum. It's a fantastic community.


### Parting Words

It's funny, by recommending Repl.it I realise I am shooting myself in the foot a little bit. Fig's bet is that the local Terminal isn't going away. We don't think it will anytime soon 😉. If you want to be a productive programmer, the Terminal is a tool you should know. But tools like Repl.it are making it very easy to code in the cloud and stay there!


If you have any questions about YC, Fig, Repl.it, or just want to say hey, feel free to email me (I'm very responsive): [brendan@withfig.com](mailto:brendan@withfig.com)

And if you want to sign up for Fig's private beta, mention this blog post in your sign up and we'll get you off the waitlist: [withfig.com](https://withfig.com?ref=replit)