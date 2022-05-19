---
title: "Repl.it GFX: Native graphics development in the browser"
author: Amjad Masad
date: 2019-03-21T04:02:18.184Z
categories: product
---

At Repl.it we live and breathe making software creation easier. With our
[programming environment](platform), you could start coding in your favorite language in
seconds. With [live deployments](deploy), we made web hosting a breeze. With [Multiplayer](multi),
we've removed the drudgery from coding with friends. And today, we're excited to
bring native GUI applications and game development to the browser.

<video controls webkit-playsinline="true" playsinline="" src="https://repl.it/public/images/blog/gfx.mp4"></video>

Before we go on, you have to see this in action: Just run the repl below, wait a few
seconds for it to load, focus on the output window and start playing Tetris in
Pygame:

<iframe height="600px" width="100%" src="https://repl.it/@demcrepl/Tetris-in-Pygame?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

Let's take it up a notch and boot up this nifty desktop app we all love (might
take up to a minute to load but then can be done recursively):

<iframe height="500px" width="100%" src="https://repl.it/@amasad/chrome?lite=true&outputonly=1" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Why

We believe in the plurality and diversity of developer communities. That's why
we spend countless days, weeks, and months working on features that can work
cross language. We want programmers from all backgrounds, regardless of their
language, to be able to code games and apps with ease. Plus, supporting native
graphics opens us up to a wealth of frameworks, games, and educational material!
We're particularly excited about supporting Pygame and Java Swing.

## Game Jam

We wanted to give you a reason to try out our new GUI capabilities, so we kicked
off our very first [game jam](/jam) on March 18th. It closes on April 18th, so there’s
still plenty of time to show us what you can do. As for the winner? The grand
prize is 1BTC ($4,031 at the time of writing).

<img width="50%" src="https://repl.it/public/images/jam/bling-robot.png" alt="game jame bling robot"/>

## Technology

We like to release early and often. So while this works, and we're proud of what
 we've done, there's still a long way to go. Right now, we're piping the X
 Window system through VNC through WebSockets to your browser, which is not the
 most efficient way to do this — we have a lot of ideas on how we could improve
 it.

To stay true to our [adaptive IDE](/platform) principle — the IDE
should "do the right thing" when you need it — we use [LD_PRELOAD](stderr) to figure out
when an application is trying to open a window and then we start X in the
background and reveal the screen in the environment. This has the effect of
delighting our users:

<blockquote class="twitter-tweet tw-align-center" data-lang="en"><p lang="en" dir="ltr">Awesome! Plotting on <a href="https://t.co/DcPy3gZFUO">https://t.co/DcPy3gZFUO</a> using GR and <a href="https://twitter.com/hashtag/JuliaLang?src=hash&amp;ref_src=twsrc%5Etfw">#JuliaLang</a>. <a href="https://t.co/K4GPBjOZgR">pic.twitter.com/K4GPBjOZgR</a></p>&mdash; Josef Heinen (@josef_heinen) <a href="https://twitter.com/josef_heinen/status/1104288994110644224?ref_src=twsrc%5Etfw">March 9, 2019</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


Finally, depending on how far you are from our data center (US-central) you
might feel a delay, which we're also
working on making better by replicating our data center (watch out [Google
Stadia](https://store.google.com/magazine/stadia)).

Please leave us [feedback](https://repl.it/feedback) so we can improve. Or come [work with
us](/jobs) so we can make it better together.


## Get started

Early reception has been tremendous, and replers have been building amazing
things. Take a look at some of the submissions in our [game jam](/talk/challenge) or
give it a spin yourself:

- [Start with Pygame](/languages/pygame)
- [Start with LOVE2D](/languages/love2d)
- [Start with Java Swing](/languages/java_swing)
- [Start with Python Tkinter](/languages/tkinter)
- [Start with Pyxel](/languages/pyxel)

We're supporting these frameworks out of the box, but very soon, we'll roll this
out to all of our languages. If you're impatient, then you can use our base
image to Install (pkg-install) and run your framework.


Happy game development!
