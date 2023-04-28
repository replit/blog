---
title: "Betting on Nix: donating $25K to the NixOS Foundation"
author: Dan Stowell
date: 2021-10-25T00:06:40.000Z
cover: https://blog.replit.com/images/nix/replit-nix-dono.jpg
categories: eng,product
---

As building software grows more like snapping Legos together, how people find and use those Legos becomes more important. That's why we are donating $25,000 to the [NixOS Foundation](https://nixos.org/community/index.html) and betting on Nix as the future of software distribution.

In software, the Lego pieces are called packages. A package may be some code your program needs to call (a library) or another program your code needs to run. Historically, people have used package managers to find and install packages into their projects. Each language ecosystem has its own package manager. Replit built and open-sourced the [Universal Package Manager](https://github.com/replit/upm) to unify this fragmented landscape.

Package managers are a holdover from the old model of programming, when development environments lived on personal computers. Now that development environments (ahem, repls) can run entirely in the cloud, fetching packages from a central server, unzipping them, and installing them into a filesystem seems shockingly archaic.

The future is instant. When you press the run button in a repl, your code should run immediately, not pause to fetch packages.

The [Nix](https://nixos.org/) project unlocks instant repl runs. Nix uses [content-addressable storage](https://en.wikipedia.org/wiki/Content-addressable_storage) for its packages. If you know which package you want to use, you can compute its location on the filesystem without having to search a central repository. Which means we can put every single package on a fast disk in the cloud and skip the fetch-unzip-install cycle. When you press run, your program can instantly access all the packages it needs on a drive already mounted into the repl.

The future is reproducible. What does that mean? If your repl works today, it should also work the next time you go to run it.

Package installation is a notoriously flaky part of the old programming model. Packages can conflict and fail to install. Packages can work when installed in one order but not another. The central repository may have a new version of a package that doesn't work with your code. The central repository might be down or unbearably slow.

Reproducibility is core to the Nix project. Each package is identified by a name and a hash. That hash encodes all the inputs to build the package: the source code of the package itself and the hashes of all the packages it depends on. There's no such thing as a conflict. If packages rely on different versions of another package, they will each refer to different hashes and happily just work.

The future moves fast.

Prior to Nix, to add a new language, update an existing language, or add a new system package, we'd have to modify and rebuild [Polygott](https://github.com/replit/polygott), Replit's base Docker image. It's scary to rollout Polygott changes: any repl may break due to a change in that base image. So we only rollout new Polygott versions when it's absolutely necessary, meaning that languages can grow severely out of date. Downloading a 15GB image to thousands of virtual machines also takes a long time, making rollouts a chore.

Now all we have to do to update languages is create a new template. Existing repls will still use the exact packages they were built with. They'll continue to run. Newly-created repls will use the latest and greatest. No more plodding rollouts.

Replit has a history of betting on nascent technologies. The first version of Replit used WebAssembly long before WebAssembly found widespread adoption. We're betting that the Nix project will improve performance across the board, sidestep a whole slew of bugs for our community, and let any Replit user build and publish programming environments.

We support Nix in a variety of ways. First, by including Nix in every repl we bring this technology to millions of programmers of all experience levels. Second, by building infrastructure to power Nix in production and sharing that [knowledge](https://blog.replit.com/nix-perf-improvements) with the world. And, as we said above, we have made a $25,000 contribution to the [NixOS Foundation](https://nixos.org/community/index.html) to further mainline Nix development and make programs such as the Summer of Nix possible.