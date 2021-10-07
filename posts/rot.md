---
title: Don't Let Your Development Environment Rot
author: Amjad Masad
date: 2018-06-04T07:00:00.000Z
categories: eng
---

Most systems -- both natural and artificial -- decay, rot, and eventually
die. Software is no different. A lot has been written about fighting
["software rot"](https://en.wikipedia.org/wiki/Software_rot) but there's another
type of rot related to software that's not talked about much -- the development
environment rot.

When starting a new project, you make decisions like what language to
use, and which platform/runtime to run on, all of which dictates what your development environment will look like. Then
you'll also make explicit choices for the development environment, like how will it
run on in development mode, will it run in a Virtual Machine? Maybe on containers? How will the
environment be bootstrapped? Also, what does the developer work-flow look like?
What test framework and runner to use? How do you package your software? etc.,
etc.

As you develop your software and the months and years go by, slowly but surely, you'll add more components to your system, you'll have a lot
more code to test, and the overall complexity of the system increases. Now, we know that if you
want to fight code complexity, you refactor your code, but how do you detect and
what do you do about development environment complexity?

What makes this a tricky question to answer is that the pain is not so apparent
to existing developers. Like in the [boiling frog
fable](https://en.wikipedia.org/wiki/Boiling_frog), the frog doesn't notice the
temperature increase until it's too late. Similarly, developers don't see the complexity creep
until it's far too complicated that it requires you to stop making progress on your
product to stop and fix the development environment rot.

So how do we keep the development environment rot in check? A few ways:

## Keep an eye on the developer on-boarding experience

If you're growing your team and you have a costly on-boarding experience that
spans hours to days before the developer can get the project running locally,
then depending on how much you're growing, this will be costly to both the new
developer and existing developers that have to help them navigate the complexity.

I remember when I joined Yahoo! back in 2011, it took me days before I could
contribute anything meaningful. It was boring and felt like
I was burdensome on my colleagues for constantly asking for help. Conversely, when I joined
Facebook I was able to get a patch in on my first day! Facebook had an internal
Web IDE (kind of like Repl.it) that was pre-setup so you can start coding right
away.

Even if you're not growing your team, I find that the new developer experience is
a good proxy for the complexity and overall health of your development
environment. So pay close attention to that, and keep it under an hour if possible.

The Repl.it development environment leverages containers so we can add a
new employee or contractor in 15 minutes!


## Keep close tabs on your end-to-end development work-flow

Imagine that you have a straightforward change to make to the code-base, say fixing a
typo. What's the end-to-end work-flow look like?

Measure how long it takes for a developer to check out a new branch, code their change, run the
tests locally, submit a patch, run the continuous integration (CI) tests, and finally
merge it into the master branch. In my opinion, you'd want to have this be under 10 minutes.


Most likely, the most time-consuming thing here will be the CI tests. But there are ways to make CI run
faster. For example, make sure your tests run in parallel and that you're
only running tests related to the current patch.

## A culture of automation

Building an engineering culture that pays close attention to productivity is
a tricky thing to do. You can screw up and find yourself in a place where
more time is lost trying to automate tasks than making progress on your product
or business.

<img src="https://imgs.xkcd.com/comics/automation.png" />

However, if you do it right, this can be a boon to your productivity. At Repl.it
we're a small team, and we're taking on an ambitious mission to make programming more
accessible (if we're successful this blogpost will be obsolete) so we care
a lot about striking the right balance on automation.

To make sure you're not automating the wrong things, make sure to let it hurt
first. Only do it when something is causing a lot of bugs or it's so obviously
painful for developers to work with.

## Conclusion

This post talked about development environment rot from a team's
perspective. But there's a different kind of development environment rot that
happens in the developer's personal toolchain that will cause you to slowly be
less productive. I hope to talk about this in future posts.

At Repl.it, we're imagining a world where this kind of accidental complexity
disappears altogether. Read our [post](platform) on how we're approaching this.

Consider following us on [twitter](https://twitter.com/replit) :)