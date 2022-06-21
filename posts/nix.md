---
title: How we went from supporting 50 languages to all of them
author: Connor Brewster and Mason Clayton
cover: https://blog-images.util.repl.co/upm_cover_small.png
date: 2021-05-24T18:30:56.792Z
categories: infra
---

At Replit, we want to give our users the most powerful, flexible, and easy-to-get-started coding environment. However, it has been limiting because we only support a fixed set of languages and OS packages, some of which are outdated. Ideally, users should be able to use any language and install any package with minimal fuss. That's why today, we're announcing that we've incorporated [Nix](https://nixos.org) in our infrastructure to give users access to over 30,000 OS packages instantly.

The environment repls run in has long been a static world. We build a pre-baked OS image to fit all our languages. This gives us a lot of leeway to make repls super fast, but the underlying operating system repls run in is completely immutable. To remedy the situation we've been maintaining an ever growing [OS image](https://github.com/replit/polygott), if users can't install any packages we'll just install every package! As awesome as this sounds it has become a huge burden to maintain. Every new package creates a new exciting way things can break.

Over time, it became clear that maintaining a single, massive docker image was not sustainable. We came across [Nix](https://nixos.org) which is a declarative, reproducable OS package manager. Due to Nix's design its package store is highly cacheable and allows for building environments in a composable way. Using the Nix programming language you can specify the dependencies for your development environment and Nix will build the environment for you. We believe this is a great fit for Replit as it allows our users to build endless combinations of development environments without us having to maintain a monolithic docker image.

With Nix on Replit, see how easily you can create a [Zig](https://ziglang.org/) environment in a few seconds. We create a `replit.nix` file to tell the repl which Nix packages should be available when we run. Then we use [.replit](https://docs.replit.com/repls/dot-replit) to control what the run button does. And voila we have a new language:

<img alt="demonstration of setting up a zig repl via Nix" src="https://blog.replit.com/images/nix/nix-zig.gif" style="width: 100%" />

## How it works

Utilizing the power of Nix, every repl comes preloaded with over 30,000 packages. Adding a package is as simple as adding it as a dependency in the `replit.nix` file. The best part is these packages are already available in every repl and don't need to be downloaded. To accomplish this we've prebuilt a Nix store with every package already downloaded. This is a huge 1 terabyte shared disk image we mount into every repl right under `/nix`, building on our [existing package caching technology](https://blog.replit.com/python-package-cache). This means we can build a single disk image with all Nix packages once and share it among every single repl. The novel layout of Nix's content addressable store make this conflict free even with many versions of the same package. When activating, your environment will only be populated with the exact packages you depend on from the store.

## Examples

Check out some of our example Nix repls for various languages:

* [Zig](https://replit.com/@ConnorBrewster/zig)
* [Node.js 16](https://replit.com/@ConnorBrewster/nodejs16)
* [Clojure](https://replit.com/@turbio/nixed-clojure)
* [C# Dotnet](https://replit.com/@turbio/dotnet)
* Check out our [Nix docs](https://docs.replit.com/repls/nix) to build your own

## What's Next

The next stage in Replit and Nix integration is allowing more flexible configuration of the repl itself. Today, you can already modify the run command of repls through the [`.replit` file](https://docs.replit.com/repls/dot-replit). We plan to extend the functionality of `.replit` to allow for configuration of things like [LSP](https://en.wikipedia.org/wiki/Language_Server_Protocol) to customize code intelligence for your environment.

We are also working on caching nix-shell environments for faster run experience, right now Nix has to rebuild the repl environment every time you hit the run button which can add a couple seconds of delay. (Edit: Nix environments are now cached)

---

While Nix on Replit is in its early stages, we are looking for people to try it out and build custom environments. If you have any questions or feedback, don't hesitate to reach out to us at [mason@replit.com](mailto:mason@replit.com) or [connor@replit.com](mailto:connor@replit.com).

P.S. You can install and run i3 via Nix in a [repl](https://replit.com/@ConnorBrewster/i3)

<img alt="demonstration of running i3 in a repl via VNC" src="https://blog.replit.com/images/nix/nix-i3.gif" style="width: 100%" />
