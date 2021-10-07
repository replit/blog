---
title: Programming Language Jam Results
author: Amjad Masad
date: 2020-10-11
categories: events
---

We're thrilled to announce the [PL Jam](https://repl.it/jam) results. Here are the criteria our judges used:

- Freshness: How novel are the ideas behind the language? This accounts for the most points since it's the Jam's theme. 
- Value: How practical/useful this language could be?
- Polish: In its current state, how polished is the language?
- Technical difficulty: How hard was it to implement?

The overall winner will take home a total of $10,000 (prize + grant). We also picked a winner team per category, which will receive $500 each. 

## Overall winner: Basil

![basil logo](https://storage.googleapis.com/replit/images/1598870101138_7ea2f225e8a77e1354d8879eba7e684e.png)

Basil ([@basilTeam](https://repl.it/@basilTeam)) is the winner! Congratulations to teammates @elucent and @minchingtonak, two undergrads at the University of Michigan. 

Basil describes itself as "a lightweight language with homoiconic syntax, high performance, and an emphasis on supporting expressive code. Many of its base features are based on Lisp, and you could probably consider it a Lisp dialect, but it also does a number of distinctly un-Lispy things."

What caught our judges' eyes are the novel ideas in compilation, its fresh take on lisp syntax, the polish, and the implementation elegance.  

### Compiler 

>The main innovation is that the Basil compiler is actually an interpreter, able to interpret any Basil expression. When it gets to an expression it wants to save for runtime, it wraps it up and saves it to the end of the program. These runtime values propagate and result in an expression tree of all code reachable at runtime - notably without unnecessary operations between constants or dead code. Basil also statically type-checks this tree, so none of the code it ultimately compiles incurs a dynamic typing or boxing overhead.

While ahead-of-time compilation is not a new idea -- it's typically an optimization strategy -- designing a compiler with evaluation as a core feature in the pipeline is both exciting and compelling. 

### Syntax 

Basil being a lisp means it's a very simple language at heart. However, while lisps are typically dynamic languages, Basil is a statically-typed and compiled language. Basil also leverages white space to both reduce the amount of parenthesis and support infix operators. 

### implementation

>The Basil compiler has no runtime dependencies other than libc, and the entire compiler and runtime fit comfortably in under 400 kB.

Basil is a new language that was entirely conceived and implemented during the jam. We were impressed by how elegant and clean the code is. You can read and play with the entire thing on this one [repl](https://repl.it/@basilTeam/basil#README.md).

Basil also ships with a tutorial that teaches the language. It's a lot of fun!

![basil tutorial](https://blog.repl.it/images/langjam/basiltut.png)

## Category winners: 

- Freshness: [Roman](https://repl.it/talk/challenge/Roman-Lisp-extended-to-the-4th-dimension/51721)
- Value: [Browse](https://repl.it/talk/challenge/Browse-Build-expressive-libraries-with-thunks/51805)
- Polish: [Codeflow](https://repl.it/talk/challenge/CodeFlow-Experiment/51630)
- Technical difficulty: [Volant](https://repl.it/talk/challenge/Volant/51740)

Congratulations to all the winners! We hope your curiosity and enthusiasm for programming language design doesn't end here. We're excited to see where the Basil team take the language, and when they're ready, we hope to add it to the Repl.it family of supported languages. 