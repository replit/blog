---
title: The Programming Language Jam & Grant
author: Amjad Masad
date: 7-21-2020
cover: https://blog.repl.it/images/jam.png
categories: events
---

__UPDATE__: The jam registration is now open. [Read the instructions](langjam_signup).

We built Repl.it to make it easy to explore and learn languages and programming paradigms. We’ve grown a community that, like us, is [excited](https://repl.it/talk/ask/Wildest-programming-language-idea/42923) by languages. We were, however, surprised by how slow-moving the programming language space seems to be. Given how fast software is growing, shouldn’t we see more innovation in programming languages?

We can think of a programming language as either a tool built to be good at a software domain or as a medium for thought and expression. If languages are indeed tools, then some languages would be better than others for a given task. For example, if I want to build a web server with reliable performance, I might use Golang because it has a solid standard library and concurrency primitives. Whereas, if I'm making a UI, I might want to use JavaScript for its first-class support for event-driven programming. On the other hand, if we think about languages as mediums of expression, choosing a language becomes less about objective qualities and more about aesthetics and ergonomics. 

But if languages are tools, shouldn't we see many more language variations to cover the ever-increasings niches that software is entering? Similarly, if languages are mediums of thought, and there are more and more people interested in expressing themselves digitally, shouldn't we expect to see many more types of languages?

One answer could be that programmers are not that interested in thinking about languages. Or that our languages today are sufficient and everyone is happy. But spend a few minutes on any programming forum, and it’ll become clear that a lack of enthusiasm and opinions on languages could not be the reason why we don’t see more programming languages.

Programming languages are undoubtedly hard to make. They require a combination of design skills and technical chops. But for some reason, language designers are typically solo hackers. But what if we made programming languages easier to make? If we showed that it is possible for anyone, even those with limited experience, perhaps especially beginners, can create and experiment with languages? Wouldn’t we get a lot more exciting and fresh ideas?

![language jam](https://blog.repl.it/images/jam.png)

Well, here at Repl.it, we specialize in making hard things accessible, and we want to make creating programming languages easier, fun, exciting, and collaborative. Today, we're announcing the programming language jam and a $10,000 grant to a team that designs and prototypes a new language with emphasis on fresh and possibly wild ideas. The winning language will also get added to Repl.it, where anyone can quickly start using it to code. We’ll have prizes for individual category winners too.

The hackathon starts on __August 10th__ and runs until __August 31st__. To enter, you have to create a Repl.it Team when registration opens with a minimum of two team members. __Registration will open on August 1st__. To be notified when registration opens, leave your email [here](https://forms.gle/x3n4cDYQzdvFvci57).

Our Hackathon is judged by:

- [Mary Rose Cook](https://maryrosecook.com/) whose language experimentation spans toy Lisp interpreters to programming environments for kids
- [Jordan Walke](https://twitter.com/jordwalke), the creator of React.js and the Reason programming language
- TBD: we're looking for more judges. Specifically people who are interested in wild programming language ideas

## FAQ

### Can anyone participate?

Yes! You don’t even need to have any prior experience making languages. To help you get started, we created these tutorials and templates:

- [Making your own programming language with Python](https://repl.it/talk/learn/Making-your-own-programming-language-with-Python/45767)
- [Making your own programming language with NodeJS](https://repl.it/talk/learn/Making-your-own-programming-language-with-NodeJS/45779)

Here also also some links to other websites that can help you learn the basics of making your own languages:
- [Crafting Interpreters](https://craftinginterpreters.com)
- [Make a Lisp](https://github.com/kanaka/mal/blob/master/process/guide.md)
- [Little Lisp Interpreter](https://maryrosecook.com/blog/post/little-lisp-interpreter)

## What kind of language should it be?

Any kind -- it could be dynamic, compiled, or whatever. We’re particularly interested in fresh ideas. So the only criteria are that it’s a language you can program in :)

## What do I get if I win?

You get $5,000 upfront, and $5,000 over two months to continue working on the language after the jam. We ask you to try to get to a usable version of the language three months after the jam and we'd be more than happy if we get to add it to Repl.it when you're ready.

## Do I own the IP of the language?

The language is totally yours and in fact you can enter with your existing language as long as you make significant improvements to it during the jam. 

We only ask it be open-source.

## Do I have to code it on Repl.it?

During the jam, we ask all participants to code and submit their projects on Repl.it to make it easy for our judges to run your project, and for our users to interact and potentially fork and remix your language. We ask that you make one demo repl that it’s easy to run and try. 

After the jam, it’s up to you where you want to finish coding the language. 

## Can I be a judge?

Yes -- reach out to us on Twitter or email, and we’d be happy to chat. 

## Can I remix or improve on an existing language?

Yes, as long as you're adding original ideas and putting an effort to meaningfully change or improve the language.

## Can I make a Domain Specific Language (DSL)?

Yes. As long as the DSL deviates from the host language in constructs and syntax. For example GraphQL is useful/interesting on its own despite being embedded in JavaScript

## Can I make a non-turing complete language?

Yes, as long as it's useful and not purely academic. 

## What if Repl.it doesn't support the tooling that I need?

Please send a pull request to add it to our base image [Polygott](https://github.com/replit/polygott). For example Paul Bone, submitted this [PR](https://github.com/replit/polygott/pull/136) to add Mercury to Repl.it and was merged quickly.