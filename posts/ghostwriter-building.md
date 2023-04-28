---
title: Building Ghostwriter Chat
author: Muhammad Sareini
date: 2023-03-27T14:45:00Z
cover: https://blog.replit.com/images/Ghostwriter/gw_build_2.png
categories: ai
---

At Replit, we strive to give our users the most powerful programming environment, and what better way is there than giving them an AI pair programmer directly in their workspace? Enter Ghostwriter Chat. 

## Why we built Ghostwriter Chat

Many IDEs today are not truly integrated; they lack the tools a developer interacts with throughout the course of their work. With Ghostwriter Chat, our goal is to give developers all the power they need without them ever having to leave the IDE. Gone are the days where you had to search Stack Overflow for an obscure error message, or visit the docs of your favorite package for the millionth time because you forgot what that one argument was called.  And since Ghostwriter is built right into your repl, it can use things like file context, chat history, and program output to help you write code, answer questions, or even debug an error. No copying and pasting is required.

We started working on Ghostwriter Chat during our Hackweek in January. The project took the first place prize, and we quickly found that we couldn’t live without it. We wanted to be the first to market with an LLM-powered chat application that is native to your editor. We decided to ship it, and did so in a month!

![image](https://blog.replit.com/images/Ghostwriter/gw_build_1.png)

## Large Language Models
[Large language models](https://blogs.nvidia.com/blog/2023/01/26/what-are-large-language-models-used-for/) (LLMs) are the underlying technology powering Ghostwriter Chat. The recent advancements in the field make these language models very good at answering programming questions. When building LLMs into your application, speed and prompt construction are some of the most important factors. 

## Request Latency
When you make a request to a LLM, you are running inference. Under the hood your raw text is tokenized into a format the LLM can understand, these tokens are passed into the network, a forward pass is completed, and then you receive tokens as output. This is quite expensive and takes much longer than your typical request which makes a couple DB calls and does some application logic. It is also amplified by the number of tokens you want to generate. Our users are using Ghostwriter Chat to generate entire code blocks, or even whole programs, which amounts to hundreds of tokens generated in a single request.

A typical chat request goes through the following steps:
![image](https://blog.replit.com/images/Ghostwriter/gw_build_2.png)

We don’t want a user to sit around and wait multiple seconds for hundreds of tokens to be generated, so we opt to stream the tokens as they are generated back to the user. Streaming gives us the ability to have sub 500 milliseconds from the time a request is sent, to when the user starts seeing a response displayed. This allows the user to also see if a response looks like it is helpful or not, stop generation, and ask the question again with more detail.


## Generic Prompt Construction
When working with LLMs, you need to invest a lot of thought into how you construct your prompt. A carefully constructed prompt with sufficient context can yield a very detailed response, but one without a lot of detail will produce a generic response and hallucinations.

For Ghostwriter to be able to help you answer your questions, it needs to have knowledge of the ever changing environment of your repl and your chat history. To succeed, we needed a way to take varying information from different sources, choose what to include and exclude, and convert it to any number of prompt formats to support any number of language models and APIs.

![image](https://blog.replit.com/images/Ghostwriter/gw_build_3.png)

## Ghostwriter Debugger

Ghostwriter Debugger is our AI-powered debugger that will proactively alert you on errors, and allow you to debug in just a single click. 

![Demo #2](https://blog.replit.com/images/Ghostwriter/debugger-alt-logo-compressed.mp4)

For Ghostwriter Debugger to work, we also need to support the many different ways programs display and throw errors. For example, a running web server can throw errors without pausing execution and continue to output logs, but a script is going to immediately stop with the last output being an error message.

## Getting Around Token Limits
Unfortunately, language models have a token limit on the input and output tokens. This makes it impossible for us to include all of your repl context, additional external context, and your entire chat history. To get around this, we use some heuristics we feel is a good balance to allow chat to have access to what is most important.

### Limit the chat history and message length
Assuming that the most recent messages are the most important during a conversation, removing old messages is a good way to keep in these context limits.
A message to Ghostwriter counts as part of the prompt and the total limit, so we set a cap at `500` characters to allow more room for other parts of the prompt (chat history, larger responses, file context). If most users want to reference code they have written in a message and we are including file context already, you can get better results by asking Ghostwriter about the code itself instead of copying and pasting in each message. 

### Choosing the right context
For example, a small Repl might only have two files with a hundred or so lines of code. In that case, it’s easy to keep the full context of the repl when interacting with Ghostwriter. But what about larger and more complex Repls? It's impossible to include the entire project when prompting a language model, let alone your chat history, stack traces or any other information.

Some files are less relevant than others. A python project might have a directory called `.venv/`, some linter files, some `pytest` configurations, a `.gitignore` file, and a bunch of `yaml` CI build files. Are these really going to help make Ghostwriter give users better programming advice? Most likely not. The most relevant files would be things like `main.py` and other source code.

This isnt always the case, but if you are programming and you are stuck, it's almost on the immediate task at hand. We can take advantage of this common flow, by assuming that the most important files for Ghostwriter to know about are the files you are currently working on and have recently worked on. Doing so gives Ghostwriter the most context on the task at hand and increases the likelihood that it assists you as would a true pair programmer.

## The Future
Ghostwriter Chat will continue to improve as AI and LLMs become more capable. Context length will increase and inference will be faster, which means future versions of Ghostwriter, and other LLM-based applications, will only get smarter, faster, and more powerful. 

These trends will allow us to unlock more seamless interaction with our IDE, leverage more relevant context, and allow Ghostwriter to do more complex actions. Ghostwriter will continue to evolve, become more agent-like, and start to be driving entire workflows.
