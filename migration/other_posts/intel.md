---
title: Zero Setup VSCode Intelligence
author: Faris Masad
date: 2018-07-02T00:00:00.000Z
categories: product
---

At Repl.it our goal is to provide state of the art in developer tools to
everyone in the world, for free. When we started moving our product beyond a
simple REPL and started adding IDE features, we had to invent standards and
wrappers around every language tool for our frontend to consume. For every
editor feature, say errors and warnings (linting), we had to extend our
development protocol with a set of commands and data structures, and then teach
our development containers how to wrap the given tool, say Pylint, and our
frontend on how to consume it (say annotate the editor with errors and
warnings). A similar thing has been happening with IDEs for the past few decades
-- every editor had to come up with their in-house ad-hoc protocol, and every
tool developer had to build adapters and wrappers for editors to consume.

However, this is about to change: a couple of years ago, Microsoft's VS Code
team announced ["A Common Protocol for
Languages"](https://code.visualstudio.com/blogs/2016/06/27/common-language-protocol),
a single all-encompassing protocol that provides general-purpose language
tooling -- be it refactoring, code-completion, or errors and warnings -- all
implemented once and then seamlessly plugged into any editor that understands
this protocol — this was dubbed the "Language Server Protocol"
[(LSP)](https://microsoft.github.io/language-server-protocol/).

In addition to LSP, VS Code also open-sourced the editor that powers VS Code:
[Monaco](https://microsoft.github.io/monaco-editor/). Monaco is an editor built
with web technologies, and since we started looking at LSP a few months ago, it
only made sense for us to transition to Monaco first. Even before the
introduction of LSP on Repl.it, Monaco allowed us to provide some cool language
features (Smart Autocomplete, Go to Definition, Find References) for TypeScript
and JavaScript because they're bundled with the editor. On top of that, the
editor has a slick feel to it.

In this release, we're rolling out language servers for Python (2, 3 and
Django), C, C++, and ReasonML. And soon we'll be adding support for more
languages -- Java and Ruby are looking to be next in line.

Let's run through some of the features:

### Autocomplete and signatures

<img style="width:75%" alt="autocomplete and signatures" src="https://repl.it/public/images/blog/lsp/autocomplete.gif">

### Jump to definition

<img style="width:75%" alt="jump to definition"  src="https://repl.it/public/images/blog/lsp/def.gif">

### Find references

<img style="width:75%" alt="find references" src="https://repl.it/public/images/blog/lsp/refs.gif">

### Refactor

<img style="width:75%" alt="refractor" src="https://repl.it/public/images/blog/lsp/refactor.gif">


### Linting

<img style="width:75%" alt="linting" src="https://repl.it/public/images/blog/lsp/linting.gif">


### Hover

<img style="width:75%" alt="hover" src="https://repl.it/public/images/blog/lsp/hover.gif">


### Formatting

<img style="width:75%" alt="formatting" src="https://repl.it/public/images/blog/lsp/formatting.gif">

## Conclusion

Give it a spin by going to the [languages](/languages) page and selecting one of
the supported languages (Python, ReasonML, C, C++ for now).

This release gets us one step closer to our vision of building what we call "[a
holistic development service](https://repl.it/site/blog/holistic)," a long-lived
always-on service that understands your code in all its stages and that you can
use anywhere and at anytime, regardless of your device, platform, location, or
your programming language.

We've given ourselves the impossible task of building a top-notch ready-to-use
development environment for every language under the sun. It remains to be seen
whether we'll be successful at this, but what's clear is that we can't do it
alone. So thank you to the VS Code team and the fantastic community building
language servers for making our jobs easier.

Stay tuned for more language LSP support.