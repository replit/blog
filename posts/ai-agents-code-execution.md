---
title: "AI Agent Code Execution"
author: Luis Héctor Chávez, Faris Masad
date: 2023-09-19
cover: https://blog.replit.com/images/ai-agents/ai-agents-cover.png
categories: ai
---

![](/images/ai-agents/ai-agents-cover.png)

Lately, there has been a proliferation of new ways to leverage Large Language Models (LLMs) to do all sorts of things that were previously thought infeasible. But the current generation of LLMs still have limitations: they are not able to get exact answers to questions that require specific kinds of reasoning (solving some math questions, for example); similarly, they cannot dynamically react to recent knowledge beyond a particular context window (anything that happened after their training cutoff window comes to mind). Despite these shortcomings, progress has not stopped: there have been advances in building systems around LLMs to augment their capabilities so that their weaknesses are no longer limitations. We are now in an age where [AI agents](https://en.wikipedia.org/wiki/Intelligent_agent) can interact with multiple underlying LLMs optimized for different aspects of a complex workflow. We are truly living in exciting times!

LLMs are pretty good at [generating algorithms in the form of code](https://blog.replit.com/llm-training), and the most prominent application of that particular task has been coding assistants. But a more significant use case that applies to everyone (not just software engineers) is the ability to outsource other kinds of reasoning. One way to do that is in terms of sequences of instructions to solve a problem, and that sounds pretty much like the textbook definition of an [algorithm](https://en.wikipedia.org/wiki/Algorithm). Currently, doing that at a production-level scale is challenging because leveraging LLMs' code generation capabilities for reasoning involves running untrusted code, which is difficult for most users. Providing an easy path for AI Agents to evaluate code in a sandboxed environment so that any [accidents or mistakes](https://arxiv.org/abs/2308.1033) would not be catastrophic will unlock all sorts of new use cases. And we already see the community building upon this idea in projects like [open-interpreter](https://github.com/KillianLucas/open-interpreter).

## Two options

But how should this sandbox behave? We have seen examples of multiple use cases. [Google's Bard recently released "implicit code execution](https://blog.google/technology/ai/bard-improved-reasoning-google-sheets-export/),” which seems to be used primarily for math problems. The problem is boiled down to computing the evaluation of a function over a single input and then returning the result. As such, it is inherently stateless and should be able to handle a high volume of requests at low latency.

On the other hand, [ChatGPT](https://openai.com/chatgpt) sessions could benefit from a more stateful execution, where there is a complete project with added files and dependencies, and outputs that can be fetched later. The project can then evolve throughout the session to minimize the amount of context needed to keep track of the state. With this use case, it's fine for the server to take a bit longer to initialize since the project will be maintained for the duration of the chat session.

Since we know that there are a lot of people with these requirements out there, we made a prototype of both of these approaches where the sandbox runs in the Replit infrastructure (since we already have the technology to run untrusted code). We're releasing one as a self-serve platform for the community to experiment with!

## code-exec

The first approach is a stateless container server that is deployable through [Replit Autoscale Deployments](https://blog.replit.com/autoscale): [https://replit.com/@luisreplit/eval-python](https://replit.com/@luisreplit/eval-python). 

![Video of a eval python demo](/images/ai-agents/py-eval-demo.mp4)

You can easily customize the Docker container image you’ll use and add all your necessary dependencies. Requests are handled in as little as 100ms and use the [omegajail](https://github.com/omegaup/omegajail) unprivileged container sandbox. This solution works best for simple math evaluation using Python and can be easily integrated with your OpenAI application with GPT-3.5 and GPT-4 support for [custom function invocation](https://openai.com/blog/function-calling-and-other-api-updates). [Here's a simple example](https://replit.com/@luisreplit/MathSolver) that allows you to ask arbitrary math questions and get the final answer instead of evaluating the code yourself. You can integrate it into your code by installing the [replit-code-exec](https://pypi.org/project/replit-code-exec/) package and reading the full docs in the [GitHub repository](https://github.com/replit/replit-code-exec). You can deploy this very cheaply for experimentation since you’re only charged for the time your Deployment actively uses CPU.

![Video showing math solver executing](/images/ai-agents/math-solver.mp4)

## agent-env

The second prototype is a more stateful one, and it uses a full Repl as the sandbox. With this, you can install any packages after creation and also read and write files, as well as arbitrary programs, giving your agent complete control over the execution environment. The Repl will automatically terminate after some period of inactivity. This prototype is more experimental, but you can read the [documentation](https://www.npmjs.com/package/@replit/agent-env) for more information. If you're interested in developing with this, please [sign up to have a call with us](https://docs.google.com/forms/d/1UKbl9lOpRGUTfRdPx84g9hHb1-_3oS_G5eHvAzDdkNI/viewform) so that we understand your use case better.

## The future

We will keep experimenting with new ways of augmenting the capabilities of LLMs: this is just the beginning for us. We wanted to release these tools because we know you'll build something amazing with Replit. Please <a href="mailto:luis@replit.com, faris@replit.com">shoot us an email</a> if you want to chat with us about how code execution can augment LLMs. Also, we're hiring, so if this interests you, make sure to [apply for one of our open positions](https://replit.com/site/careers).