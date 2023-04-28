---
title: "Betting on CodeMirror"
author: Sergei Chestakov
cover: https://blog.replit.com/images/codemirror/cm-replit.png
date: 2022-03-10T00:00:00.000Z
categories: eng,product
---

At Replit, our mission is to bring the next billion software creators online. In order to achieve that ambitious goal, we need to make sure that the experience of writing, running, and sharing code is as seamless as possible. At the heart of that experience is the editor itself. As a result, we dedicate a huge amount of time and energy to improving the stability, performance, and accessibility of our editor.

## Monaco

For years, we had been relying on [Monaco](https://blog.replit.com/code-editors) to power that experience. Monaco is the open source editor behind VS Code, written and maintained by Microsoft.

![Monaco](https://blog.replit.com/images/codemirror/monaco.png)

At the time, the decision to adopt Monaco was an easy one. It was packed full of useful features that helped users navigate and write code quicker, had built in support for a large number of popular languages, and looked familiar to those coming from VS Code and other popular IDEs. These reasons, along with its growing open source community, quickly made Monaco the de-facto way to write code on the web.

However, as our needs grew more complex, we started running into issues. For one, Monaco did not support mobile, which was becoming increasingly important for us to achieve our goal of making programming more accessible. Instead, we had to rely on [Ace](https://ace.c9.io/), the Amazon maintained editor behind [Cloud 9](https://aws.amazon.com/cloud9/), to power our mobile IDE. This unfortunately meant that we had to write many of our features twice since Monaco and Ace’s APIs were incompatible. Worse still, this often led to us simply not porting those features over, which contributed to the already inconsistent experience across desktop and mobile.

On top of that, we found ourselves having to monkey patch the API and rely on undocumented features just to get our advanced language server and collaborative editing features to work. While many of these issues have since been fixed in recent updates, the only feasible solution back then was to maintain our own custom fork of the library. This made upgrading significantly more painful as we had to manually cherry-pick updates and reconcile them with our own changes.

When we tried to make changes to the editor, we found Monaco’s UI and functionality difficult to customize. The inability to use our own components and design system, in particular, made it feel out of place in our IDE as well as across the site. Additionally, Monaco’s verbose API and lackluster documentation made writing editor features notoriously difficult for engineers that hadn’t used it before.

Lastly, Monaco is huge. `monaco-editor` and related libraries contributed a whopping 51.17 MB to our bundle size (5.01 MB when parsed + gzipped) which had massive performance implications as loading the web app took a lot longer even when loading pages that didn’t render an editor. Over time, these pain points compounded and eventually pushed us to look for something new.

Ultimately, our reasons for moving off of Monaco came down to:

1. Lack of mobile support
2. A clunky API and subpar documentation
3. Difficulty in customizing the core editor components and functionality
4. Massive bundle size which led to degraded performance across the app

## CodeMirror 6

Luckily, there’s now a new player on the scene: [CodeMirror 6](https://codemirror.net/6/).

![CodeMirror logo](https://blog.replit.com/images/codemirror/codemirror-logo.png)

CodeMirror 6 is a complete rewrite of the CodeMirror editor with a focus on accessibility, touchscreen support, and extensibility. Compared to Monaco, CodeMirror is significantly more lightweight, performant, and customizable. It also has first class mobile support! In fact, we [replaced Ace](https://blog.replit.com/codemirror-mobile) with CodeMirror in our mobile IDE last year.

CM6 differs from other code editors in that it has a very small, generic core and nearly every feature you might expect from an editor (including basic ones like syntax highlighting and line numbers) are simply extensions. The core library itself isn’t even one NPM package! Instead, it’s setup as composable modules (like `view`, `state`, `language`, and more) that, together, provide a fully-featured text and code editor.

While this makes it harder to get started, the benefits of modularity easily justify the overhead. CodeMirror’s LEGO-like module system allows you to pick and choose which features you need and even replace core parts of the library with custom implementations. This approach was a huge advantage for us since it meant that we can customize the editor to our heart’s desire and really make it feel like our own.

![Minimal CodeMirror editor](https://blog.replit.com/images/codemirror/cm-minimal-editor.png)

The core library is framework-angostic and we found it easy to integrate with React. For example, many of the official extensions allow you to define a custom component for that feature by simply passing in a function that returns a DOM node to replace it with when initializing the extension. We're able to take advantage of that fact by returning a node that acts as a container for a [React portal](https://reactjs.org/docs/portals.html). This allows us to render custom React components (with access to our design system, UI library, and React context) in place of critical parts of the editor like the search panel, autocomplete tooltips, and context menu. Completely replacing core components of the editor like this was simply not possible with Monaco.

Finally, CodeMirror had a much smaller footprint. The editor, along with all of our extensions and language packages, contributed a mere 8.23 MB (or 1.26 MB when parsed + gzipped) to our bundle. In fact, the core library itself is barely 1 MB unpacked.

In short, CodeMirror, in contrast to Monaco:

1. Works well on mobile
2. Has a modern, extensible API with excellent documentation
3. Is easy to customize, style, and reconfigure
4. Is very lightweight and performant

## Architecture

From an engineering perspective, CodeMirror is architected in a very scalable way. The guiding principle behind its architecture is that it’s based on a functional core and imperative shell. It’s functional in the sense that the document and state data structures are immutable and operations on them are pure functions, but imperative in the sense that the user facing View component wraps this functionality with an imperative interface (since the browser’s DOM APIs are themselves largely imperative).

A great illustration of this is how changes to the document are made. Changes to state happen functionally by creating and dispatching a transaction that describes the changes to the document, selection, or other pieces of state (including custom fields specific to your app). This, in turn, tells the view to update itself, at which point it synchronizes the DOM to match the new state. The View also listens for DOM events (e.g. keyboard input), and translates those events into transactions that update the View’s state, and therefore, its content.

![CodeMirror Event Diagram](https://blog.replit.com/images/codemirror/cm-event-diagram.png)

The extension system is another really powerful concept that illustrates CodeMirror’s innate flexibility. Since the core library is so minimal, much of the functionality is implemented as extensions. Extensions can do everything from defining new fields in state, to styling the editor, to injecting custom components (like tooltips, widgets, and inline decorations) into view. Active extensions are kept in state and the system ensures that they don’t conflict with each other. In cases where multiple extensions do respond to the same events (e.g. DOM events or user-defined `effects` which enable communication across extensions), the order of this response is determined by precedence categories explicitly set by the user which makes their response predictable. Extensions can also be loaded and unloaded with ease since the active extensions themselves are stored as an array in state.

Lastly, the data model helps ensure fast performance. For example, the document is treated as a string (it really is just a text editor!) but is stored in a tree-shaped data structure internally to allow for cheap updates and efficient line based indexing. Similarly, document offsets are just plain numbers that address positions in the document string and can easily be translated to and from their respective line/character offsets as well as coordinates in the viewport.

## Making the leap

![CodeMirror + Replit](https://blog.replit.com/images/codemirror/cm-replit.png)

While adopting CodeMirror on mobile laid the groundwork for us to make a similar transition off of Monaco, the desktop migration proved to be much more involved. For one, we had many more features to port compared to mobile including keyboard shortcuts, Vim/Emacs keybindings, observation mode, threads, Codex, and more. Additionally, we had to implement a lot of functionality that we took for granted with Monaco from scratch.

Moving onto CodeMirror also came with some big risks. The library was much newer (and technically still in beta!), had a smaller community, and was visibly different from Monaco which many of our users had grown accustomed to. It’s also a time consuming migration as porting over all of our features and making the experience as close as possible to the old editor’s would take many months. Despite these tradeoffs, we decided it was still worth pursuing.

At Replit, we pride ourselves in being early adopters of new and exciting technologies like we were with [Vite](https://blog.replit.com/vite) and [Nix](https://blog.replit.com/powered-by-nix). In this case, we felt that betting on CodeMirror would be a much better choice long-term than doubling down on an increasingly outdated and bloated incumbent. If you want to get more insight on how we reached this decision, we recently published a [detailed comparison](https://blog.replit.com/code-editors) between Monaco, Ace, and CodeMirror 6.

## Embracing Open Source

As part of this massive undertaking, we also got heavily involved in the open source community. Given how new CodeMirror is, we quickly discovered that many of the features and custom plugins that we came to depend on in Monaco simply didn’t exist yet in CodeMirror. So we decided to develop and open source them ourselves! Here are some of the extensions that we’ve published since:

1. [Vim Keybindings](https://github.com/replit/codemirror-vim)
2. [Emacs Keybindings](https://github.com/replit/codemirror-emacs)
3. [VS Code keyboard shortcuts](https://github.com/replit/codemirror-vscode-keymap)
4. [CSS Color picker](https://github.com/replit/Codemirror-CSS-color-picker)
5. [Indentation markers](https://github.com/replit/codemirror-indentation-markers)
6. [Nix language support](https://github.com/replit/codemirror-lang-nix)
7. [Solidity language support](https://github.com/replit/codemirror-lang-solidity)
8. [CodeMirror Interact](https://github.com/replit/codemirror-interact)

CodeMirror Interact, a library that lets you edit values in your editor by clicking and dragging, is especially exciting and goes to show just how powerful CodeMirror’s extension system really is:

![CodeMirror Interact](https://blog.replit.com/images/codemirror/interact.gif)

In addition to contributing code, we’re also giving back financially. Since we first adopted CodeMirror late last year, we began contributing $1000 a month to its development. On top of that, we’re also contributing $300 a month to the development of [Emmet](https://emmet.io/), a popular editor plugin for writing HTML and CSS. As one of our most requested features a few years ago, we decided to partner directly with the library’s maintainer to develop and ship an [extension for CodeMirror 6](https://github.com/emmetio/codemirror6-plugin).

Overall, we’re excited to be placing such a huge bet on the next generation of online code editors and continuing to advance the future of writing software on the web. If any of this sounds interesting to you, we're [always hiring](https://replit.com/site/careers).