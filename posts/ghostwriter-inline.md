---
title: "Improving the Inline Ghostwriter Experience"
author: Xiaoyi Chen, Tyler Angert, and Brian Pool
date: 2023-08-11
cover: /images/Ghostwriter/inline-cover-image.png
categories: product,eng
---

![](/images/Ghostwriter/inline-cover-image.png)

We’ve recently improved Ghostwriter’s inline actions, Explain Code, Generate Code, and Edit Code (formerly known as Transform Code), to make your coding sessions even more efficient. Here’s a summary of the key updates. 

## Widgets: say goodbye to popovers!

Previously, Ghostwriter used popovers to generate, explain, and edit code. While this served us well initially, it sometimes disrupted the flow of coding, and the popovers could be lost when you clicked outside of or moved around the code. It was also difficult to view and compare changes suggested by the AI if long paragraphs of code were generated. 

![Comparison of before and after popovers](/images/Ghostwriter/inline-comparison.png)

Ghostwriter inline actions now open as a persistent inline widget, meaning that the widget will stay open and retain its information even as you move around the coding environment. This widget remains in your coding workspace, and all the functionalities of the previous tooltips, including your familiar keyboard shortcuts, are now available in one easy-to-access location.

![Video of widget showing inline explain code](/images/Ghostwriter/gw-inline-explain.mp4)

## Streaming and synced chat

The popovers did not support streaming, which meant that you needed to wait for Ghostwriter to generate the entire output before a response was returned. AI suggestions are now streamed directly inside your editor, so we show the language model's response incrementally in the editor as it’s generated. This means that the [time to the first response is reduced from multiple seconds to sub-one second](https://github.com/openai/openai-cookbook/blob/main/examples/How_to_stream_completions.ipynb#Time-comparison).

For Explain Code, chat messages are also synced in the Ghostwriter pane. You can select **Reply in Chat** and pop out from the editor widget to ask follow-up questions or dive deeper into a concept in Ghostwriter Chat.

![Ghostwriter starting inline and continuing in chat window](/images/Ghostwriter/inline-to-chat.png)

Under the hood, we’ve made Ghostwriter Chat states, including the logic to communicate with LLMs, available inside a [Jotai](https://jotai.org/) store. We provide the store in a React context that is available everywhere inside the workspace. This way, the inline actions can reuse the same engine that powers Ghostwriter Chat. They are synchronized and updated reactively in different views, so the global chat becomes a form of “hub” for multiple AI actions across the Workspace.

## Diff views

We also improved the experience of reviewing AI suggestions by introducing diff views. 

For Generate Code, you’ll see the diff rendered as ghost text. Selecting **Accept suggestion** inserts the ghost text. You’ll find this similar to Complete Code, which also renders the ghost text, but Generate Code is triggered on-demand, and you can specify custom prompts.

![Video of generate code diff](/images/Ghostwriter/gw-inline-generate.mp4)

For Edit Code (renamed from *Transform Code*), you’ll see a line-by-line difference between the original code and AI-suggested code. You can switch between the diff view, original code, and AI suggestion to compare the code before and after AI suggested changes, then accept or reject the suggestions.

![Video of diff for edit code](/images/Ghostwriter/gw-inline-edit.mp4)

This will make it easier for you to understand the changes proposed and make an informed decision on accepting AI-generated code.

We hope this new update will make your coding experience faster, more productive, and more informed. Our goal is to consistently improve Ghostwriter to serve your needs better, so [let us know how we’re doing](mailto:ghostwriter@repl.it)!





