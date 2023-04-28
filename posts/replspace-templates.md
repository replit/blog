---
title: Repl Space and Templates
author: Tyler Angert, Moudy Elkammash, Connor Brewster
date: 12-15-2021
categories: product,eng,infra
cover: https://art.replit.com/images/Random-artworkFlowermagic-01.png
---

When we want to support a new technology, we're faced with the question: "Do we (the Replit team) build this capability into the Replit directly, or can our users add it themselves?". Usually, we want the answer to be the latter. Repls are like personal computers for your projects. And the more these personal computers can be customized, the more they'll be used in creative, unexpected ways.

Internally, we refer to the extent to which a Repl can be configured as "Repl Space". So when we talk about building new features, we always ask "can it be done in Repl Space?", which is basically asking if we can build it *on* Replit. Over the past year, Repl Space has become [significantly more powerful](https://blog.replit.com/nix), and soon, Replit will be one of the most flexible computing platforms on the planet without compromising its simplicity. Now that we have the technical foundations in place, we're excited to bring more of that power into the product in the form of Templates and some new configuration options.

## Templates

![templates screenshot](https://blog.replit.com/images/replspace-templates/templates.png)

### Where can I find templates? 

Whenever you create a Repl, you'll be able to search through our list of Templates and start coding immediately. We also built a new templates [gallery](https://replit.com/templates) that lets you search and browse official and community templates. Publishing community templates is currently limited, but here's a preview of what it looks like to add a Zig template, for example:

<figure>
  <video width="480" controls>
    <source src="/images/replspace-templates/zig-template.mov">
    Your browser does not support the video tag.
  </video>
  <figcaption>Add a Zig template in Repl Space</figcaption>
</figure>

Eventually we'll expand the ability to publish templates to more community members. If you're interested in publishing a template, you can [sign up here](https://forms.gle/8mUgEQbkeFFwZqct5).

### How do I configure a template?

A repl is configured using 2 files: 
- `replit.nix`: This file specifies the Nix packages to install into the repl. For example: compilers, language servers, debuggers, cli tools.
- `.replit`: This file specifies how the repl operates. For example: The command to execute when the run button is pressed or which LSP server to run for a given language.

Below is an example of a `replit.nix` file that installs [Zig](https://ziglang.org/), [Zig Language Server](https://github.com/zigtools/zls), and [gdb](https://www.sourceware.org/gdb/). The environment is [automatically cached](https://blog.replit.com/nix-perf-improvements) by default to ensure fast repl startup time.

```nix
{ pkgs }: {
    deps = [ pkgs.zig pkgs.zls pkgs.gdb ];
}
```

And here is an example of configuring `.replit` to customize the `run` command, which is executed when you press the run button. 

```toml
# this will run the main zig file inside of your Repl.
run = ["zig", "run", "src/main.zig"]
```

For more in-depth information about Nix and `.replit`, check out our [docs](https://docs.replit.com/programming-ide/configuring-repl#configuring-the-run-button).

## The future

We're working on making Repl Space even more powerful. Ideally, we're headed towards being able to make, share, and collaborate on all kinds of customized computing environments– not just for writing code, but for gaming, drawing, and more.

If you're interested in being a Community Template developer, please fill out the application form [here](https://forms.gle/E1NQgttYo2N51U389)!