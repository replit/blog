---
title: Kaboom Draw
author: tga
date: 2022-02-28
cover: https://blog.repl.it/images/kaboomdraw/solar.gif
categories: product
---

Programming is hard, especially for beginners where the code <-> output feedback loop is cumbersome. People need to click run button, see output, change code, click run again see output. There are a lot of ideas that greatly improved this experience like live-reloading (a lot in the audio / visual context, and UI dev). However the most exciting idea I've seen is still the experiments done by Bret Victor, like in [Learnable Programming](http://worrydream.com/LearnableProgramming/). Seeing his experiements on combining live reload + sensible controls still takes my breath every time.

You might know we're on the way of adopting Codemirror 6 to replace Monaco for a more extensible and maintainable editor (shoutout to [Sergei](https://twitter.com/SergeiChestakov) for carrying us through this hard time!). One day I saw [Faris](https://twitter.com/masadfrost) made a [css color picker](https://github.com/replit/Codemirror-CSS-color-picker) codemirror 6 extension and it got me thinking, hmm CM6's extension system is really handy, what if we make some more sensible controls over all kinds of values, and make something like the Bret Victor experiments?

Excited by the idea, I decided to do shove off some non-urgent tasks and do a little hack week on my own to jam out these thoughts. But first, gotta book a slot on the demo calendar:

![demo](https://blog.repl.it/images/kaboomdraw/barron.png)

excited to excite [Barron](https://twitter.com/WarronBebster)

First, I made a codemirror6 extension that lets you use mouse clicking / dragging to interact with arbitury values

![cm-interact](https://blog.repl.it/images/kaboomdraw/cm-interact.gif)

(it's now open sourced at [replit/codemirror-interact](https://github.com/replit/codemirror-interact), the github repo contains usage example and source code)

Obviously we need to hook this up to something that can provide live visual feedback, and it's natural to think of our in-house game ibrary [Kaboom](https://kaboomjs.com/), which actually has some decent drawing capabilities and has an interface similar to love2d or p5.js where you call `drawXXX()` functions every frame (which the internal components like `sprite()` or `rect()` are built on top of). We can create a template where we evaluate users's code inside a `onDraw()` event which runs every frame, and since user code are re-evaluated every frame we basically get free no latency live reload! (check out [@replt/Kaboom-Draw#main.ts](https://replit.com/@replit/Kaboom-Draw#main.ts) for the inner workings)

Putting these 2 together, we got some magical effects.

Hold `alt` and drag horizontally to change numbers

![num](https://blog.repl.it/images/kaboomdraw/num.gif)

Hold `alt` and drag `vec2(x, y)` and the mouse movement will be directly mapped to object displacement

![vec2](https://blog.repl.it/images/kaboomdraw/vec2.gif)

Hold `alt` and click on a `rgb(r, g, b)` color to use a color picker

![color](https://blog.repl.it/images/kaboomdraw/color.gif)

and some other handy helper features like a snippet bar for easily create shapes

![shapes](https://blog.repl.it/images/kaboomdraw/shapes.gif)

easily use images by dragging them inline

![sprite](https://blog.repl.it/images/kaboomdraw/sprite.gif)

Here's a video that demonstrates live coding an animated drawing:

<video controls webkit-playsinline="true" playsinline="" src="https://blog.repl.it/images/kaboomdraw/drawing.mp4"></video>

Noticed how it uses `time()` and `wave()` to create animation? This video also contains an unreleased feature which is edit the image directly inline which I definitely hope to bring out in the future.

It makes it very easy to observe emergent effects. Here's another video demonstrating making a solar system (part of it, the code is in the template below)

<video controls webkit-playsinline="true" playsinline="" src="https://blog.repl.it/images/kaboomdraw/solar.mp4"></video>

And here's a montage of the examples in the template where you can learn / tweak around (I'm not a creative technologist these are the best I can do)

![demo](https://blog.repl.it/images/kaboomdraw/demo.gif)

Click [here](https://replit.com/@replit/Kaboom-Draw) to create a Kaboom Draw repl now and make some fun images, animations and generative art! And don't forget to publish it so we can all see your cool stuff.

![cta](https://blog.repl.it/images/kaboomdraw/cta.png)

And of course these aren't totally exclusive to kaboom, try hack the template and make it work for other types of projects, like p5.js! Or even something audio related, lots of possibilities. 