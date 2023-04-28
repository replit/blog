---
title: Image Previews with Live Reloading
author: Tim Chen
date: 2018-06-15T00:00:00.000Z
categories: product
---

We recently added some changes to how [eval mode/project mode](/site/docs/files) operates.  These changes allow you to interact with generated files through the console.

Essentially, a repl is now in eval mode if the repl does not have any additional files of the repl's language - for example, a python repl with image files but no other `.py` files will still be in eval mode, granting you access to the console.

This means that in addition to interacting with declared variables and functions in the console, you can interact with generated files as well!  Additionally, any newly generated media files will appear in a separate preview pane in your repl.  Here's a quick demonstration of both features at work, using python3 and matplotlib:

![gif of repl below in action](/public/images/blog/interactive-plotting.gif)

Try it out for yourself [here](https://repl.it/@amasad/interactive-plot), or get started with a repl in [any language](/languages/)!

For python3 and matplotlib, here's some [docs](/site/docs/python-plots) on plotting on Repl.it.