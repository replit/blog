---
title: SQLite, replified
author: Sidney Kochman
date: 2019-08-02T17:00:00.000Z
categories: product
---

SQLite is now a supported language [on Repl.it](https://repl.it/languages/sqlite)! Our SQLite support brings the entire SQLite command-line interface right into your workspace. Now you have a simple way to experiment, prototype, or refine your data model with SQL.

## What is SQLite?

SQLite is an embedded database. It’s typically found in applications that need to store data without relying on an external database process, such as web browsers or small-scale websites. You could already use SQLite inside other languages on Repl.it, but now you can create a repl dedicated to SQL.

SQLite comes with a powerful command-line interface. It has features that allow you to customize output, load and save files, and inspect your database. 

By default, your database is only in memory. But since you have the full SQLite CLI, you can easily use the `.save` or `.open` commands to work with persistent, file-backed databases right in your workspace.

[Try it out](https://repl.it/languages/sqlite)!

## How we did it

To bring this interface to Repl.it, we needed to add SQLite support to [Prybar](https://github.com/replit/prybar), which is our open-source project to wrap language interpreters with a common interface.

One of Prybar's goals is to provide a set of universal options for interacting with various interpreters, such as setting the prompt or making an interpreter start quietly without outputting any header or version information. These features are how we're able to customize interpreters for use within repls. Unfortunately, the SQLite CLI doesn’t have an option to suppress its version output when it starts up. So we had to add one!

We did this by figuring out what system calls the CLI makes when it prints, using `LD_DEBUG` and `ltrace`. We made our own shared library that intercepts the calls to print its version, and then, if Prybar is operating in quiet mode, we silently discard them instead of passing them on.

Whenever Prybar starts the SQLite CLI, it sets an environment variable called `LD_PRELOAD` to make sure our library has precedence over the system’s. How does `LD_PRELOAD` work? Here's an example, for those of you who might know a thing or two about C:

Notice that our `main.c` only ever prints "hello!" but `LD_PRELOAD` lets us append " goodbye!" to every message without modifying the existing code.

<iframe height="400px" width="100%" src="https://repl.it/@kochman/HelloGoodbye?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

This allows us to make our own customization by simply modifying the behavior of the existing binary—no forking or elaborate build process required. Take a look at [how we did it with SQLite](https://github.com/replit/prybar/commit/3fb14f2a46b628317d7dbb1c67d9cf078ee272c1).

We also created tests so we can ensure that our patch is always compatible with new versions of the SQLite CLI. If something that our patch relies on changes, our continuous integration tests will notify us so that we can fix it before deploying new versions of SQLite to the community.

For more information on Prybar, Polygott, and everything else that goes into supporting a new language, take a look at [how we added support for Emacs Lisp](https://repl.it/site/blog/elisp).

Don’t forget to [give SQLite a try](https://repl.it/languages/sqlite) and [let us know what you think](https://repl.it/feedback/)!
