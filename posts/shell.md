---
title: Bash Shell Experiment
author: Rob Blanckaert
date: 2018-09-14T19:06:40.000Z
categories: product
---

Repl's now provide access to an experimental bash shell via the command palette (<kbd>F1</kbd>)

![shell](/public/images/blog/shell.gif)

The new shell UI uses Xterm.js, an upgraded terminal emulator from the one you are used to for repl output. It supports the full range of vt100 color codes and other commands like listening to mouse clicks. We hope to also bring to these same features to the repl output terminals soon.

**Note:** Changes to your files made in the shell will NOT be saved back to your repl.

This feature is still a little rough around the edges. Not all commands will work in all languages. If you have any feedback, we would love to hear it on our [canny board](https://repl.it/feedback/p/xterm-shell).