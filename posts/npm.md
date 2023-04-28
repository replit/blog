---
title: Require any npm package
author: Amjad Masad
date: 2017-03-28T07:00:00.000Z
categories: product
---

Last year we introduced support for importing [any Python package from
PyPi](python-import) and -- although we don't have perfect support for all
packages -- it turned out to be a very popular feature. That's why today we're
excited to continue the roll-out for the rest of our platform starting with
web-based languages. [](preview end)

Whether you're using plain old [JavaScript REPL](/languages/javascript),
[HTML/CSS/JS](/languages/html), or [ES2016](/languages/babel), you'll be
able to import any package from npm (that can run in the browser).

![require packages](/public/images/blog/library.gif)

How it works is that we parse out the requires from your code,
fetch the bundle from npm via [wzrd.in](https://wzrd.in), and evaluate the
bundle in the same context as your code.

Note that ES6 imports is not currently supported but we're hoping to get it in soon.

Thanks to [Phạm Ngọc Quang Nam](https://github.com/NamPNQ) for his work on this
feature, npm for the registry, and wzrd.in for the awesome packaging service.
