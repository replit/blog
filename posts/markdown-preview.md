---
title: Markdown Preview
author: Sergei Chestakov
date: 3-11-2021
cover: https://blog.repl.it/images/markdown/preview-cover.png
categories: product
---

It's always been super fast to start writing markdown in a repl. However, the more we used it, the more we realized there were some key features we were missing that would make our lives easier. Which is why we're excited to announce all of the new improvements we've made to the markdown editing experience on Replit!

Now, if you open up a markdown file (a file with a `.md` extension), you'll notice that a new tab appears to the right of your editor with the file's contents. This allows you to see a live preview of the rendered markdown right as you type it! You can also toggle the preview off if you no longer wish to see it. The file that's being previewed will persist in the markdown tab until you open another markdown file or toggle it off explicitly. This has the added benefit of being able to see instructions or notes, like the repl's README, alongside your code.

<img src="images/markdown/preview.gif" alt="Markdown Preview Demo" style="width: 100% !important;"/>

You'll also notice in larger documents that the preview window stays synced with your current position in the file. As you type or move your cursor in the editor, the markdown pane will scroll with you, consistently keeping your cursor in the center of view.

<img src="images/markdown/preview-follow.gif" alt="Markdown Preview Follow Cursor" style="width: 100% !important;"/>

Lastly, we've added the ability to render local images that you reference in your markdown file directly in the preview pane!

<img src="images/markdown/preview-images.gif" alt="Markdown Preview Image Rendering" style="width: 100% !important;"/>

We make use of these features every day internally. In addition to writing bots and helpful scripts on Replit, we also use it to host our company handbook, this blog, as well as all of our meeting notes and design docs. It's been incredibly useful for us to be able to keep our notes in the same place as our code, all hosted, synced, and easily shareable. It also has added benefits like being able to write and execute a bash script, `new.sh`, that generates a new markdown file based on an existing template. Plus it allows you to type using Vim (or Emacs) key bindings out of the box! These updates, in addition to all of our new collaborative features like [threads](https://blog.replit.com/threads), have enabled us to move off of Google Docs entirely.

We find these new improvements incredibly useful and hope you do too. Over time, we think more and more teams will prefer to write markdown in Replit because once you've started using it, it's hard to go back. Gone are the days where you have to open a pull request to fix that typo you noticed in the README. Instead, you can just fix it.