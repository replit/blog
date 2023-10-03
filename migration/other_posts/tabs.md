---
title: A Tale of Two Tabs
author: Tyler Angert and Moudy Elkammash
categories: product,design
cover: https://blog.replit.com/images/tabs/cover.jpg
date: 2022-08-11
---

Today we're launching a long-awaited feature in the Workspace: Tabs! Yes, you can finally:

- Open two files side by side
- Open as many shells as you'd like
- Remove tools you don't need to use

![tabs demo](https://blog.replit.com/images/tabs/amasad-tabs-demo.gif)

It's important to note that these problems could've been solved in *many* different ways, but we decided to fix all of them from the ground up. Instead of building bespoke features to solve individual painpoints, we focused on creating a *flexible system* that could solve a range of use cases with one new primitive: the general-purpose tab.

Let's dive in!

## How it works

Here, you are looking at a new tab in the workspace.
![new tab](https://blog.replit.com/images/tabs/new-tab.jpg)

You'll notice a few things. When you open a new tab, you see a list of recently accessed files and tools. You can search through all available tools like `Shell`, `Console`, `Docs`, and `Markdown`, as well as search through files and file contents. Search and discovery of Replit's capabilities are available in every new tab you open.

Because you can open files *and* different tools in tabs, you can mix and match all kinds of tabs together based on what you need for your project. You can put your Discord bot directly next to the shell that's testing it. You can create a row of tabs for each step in an interactive tutorial. You can have docs directly next to your tutorial code. You can set up a pair programming environment with your friend on one side and you on the other.

In short: you can organize the Workspace based on how you *think* about your project– not just around content type.

![tabs screenshot](https://blog.replit.com/images/tabs/tabs-screenshot.jpg)

This isn't just important for users. Arbitrary tabs and layout customization also unlocks a lot of flexibility for us (the Replit team!) to build customized environments inside Replit itself. For example, we're thinking of letting you save layout when you publish templates– meaning we can preload the exact tools you'll need for different languages and environments. We can build hyper-specific templates and tools for educators just by customizing the tabs loaded in a Repl. This is a huge win for flexibility *and* scalability.

## Design challenges

The main design challenge with creating this was not only figuring out the behavior *within* a tab itself, but the behavior between tabs.

- Should you be able to open multiple instances of any tool, like the console?
- How do we group tools together? Are files distinct from tools?
- Should everything– including tools like the shell and console– actually be represented as files?
	- Tangential philosophical question: what is the difference between a file and an app?
- What do we search by default?
- What is the default position for a newly opened tab?
- What happens when you delete the last tab in a pane?
- When you observe someone in the workspace, should you just see their file, or all of their open tabs?
- Should we support undo/redo with opening and closing tabs?

We didn't answer all of these questions in this release, but trust us– if you find something that seems missing or would be a great addition– we probably have it planned in a future release :)

## Taking inspiration from the Browser

![chrome tabs](https://blog.replit.com/images/tabs/chrome-tabs.jpg)

We took a lot of inspiration from web browsers here. The browser is an extremely general purpose tool– a powerful system that lets billions of people do anything based around three simple primitives: windows, tabs, and URLs.

Browser tabs are basically like "containers" for tasks– you put a URL inside of them, and you are transported into another world– whether it's a Replit tab for your next project, a tutorial on YouTube, or a Netflix tab to watch a movie. The same core primitives can be combined in infinite ways, and we want to setup Replit to eventually support a wide range of tasks too– maybe even watching Netflix!

## What does this unlock?

Different tools that you load inside of a Replit tab are kind of like URLs– except instead of uniquely identifying a resource that lives on the Internet, the little buttons you see in the search menu are unique identifiers for resources that live inside of the Replit Workspace.

Although Replit isn't a browser, Replit *is* a general purpose tool that needs to support many kinds of work and tasks. And, especially since we want to lay the groundwork for extensions / apps / plugins, we need to build a solid, generic system that won't "lock us in" to what people expect most IDEs to do– for example, just opening up different files. Besides working on coding-specific tools and supporting a wider range of software creators, there may be a world where we can make Repls entirely dedicated to gaming, creating music, or doing scientific research. And tabs get us one step closer to that!


## What's next?

This release is one of many that will be rolling out over the next few months in the Workspace. Next up, we'll be releasing `splits`, which will let you customize the layout and positioning of entire panes in the Workspace, adding more flexibility to how you organize your projects.

After that, we'll be focusing on cleaning up the sidebar, and thinking about things like different "desktops" and making continuous quality of life improvements to the coding experience.

More to come soon!

If you'd like to leave feedback, please leave a comment on [Amjad's repl](https://replit.com/@amasad/New-Tabs-System-Rolling-Out?v=1).

<style type="text/css" rel="stylesheet">
	img {
		border-radius: 8px !important;
	}
</style>