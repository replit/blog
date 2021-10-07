---
title: Every Project Should Have Its Own REPL
author: Amjad Masad
date: 2016-07-21T07:00:00.000Z
categories: product
---

It's no secret we're big fans of REPLs. We believe that immediate access to the
programming environment accelerates learning and is generally more
productive. REPLs cut out the middleman -- no need to build UIs or scripts for
every possible action you might want to take -- just talk to the interpreter
directly.[](preview end)

In every medium-to-large project we embark on we include a `repl.sh` script that
starts out a REPL in the context of the project. This includes preloaded
libraries, custom commands, and a database connection when it makes sense. You
can interact with the database, use utility functions, and inspect the
environment in whatever way you find useful.

![repl](http://i.imgur.com/5cQFj5j.gif)

This is especially easy in NodeJS; the module that makes up the REPL that ships
with it is made into a stand-alone module [`repl`](https://nodejs.org/api/repl.html). Once you `require('repl')`
you'll be able to supply it with a custom `eval` function which you can then use
to process the and parse the code in whatever way you find useful before calling a
callback with a return value.

We love using async/await so we process top-level awaits with babel in the REPL
to make it very easy to add, update, or delete from the development
database. In the above gif you can see how we can test and iterate on our
notifications page by creating notifications from the REPL and see it update instantly!

To conclude, we encourage you to create shells and REPLs for your projects, it's
an easy productivity win!
