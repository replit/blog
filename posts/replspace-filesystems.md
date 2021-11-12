---
title: Announcing File Persistence in Hosted Apps for Hackers
author: Luis Héctor Chávez
date: 2021-11-11T21:30:00.000Z
categories: product,eng,infra
cover: https://art.replit.com/images/Multiplayerreplit-4.jpg
---

We mostly think of repls as being full computers in the cloud, and one of the goals of the platform team at Replit is to enable people to build _almost_ anything in [replspace](#what-is-replspace). In the past, when a file was stored in a repl, it would only be saved when the editor was opened. This went against our goal and made it impossible to write certain servers that changed files at runtime. This was especially hard for newcomers, because that's the easiest way to persist information. Starting today, Hacker and Teams subscribers will be able to write services that accept file uploads or store data in a local database (think SQLite) or text file, regardless of how the repl was started.

<figure>
  <video width="480" controls>
    <source src="/images/replspace-filesystems/demo.mov">
    Your browser does not support the video tag. But this was a very nice demo of what it looks like for a server to be able to save its files.
  </video>
  <figcaption>A demo of what it looks like for a server to be able to save its files: <a href="https://sqlite.luisreplit.repl.co">https://sqlite.luisreplit.repl.co</a></figcaption>
</figure>

## What is replspace?

replspace is a term we coined up. In operating systems, memory is divided into _kernel space_ and _user space_. [_Kernel space_ is where the kernel executes and provides its services](http://www.linfo.org/kernel_space.html). The kernel can access _all_ of the memory, but the user cannot access the kernel's memory directly. By contrast, _user space_ is all the memory that a user can access without modifying the kernel sources (or creating a [kernel module](https://tldp.org/LDP/lkmpg/2.6/html/lkmpg.html#AEN40)). The term _user space_ has also been used to refer to the programs that are run by users.

This memory separation is important because the kernel manages all hardware resources, providing access control and coordination, and provides abstractions that let programs that run in _user space_ make requests to interact with those resources. The kernel has several interfaces so that the _user space_ programs can communicate with the kernel, the most important one being the [_system call interface_](https://en.wikipedia.org/wiki/Linux_kernel_interfaces). These use the abstractions laid out by the kernel to ensure that users and programs don't interfere with each other and also iron out differences in the underlying hardware and provide a uniform "view" of the resources available to the machine.

![](https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Linux_API.svg/330px-Linux_API.svg.png "A diagram of what the user space and kernel space looks like, from Wikipedia.")

What is replspace, then? By analogy, replspace is all the memory that users of a repl can access, as well as the programs that can be run. In other words, _anything_ that a user of a repl can do is replspace!

## Tell me about the support for saving files now!

We have two ways in which we save users' files: [Operational Transformation history logs](https://blog.replit.com/collab#protocol-changes--operational-transformation) and [`btrfs` filesystem](https://btrfs.wiki.kernel.org/index.php/Main_Page) [snapshots](https://blog.replit.com/data-loss). Text files that are opened from the editor are saved with the former, which also provides nice collaboration capabilities. But non-text, binary files are not well supported by Operational Transformations, so we rely on saving the whole state of all the files through a feature of the `btrfs` filesystem in Linux called [snapshots](https://btrfs.wiki.kernel.org/index.php/SysadminGuide#Snapshots).

There are a few tools at our disposal that we can use to know when files changed. The most commonly-used one is a kernel _system call_ named [`inotify`](https://man7.org/linux/man-pages/man7/inotify.7.html), which lets users "monitor filesystem events" (changes to individual files, individual directories, or to files inside one directory). We use this feature to reload the new contents of the file in the editor after [formatting](https://blog.replit.com/intel#formatting) a file, or to know when another user in a multiplayer session created or deleted a file. But this feature is not very scalable: since it can only detect changes _in one directory_ at a time, detecting that _any_ file in a repl changed would be very expensive! So for the longest time, we have had this weird flow of the editor telling the repl about what set of files and directories it cares about, the repl telling the editor that _something_ the editor cared about changed, and then relied on the editor to detect when things change and start a new snapshotting process. This is why a repl that was started as a server was not able to save any files: there was no editor connected to tell the repl to save a new snapshot!

We currently use the [Long-Term Support version of Ubuntu Linux](https://ubuntu.com/about/release-cycle#ubuntu-kernel-release-cycle). It very recently released version 20.04.3 LTS, which included the 5.11 Linux kernel. [This](https://kernelnewbies.org/Linux_5.5) [includes](https://kernelnewbies.org/Linux_5.6) [lots](https://kernelnewbies.org/Linux_5.7) [of](https://kernelnewbies.org/Linux_5.8) [very](https://kernelnewbies.org/Linux_5.9) [cool](https://kernelnewbies.org/Linux_5.10) [features](https://kernelnewbies.org/Linux_5.11)! And buried inside the [5.9](https://kernelnewbies.org/Linux_5.9) release notes is a small change:

> [`fanotify`](https://man7.org/linux/man-pages/man7/fanotify.7.html): report events with names. With these you can now efficiently monitor whole filesystems [...].

And efficiently monitoring whole filesystems is _exactly_ what we needed to do in order to know when to save a new snapshot! Now we can stop having that weird repl-editor-repl flow and instead let the repl save a new snapshot every time it detects a new change to _any_ file inside the repl (with a little bit of delay to avoid saving _too_ often, like every time a new letter is typed in a file). The editor is no longer in the picture, so this behavior happens regardless of how the repl is started. Check out [a demo repl](https://sqlite.luisreplit.repl.co)!

Since repls run in a [Linux container](https://blog.replit.com/killing-containers-at-scale#replit-architecture), the kernel version that's accessible from the repl has to match the kernel that is used in the machine itself. This means that as a happy side-effect, all repls can now access all the new features unlocked by this upgrade. Note that not _all_ _system calls_ are accessible from replspace (because that would be a security nightmare for us!), but we're still very excited to see all the new things that you will build with these new capabilities. Especially because this upgrade made several things a tiny bit faster, and those things tend to add up.

We're huge proponents of building things that can then be used to [build more things](https://blog.replit.com/betting-on-nix), especially for the next generation of programmers and engineers. This has a [compounding effect](https://www.investopedia.com/terms/c/compounding.asp) because programmers in turn build things to make people's lives easier. If any of this inspired you to build something cool, let us know! And if you want to help us build the next big thing, [we are hiring](https://replit.com/site/careers)!