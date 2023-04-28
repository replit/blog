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