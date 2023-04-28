---
title: A database for every repl
author: Sidney Kochman
date: 2020-09-14
cover: https://blog.repl.it/images/database/still.jpg
categories: product
---

Repl.it is already the best place to build your apps. But there was a missing piece: where do you store your data?

We’re introducing Repl.it Database: a fast, free, and easy key-value store that’s built into every repl.[](preview end)

All you have to do is import one of our packages for [Python](https://pypi.org/project/replit/), [Node.js](https://www.npmjs.com/package/@replit/database), or [Go](https://github.com/replit/database-go), and you can instantly start setting keys in your database.

![Database](images/database/database1.gif)

Because Database is built-in, there is no setup, provisioning, or configuration. It's the fastest and easiest way to store data on Repl.it.

To get off the ground, fork our [example Python and Flask emoji app](https://repl.it/@util/Database-Flask-comments-example) so that you can quickly get to hacking!

<iframe height="600px" width="100%" src="https://repl.it/@util/Database-Flask-emoji-example?embed=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Key-value

Key-value databases are conceptually simple: they’re a flat map of keys to their values. There are no schemas, tables, or columns. There are only a few operations that you need to perform: set a key to a value, get a key’s value, delete a key, and search for keys.

Those simple operations are enough to support all kinds of applications, from blogs with posts and comments, to game backends with leaderboards, to [email platforms](https://repl.email).

## Multi-language

We provide Database clients for [Python](https://pypi.org/project/replit/), [Node.js](https://www.npmjs.com/package/@replit/database), or [Go](https://github.com/replit/database-go). But you can talk to Database from any language over HTTP. Take a look at [the documentation](https://docs.repl.it/misc/database) for more details.

In Python, our client serializes and deserializes dictionaries and lists so that you can use them to store more complex data:

![Database](images/database/database2.gif)

## Get started

Repl.it is the best place to start building your app. And Database is the easiest way to just jump in, get coding, and store your data without having to set anything up.

For more details on Database, click on the Database icon in your repl’s sidebar or [check out the documentation](https://docs.repl.it/misc/database).

With Database, you can build a fully-featured app entirely on Repl.it. We can’t wait to see what you create!
