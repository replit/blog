---
title: Repl.it Multiplayer
author: Faris & Amjad Masad
date: 2018-12-06T08:00:00.000Z
categories: product
---

Today we're announcing the most-significant evolution of our platform — something we've been building towards for a long time that we're thrilled to share with you.

Introducing *Multiplayer*: code with friends in the same editor, execute
programs in the same interpreter, interact with the same terminal, chat in the
IDE, edit files and share the same system resources, and ship applications from
the same interface! We've redesigned every part of our infrastructure to work in
multiplayer mode -- from the filesystem to the interpreter.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/kO0EJJcuW1k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

This works with all the [languages](/languages) that work on Repl.it. All free
and ready for you to use right now. All you have to do is login, create a repl,
start a Multiplayer session, give a link to your friends, wait for them to join,
and start hacking!

***

We started beta-testing Multiplayer last month. And while we think we're merely
scratching the surface in terms of what can be done with it, a walkthrough of
some of the emergent use-cases will give you an idea of how it works and how you
can use it at your work, school, or for your side-project:

## Help

Last week user [@marc_rosenberg](/@marc_rosenberg) hopped on our Discord server and asked for help
with his Advent of Code work. After a bit of back-and-forth with other
users, they decided to hop on a Multiplayer session. Marc shared a link and off
they went:

![people collaborating in the IDE](/public/images/blog/multi.png)

Four players joined and started helping him with his problem. Not only did they
show him how to solve it, but they also leveraged comments and chat to teach him
how it's done.

The fact that everyone shares the same compute infrastructure means they all see
the same errors and the same output — this is crucial for collaboration and
something that we've found to be lacking from existing IDE's that support
"collaboration".

## Interviews

As part of our interview process at Repl.it ([work with us](/jobs)) we have a phone screen where we hop
on a Multiplayer session with a candidate and work on some coding problems
together. Other people in the company can tune-in as well to give their opinion
or to provide feedback for the interviewer.

The fact that it's shared repl allows the interviewer to write test cases
for the candidate's program to verify its validity. It also allows both of them to see the
results and errors in the terminal.

## Teaching

Repler [@fractalbach](/@fractalbach) wanted to teach his younger sister
programming. Sadly, they were
hundreds of miles apart which made it seem impossible (or at least suboptimal)
to attempt. That is until chris discovered Multiplayer. Now they hop on the
phone and crank open a session and start coding together.

Schools are also starting to explore Multiplayer in an educational setting. Some
teachers split their students into groups to work on projects. This helps
students stay engaged and makes the activity fun. Other teachers use Multiplayer
to cast their coding session out for their students to follow and watch.

## Collaborations


Repl.it users organize a 48-hour code jam every other month. For the last one,
they decided to work on building [databases](codejam-db). But this time they
decided to make it more interesting and form teams to work with each other. This
made the competition a lot more engaging and fun. The results were also quite
impressive.

With Repl.it you can [build and host](/site/docs/repls/web-hosting) web apps,
bots, or websites. Users [@mat1](/@mat1) and [@Boopydoop](/@Boopydoop) worked on
and shipped a discord bot together. They called it
[4bit](https://repl.it/talk/challenge/4bit/8792), and it makes it
possible to play some rad games in discord such as Hangman, Simon Says, and even
UNO!

## Conclusion

Multiplayer opens up whole new levels of creativity in the community and makes it
easier and more fun to teach and learn. Since we started opening up the beta
the [feedback](https://repl.it/feedback/p/multiplayer-feedback-1) has been
rolling in non-stop and we've been very happy with community reception.

Finally, Multiplayer is built on solid infrastructure. We spent a lot of time trying to
make the underlying system resources work in multiplayer mode because we think this feature, in
the future, might transcend our websites and work with other IDEs and on
different platforms. We're excited to explore the opportunities this opens up.

We'll write some more soon about the underlying technology but, for now, go
forth and multiplay!

![multiplayer](/public/images/blog/multiart.png)
