---
title: The Internet of Fun
author: Amjad Masad
cover: https://blog.repl.it/images/chat/chatroom.png
date: 2-2-2021
categories: eng
---

Yesterday, I accidentally built a chat app. Surprisingly, it wasn't the first time it happened.

![colored chat screenshot](https://blog.repl.it/images/chat/colors.jpeg)

Before I tell you how Hackernews turned (this blog's) [HTTP logs](https://blog.repl.it/__logs) into chat, let me tell you about how a 12-year old user hacked the first chat app and community space on Replit right into a Python REPL.

In 2018 we didn't know we had such a strong community of tinkerers. We knew people make games with Replit and share it with other people. But we didn't realize we'd already been a Schelling point for young hackers. 

One day, [@pyelias](https://repl.it/@pyelias) created a post on our support forum saying he built a Chatroom and linked to a repl. I thought it would be a simple chatbot or something similar because I hadn't seen internet-based apps on the platform until that point. We had just opened up [internet access](https://blog.repl.it/internet-access) to everyone, but we didn't support web hosting or any advanced features Replit has today. It was a very constrained environment.

When I opened up Pyelias' Chatroom, I saw a vibrant community. It was mindblowing. It was like suddenly discovering the chair you'd been sitting on was made of gold. The community was not only fun, but it was also helpful, wholesome, and inviting.

![chatroom screenshot](https://blog.repl.it/images/chat/chatroom.png)

The way the Chatroom worked: the repl acted as a terminal client. When you run the code, it connected to a remote database and pulled for the latest messages. The entire application logic was on the client. Over the next few days, I saw rapid iteration. It went from a simple Chatroom to something like IRC. It had rooms, private messages, colors, muting, and because it's on top of the Python repl, it also had support for inline code evaluation. 

As the room grew, it naturally had problems with spam and bad actors. So it grew moderation features, filters, etc. Other users started contributing ideas and ways to improve it. It was magnificent and a model for making Replit a magical place for serendipitous computer explorations. 

From there, we grew our community features, and today we have a fantastic [forum](https://repl.it/talk) where people share apps and find other people to work with. In a future post, I'll tell how they built a fully programmable "Stonk" market. 

## Hackernews chats in http logs

In our blog's [repl](https://repl.it/@util/replit-blog#posts/internet-of-fun.md) (where the app is hosted), I was writing something when I saw the HTTP logs in the console accelerate. For some reason, I knew it was hackernews, so I went there and saw [the post](https://news.ycombinator.com/item?id=25991988) on the front page. I commented on it, saying that people can see the log stream by going to https://blog.repl.it/__logs

[andrewxhonson on Hackernews](https://news.ycombinator.com/item?id=25993765) visited the logs and saw an opportunity to chat. Because the blog was logging all the GET requests, you can effectively send "messages" to the logs by going to a path on the website (even if it doesn't exist). So for example, `https://blog.repl.it/hi%20my%20name%20is%20fred` resulted in a `GET hello my name is fred` log message. Now you have a streaming website that anyone can drop messages into -- i.e., a chat room!

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Hackernews found our blog logs and are new chatting in the HTTP requests. <a href="https://t.co/jYgwmMJRDP">https://t.co/jYgwmMJRDP</a> <a href="https://t.co/OkujyM8s3N">pic.twitter.com/OkujyM8s3N</a></p>&mdash; Amjad Masad (@amasad) <a href="https://twitter.com/amasad/status/1356344510465286144?ref_src=twsrc%5Etfw">February 1, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

I tweeted about it, and someone posted it on HN as a separate post, so it started growing. At first, people couldn't tell that Replit logs is a terminal complete with support for ANSI escape codes. I dropped that hint on HN comment, and they were off to the races. 

![colored chat screenshot](https://blog.repl.it/images/chat/colors.jpeg)

However, if you don't send an [ANSI reset](https://en.wikipedia.org/wiki/ANSI_escape_code) after your message, you're styling all the subsequent messages in the stream. I fixed that by adding a reset before each log message. I was coding live, so when I restarted the app, it broke and logged the syntax error to the console, which is actually the chatroom, and my users saw it. Not only do I have users on my accidental chatroom, they're also watching me work live and seeing my embarrassingly sloppy code (incidentally, that's why I love repl-driven coding you see the mistakes you make live and fix them quickly).

![colored chat screenshot](https://blog.repl.it/images/chat/chat_style.png)

Yesterday, I had many meetings (I don't code full-time anymore, sadly) so I had to fix the Chatroom (I mean blog logs lol) incrementally between calls. Naturally, with growth came the bad actors. Someone started posting 10s of thousands of messages and spamming the chat. My first reaction was: "wow it's amazing how resilient this webserver hosted on a single container!" Then I thought about implementing rate-limiting and profanity filters. However, I had a meeting in the next 5 minutes. Instead, I put Cloudflare in front of the blog, and with a couple of firewall rules, the blocking started! 

![colored chat screenshot](https://blog.repl.it/images/chat/blocking.png)

Finally, before the day was over, I noticed that a [handful](https://repl.it/@ConnorBrewster/blog-chat) of [clients](http://repl.chat/) for the chat has emerged, and things thing has a life of their own. 

![cloudflare rate limiting](https://blog.repl.it/images/chat/client.png)

Even as I'm writing this post in the repl, I can see the chat continue. There are now JSON messages and some weird protocol that's going on. Are people building apps on it? I'm sure that will happen before the end of the week. After all, it's a full terminal, and you can make entire UIs on it. 

![json messages](https://blog.repl.it/images/chat/more.jpeg)

I'm writing this story because we want to show the world that computers & the internet are still fun. Hacking, tinkering, and weird experiments continue to happen on platforms like Replit. Because every repl on Replit is a full computer that comes with access to the network, a database, storage, and access to its code, user profiles, and other primitives, it makes it inherently amenable to serendipity and accidental software interactions. 

I invite everyone to [sign up](https://repl.it) and check out our [community](https://repl.it/talk) and see what fun, weird things people are [building](https://repl.it/talk/share). Even if you're not interested in Replit the "online IDE" you might find that Replit, the "weird internet computer" will make you giddy programming (again).