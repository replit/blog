---
title: Faster Nix Repl Startup
author: Connor Brewster
cover: https://repl.art/ghrepl.png
categories: infra 
date: 2021-10-13T0:00:00.000Z 
---

For the past few months we have been working on improving our [Nix integration](https://blog.replit.com/nix). Nix allows users to easily use [over 80,000 Linux packages](https://search.nixos.org/packages) in a repl. Nix opens the door to many exciting tools and applications on the platform. Our goal is for every repl to be backed by Nix. Before we can do that, we need to ensure that the Nix experience is just as good, if not better, than our existing [Polygott](https://github.com/replit/Polygott) [solution](https://blog.replit.com/elisp).

If you've used a Nix repl, you may have noticed additional loading time when opening your repl. The console would show "Loading Nix environment..." and you'd have to wait for a few seconds. In some cases, you might have waited for tens of seconds. We care about making repls start up as fast as possible and this additional loading time wasn't acceptable.

Through some additional caching, we have entirely removed this loading time on many Nix repls. Now, Nix repls will start up just as fast as Polygott-based repls. See below for a before and after demonstration.

Before:
<img alt="gif of slow repl startup time due to loading Nix environment" src="https://blog.replit.com/images/nix-perf-improvements/nix-env-slow.gif" style="width: 100%" />

After:
<img alt="gif of fast repl startup time due to cached Nix environment" src="https://blog.replit.com/images/nix-perf-improvements/nix-env-fast.gif" style="width: 100%" />

With this improvement, we are even closer to being able to transition all repls to Nix without causing any regressions in performance and usability. Stay tuned for more information about our migration plan to Nix.

## Under The Hood

Before diving into the optimization, you'll need some information about how the Nix integration works.

If you're unfamiliar with Nix, there's a couple important details you'll need to know. First, Nix uses a purely functional language for writing configuration and build steps for a package or environment. Second, all outputs (e.g. built binaries) are stored in the Nix store which is usually located at `/nix/store`.

When Nix evaluates the Nix expressions it generates build steps for each package which the Nix builder will execute. Concretely, Nix exports a set of environment variables and a build script to build a package. The builder script will place outputs in a directory in the Nix store.

We provide a seeded Nix store to each repl; this seeded Nix store includes a vast majority of packages in the [nixpkgs](https://github.com/NixOS/nixpkgs) repository.

Just because a package is in the Nix store, that is, present in the `/nix/store` directory, does not mean the package is available in your environment. This is usually done by adding each package to the `PATH` environment variable.

We can use `nix-shell` to pop us into an environment where all these environment variables, like `PATH` are populated with packages specified in the Nix expression. By default, a repl will automatically evaluate the Nix expression inside the `replit.nix` file. The environment variables are then exported and stitched into the repl's environment variables used in the console, shell, etc...

For example, Nix will generate a `PATH` environment variable that looks something like this:

```bash
> echo $PATH
/nix/store/w07a7k61dw5gnsyxj3kgcq3shr76jax8-bash-interactive-4.4-p23/bin:/nix/store/435paza0j48aa9vgvf6r2l12nrg4ld11-patchelf-0.12/bin:/nix/store/4xs1xyj8728yvh9y5v6ji819kwgfy2fv-gcc-wrapper-10.3.0/bin:[collapsed for berevity]:/home/runner/.nix-profile/bin:/home/runner/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
```

Previously, every time a repl would start up, we would execute Nix to evaluate `replit.nix` and export environment variables. Unfortunately, this was adding seconds to 10s of seconds to repl start up time.

Luckily, due to the seeded Nix store, this operation usually doesn't add any new packages to the Nix store. This means that we can reuse the same set of environment variables between repl restarts.

Now we can get to the latest optimization. We persist the environment variables exported by `nix-shell` to the repl's filesystem so you can skip the Nix evaulation step when your repl starts up.

There are some cases where the user's `replit.nix` may add some new packages to the Nix store. In these cases, the cached environment variables are considered invalid if any cached environment variables contain references to Nix store paths that don't exist. In this case, the environment is rebuilt like before and you won't see any improvement from this additional caching layer, but we ensure you still get the correct environment for your repl.

In summary, caching environment variables from `nix-shell` in the repl's filesystem removes the need to evaluate `replit.nix` on repl startup in many cases. This additional caching reduces repl startup time by seconds to 10s of seconds.

If you're interested in solving these kinds of challenges, come work with us! Check out our [open positions](https://replit.com/site/careers).

