---
title: Repl from Repo
author: Amjad Masad
date: 2019-12-10T08:00:00.000Z
categories: product
---

When I think of GitHub I imagine a vast network of people and code; a
superorganism that changed how we make software. When I was getting into
programming, starting a new project was daunting -- you had to imagine and
build everything nearly from scratch. My version of code-sharing was calling my
older cousin who was going to college for CS and getting code dictated to me
over the phone. When the Internet arrived in my home town, it made hacking on new
projects so much more fun. Starting a new project, at least initially, became
about discovery:

- I would walk to the Internet cafe and Yahoo search “vb code online”
- There were a number of pseudo-GitHub sites that hosted Visual Basic projects
- I’d download projects related to what I wanted to build, burn them on a CD and head back home
- I’d run these projects, change & tinker with them, and get inspired on how to build my own

This mirrors the experience of many developers today, except, thanks to GitHub,
they have many more options and a lot smoother UX. However, one thing that has
remained the same: You still have to download projects you discover on GitHub
and figure out how to run them just to start tinkering. While easier than
walking to the Internet cafe, it’s enough friction that many people will give up.

That’s why today we’re making it easier to run repos on Repl.it. Now you can
instantly run code from a GitHub repository without the hassle of configuring a
local development environment. Simply click the import button on Repl.it or
click a `run on repl.it` badge, which will be coming to README files near you.

<div class="video-container" style="text-align: center;margin: 30px 0;"><iframe width="560" height="315" src="https://www.youtube.com/embed/O2fZ_B6juNc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>


<style>
.video-container {
position: relative;
padding-bottom: 56.25%;
padding-top: 30px; height: 0; overflow: hidden;
}

.video-container iframe,
.video-container object,
.video-container embed {
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
}
</style>


### Here’s how it works

After cloning a GitHub repo into a repl we detect the run command, and
if we’re unable to do so we help the user configure a .replit file that includes
the run command information. We then help the user create a Pull Request back to
GitHub so that other users won’t have to search for the run command in the
future.

<div style='position:relative; padding-bottom:calc(80.14% + 44px)'><iframe src='https://gfycat.com/ifr/pleasantbravedotterel?hd=1&speed=2' frameborder='0' scrolling='no' width='100%' height='100%' style='position:absolute;top:0;left:0;' allowfullscreen></iframe></div><p>

<gif>

### How is it possible?

At Repl.it we built multiple layers of abstractions in pursuit of minimum
configuration instant programming environments:

1. [Polygott](https://github.com/replit/polygott): This is our base monster
  docker image that we hope includes most of the native dependencies necessary
  to run most projects (we’re also aiming to make this image swappable with your
  own in the future)

2. [UPM](https://github.com/replit/upm) is our universal package manager that
knows how to install packages in a number of different programming languages we
support.

3. [Window manager](https://repl.it/site/blog/ide): Our novel approach to window
management allows us to reconfigure the IDE on the fly to create any number of
environments: from web apps to command line or even data science environments.

4. [Collaborative Development Protocol
(crosis)](https://github.com/replit/crosis): Makes it possible for us to operate Git
from the browser. It’s as simple as opening an `exec` channel and streaming
`git` commands to the server.

5. Distributed filesystem: A snapshot-based filesystem with atomic writes is
  necessary when dealing with large-scale file changes which happens when
  running `git`.

This is all work in progress and doesn’t give us anywhere near 100% coverage on
all GitHub repos, however, all the essential components are there and it’s a
matter of improving our infrastructure to cover more and more projects that can
be instantly run in the browser.

As much as possible, we're building our infrastructure in the open, and with
participation from our community. If we don't support your favorite language or
runtime, please consider contributing to Polygott and UPM.

### Try it out

This feature was silently earlier this week to our community, and since then we’ve seen a lot
of excitement from both our users and repo authors when they receive a
pull-request. Here are some of our favorites so far. Just go to the repo and
click “run on repl.it” to see it in action.

- [ascii_racer](https://github.com/UpGado/ascii_racer) is a python race game in the terminal; it’s super fun.
- [Minesweeper](https://github.com/unknownblueguy6/MineSweeper) is a Minesweeper in C++
- [ddgr](https://github.com/jarun/ddgr): search DuckDuckGo from your terminal
- [pycraft](https://github.com/itsapi/pycraft): 2D minecraft in Python!
- [legit](https://github.com/frostming/legit): Human-friendly git utility
- [progress-bot](https://github.com/rb28z2/progress-bot): a discord/slack bot to
report your anime progress on the web.
- [water.css](https://github.com/kognise/water.css): a super simple CSS framework.
- [snake-go](https://github.com/tristangoossens/snake-go): a snake implementation
in go.

If you’d like to add it to your repo, simply import a repo and follow the
prompts. I also wrote a quick guide [here](https://repl.it/talk/learn/Configuring-GitHub-repos-to-run-on-Replit-and-contributing-back/23948).

If you have any trouble getting your repo to work, consider [asking a question](https://repl.it/talk/ask) on our
community, or visit the #developers channel on our [Discord
server](https://repl.it/discord).

![github + repl.it](https://repl.art/ghrepl.png)
