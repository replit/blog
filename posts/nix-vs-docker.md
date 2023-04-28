---
title: Will Nix Overtake Docker?
author: Connor Brewster
date: 2021-11-29T20:00:00Z
cover: https://blog.replit.com/images/nix/replit-nix-dono.jpg
categories: eng,infra
---

In many discussions about [Nix](https://nixos.org/), the comparison of Nix and [Docker](https://www.docker.com/) [comes](https://news.ycombinator.com/item?id=22295740) [up](https://news.ycombinator.com/item?id=23253856) [frequently](https://news.ycombinator.com/item?id=28734457). This question could be dismissed by saying that Nix and Docker are different tools that solve different problems. One is a toolkit for building and deploying containers and the other is a package and configuration manager. However, these tools do have some overlap: they can both be used to create reproducible environments. A reproducible environment is one that can be recreated from scratch in an identical way (ideally bit-for-bit). Practically, this means having the same tools, versions, and configuration between the environments.

Reproducible environments are useful to ensure all developers on a project have the exact same set of tools. Additionally, you can develop in an environment that is similar to the production environment -- leading to less surprises when deploying.

Both tools can solve the age-old problem of "it works on my machine".

![elon in front of broken cyber truck window with caption "it worked on my machine"](https://img.devrant.com/devrant/rant/r_2341310_va2vS.jpg)

While both tools aim to solve this problem, they take different approaches.

## Reproducible Environment with Docker

Docker provides tools for creating container images. An image stores the contents and configuration for a container. This is usually the filesystem, some environment variables, and a run command.

From an image, you can create new containers that will be functionally equivalent, even across different machines.

You can distribute images to other developers to give them identical environments or you can use them to ship your service to production.

Docker images can be created by a `Dockerfile`. This file tells docker the commands to run to build an image. This can include copying files from the host system or installing packages using a package manager like apt or apk.

[Example](https://docs.docker.com/get-started/02_our_app/):
```Dockerfile
FROM node:12-alpine
RUN apk add --no-cache python g++ make
WORKDIR /app
COPY . .
RUN yarn install --production
CMD ["node", "src/index.js"]
```

Docker will create a new container that is used to build the image. A new filesystem layer will be created for each command in the `Dockerfile` before the command is executed. Docker utilizes [union filesystems](https://en.wikipedia.org/wiki/Union_mount), which allows stacking multiple filesystems or directories to appear as a single filesystem.

Since each command has its own layer, Docker can detect which layers are still valid and which ones need rebuilt after changes are made to your project. Properly ordering commands will result in much faster docker image rebuilds.

Each layer can also be shared across multiple images. This is useful when multiple docker images are built from the same base Docker image. For example, the above `Dockerfile` has `node:12-alpine` as the base Docker image. The layers from `node:12-alpine` only need to exist in one place and can be shared by other Docker images.

Once an image is built, it can be named, tagged, and uploaded to an [image registry](https://hub.docker.com/) so it can easily be shared with others.

While an image allows for reproducible Docker containers, Docker doesn't have any guarantees that creating images is reproducible -- If you run `docker build` twice with the same `Dockerfile` you might get 2 images that behave in different ways. For example, a third-party package could silently be updated and [cause](https://xkcd.com/1172/) [breakage](https://www.hyrumslaw.com/). Aggressively pinning dependency versions helps, but doesn't completely prevent this issue.

Another thing worth noticing is that Docker only allows for composing images by inheriting from a single layer. You can specify the base image for a new image in the `Dockerfile`, but you can't take 2 images and combine them. If you want a container with `node` and `rustc`, you can't combine the `node` and `rust` images. You would have to start with the `node` image and install `rustc` manually in the `Dockerfile` or vice versa.

## Reproducible Environment with Nix

Nix takes a [first-principles](https://en.wikipedia.org/wiki/First_principle) approach to reproducible builds and package management. Nix provides a whole build system that allows for building packages in an isolated way.

To build any package, you need to:

1. Construct an environment with all the tools needed to build the package.

2. Execute a build script to run all the build steps.

This process is repeated for every package and Nix goes to great lengths to ensure each environment that packages are built in are reproducible. Nix will limit network access, filesystem access, and sometimes even run in a sandboxed container during building to prevent any sort of external influence during package building.

Packages can depend on other packages which creates a large dependency graph that Nix will traverse and build packages on the way.

It just so happens that you can create new reproducible environments by adding a new node to this graph. Then you can use Nix to do part 1 of package building: constructing the environment.

In development, you may not want or need Nix to do step 2. Instead you can have Nix drop you into a bash shell where you can run the build commands yourself.

Nix comes with a tool called `nix-shell` which will do exactly this for you.
Add a `shell.nix` file to the root of your project and `nix-shell` will pop you into an environment with all the specified input packages available.

Example:
```nix
{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
    nativeBuildInputs = [ pkgs.rustc pkgs.cargo ];
}
```

Nix does not use containers here, it only modifies environment variables. For example, binary packages are added to the `PATH` environment variable.

Since Nix provides strong guarantees about reproducibllity, sharing this `shell.nix` is all that's needed<a href="#footnote-1" class="super">1</a> to give developers functionally equivalent development environments.

Unlike Docker, Nix is a full-blown package manager. This makes it trivial to compose environments. Taking the example above from Docker, if we want node and rust in the same environment, just tell Nix that they are both build inputs:

```nix
{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
    nativeBuildInputs = [ pkgs.rustc pkgs.cargo pkgs.nodejs-16_x ];
}
```

## Which Should You Use?

Before considering this question, we should go back to the beginning: Docker and Nix are completely different tools.

Docker images are just a sliver of what Docker provides. Docker provides tooling for a whole container ecosystem.

Whereas Nix is primarily designed for building packages & environments in a reproducible way.

If reproducible development environments are all you are after, Nix will serve you well.

If you're looking for a way to build, package, and deploy your own service. Docker will provide much more rich tooling. After all, containers are the de-facto way that web services are deployed these days.

Even so, docker image building leaves a lot to be desired. Luckily, I have an ace up my sleeve: Nix can be used to build Docker images.

Example:
```nix
{ pkgs ? import <nixpkgs> { }
, pkgsLinux ? import <nixpkgs> { system = "x86_64-linux"; }
}:

pkgs.dockerTools.buildImage {
  name = "cowsay-container";
  config = {
    Cmd = [ "${pkgsLinux.cowsay}/bin/cowsay" "I'm a container" ];
  };
}
```

Maybe we can have the best of both worlds:
* Reproducible Docker images via Nix
* Simplified deployments via containers

### Nix at Replit

If you've been following along, we're currently transitioning from providing development tools from a massive Docker image, [Polygott](https://github.com/replit/Polygott), to [providing packages via Nix](https://blog.replit.com/nix). Checkout what users are building with [Nix on Replit Apps](https://replit.com/apps/nix).

We've found that Nix has solved some pain we were experiencing with Docker images:

- It's very difficult to know what changed between 2 different builds of Polygott.
    - Un-pinned packages might have been updated and could cause breakage in repls
    - Some package repositories may go offline and can break the image build

- Composing the swath of development tools for all supported languages into a single Docker image became unwieldy.
    - Polygott provides a bunch of scripts and config files to install all the tools needed for each languages, but these become painful to maintain.
    - No matter what we tried, it was nearly impossible to share layers between multiple builds of Polygott. Polygott itself is 20-30GB which adds up quickly when multiple versions are in production at the same time.

Using Nix, we now give users the power to install the tools they need rather than static set of predefined tools. At the same time it addresses the problems above and reduces our internal maintenance burden. Win-win!

While we are jumping on the Nix train, we aren't dumping Docker containers. We still need containers to provide each repl with an isolated environment.

**Will Nix overtake Docker?** No, these tools accomplish different goals, however they can be used in combination to provide the best of both worlds: reproducible builds and containerized deployments.

Are you interested in working with Nix or are you fascinated by large-scale container orchestration? [Come work with us!](https://replit.com/site/careers)

---

<span class="super" id="footnote-1">1</span> All packages in Nix aren't 100% reproducible, but work is being done to improve this. Additionally, each machine may have its own version of [nixpkgs](https://github.com/NixOS/nixpkgs). For maximum reproduciblility, nixpkgs should be [pinned](https://nixos.wiki/wiki/FAQ/Pinning_Nixpkgs). This will happen by default with [Nix flakes](https://nixos.wiki/wiki/Flakes)
