---
title: Universal Package Manager
author: Amjad Masad
date: 2018-07-19T07:00:00.000Z
categories: product
---

Open-source has revolutionized software development -- it wouldn't be an
overstatement to say that it's been the most significant productivity win for developers
in the last decade or so. At Repl.it, our goal is to make programming more
accessible and what better way to do that than make available to programmers the
entirety of open-source packages available at their fingertips.

Today we're excited to announce our Universal Package Manager -- the Repl.it
package manager that will grow to support every language on our platform. We're
now starting with JavaScript, Python, HTML/CSS/JS, and the web frameworks that
we support.

<div style='position:relative; padding-bottom:75.00%'><iframe src='https://gfycat.com/ifr/AmazingPessimisticAddax' frameborder='0' scrolling='no' width='100%' height='100%' style='position:absolute;top:0;left:0;' allowfullscreen></iframe></div>

We've had [basic support](python-import) for automatic package detection and installation for a
while now, but what changed is that we support search and spec files
(package.json, gemfile, requirements.txt, etc) across the board. Furthermore,
where we used to write custom code for every language that we support, now we
merely add fields to a config file.

This was mad possible by creating a common package manager runner abstractions.
Adding package manager support for a language is as easy as adding a
couple of fields in a JSON config:

```json
  "dependencies": {
    "env": {
      "PYTHONPATH": "/run_dir/customize",
      "MATPLOTLIBRC": "/run_dir/"
    },
    "installDir": ".site-packages",
    "findCommand": [
      "python",
      "/run_dir/findreqs.py",
      "--ignore",
      "~/.site-packages"
    ],
    "installCommand": [
      "pip",
      "install",
      "--target=~/.site-packages"
    ],
    "specFile": "requirements.txt",
```

In addition to this we have a more ambitious project in the works to build the same package
manager that works across all languages (with the same semantics). You should
[come work](/site/jobs) with us.

[Signup](/signup) and start [coding](/languages).