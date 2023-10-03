---
title: Configurable Keybindings for the Workspace
author: Brady Madden
date: 2023-05-30
cover: https://blog.replit.com/images/configurable-keybindings-workspace/header.png
categories: eng,product
profiles: bradyatreplit
---

![Keybindings](/static/images/configurable-keybindings-workspace/header.png)

We recently launched customizable keyboard shortcuts to supercharge the workspace for every Replit user. 

This makes Replit more powerful for everyone, from beginners to experts, by unlocking the ability to perform more actions in the workspace without leaving your keyboard. Defining all the actions available to a user in a keybindings system also increases the discoverability of lesser-known features. Finally, the increased customization handles the challenge of building for many types of users working in different environments.

## How keybindings work

To see all the keybindings available to you, you can head to the **Settings** tab in the workspace. Your keybinding settings follow you across Repls, browsers, and devices with no work required. Search for a keybinding by name, description, or simply the keybinding itself by pressing the “Record” button to the right of the search bar. Changes to your shortcuts are saved instantly, and the UI updates accordingly to handle your new keybinding settings.

To use a keybinding, simply press the keys on your keyboard, and if your keypress matches a relevant keybinding, an action will be run for the associated command. A simple example might be pressing `⌘`&nbsp;`P` to find a file by name – or, maybe you want to change it to `⌘`&nbsp;`I`:

![Update a keybinding by recording](/static/images/configurable-keybindings-workspace/1.gif)
_Updating the “Find Files” keybinding to your preferred shortcut is simple_

If you try to record a shortcut that conflicts with another command, we’ll show you a warning. Your keybindings can be customized for web, mobile, and the [upcoming Replit Desktop App](https://twitter.com/Replit/status/1653492134874599424) to handle some of the differences between environments. Advanced configuration options, such as chords and scopes, make the system even more powerful (more on this below).

![Warning for conflicting keybindings](/static/images/configurable-keybindings-workspace/2.gif)
_If you record a shortcut that conflicts with another keybinding, we’ll show you a warning._

## How we built it

Our configurable keybindings architecture is broken down into a few keywords and concepts.

* A **Command** is an abstract action that can happen in the workspace. It has a unique identifier, a name, and a description. For example, “Close Tab” could be a command. 
* A **Keybinding** maps a keypress to a command. In our system, we can provide an optional default keybinding for commands so users don’t have to set them all up from scratch. 
* Finally, we bind our commands to an **Action Function** function to perform the command action at runtime. This allows us to support environment-specific implementations of actions. For example, we may have different implementations to close a tab on desktop versus mobile.
* A command may be optionally associated with a **Scope**, to only run command actions in certain conditions, or to allow the same shortcut to be associated with multiple keybindings.

Our workspace has a global registry that contains all possible commands. When a user enters the workspace, we load their saved keybindings, specific to their environment (Web, Desktop, Mobile) and the platform (Mac, Windows, Linux) they’re using. We store their saved keybindings in our global registry at runtime, which is used to display the correct shortcut for a command throughout the UI and handle user key presses. 

By making the system configurable, the primary identifier of a command was no longer its shortcut, but rather its unique identifier. We refer to keybindings by identifier, and updated our UI throughout the workspace to dynamically load the shortcut associated with that command identifier at runtime:

![Dynamically loading the shortcut associated with a command](/static/images/configurable-keybindings-workspace/3.png)
_To support customizable keybindings, we needed to update our codebase to refer to commands by their ID. This allows us to dynamically load the shortcut associated with that command at runtime._

## Supporting Advanced Configuration

We made sure our system was flexible enough to support a number of features expected of any robust keybindings system, including chords, scopes, and environment-specific defaults.

### Chords

Chords are two separate keypress actions executed consecutively. They greatly expand the number of unique **Commands** your system can support with unique **Keybindings**. When a system only supports single-shortcut keybindings, you can quickly run out of options.

For example: if you set up `Ctrl`&nbsp;+&nbsp;`I`/`K`/`J`/`L` to “Move focus up/ down/ left/ right”, you’ve used up four shortcuts just for moving focus! Replit has a [highly configurable layout system](https://blog.replit.com/splits), and our goal was for you to be able to fully drive it using just your keyboard. Moving tabs, splitting groups, inserting new groups in all directions - the list adds up quickly. Chords allow you to define all four “Move focus” commands beginning with the same first shortcut, such as `Ctrl`&nbsp;`K`, followed by a second shortcut: `Ctrl`&nbsp;+&nbsp;`I`/`K`/`J`/`L`. This leaves `Ctrl`&nbsp;`I`, `Ctrl`&nbsp;`J`, and `Ctrl`&nbsp;`L` available for other commands.

To support this behavior, we needed to build a few constraints into our keybindings system:

* A single shortcut keybinding cannot overlap with the first shortcut of a chord. If you configure a keybinding for “Move focus left” to `Ctrl`&nbsp;`K`, `Ctrl`&nbsp;`J`, you can’t also configure a keybinding for “Open File Search” to just `Ctrl`&nbsp;`K`, as we won’t know if the first shortcut is the start of the chord or just the single shortcut command.
* Chords also add complexity to our configuration interface. When a user is recording a keybinding, we need to allow them to record a single keypress shortcut or a multi-keypress chord. After a single shortcut has been recorded, we start a timeout and wait for the user to initiate a start of a second shortcut. If the user hasn’t initiated a second shortcut before the timeout expires, we stop the recording and save the single shortcut.

![Recording chorded keybindings](/static/images/configurable-keybindings-workspace/4.gif)
_Recording customized chorded keybindings for moving focus around the workspace_

### Scopes

Though chords allow you more customization and fewer conflicts between keybindings, there are still situations where the same shortcut is the best option for multiple commands. `Ctrl`&nbsp;`Enter` is a good example: it’s the default shortcut to run a Repl, but it’s often commonly used as a “Submit” keyboard shortcut, such as to commit in the [new Git pane](https://blog.replit.com/git-good). With **Scopes** we can support both. 

In our system, **Commands** are associated with **Scopes** - a unique identifier that can be used to describe the state within the workspace. A command without a scope will assume the global scope. We can dynamically enter a scope at runtime, and our keybindings system will initially look for matching keybindings in that scope to execute before falling back to keybindings in the global scope. This allows every scope to support a keybinding with the same shortcut.

For example, while using the Git pane, we can enter the “Git” scope when we’ve focused the commit message input, and `Ctrl`&nbsp;`Enter` will run our “Commit” command. While not in the “Git” scope, our “Run Repl” command will be executed.

![Multiple scopes within the workspace](/static/images/configurable-keybindings-workspace/5.png)
_The same keyboard shortcut can be associated with multiple Commands at different scope levels. We can enter and exit scopes at runtime to determine which Command Binding to execute when a shortcut is pressed._

### Environment-Specific Defaults

When it comes to keyboard shortcuts, there are limitations browsers put in place for security reasons that we cannot override. Certain popular shortcuts, like `Ctrl`&nbsp;`T` to open a new tab, `Ctrl`&nbsp;`W` to close a tab, and `Ctrl`&nbsp;`Shift`&nbsp;`T` to reopen a tab you just closed, are unable to be overridden by websites within a browser. For replit.com on the web, we leave it up to the user to configure the best alternatives for these shortcuts that work for them.

However, our system was built to support environment-specific default shortcuts, and we can provide these popular shortcuts out of the box on the [upcoming Replit Desktop App](https://twitter.com/Replit/status/1653492134874599424), as it doesn’t face the same browser limitations.

![Navigating the workspace with just the keyboard](/static/images/configurable-keybindings-workspace/6.gif)
_Completely driving the workspace across four tabs without touching the mouse. With scopes, ⌘-Enter can be used to both “Commit” and “Run Repl”._

## Work at Replit

Are you interested in building a supercharged development environment? [Come work with us](https://replit.com/site/careers) on our goal of empowering a billion software developers.
