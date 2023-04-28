---
title: Multiplayer Debugging Experience for Python, Node.js, Java, and C/C++
author: Luis Héctor Chávez, Alex Kotliarskyi, Tyler Angert
date: 2021-07-02T15:55:00.000Z
cover: https://blog.replit.com/images/debuggest/debugger-workspace.jpg
categories: product
---

A couple of months ago, we announced our intention to create a new [collaborative program comprehension experience](https://blog.replit.com/debuggest) for your repls. This project isn't *just* about figuring out what's wrong with your code, but really understanding what's going on, together with the people you work with. Today, we are happy to announce that we're releasing the first phase of this experience: a Replit-native, zero-configuration, multiplayer-friendly, interactive debugger for C, C++, Node.js, Python, and Java repls!


![Workspace](images/debuggest/debugger-workspace.jpg)


Our main goal is to make it easier to [understand what your code is doing, and why](https://en.wikipedia.org/wiki/Program_comprehension). Up until now, if your code wasn't working correctly, it was only possible to find the root cause by (*brace yourselves*) stopping the program, optimistically adding log statements around the suspicious areas, running again, and repeating that process hoping that printing out variables will reveal enough to figure out what's wrong (also known as [`printf()` debugging](https://everything2.com/title/printf%2528%2529%2520debugging)). 

`printf() debugging` is a tool that's very easy to start with, but it gets tedious and unpredictable in the long run. Every time the code is changed to add a new log statement, new bugs may be introduced by accident (see [Heisenbugs](https://en.wikipedia.org/wiki/Heisenbug)). Even though we firmly believe that the ultimate goal is to enable [time-travel debugging](https://en.wikipedia.org/wiki/Time_travel_debugging) for everyone (which prevents having to restart the debugging session if you accidentally skip the line you wanted to check!), having an interactive debugger available is still going to be useful for a lot of people.

What has changed today? Now, repls for all the supported languages listed earlier will let you pause the execution of the program (breakpoints) and inspect program state (the values of variables) while the program is paused. No configuration needed, and no need for print statements to inspect the state of the program!

![Variable inspector](images/debuggest/variable-inspect.gif)

The debugger is [multiplayer-first](https://replit.com/site/multiplayer), which means that all the participants of the repl can collaborate in the debugger session. The state of the session is shared between everyone, including the breakpoints, the current line where the program is paused, the values of the local variables, and even the console output. This means that if you need help figuring out a tough issue in your code, you can ask somebody else to guide you through the debugger. This is also going to be super useful in educational contexts: teachers can help students improve their programs and assignments.

![Multiplayer](images/debuggest/multiplayer-demo.gif)

## Under the hood

How was this built, though? Instead of reinventing the wheel, we decided to use an industry standard: The [Debug Adapter Protocol](https://microsoft.github.io/debug-adapter-protocol/), which powers VSCode and other IDEs. Given our experience with the [Language Server Protocol](https://microsoft.github.io/language-server-protocol/), this allowed us to create an abstraction layer and implement the frontend once, without having to care about what programming language is running. Having this abstraction layer allowed us to create all of the multiplayer-related logic in a single place. Since the DAP is completely open, we're also going to enable more configurability so that you can add support for your favorite language or runtime environment for [nix](https://blog.replit.com/nix) in the near future.

We're halfway through our journey towards providing better tools for program comprehension. You'll hear more from us in [the future](https://twitter.com/Replit/status/1407117879976202248). Happy repling!