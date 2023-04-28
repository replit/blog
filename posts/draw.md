---
title: A whiteboard for every repl
author: Jeremy Press
date: 4-23-2021
cover: https://blog.replit.com/images/draw/botross.jpeg
categories: product,design
---

Replit is a place where beginners, educators, and professionals alike can code and share their ideas collaboratively. Something that goes hand and hand with your source code is how you communicate it. We built [threads](https://blog.replit.com/threads), which allow you to leave contextual messages around code, and added better [markdown support](https://blog.replit.com/markdown-preview) for READMEs and other guides. However, we were missing a visual way for people to explain and collaborate around code. Today we're excited to announce support for draw files, powered by [excalidraw](https://excalidraw.com/).

<img src="images/draw/botross.jpeg" alt="Bot Ross" style="width: 45%;"/>


Any new file with the `.draw` extension will become a whiteboard to sketch shapes, draw freely, and add text. These files are multiplayer by default, anyone who joins your repl will be able to sketch and diagram along with you. During this period of remote collaboration, we've used draw files to sketch out problems with candidates during interviews, to diagram how our internal systems work, and to quickly prototype user flows.

<img src="images/draw/draw.gif" alt="Example drawing" style="width: 100%;"/>


 ### How it works
 Thanks to the awesome open source [excalidraw](https://github.com/excalidraw/excalidraw) project, we were able to combine their library with our infrastructure to treat .draw files just like any other file in your repl. We use the same file structure under the hood, which makes importing from excalidraw a breeze (just save your work on excalidraw.com with a .draw extension and upload it to Replit).

 ### What's next
 We have more planned for draw files in the future, including:
 - color support and more drawing options
 - saving and downloading drawings as images for use in markdown preview
 - read-only support for presentations and lectures


 We're excited to see how you'll sketch, prototype, and teach with draw files!

 Special thanks to [@Vjuex](https://twitter.com/Vjeux) and [everyone working on excalidraw](https://github.com/excalidraw/excalidraw/graphs/contributors) for a fantastic project.

