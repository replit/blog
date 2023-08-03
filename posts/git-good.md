---
title: "Making Git Good"
author: Brian Pool, Ian Kirkpatrick, Tyler Angert
date: 2023-05-15
cover: https://blog.replit.com/images/git-good/cover.jpg
categories: product,eng,design
---


![preview](https://blog.replit.com/images/git-good/preview.jpg)

# Improving Git on Replit

There has been a new Git pane in Repls for a little while now. This new Git UI you see is a part of a complete rewrite of everything Git-related on Replit: both engineering and design. It is the start of our journey into more deeply integrating Git into Replit, with much more to come. Let's talk about it!

![Git on Desktop and Mobile](images/git-good/mobile-desktop.jpg)

## Design challenges

### Making Git more accessible

Git can be hard to use. Whether you’re a professional developer or a beginner, it’s incredibly easy to make [simple mistakes that seem impossible to fix](https://ohshitgit.com/) and can suck hours out of your productivity. Ultimately, dealing with bugs and misunderstandings like these sink your attention into learning obscure tools and distract you from what you're actually trying to build.

That being said, we didn't try to do things like rename terms or introduce new concepts. Everything you see in the new UI is "regular git" except we really tried to tie a few concepts together visually and simplify workflows (multiple steps you'd usually take in a row while working on a project). For example, grouping commits, staging, and `.gitignore` data together. We also made the commit timeline more interactive, and added "remote modules" interspersed with the timeline that lets you know which commits are up to date with the remote.

![Commit History](images/git-good/commit-history.jpg)

Unfortunately, previous efforts to improve the git experience were unsuccessful because the previous Git pane was built using legacy code and architectural patterns (Redux anyone?). It was slow, had bugs and no-one wanted to touch it. That’s why we've completely rebuilt the Git integration, striving for it to be accessible to beginners and powerful for professionals. This rewrite allowed us to move faster and build a significantly better experience.

### Designing for desktop and mobile

Our new Git pane was designed for both desktop and mobile without compromising functionality or experience on either platform. In fact, all of our mocks were designed on mobile first, and *no* modifications were made to make it work well on desktop. Of course, there's some form-factor customization we can do in the future, but building mobile-first was a great foundation.

### Making it flexible and resilient

Remember: Git is an "open source **distributed** version control system," which means you can't guarantee where a contribution is coming from! It could be from the GitHub website, auto-generated by a deployment bot, from someone's local machine, from Replit, or wherever Git is installed. This made developing seemingly simple features really difficult because of all the edge cases– even something like showing a person's Avatar next to their commit! We have some special cases for GitHub support, but ultimately you can use this new git client with or without GitHub and the experience should largely be the same.

Further, we took this as an opportunity to really make merging easy to follow and understand. There's still a lot of work left here (especially to integrate with the rest of the IDE), but we made sure to clearly expose as many useful error and warning states as possible with the merge UI.

![Merge UI](images/git-good/merging.jpg)


### Knowing when to open Pandora's box

We faced a lot of scoping issues in the beginning of this project. On one hand, since we own the whole IDE, we could really go crazy and make a "replit-native" version control system. Or, we could simply "make git good" and focus and get something out the door that was better than the previous git pane. We opted for the latter option, especially since the old Git experience was actively causing bugs in existing projects. There's still a future where we totally reinvent what "history" means on Replit, but for now we also need to guarantee that the standard version control experience is top notch.

## Powering the Pane

Powering the new pane is a newly created Git service. It allows for safe and reliable interactions, getting fully typed responses back from Git.

### Nailing the Basics

When architecting the new Git service we set out to nail the basics. It should be able to reliably perform everyday tasks like getting diffs, staging files, committing, and pushing. And it shouldn’t regress. Achieving this means starting out with a solid foundation. You need a maintainable service with ergonomic APIs that work reliably so bad code design doesn’t become bad user experience.

### Complexities of Git

That’s a daunting task. Git, frankly, can be maddening:
- It doesn’t work the way you might expect it to: it’s snapshot based instead of patch based
- The state of a Git repository can be extremely complicated, partially due to the number of features Git has, and partially due to how much it allows for configuring a repository
- Determining useful information like when a branch was merged or what branch it was merged into is surprisingly hard or outright unsupported
- It’s easy to confuse popular Git services like GitHub with Git itself. You don’t need a GitHub repository to use Git, but to a beginner they might seem the same!

### Error-Hardened Behavior
The new service is built to account for these complexities and more. It employs defensive logic to make sure the repository is always in a safe state before executing Git commands so they run predictably. The service is extensively tested, letting us ship with confidence knowing that core features won’t regress. It doesn’t naively assume that Git calls will always succeed, it _expects_ errors. 

The service knows how to parse errors and depending on the command it can even work around them automatically. If an error is not recoverable, it’s surfaced transparently to whatever was using the service.

A good demonstration of this hardened behavior is the Git pane's unborn branch view, which will be shown when you're on a branch with no commits. This is an uncommon state, usually only seen when first initializing a repository. Try opening a Repl and forcefully entering this state with the shell command `git checkout --orphan your-new-branch` and see how the Git pane handles it!

We hope to one day open source this service, so that you may use it in your own projects.

## Future Work

We have a lot more we want to do with Git. Integration into our [OT based editing and history](https://blog.replit.com/history2-release), rich file diffing, UI that can handle the complexity of merging and rebasing, and so on. We are also trying to take inspiration from common workflows like using [undo/redo and copy/paste together](https://tyler.cafe/graphics-and-versions#undoredo-+-copypaste-is-an-unbeatable-pair). Our efforts to improve your experience with using Git on Replit will end only once it's a seamless and reliable part of the workspace.