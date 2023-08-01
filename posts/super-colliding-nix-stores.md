---
title: "Super Colliding Nix Stores: Nix Flakes for Millions of Developers"
author: Ryan Mulligan
date: 2023-05-25T17:40:00.000Z
cover: https://blog.replit.com/images/stacks.jpg
categories: product,eng
---

![stacks](https://blog.replit.com/images/stacks.jpg)

We’ve teamed up with [Obsidian Systems](https://obsidian.systems/) and [Tweag](https://www.tweag.io/) to enable Nix to merge multiple (possibly-remote) Nix stores, bringing Nix Flakes and development environment portability to millions of Replit users.

Nix is an open-source cross-platform package manager and build tool that lets you access the most up-to-date and complete [repository](https://github.com/nixos/nixpkgs) of software packages in the world. Nix’s approach to package building ensures that software and development environments will always work the same way, no matter where it is deployed.

Replit [has bet big on Nix](https://blog.replit.com/nix) because we believe in a future where developers are free from the drudgery of setting up their development and production environments. A world where onboarding a co-worker is as simple as forking a Repl. When you use Nix to describe your environment, you don’t have to redo your setup everywhere you want your code to work. As [Mitchell Hashimoto, founder of Hashicorp, said](https://mitchellh.com/writing/nix-with-dockerfiles):

> one big benefit is that once you adopt Nix, you can get a consistent environment across development (on both Linux and Mac), CI, and production.

Since early last year, [all new Repls have been powered by Nix](https://blog.replit.com/powered-by-nix). Fast-forward to today, we're providing nearly a million software artifacts for instant installation, all without counting against your Repl's storage limits.

But that was just the beginning, we want to give you more power to configure Repls how you would like and to increase Repl portability with other platforms. We want to give you access to an even larger collection of Nix packages: ones that were published years ago, and the latest ones published today. We also want you to be able to use [Nix Flakes](https://zero-to-nix.com/concepts/flakes) on Replit: it shouldn’t require extra work to configure development environments on every platform. Write a Nix Flake once and have the same reproducible environment everywhere.

To achieve this, we’re going to need a way to merge Nix stores! But first let’s dive into the details of how we use Nix to create reproducible development environments.

## Development environments at Replit

Every Repl has a `replit.nix` file which allows you to install tens of thousands of packages available in the [Nixpkgs collection](https://github.com/nixos/nixpkgs). For example, here is the one for C++:

```nix
{ pkgs }: {
  deps = [
    pkgs.clang_12
    pkgs.ccls
    pkgs.gdb
    pkgs.gnumake
  ];
}
```

It installs a compiler (clang), language server (ccls), debugger (gdb), and build tool (make). When this file is changed, we add all these packages to your Repl’s shell environment. Behind the scenes we do something close to what would happen on your computer if you copied the following into a `default.nix` file and ran `nix-shell` in a terminal in the same directory.

```nix
{pkgs ? import <nixpkgs> {}}:

pkgs.mkShell {
  packages = [
    pkgs.clang_12
    pkgs.ccls
    pkgs.gdb
    pkgs.gnumake
  ];
}
```

When you run `nix-shell`, Nix evaluates this code and determines that it needs to build a shell environment as a package. For example, if I run `nix-build` in the same directory, I see:

```ShellSession
$ nix-build
this derivation will be built:
  /nix/store/ni73sa8sh3jl99nz06z3af5kkp9xl1ws-nix-shell.drv
building '/nix/store/ni73sa8sh3jl99nz06z3af5kkp9xl1ws-nix-shell.drv'...
building
/nix/store/ylhzwsmznmjw8g39wvysg1rsh9ld2il7-nix-shell
```

Nix has figured out what to build and wrote a detailed reproducible build plan in the Derivation file  `/nix/store/ni73sa8sh3jl99nz06z3af5kkp9xl1ws-nix-shell.drv` into the `/nix/store/` directory and then it followed the build plan producing the file `/nix/store/ylhzwsmznmjw8g39wvysg1rsh9ld2il7-nix-shell` which is a shell script that describes what environment variables to set to produce this development environment. Here’s a modified excerpt of that file:

```Shell
declare -x PATH=
"/nix/store/7c4759gi42c2bhfgxixbq1hilv0m1g4i-clang-wrapper-12.0.1/bin:
/nix/store/k33vhsd3js5ri12prl1q309fs5l73c1p-clang-12.0.1/bin:
/nix/store/lyvhsvwp2pzy74fkcn7qbs5vcgy5d7vl-glibc-2.37-8-bin/bin:
/nix/store/ahkfdxq8mcpsb5kvdvgqr1wv8zjngbh4-coreutils-9.1/bin..."
declare -x SHELL=
"/nix/store/rhvbjmcfnkg8i2dxpzr114cp1ws7f667-bash-5.2-p15/bin/bash"
```

The script sets a bunch of environment variables to make sure your development environment has exactly what it needs in it.

When it builds the shell environment successfully, it also adds an entry to a SQLite database at `/nix/var/nix/db/db.sqlite`:

```
sqlite> 
select * 
from ValidPaths 
where 
path = "/nix/store/ylhzwsmznmjw8g39wvysg1rsh9ld2il7-nix-shell";

333859|/nix/store/ylhzwsmznmjw8g39wvysg1rsh9ld2il7-nix-shell|
sha256:450a0340bb5cf76d350c1c7bee48c3403c3df6076c3d66f592f31499ac4f2f5e|
1684944022|
/nix/store/ni73sa8sh3jl99nz06z3af5kkp9xl1ws-nix-shell.drv|7936|1||
```

Nix records this information in the database for both file-system-consistency reasons and performance reasons.

There’s one last step for setting up Repl development environments that we’ll get to after we learn about the overlay filesystem we use to enable instant package installation.


## How our overlay filesystem currently works

If we let you use Nix the exact same way you do on your local computer, you’d use a lot of space and initially download a lot from the Nix caches, which can take many minutes.

Instead, we have ~16 TB Persistent Disks (Big Disks) on [Google Cloud](https://cloud.google.com/) that we attach to each machine that serves Repls. The Big Disks have a Nix Store (a collection of packages in a /nix/store directory, alongside the SQLite database) containing almost a million packages. Like the `nix-shell` example above, the SQLite database has a row for each package.

![current Nix store overlayfs setup](https://blog.replit.com/images/super-colliding-nix-stores/nix-overlay-before.png)

Inside Repls, the Big Disk is mounted in an [overlay filesystem](https://www.kernel.org/doc/html/latest/filesystems/overlayfs.html) stack. The Big Disk is a lower disk and an upper scratch disk lets Nix builds happen inside the Repl. Critically, this upper disk is **not persistent**.

Under this setup, if we persisted the upper store, you wouldn’t see the updated lower store database the next time we added a package to the Big Disk.

This means that currently whenever you do a regular Nix build (or anything with Nix Flakes) inside a Repl, the build result is not saved between sessions and is limited to the size allotted to the scratch disks.


## Revisiting development environments

Since the upper store is not persistent, how do we avoid rebuilding a Repl’s development environment every session? Caching.

We save all the environment variables to `.cache/replit/nix/env.json` along with metadata that helps us determine if the cache is stale. When a Repl starts, we look for this cache, and if it is not stale we use it instead of rebuilding the Nix environment. See our previous post [Faster Nix Repl Startup](https://blog.replit.com/nix-perf-improvements) for more details.

Without a persistent upper store, everything we cache has to be present on the Big Disk. If you want to add a new Nix package to the Big Disk, you update <code>[nixpkgs-replit](https://github.com/replit/nixpkgs-replit)</code> (Replit's nixpkgs overlay) and wait for the disks to be rebuilt and deployed.


## Unlocking the full power of Nix

If we could persist the upper store, we’d bring the full power of Nix to Replit. Here are some of the benefits:

**Configuration reusability:** projects with existing Nix configurations can bring them to Replit without modification. Repls with standard Nix configuration can be downloaded to your local computer and work. Write one development environment configuration, reuse everywhere (local, Repls, CI, and [production deployments](https://replit.com/site/deployments)).

**Better caching:** your development environment can be cached and ready to go when your Repl starts. You can even cache your build artifacts across different versions of your code.

**Nix Flakes:** get access to the improved user experience and code sharing provided by Nix Flakes.

**Using other Nix projects:** not all Nix code is available in nixpkgs, this unlocks access to the wider ecosystem.

**Build your project:** Nix is a general build tool with lots of applications. It can build projects in almost any language including Python, Go, Rust, and C++. It can also build containers, and virtual machine images.


## Layered Store to the rescue!

By modifying Nix to be aware of the layered overlay filesystem, we can mix instant installation with the full power of persistent Nix builds. Rather than using an overlay filesystem for `/nix/store` and the database, we only overlay the `/nix/store` directories. 

![new Nix store overlayfs setup](https://blog.replit.com/images/super-colliding-nix-stores/nix-overlay-after.png)

When Nix is ready to build, it first looks into the lower store database to see if it was already built. If available, it skips building and adds an entry to the upper store database indicating the package is available. Through the power of the overlay filesystem, the build products are already in place!

With the overlay filesystem between the upper and lower databases removed, we can persist the upper store and add packages to the lower store database without interfering with the upper store database. 


## Other applications for the Layered Store

The Layered Store is an interesting primitive that we think could be useful in a variety of situations:

* Using a network filesystem to serve a Nix store
* A build farm or CI server that maintains a fast-access upper Nix store while still having access to a networked filesystem lower store for reusing big or expensive build products.
* Anything composing more than 2 stores (2 stores is the upper limit of an overlay filesystem without a Layered Store) 

We’d love to hear your ideas for how you’d use it.


## Development

To make this a reality, we’ve teamed up with [Obsidian Systems](https://obsidian.systems/) and [Tweag](https://www.tweag.io/). In the coming weeks, we will be developing the Layered Store features, releasing a [Nix Community RFC](https://github.com/NixOS/rfcs/pull/152), and working to upstream it into Nix.

Want to be one of the first ones to try it out? [Add yourself to our beta list](https://replit.typeform.com/to/aB79AtRU).


## Work at Replit

Are you interested in Nix and would love to see it in the hands of more people? [Come work with us](https://replit.com/site/careers) on making instantaneous software setup and deployment a reality for everyone.