---
title: "Introducing Replit ModelFarm"
author: James Austin and the Replit AI team
date: 2023-09-13
cover: https://blog.replit.com/images/modelfarm/modelfarm.jpeg
categories: product,projects
---

![](/images/modelfarm/modelfarm-cover.gif)

At Replit, we continue to ship features with a unique north star in mind: providing the shortest path from idea to software running in production. Last week’s [Autoscaling and Static Deployments](https://blog.replit.com/autoscale) announcement was another key step in building an end-to-end platform that supports scalable, production-ready projects. Today, we announce **Replit ModelFarm**, the fastest and safest way to build Generative AI applications.

You can now build Gen AI apps without the hassle of API key management – Replit ModelFarm natively supports secure access to 3rd-party Gen AI providers. Developers will be able to focus only on building, without having to worry about their [API keys leaking](https://www.vice.com/en/article/93kkky/people-pirating-gpt4-scraping-openai-api-keys). In the future, we will also provide an integrated billing system with support for quota limits, alarms, and more. And if you want to use any additional APIs, our [Secrets feature](https://blog.replit.com/keeping-your-api-keys-safe) makes it safe and straightforward.

Through October 15th, all our Hacker and Pro subscribers will have **free access to a selection of Gen AI models** offered by [Google Cloud Vertex AI](https://cloud.google.com/vertex-ai/docs/generative-ai/learn/overview). All the models are accessible both from the development environment and from any deployed app, just by installing the Replit AI libraries in [Python](https://docs.replit.com/ai/model-farm/python) or [JavaScript/TypeScript](https://docs.replit.com/ai/model-farm/typescript).

Writing your first Gen AI app is as easy as:

```python
from replit.ai.modelfarm import CompletionModel

model = CompletionModel("text-bison")
prompts = ["What is the best way to learn AI?"]
completion = model.complete(prompts, max_output_tokens=50, temperature=0.2)

print(completion.responses[0].choices[0].content)
```

Replit ModelFarm supports chat models, code models, and text embeddings. To find out more, [check out our documentation](https://docs.replit.com/ai/model-farm/) or try out our [sample app](https://replit.com/@replit/ModelFarm-Bun-Chat?v=1#README.md).  

![demo video](/images/modelfarm/demo2.mp4)

The speed of adoption of Gen AI has reached a scale never witnessed before in the tech world. In our recent [State of AI Development post](https://blog.replit.com/ai-on-replit), we report 80% quarter-on-quarter growth in the number of Gen AI projects created on Replit. We don’t expect this growth to slow down anytime soon – if anything, the energy that AI builders have been pouring into their projects never ceases to amaze us. Now, we want **every** software creator to turn into an AI software creator.

Generative AI has sparked the imagination of millions already. We can’t wait to see what you will build with Replit ModelFarm!







