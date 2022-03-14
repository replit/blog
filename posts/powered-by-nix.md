---
title: "All New Repls are Powered By Nix"
author: Connor Brewster
cover: https://blog.replit.com/images/powered-by-nix/powered-by-nix.jpg
date: 2022-02-23T17:00:00Z
categories: eng,infra
---


For the past year we have been working hard to integrate [Nix](https://nixos.org/) into our platform and rebuild our existing language experiences with package from Nix. We are excited to announce that all new repls are now powered by Nix. In this post we'll talk about what this means for the future of the platform and all the work that it took to get here.

With Nix you can easily create templates for languages Replit didn't support before, pull in more development tools than ever, and access any cli application in the shell without installing anything:

<iframe width="560" height="315" src="https://www.youtube.com/embed/HC_2YEWZrAc" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Every new repl being powered by Nix means that we've be able to make vast improvements to our existing languages:

- Long awaited Node.js v16 support
- [100x faster Python package management](https://blog.replit.com/python-new-template)
- Improved code analysis tools for Go, Rust, and many other languages

We can also update these versions for new repls without breaking pre-existing repls. Additionally, you can now peek into the internal repl configuration: add Linux packages, customize the run command, configure a new language server, etc...

When we initially [announced Nix](https://blog.replit.com/nix), we added a new kind of repl: the "Nix repl". You could choose this repl to get a blank slate and install/configure the repl however you liked. However, at that time, most other repls were still based on our legacy solution, [Polygott](https://github.com/replit/polygott). This created a divide, Nix repls and non-Nix repls. We've now closed this gap and all new repls are powered with Nix and [`.replit`](https://docs.replit.com/programming-ide/configuring-repl).

## How did we get here?

To rebuild the existing Replit language configurations on top of Nix, we had to build and expose some new tooling to allow for advanced customization and publishable templates. The driving mindset was: Which configuration knobs do we need to expose such that a user never has to ask a Replit employee to change some internal configuration? It turns out, we had to expose a _lot_ of configuration knobs.

### 1: [Nix Package Manager](https://blog.replit.com/nix)
The initial step in the process was allowing users to install arbitrary linux packages. We selected Nix for this as it's caching and store system allow for near-instant package installation times. We've written a lot about Nix on the blog; check out some of our other posts if you want to dive in deeper:

- [Initial Replit + Nix announcement](https://blog.replit.com/nix)
- [Betting on Nix](https://blog.replit.com/betting-on-nix)
- [Faster Nix Repl Startup](https://blog.replit.com/nix-perf-improvements)
- [Will Nix Overtake Docker?](https://blog.replit.com/nix-vs-docker)

### 2: [`.replit`](https://blog.replit.com/replspace-templates#how-do-i-configure-a-template)
Just adding Nix support to the platform is not enough. Replit supports many features like code intelligence via the [Language Server Protocol](https://microsoft.github.io/language-server-protocol/), automatical package management through the [Universal Package Manager](https://github.com/replit/upm), and an integrated REPL experience through [Prybar](https://github.com/replit/prybar).

All of these features were maintained in our code base in JSON configuration files. If anything needed to be tweaked, you had to ask a Replit employee.

It became clear that we needed to expand the existing `.replit` configuration file to support dynamic configuration of these features.

Since then we've added a ton of new configuration options for all core Replit workspace features:

- Integrated REPL/Interpreter
- Code intelligence
- Package management
- Debugger

To learn more about how to configure a repl, check out our [docs](https://docs.replit.com/programming-ide/configuring-repl).

### 3: [Templates](https://blog.replit.com/replspace-templates)

So far we could pull in packages that we need from Nix, like `node` and `typescript-language-server`. We could even hook up the run button to execute `node index.js` and hook up code intelligence to use `typescript-language-server`. But, we didn't have a good way to showcase these templates. We needed a way to add these templates to the Create Repl modal and a place to showcase all the available templates on the platform.

To fix this, we built a template publishing flow so we can build and publish templates entirely in replspace. Templates also have a release mechanism so that any changes made to the template don't show up in new repls until the template publishes a new release. In the future, users of templates will be able to pull in updates from the latest template release.

To track our progress of converting all our supported languages to the new Nix and templates infrastructure, we created a website hosted in a repl: https://arewenixyet.com. This allowed for people within the company and within the community to follow along and help out with the process.

Read more about templates and replspace [here](https://blog.replit.com/replspace-templates).

### All together now

Combining all these together, we now have an extensible platform where users can create a new templates for other users to consume. This means the platform is no longer limited by the Replit team as community members can manage templates for popular languages and configurations.


## Future Plans

While all new repls are powered with Nix, old repls may still be powered by [Polygott](https://github.com/replit/polygott). Eventually, we will be phasing out Polygott and automatically migrating old repls to be backed by Nix. We will share more details about the migration timeline in the future and provide a way to manually migrate your repls to Nix.

If building the most powerful development environment on the web sounds like your kind of challenge, [we're hiring](https://replit.com/site/careers). We'd love to hear from you!