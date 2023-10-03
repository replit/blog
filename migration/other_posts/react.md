---
title: Repl.it ❤️  React
author: Amjad Masad
date: 2018-06-07T07:00:00.000Z
categories: product
---

Despite the [negative press
covfefe](https://twitter.com/cowboy/status/339858717451362304) around [React.js](https://reactjs.org/)
when it first came out, I instantly fell
in love with it. The thing I liked the most about it was the component model. Until then
the JavaScript community has been trying for years to come up with the correct
abstraction for creating reusable modules, but it was always leaky. Because React
components are essentially functions, and because functions are the undisputed
champion of reusable code, it worked out extraordinarily well. You don't need
dependency-injection, or any other modularity hacks, you simply pass props! Also,
the virtual dom made it so that components are, by default,
protected from other components prying into their internals.

That's just one aspect of what made me love React and it was a significant factor in me
applying to work for Facebook in 2013. After I got in, I worked tirelessly to join
the team behind React.js, and in early 2014 I was able to do so, and
my first task was to build the React Native packager and CLI.

When we launched React Native in 2015, you
could just run a single command, and you'd have the entire development environment
setup. Developers were so thrilled with this, that some [tweeted](https://twitter.com/cendekiapp/status/581195653331685377) out
the command. I learned that when you make things easier, you get a lot more people
through the door.

So when [Haya](https://repl.it/@hayaodeh) and I started Repl.it we wanted to
go further than zero-config quick-starts and build a platform where you can code in any [language](/languages), any
framework, from anywhere. We initialy focused on education because we thought
that teachers and students are underserved by the tech community. However, now
that we're in 15% of US schools and growing worldwide, our technology has
tranceded the education use-case, and we have an growing community of developers
using Repl.it to build and deploy apps.

Much of our work is supported by innovations from the
React community (our apps are built with React, our [IDE](ide) plugin system is
inspired by Redux, etc.) so now we want to leverage our
platform to give back to the community. We want to build easy and
accessible tools for you to use. You can use it for developing apps, to debug
libraries, or for prototyping. Furthermore, we want help spread the React technology
by making it easier for outsiders and underserved communities to learn and
participate in the larger developer ecosystem.

Today we're excited to announce that you can try, build, and deploy fullstack
React apps starting with a few of our favorite React frameworks. Before I go on,
just want to note that this is a public beta release (it literary came out
today) and we'll be iterating heavily on it for the next couple of months and we rely on your [feedback](/feedback) to make it better.

### Next.js

Since this blog is a Next app it'd be a good place to start. [Next.js](https://nextjs.org/) is a
lightweight, zero-config, universally rendered React framework, complete with Babel
and hot-module-reloading. The great thing about Next is that it was created to
be as easy as PHP to start with. However, it's also elegant and, crucially, can
scale to any level of complexity (e.g. an IDE).

Next.js is now a first-class framework on Repl.it!

You can try it by going to [repl.it/languages/nextjs](/languages/nextjs). You'll
be assigned a container and by hitting run you'll start the Next.js server. The
environment will detect that and open a webview, then edit
your code and observe your changes in real-time (live deployed on your repl.it subdomain).

Here's an embed of a simple Next app. Editing the embed will fork it. Make sure
to run the server afterwrads to see it in action.

<iframe height="400px" width="100%" src="https://repl.it/@amasad/next?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

A few other features worth highlighting:

1. Nothing hacky or weird about our Next.js (or any other) environment, everything runs
in a container, and packages and scripts are managed by yarn. So the run button is
merely a shortcut for `yarn dev`.
2. You can add npm dependencies from the side-pane or by simple editing
package.json and restarting the server.
3. Everything is live-deployed and available forever. Next time you hit your
site the container will wake-up to serve you. (However, there's
currently no distinction in Repl.it between dev and production so we recommend
using a service like [Now.sh](https://zeit.co/now) or [Netlify](https://www.netlify.com/) for mission-critical software)
3. There are a few other tools in the environment to explore like
code-formatting, upload/download, but otherwise, it's lightweight and straightforward and we intend to keep it that
way.


### GatsbyJS

[GatsbyJS](https://www.gatsbyjs.org/) is static site generator for React.js. Like Next.js, it's also complete with
all the tooling. However, one of the unique things about it that makes it interesting and fun is its
first-class support for GraphQL (an expressive query language). Everything in
Gatsby, from config to the filesystem, to external APIs can be queried via
GraphQL -- it's compelling!

Here's an embed of the starter Gatsby template. But we're working with the
GatsbyJS team for deeper integration so there's more to look forward to.

<iframe height="400px" width="100%" src="https://repl.it/@amasad/react?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

### Create React App

[Create React App](https://github.com/facebook/create-react-app) is medicine for chronic [JavaScript fatigue](https://medium.com/@ericclemmons/javascript-fatigue-48d4011b6fc4). It's a complete
client-side React starter boilerplate and cli that puts together the latest and
greatest tooling from the JS ecosystem. It even ships with a service worker
implementation so that users fall into the pit of performance success without
thinking much about it.

Here's an embed:

<iframe height="400px" width="100%" src="https://repl.it/@amasad/creact-react-app?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Stay tuned for big updates

This was only one the first of many big announcements coming in the next few days to
weeks... Oh, wait, I almost forgot, we do have one more thing for you.

## One more thing

One of the more important things about the React community is the pace of
innovation. And one of the more exciting developments in recent history is
[ReasonML](https://reasonml.github.io/). Reason is doing to ML (functional type-safe languages) what React did to web development and
React Native to mobile development -- lowers the barrier to entry and makes it a
joy to work with.

Simply, Reason is ML chocolate meets universal runtime JavaScript peanut
butter. It's on the rise, and there's already a vibrant community around it.

Since this post is primarily about React, we're excited to announce our
[ReasonReact](https://reasonml.github.io/reason-react/) environment (we have a pure Reason repl in the works). Check it out:

<iframe height="400px" width="100%" src="https://repl.it/@amasad/reason-react?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Concluding (for real now)

We hope that through our technology, and our community, we're contributing
something unique to the online React repl/IDE ecosystem. Though, we look forward
to exploring this with existing awesome projects like our friends at Codesandbox, Stackblitz, Rekit, and many more.

We've built a system that allows you to add new frameworks and languages with
minimal effort so if you want us to feature your language or framework, please
get in [touch](https://twitter.com/amasad).

As I was saying, we have a lot of exciting upcoming releases and announcements
this week and the next. Things from advanced
IDE features to performance updates, deployment and integration options, and to infrastructure products that, if you liked this post, I'm sure
you'd want to hear about. If you haven't yet, [sign up](/signup) for a Repl.it account, and
follow [@replit](https://twitter.com/replit) or [me](https://twitter.com/amasad)
on twitter to make sure you don't miss the announcements.

Finally, we're a [tiny team](/about), but have a big impact. If you're interested in
working with us, we're [hiring](/site/jobs) a devtools-focused frontend
developer and an infrastructure engineer. Join us on a mission to bring powerful
programming tools to everyone in the world.