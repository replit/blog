---
title: "Introducing Threads: Have Conversations Around Code"
author: Arnav Bansal
date: 3/9/2021
cover: https://blog.repl.it/images/threads/threads_cover_2.png
categories: product
---

A few months ago, we announced [Annotations](https://blog.repl.it/annotations-for-education) for our education users, a feature which lets Replit collaborators highlight code and discuss it in context.

<img src="https://blog.repl.it/images/threads/annotations.gif?" alt="Our existing annotations feature"/>

As classrooms were remote, Annotations became a major part of our teachers' workflow. 

Over a 100,000 annotations have been created since its launch. Students have used it to ask questions and clear doubts. Teachers have used it to provide feedback, and help students debug issues with their code. 

We've learnt a lot from them. And now, **we're building Threads to make the experience complete**.

---

As repls have become more powerful, the way people use them has evolved. 

At the beginning, repls had functionality close to the original meaning of a [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop). They were environments for interacting with language REPLs, and testing snippets of code in your browser, without installing a compiler or an IDE.

Since then, repls have grown in ability, alongside our users' demands. In 2018, Replit became [multiplayer by default](https://blog.repl.it/multi), removing barriers to collaborating in real time. It's now possible to hack on ideas with friends, and deploy them, all within the [same environment](https://amasad.me/hosting). 

We've arrived at a point where **repls are 'places to be'**, not mere containers of code. It's a shared space where you and your collaborators can create, debug, and deploy software together.

Tight coordination is important for the success of a project. In a small team, it's indispensable. When you're moving fast, it makes sense for the code and discussion to live together.

### Enter Threads

Discussion about a project and its code now resides within repls. You can select any arbitrary line of code and start a thread. The highlights stay in place as people use the editor.

Collaborators can read and reply to your messages in real time. When you return to a repl, you can pick up where you left off, by reading the threads you missed while you were away.

When you're done with a thread, just resolve it!

<img src="https://blog.repl.it/images/threads/threads.gif" alt="Resolving threads"/>

At Replit, we've been using threads internally in several ways.

- For comments and suggestions on internal design docs
- In meetings, for annotating meeting notes.
- As a To-Do list

Our community members have used annotations to:
- highlight and keep track of important parts of code.
- leave comments in formats like JSON which don't have code comments
- leave markers for collaborators to see when they return

### What's next for Threads?

We think about the features we build as platforms of their own. Threads as a platform will enable us to build many social experiences.

In the near future, we're building a cohesive experience for teams (including Teams for Educations!) where you will be able to keep track of threads across repls.

Some of you may be wondering what happens to repl chat. We plan to deprecate it. Threads will soon contain every feature that chat contains, and more.

### Feedback

As always, feedback is welcome! You can make a post on Canny or even [email](mailto:arnav@repl.it) us directly with your ideas, suggestions, and bugs!