---
title: Ghostwriter AI & Complete Code Beta
author: Amjad Masad, Samip Dahal, Giuseppe Burtini, Alexandre Cai
date: 2022-09-08
cover: https://blog.replit.com/images/ai/ghost.jpg
categories: product,ai
---

__Update: Ghostwriter is out now!__

<div style="display: flex; justify-content: center;">
  <a class="cta-btn" href="https://replit.com/ai" target="_blank">Activate Ghostwriter</a>
</div>

In [2018](https://blog.replit.com/multi) when we announced Multiplayer Mode, we said it's the most significant evolution of Replit to date. For the first time, you could share a URL with a friend, student, or coworker and get a shared text editor and runtime — no setup required. Replit Multiplayer is changing how an entire generation of programmers learn how to code and make software.

Today, we're announcing Ghostwriter, which infuses state-of-the-art intelligence into nearly all IDE features. __Ghostwriter sports an ML-powered pair programmer that completes your code in realtime, tools to generate, transform, and explain code, and an in-editor search utility that lets you find and import open-source code without leaving your editor (think Stackoverflow in your editor).__

<video src="https://blog.replit.com/images/ai/aimode.mp4"  class="css-3qjkrt" autoplay muted playsinline loop controls></video>

Ghostwriter is like Multiplayer in that you collaborate in real-time with someone else. However, in this case, you're not coding with a person; instead, it's an agent representing the entire programming knowledge of the human race. We believe Ghostwriter will leapfrog traditional IDE features. Ghostwriter is the next major evolution of our platform. We think this will radically change how people write code on Replit — and in the process, will change software writ large. Forever.


# Complete Code

Ghostwriter's flagship feature is Complete Code: an AI-powered pair programmer. We believe that Ghostwriter Complete Code is faster, more powerful, and more accessible than any other comparable offering. The best thing about Ghostwriter? It makes writing code on mobile devices not only tolerable, but actually enjoyable: Swipe right to accept!

<video src="https://blog.replit.com/images/ai/swipecoding.mp4"  class="css-3qjkrt" autoplay muted playsinline loop controls></video>

Ghostwriter's Complete Code is in closed beta right now. Please [sign up here](https://replit.com/@amasad/GhostWriter-Early-Access?v=1) if you'd like to help us test it. Here is what alpha users are saying about it:

- _"The first thing me and all my friends noticed was how much faster it is than GitHub Copilot. It is at least 2x faster, maybe 3x. It's a little detail but it makes a big difference."_
- _"It makes web development so much easier. I feel like I'm only writing 50% of the code."_
- _"After using the feature for only week, I can't imagine life without it"_
- _"It's crazy how much faster I can learn new things without leaving the editors"_

## Building Ghostwriter Complete Code

What do you do when you're _not_ a multi-trillion multi-national corporation (yet) with tons of ML research scientists, infinite budget for training, billions in industry partnerships, and store most of the world's code but still want to bring state-of-the-art AI to production? You start from open-source!

<video src="https://blog.replit.com/images/ai/ghost.mp4"  class="css-3qjkrt" autoplay muted playsinline loop controls></video>

Open-source Large Language Models (LLMs) like [Salesforce's CodeGen](https://github.com/salesforce/CodeGen) models are a fantastic place to start. However, with billions of parameters, they are insanely high latency off-the-shelf. This is especially a problem for code completion, because the models need to be fast enough not to disrupt the user's flow. To be able to serve millions of users, we've been playing with a few optimization techniques to achieve super low latency at a reasonable cost. And we've made tremendous strides in a short amount of time — our median response time today is less than 400ms, which makes our product the fastest in the world.

Here we'll go over some of the optimization tactics we've used or are actively exploring:

### FasterTransformer + Triton server:

First, we convert CodeGen checkpoint to [FasterTransformer](https://github.com/NVIDIA/FasterTransformer) to make use of their highly-optimized decoder blocks (with the possibility of extending to distributed, multi-GPU fashion). Their computational and memory optimizations make inference much faster than popular frameworks like PyTorch or Tensorflow. On top of this, we use Triton, Nvidia's inference server, which is super fast and scalable.

### Distillation:

For further speedup, we perform [knowledge distillation](https://arxiv.org/pdf/1910.01108.pdf) of CodeGen model with 2B parameters down to a lightweight and fast student model with roughly 1B parameters. The student model is trained to reproduce the larger model closely while having far fewer parameters and being less computationally expensive. Hence, it is more practical when operating at scale.

### Quantization:

We are also exploring post-training quantization of weights and activations to int8 precision with [quantization-optimized kernels](https://arxiv.org/pdf/2206.01861.pdf) to bring down latency. Performing computation in such low precision with optimized kernels often improves latency without causing a significant loss in the accuracy of the model.


### Future improvements

Work is already underway to improve Ghostwriter further:

1. Further training on open-source datasets like [CodeParrot](https://huggingface.co/datasets/codeparrot/github-code).
2. [Deep](https://github.com/lvwerra/trl) [Reinforcement Learning](https://arxiv.org/pdf/2207.01780.pdf) to further train LLMs with additional signals like user feedback, accuracy on unit tests, compiler/runtime errors etc.
3. Humans don't code unidirectionally. They go back and forth to add, delete, and edit code. Autoregressive language models generate code in one forward direction. [Recent](https://arxiv.org/abs/2204.05999) [works](https://arxiv.org/pdf/2207.14255.pdf) have made LMs more flexible by infilling training. They divide code blocks into `<prefix, middle, suffix>`, mask `middle` and train the model to predict `middle` given `prefix` and `suffix`. Because Replit's IDE stores [operational transformation](https://en.wikipedia.org/wiki/Operational_transformation) edits, we capture the natural cursor movements of human programmers and their code edits, which contains much richer information than synthetically made infilling datasets. __We plan to train LMs to predict the OT distribution. We think it will make LMs much more of a pair programmer.__

## Editor implementation

Getting the model right is only half the battle. Surprisingly, the client-side implementation is equally as challenging as training and running the models.

The user experience for any AI application is paramount to making it feel helpful (instead of annoying). The nitpicky detail necessary to get this right is immense; here is a sampling of some of the issues we have been working on.

### Whitespace and brace matching

When the model generates a recommendation, it might contain code that already exists in the surrounding context. The simplest form of this is with whitespace and braces. A detail that seems tiny on the surface but matters a lot for a flawless user experience.

So, to fully understand this, imagine the following (incomplete) code:

```js
const isOdd = useCallback(function isOdd(n) {
  |
}, []);
```

You’ve stopped, with your cursor tabbed in to where the vertical bar is, and are about to receive a suggestion from the model. The model sends back its recommended completion:

```js
  return n % 2 === 1;
}, []);
```

This includes a leading tab and a trailing brace, both of which already exist, so if we just blindly dumped the recommendation into your code, you’d be left with:

```js
const isOdd = useCallback(function isOdd(n) {
    return n % 2 === 1;
}, []);
}, []);
```

A decent recommendation turned frustrating by an incomplete user experience.

Instead, we match and filter on certain matching whitespace, abstract syntax tree (AST) characteristics to produce the desired recommendation:

```js
const isOdd = useCallback(function isOdd(n) {
  return n % 2 === 1;
}, []);
```

Showing the correct code recommendation is only half of the equation. Very often, users keep typing even after the code recommendation is shown. If you type something that matches the suggestion, we need to adjust the suggestion shown on screen to hide the part the user has typed—and resurface it when you hit backspace.

What's more, when you type, the editor would autocomplete a beginning bracket whose corresponding ending bracket; we want to make sure the latter appears in the right spot. As an example, suppose you have typed

```ts
// Merge [number, number] with [string, string]
const mergeTuples = (first: |)
```

and the suggestion is
```ts
const mergeTuples = (first: Array<number>, second: Array<string>) => {
```

We want to make sure code recommendations do not disrupt existing code, and correctly splits itself into the part before `)` and after it.

![ux](https://blog.replit.com/images/ai/ux.gif)

### Heuristic filtering

A common challenge with LLMs is that at times, they can generate useless suggestions, annoying repetition, or things that are completely wrong.

To produce something that actually feels like “intelligence” requires a bit more sophistication. We apply a collection of heuristic filters to decide to discard, truncate or otherwise transform some suggestions; soon, we’ll also apply a reinforcement learning layer to understand the kinds of suggestion that are helpful to users, filtering out suggestions that are unlikely to be accepted to prioritize suggestions that are genuinely helpful.

### Streaming

We can't overemphasize how much speed matters here. Anyone who has used a sluggish IDE knows how frustrating it is, and outdated suggestions that can get in your way will easily make this feature a net negative on the user experience.

In addition to all the model optimizations we detailed above, we also implemented streaming. In other words, we don't have to wait for the entire recommendation to be available, so we literally just start presenting the generated code as soon as possible, chunking it into your UI line-by-line as it becomes available.

This little detail makes an enormous difference to how fast the AI feels and how easily integrated into your actual programming experience it is. Maybe it also feels a bit more “intelligent” to know it takes time for the computer to figure out exactly how it wants to help.

## A Society of Models

Our conceptual model for Ghostwriter that it's a pair programming agent. It's tempting to map this to a single model that runs all the features. However, as we made progress, we realized that it's better to think of Ghostwriter as a society of models of different shapes and sizes helping you succeed.

### Semantic Search

A large amount of code exists in open source, but it’s hard to search with natural language because natural language and code are two very different modalities.  So instead of deploying traditional approaches like keyword matching, we use embeddings from transformer-based models to power code search. Specifically, we use a finetuned version of [CodeBERT](https://arxiv.org/abs/2002.08155) model to get learned representations for code and query. The CodeBERT model is finetuned to map both code and query to vectors in joint vector space that are close to each other. We then conduct nearest neighbor matching between the code and query vectors/representations. Such learned representations of code can encode information about what the code does, in addition to other characteristics like keywords the code has, etc. Hence, during inference, the user can search for code in plain natural language by specifying what the code should do.

Importantly, users can search for code from inside the editor. This allows us to improve code search even further by making search contextual. Meaning, we give the ML model access to the code the user has already written, whenever searching for upcoming code. This allows us to exploit the clues present in user’s code (like libraries being used) that makes search tailored to that user’s context. We achieve such contextual code search by training CodeBERT model to minimize the distance between single embedding of code context + query, and code. More details can be found in [this paper](https://openreview.net/pdf?id=rSxfCiOZk-c).

![search](https://blog.replit.com/images/ai/search.jpeg)

### Explain Code

Large models are especially good at reasoning tasks, and explaining what a piece of code does benefit from every last bit of model performance we can get. For our [Explain Code](https://blog.replit.com/codex) feature, we use the largest state-of-the-art code models, in this case powered by OpenAI.

![explain code](https://blog.replit.com/images/ai/explain.gif)

### Generate Code

While Complete Code is super useful for interactive experiences, sometimes users are willing to take a pause in order to [generate entire programs](https://blog.replit.com/generate-code) or files. That kind of generations benefits from the performance of insanely large models (100B+ parameters).

![generate](https://blog.replit.com/images/ai/generate.gif)

### Transform Code

Finally, we leverage exceptionally large models to provide prompt-driven refactor/rewrite experiences.

![transform](https://blog.replit.com/images/ai/transform.gif)


## The future

With the advent of LLMs and generative models in general, we believe that software is entering a new epoch. In the near future, anyone with time and good ideas will be able to build amazing things. AI will guide you as you learn new concept, push just-in-time useful information to you, and even comment on and critique your code. This brings us much closer to our vision of bringing the next billion software creators online, and in the process reducing the distance between ideas and wealth.

Many of the Ghostwriter features are already available for Hacker subscribers, and more are coming. Ghostwriter Complete Code will be in closed beta for the next few months as we continue to make improvements to it. If you're interested in trying out, please [sign up here](https://replit.com/@amasad/GhostWriter-Early-Access?v=1).

Over the next few months we'll be packaging up Ghostwriter into a Cycles-based power-up that anyone can buy. We're hoping to make this feature more affordable than other offerings on the market. Eventually, however, the plan is — just like Multiplayer mode — to make Replit AI-powered by default and freely available to everyone.

<video src="https://blog.replit.com/images/ai/aimode_future.mp4"  class="css-3qjkrt" autoplay muted playsinline loop controls></video>


Have some questions? See our [FAQ document](https://docs.replit.com/programming-ide/GhostWriter-FAQ).

<script>
  window.addEventListener('load', videoScroll);
window.addEventListener('scroll', videoScroll);

function videoScroll() {

  if ( document.querySelectorAll('video[autoplay]').length > 0) {
    var windowHeight = window.innerHeight,
        videoEl = document.querySelectorAll('video[autoplay]');

    for (var i = 0; i < videoEl.length; i++) {

      var thisVideoEl = videoEl[i],
          videoHeight = thisVideoEl.clientHeight,
          videoClientRect = thisVideoEl.getBoundingClientRect().top;

      if ( videoClientRect <= ( (windowHeight) - (videoHeight*.5) ) && videoClientRect >= ( 0 - ( videoHeight*.5 ) ) ) {
        thisVideoEl.play();
      } else {
        thisVideoEl.pause();
      }

    }
  }

}
</script>