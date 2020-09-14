---
title: wow ot is hard
author: mr fariss and a lil bit of turbs
cover:
---
- history of code editing on repl.it
  - writing to db sending every file on every run
  enter file system
  - writing to gcs
  - writing to container to gcs
  - MULTIPLAYER & OT
    - added extra problems

When your start-up is in its infancy, you take as many shortcuts as you can to get to market, validate your idea, and provide a service to people as soon as possible. Over the years, we rewrote the file infrastructure for Repl.it went multiple times; each step of the way was motivated by a product feature or unlocking capabilities for the user.

When we first started, all code execution was client-side, and there was no concept of files; each project had a single file.  To run the code you typed into the editor, we get the editor's content and run it through a function that outputs your program's result to the console. Similarly, to allow you to share your code and find it the next time you visit the website, we periodically sent the editor's content to the database, stored along-side the project's metadata in a column called "editor_content." Client-side code evaluation worked well and got us far. Still, it's limiting. Many languages cannot run in the browser, not to mention the plethora of things you can do if you had an actual machine, such as creating a server or using the filesystem.

Moving the evaluation to the server didn't change the way we dealt with files. The only difference was that instead of running the editor's content through a local function, we sent the content to the server to evaluate it. However, people started expecting more and more from our platform. They expected to interact with the filesystem programmatically, wanted multiple files in their repls, etc. We made the right decision early on adopting containers (TODO link to container explanation) as our sandboxing solution, which meant each user has their own machine to work with, and all the expectations above were readily possible.


- everything was on the client, life was easy
- went multiplayer. read all about it here https://blog.repl.it/multi 
- life got a lot harder
- should we mention?: we regressed
- our infra is based on ephemeral stuff, we need to be highly crash recoverable
- ot in an ephemeral world is kinda tricky
- chipping away at all the possible states
- relentlessly checksuming, sometimes you find bugs in you libs

The technology behind multiplayer on Repl.it has been through many iterations. Each implementation unlocked many capabilities and taught us important lessons.

no multiplayer -> going live -> always multi player -> multi player native

(should link to the mutliplayer blog post and protocol blog post)

Concurrent editing it turns out is REALLY hard man. After surveying the existing technology we settle on a very simple version of text based operational transform. We found OT is well understood... was the easiest conceptually to understand... has the best support / ecosystem... prior art.

Writing correct code is hard

When first adding multiplayer we put a significant amount of work to ensure our code was correct. When entering an incorrect state it must be self correcting. 

Getting OT right is really hard. Before making any attempts to change stuff we've put a lot of work

https://github.com/josephg/unicount/pull/1
https://github.com/protobufjs/protobuf.js/pull/1486

![crc32 mismatches](images/crc32_mismatch.png)
![prompted percent](images/prompted_percent.png)
![ot ops graph](images/ot_ops_graph.png)