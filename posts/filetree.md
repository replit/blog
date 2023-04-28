---
title: Branching out the Filetree
author: Adriana Poznanski, Tyler Angert, Xiaoyi Chen, Arnav Bansal
date: 2022-11-14
cover: https://blog.replit.com/images/filetree/filetree-cover.jpg
categories: eng,product,design
---


The filetree is a central surface of the workspace which has long been under-leveraged to support the workflows of users. As part of our ongoing workspace revamp, we're shipping improvements to make the filetree more usable and powerful. These improvements include:
  1. fixing existing usability issues to make file management seamless
  2. improve rendering and loading performance
  3. introducing new features to enhance workflows in the workspace

### Multiselect
Say goodbye to painstakingly moving files one by one, because long-awaited bulk actions are now ready for use in the filetree! In the desktop workspace, simply hold down `shift` to multiselect files. You can also hold down `alt` to multiselect files incrementally. You can move multiple files at a time by dragging them to your desired location, or perform other bulk actions like open tabs, open pane, download, and delete from the context menu.

![multiselect](/static/images/filetree/multiselect.gif)

You can open multiple files by dragging them to pane headers and to split panes.
![drag file to header](/static/images/filetree/drag-file-to-header.gif)
![drag file to pane](/static/images/filetree/drag-file-to-pane.gif)

Don't want to use `alt` for incremental multiselect? Configure the multiselect modifier key to be `command` / `control` in the settings.

![multiselect-modifier-key-settings](/static/images/filetree/multiselect-modifer-key-settings.png)

### Clarifying visual hierarchy
We've made some stylistic changes within the filetree to eliminate ambiguity surrounding file and folder hierarchy. Files no longer include a left side gutter, and folders no longer include a caret icon. This way, files and folders at the same hierarchical level are directly aligned. Open folders are now differentiated by an open folder icon, and include a containment line at the left border of their contents.
![hierarchy-fixes](/static/images/filetree/hierarchy-fixes.jpg)
You can also now close folders by simply clicking on their containment line—this makes navigating the filetree much faster and easier, especially from large folders.
![folder-nav](/static/images/filetree/gutter-close.gif)

### Performance improvements and refactoring
<!-- rendering performance -->
We've made significant optimizations on loading and rendering performance of the filetree.

- Previously, when loading a deeply nested file in the filetree, we eager load all the folders that are currently visible. The file that we wanted to open in the editor was loaded last.
- Now, we've changed the loading sequence to load the file we are interested in and its ancestor folders first.
- We also avoided waiting on some GraphQL queries that are not necessary for the initial load.

As a result, we have improved loading performance by order of magnitudes in large filetrees.

![loading-perf](/static/images/filetree/loading-perf.gif)

We've optimized the rendering performance by avoiding accessing states and contexts that changes frequently in nested components. We moved the states down and broke down components into smaller components that concern separate pieces of states. Changing active files no longer rerenders the entire filetree, instead it only renders the relevant directory and folder nodes.

<video src="https://blog.replit.com/images/filetree/filetree-render-perf.mp4"  class="css-3qjkrt" autoplay muted playsinline loop controls></video>

These performance improvements are made possible by a complete refactor of the underlying implementation of filetree.

- We changed state management from React context to [jotai](https://jotai.org/). Jotai reactively tracks dependent state values, preventing extra rerenders of irrelevant components. This is especially handy in a nested UI like the filetree.
- We've broken down the states into small, composable atoms. The states are no longer convoluted in a big React context, instead they are seperated by file / module boundaries and we can compose the state easily. The state changes are driven by events like clicks, drag and drop, and context menu action.
- We've componentized the filetree more. We made the filetree an isolated, reusable component accepting an API abstracting away the file system operations.

<!--![filetree-states](/static/images/filetree/filetree-states.png)-->

With these changes, we are able to extend the filetree with more flexibility, without sacrificing performance.

### Filetree searching and filtering
Previously, file search features were only available within the workspace by way of the command bar. Now, we've given the filetree a search bar of its own to increase the discoverability and accessability of these features. Using the filetree search bar, you can search your Repl for specific files or phrases and the results will be rendered directly in the filetree. Spend less time lost in the filetree and more time building something great!

![search](/static/images/filetree/search.gif)

## Future improvements

We hope you find the new and improved filetree to be much more ergonomic, and that these features help streamline your workflow in the workspace. 

More improvements and features are coming soon including:
- keyboard navigation
- file content search
- mobile multiselect interactions
- open file states
- advanced search and filtering
- more performance improvements and render filetree in a virtualized list
- custom sections and icons
- arbitrary reordering

Stay tuned for this and many more workspace updates in the near future—until then, happy coding!