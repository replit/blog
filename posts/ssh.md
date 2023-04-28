---
title: Remote Access to Your Repls via SSH
author: Matt Iselin
categories: eng
cover: https://blog.replit.com/images/ssh/ssh-cover.png
profiles: mattiselin
date: 2023-03-02T20:00:00Z
---

Last week we announced the [Pro plan](https://blog.replit.com/pro) to speed up your development with Replit's AI tools and an even more powerful Workspace.

Today we're expanding all of our paid plans to add the ability to use [SSH](https://en.wikipedia.org/wiki/Secure_Shell) to remotely access your Repls.

## How do I get started?

If you're subscribed to a paid plan, you'll notice a new "SSH" entry in the Tools section of the Workspace. You can add your SSH keys and start working with your Repl remotely!

![](/images/ssh/ssh-tool.png)

You can also check the [SSH documentation](https://docs.replit.com/power-ups/ssh), which includes detailed instructions for OpenSSH and PuTTY.

## Why SSH?

Replit offers a [powerful and flexible coding environment](https://blog.replit.com/codemirror) and through Nix you can [instantly access over 30,000 software packages](https://blog.replit.com/nix). Starting a project, trying a programming language, or trying out a new piece of software has never been easier.

But if you already have a development environment that you've fine-tuned over the years, you may find it difficult to adjust to a new environment. SSH allows you to take full advantage of the power of Replit while continuing to use your local development environment. For example, with your perfectly-optimized `emacs` or `vim` setup, and `sshfs`, you can work on and host projects on Replit without giving up your editor. You can even use VSCode with the Remote SSH extension to work on your Repls.

![Editing React + Vite in VSCode with live updates in the Repl webview](/images/ssh/ssh-hmr.mp4)

## How does it work?

The [Replit architecture](https://blog.replit.com/killing-containers-at-scale#replit-architecture) puts every Repl into its own container that runs once you open a connection to it. Inside that container, we are now running an SSH server that handles all of your remote access needs. However, because containers can run on any machine, and need to be accessible with a known username and host to make SSH possible, we needed to introduce a proxy.

The SSH proxy receives your connection, verifies your keys, and routes the SSH connection through an encrypted SSH tunnel to your Repl. In practice, this is much like an [SSH jump host](https://en.wikibooks.org/wiki/OpenSSH/Cookbook/Proxies_and_Jump_Hosts), but it doesn't require you to configure anything other than a username and host like any other SSH host.

This means that through the same [proxy routing](https://blog.replit.com/https) that allows Repls to host web servers or be edited in the browser, we can route your SSH connection no matter where your Repl is running. This means you don't need to run additional proxies or wrappers to make Replit SSH work.

We fully control the proxy and container SSH components so we can add Replit-specific handling to your SSH connection. For example, we will automatically ensure that VSCode configuration is persisted in your Repl's filesystem and that X11 Forwarding doesn't conflict with the [Replit Graphics feature](https://blog.replit.com/gfx).