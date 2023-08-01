---
title: "Rebuilding the Replit Filetree for Superior Performance and Accessibility"
author: "Moudy Elkammash"
cover: https://blog.replit.com/images/filetree-updates/filetree-workspace.png
categories: eng
date: 2023-08-01
---

![](/images/filetree-updates/filetree-workspace.png)


*We recently rebuilt the Replit filetree with a focus on performance and accessibility. The result? Quicker interactions when exploring large projects and a more accessible experience with improvements like keyboard navigation. Here’s a summary of how the new filetree works.*

In the early days of Replit, it served as a simple but powerful editor and console. As our user base grew and their projects became more complex, we understood the need for a filesystem and, consequently, a filetree.

![Filetree in the editor](/images/filetree-updates/filetree.png)

This filetree worked for small projects but started to have some performance issues as projects grew in size. This was particularly noticeable once we started using [Replit to build Replit](https://www.youtube.com/watch?v=7TCqGslll-4&t=1835) – our web repo had around 8000 files. We decided to revamp the filetree, and today, we’re excited to share the improvements we’ve made, focusing on performance and accessibility.

## Reimagining the filetree: prioritizing performance

### Virtualization

The most significant source of performance issues for large filetrees was rendering all the rows, even those invisible to the user. Think of it like trying to read a hefty novel all at once - it's not efficient or practical. To solve this, we turned to [virtualization](https://www.patterns.dev/posts/virtual-lists). In essence, we now only render what's visible, or about to be visible while scrolling, making the process significantly faster and smoother.

Before this change, if you were to expand a directory with many files the UI could become unresponsive while all the rows are being rendered. Here’s a snapshot of the click handler executing when expanding a directory with 500 files.

The click handler on the old filetree took 344ms. [Speed matters](https://services.google.com/fh/files/blogs/google_delayexp.pdf), so this is not good!

![Click handler executing on the old filetree](/images/filetree-updates/old-virtualization.png)

The new one only took 16ms.
![Click handler executing on the new filetree](/images/filetree-updates/updated-virtualization.png)

Virtualizing presented some challenges. A filetree is a "tree," but to virtualize it we needed to render it as a flat list. To accomplish this, we took the data stored as a tree structure and flattened it into a list based on the loaded files and the expanded state of directories.

Another challenge of virtualization is that the HTML elements don't represent the tree structure. In the old filetree, we could rely on the parent element for each directory and use that to render a drop preview and gutter markers. With the virtualized approach, we needed to calculate the geometry of the views based on the tree data (rather than the tree view). Because of this change, we could also morph the drop preview size and position, since it’s a single element moving around instead of multiple elements inside each drop target. This makes the interaction feel fluid, helping you track where a file will be dropped.

![Virtualized filetree](/images/filetree-updates/dragging-file.gif)

### Local caching

Another way we boosted performance was by using local caching. This ensures recently viewed filetrees are readily available for immediate rendering in a read-only view. Once you're connected to the container, everything becomes editable, and any potential remote changes are synced. This allows you to see the files in your Repls faster, even when your network speed is slow.

![Local caching](/images/filetree-updates/filetree-workspace.png)

### Enhanced accessibility

Beyond performance, we also wanted to make our filetree more accessible. The old filetree had its limitations, especially in terms of keyboard accessibility. Making the new filetree keyboard accessible was mostly straightforward since we can easily map between the tree data structure and the derived flat list to move the focus around and expand/collapse directories. The flat list needed for virtualization did present some accessibility challenges. For example, we needed to add [aria-level](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-level) to define the hierarchical level of a file within the tree since the browser can’t infer it from that structure of the elements. This attribute exposes hierarchy to assistive technologies so it can be communicated to the users. Overall, these accessibility updates will allow you to conveniently move focus around and expand/collapse directories.

![Navigating the filetree using the keyboard](/images/filetree-updates/keyboard-selection.gif)

### Easy reusability

While performance and accessibility were the primary motivations for an improved filetree, we also wanted to make sure it was an abstraction that was easy to reuse. For example, the same filetree in the sidebar is used in the file path breadcrumb menu, so you can drag/drop and create files directly from the menu. This is useful since you often create new files relative to the directory of the file you are editing for styles, tests, or refactoring.

### Speed is a feature

Just like a conversation between humans, interactions with computers need to be fast to be effective. Nobody likes [slow software](https://www.inkandswitch.com/slow-software/), and we understand that. This new filetree is part of our ongoing efforts to make Replit quicker, more efficient, and user-friendly. We invite you to try out the new features, see the difference in performance and accessibility, and let us know your thoughts!







