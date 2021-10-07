---
title: The role of AI in coding
author: Amjad Masad
date: 8-8-2020
cover: https://repl.art/multi2.png
categories: news
---

In the past decade, we've seen an explosion of innovation in AI and machine learning. However, coding itself was barely touched by AI. The most significant example of AI-powered coding tools is editor autocomplete extensions like Kite or Tabnine. 

At Repl.it, we believe this is about to change. With the advent of natural language models like [GPT](https://openai.com/blog/better-language-models/), for the first time, we're seeing an ML model that performs shockingly well on all sorts of language-related tasks including coding.

I was first introduced to and excited by the applications of natural language models in coding when I read the 2012 paper ["On the Naturalness of Software,"](https://amasad.me/public/natural.pdf) which leveraged an incredibly simple NLP technique called [n-gram](https://en.wikipedia.org/wiki/N-gram) to build an autocomplete engine that rivaled industry standards. 

GPT-3, the [newest model from OpenAI](https://openai.com/blog/openai-api/), is a multiple order of magnitude in power, making it feel closer to magic. We got access to the new model, which still in beta, and we quickly got to work building coding tools:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Reading code is hard! Don&#39;t you wish you could just ask the code what it does? To describe its functions, its types.<br><br>And maybe... how can it be improved?<br><br>Introducing: <a href="https://twitter.com/replit?ref_src=twsrc%5Etfw">@Replit</a> code oracle 🧙‍♀️<br><br>It&#39;s crazy, just got access to <a href="https://twitter.com/OpenAI?ref_src=twsrc%5Etfw">@OpenAI</a> API and I already have a working product! <a href="https://t.co/HX4MyH9yjm">pic.twitter.com/HX4MyH9yjm</a></p>&mdash; Amjad Masad (@amasad) <a href="https://twitter.com/amasad/status/1285789362647478272?ref_src=twsrc%5Etfw">July 22, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

In this example, what we're seeing is an AI assistant who can answer questions related to coding, which we believe is a first of its kind. You can ask all sorts of questions. High-level questions like "What does this code do?" to questions about the program's details, like "what's the type of x?."

Perhaps more shocking and thrilling that it can also give you ideas on extending the project and where to take it. 

To make it clear that this wasn't trained on some small subset of types of projects, we took a random project from our community and ran it on it as well:

<blockquote class="twitter-tweet" data-conversation="none"><p lang="en" dir="ltr">Just to prove that it works on totally novel code, here is a recent project from our community: <a href="https://t.co/oA15YOZtFw">https://t.co/oA15YOZtFw</a><br><br>- It described it!<br>- Told me how to improve it!<br>- Told me where to post it after I improved it!<br><br>It&#39;s an awesome tool to make learning programming fun! <a href="https://t.co/Fnkd69DgXU">pic.twitter.com/Fnkd69DgXU</a></p>&mdash; Amjad Masad (@amasad) <a href="https://twitter.com/amasad/status/1285797739930869761?ref_src=twsrc%5Etfw">July 22, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Now, this is pretty mindblowing. But we also wanted to do something more concretely useful. We thought, what if the AI could fix simple syntax errors. The kind that newbies tend to run into and sometimes get stuck. 

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">If you&#39;ve ever taught programming you know that newbies make simple mistakes like mixing between strings and variables, not closing parenthesis or quotes, etc.<br><br>Many then get stuck and quit learning programming.<br><br>Working on a code fixer for <a href="https://twitter.com/replit?ref_src=twsrc%5Etfw">@replit</a> to fix this problem: <a href="https://t.co/DUxMAPGQfV">pic.twitter.com/DUxMAPGQfV</a></p>&mdash; Amjad Masad (@amasad) <a href="https://twitter.com/amasad/status/1285997706884706304?ref_src=twsrc%5Etfw">July 22, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

These are just the tip of the iceberg we're hacking on many more ideas. But just to give you an idea of what's possible, here is a demo where GPT-3 is used to generate React.js components: 

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Wow.<br><br>I built a React dice component with GPT-3. <br><br>This feels far more fun than writing JSX. <a href="https://t.co/kQGd9LvUsV">pic.twitter.com/kQGd9LvUsV</a></p>&mdash; Sharif Shameem (@sharifshameem) <a href="https://twitter.com/sharifshameem/status/1284807152603820032?ref_src=twsrc%5Etfw">July 19, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## AI and the future of coding

So what does this mean for programming? Does it mean that there is no point in learning programming because it will get fully automated? 

We don't believe so. Here is what we think the impact will be:

- AI-assisted coding will remove the drudgery out of coding. We'll have tools that help us code faster. We'll see more sophisticated code generation and refactor tools, and repetitive coding tasks -- the moments you see yourself copy-pasting code -- might get automated away wholly.

- AI will make it easier to learn programming (and many other things). Imagine Codecademy-like courses entirely guided by AI with conversational abilities.

- Eventually, AI will influence how we design programming languages, and a new class of languages will emerge. Since computers will be better and faster than humans at generating code, the act of programming itself might change. Who knows, we might be able to program by talking or even by moving in VR/AR. 

At some point -- probably not in the near future -- the word "coding" will disappear from our lexicon because programming will stop requiring code and instead be about the pure act of solving problems using computers making it accessible to more and more people. 

In the meantime, if you haven't yet, you should still learn how to code and get good at it. It's unlikely that things will change meaningfully in the short-term, and coding is still the best way to program computers. But keep your eyes open to the future, and we'll do our best at Repl.it to build the most advanced programming environment regardless of the modality. 

## One more thing

In addition to GPT-3 we're also experimenting with more ways to bring AI into coding. In the following example, Sergei Chestakov, an engineer at Repl.it built an app that lets you execute hand-written code!

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">I&#39;m building an app that let&#39;s you take a picture of handwritten code and execute it: <a href="https://t.co/4s4Pvychqf">pic.twitter.com/4s4Pvychqf</a></p>&mdash; Sergei (@SergeiChestakov) <a href="https://twitter.com/SergeiChestakov/status/1289726580210561025?ref_src=twsrc%5Etfw">August 2, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

We're [hiring AI engineers](https://repl.it/@util/jerbs#open-positions/ai.txt) to bring AI into coding. If this is something you're passionate about we'd love to talk to you!