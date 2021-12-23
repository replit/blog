---
title: Share where you are in a Repl with Deeplinking
author: Sergei Chestakov 
date: 2020-05-22T00:00:00.000Z
cover: https://blog.repl.it/images/replit-logo-and-name.jpg
categories: product
---

Oftentimes when we're sharing a repl with a friend we want to link them to exactly where we are in our project. Well now you can with deeplinking!

Deeplinking allows you to link to any file in your repl as well as specific lines and columns within that file.
You may have noticed that the URL hash now changes as you navigate throughout the different files in your project. For example, if you're in `src/index.js`, it should look something like this:

![URL with path to file](images/deeplinks/deeplink-to-file.png)

This means that all you have to do to link to the file that you're currently in is copy the URL!
This also affects your browser history so if you hit the back button it'll take you to the last file you viewed rather than away from your repl entirely.
If you want more granularity in your links, you can add `:line` or `:line:col` to the end of the URL. So linking to the 5th line and 12th column in `src/index.js` looks like this:

![URL with path to file, line, and column](images/deeplinks/deeplink-to-file-line-col.png)

Alternatively, removing the ":12" here would link you to the beginning of the 5th line.

For example, here's a link to the start of the `draw` function in `script.js` in one of our templates:
<iframe height="500px" width="100%" src="https://repl.it/@templates/p5js-Game-Starter?lite=true&embed=true&tab=code#script.js:7" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

In the future, we could expand this feature to include things like named deeplinks so that you can easily create aliases for important parts of your codebase.

We hope this makes it easier to share your repls and hack with your friends!