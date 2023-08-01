---
title: Keeping Your API Keys Safe
author: J Malcolm
date: 2023-06-09T13:00:00Z
cover: 
categories: security
profiles: qirtaiba
---

Replit gives you the power to both build your own applications and to leverage powerful third party services through their APIs. By integrating third party services into their Repls, Replit users have unlocked a diverse range of capabilities such as [speech to text](https://blog.replit.com/build-a-speech-to-text-app-with-assemblyai-on-replit), [video livestreaming](https://blog.replit.com/build-your-own-livestreaming-service-with-api-video), [embedding data into AI applications](https://blog.replit.com/chroma), and even [tracking Amtrak trains](https://blog.replit.com/amtrak). 

Integrating a third-party service into your Repl usually involves acquiring an API key or token from the third party that uniquely identifies you and your app. It’s important to keep this API key secret because if it is leaked and used by someone else, they could misuse it while impersonating you. You could find yourself losing your API access, or even incurring unauthorized charges. 

We saw this need and developed tooling around it for you. Replit makes it easy for you to protect your API keys, by using [Secrets](https://docs.replit.com/programming-ide/workspace-features/secrets#managing-secrets). When you add your API key as a Secret, you make sure that it won’t be visible to others who view your Repl’s code, and won’t be included if anyone else forks your Repl.

![Secrets dialog](images/secrets.png "Secrets dialog")

With the recent explosion of interest in AI, there has been a corresponding rise in the theft of OpenAI API keys in particular. Replit is doing its part to make sure that our users don’t become victims of this crime. We have been a partner of OpenAI’s since 2021 and care deeply about AI development and security. 

Whenever a Repl is published to our Community, we automatically scan it to make sure that an API key has not been inadvertently included in the Repl’s code. In addition to API keys from OpenAI, we also scan for API keys from a number of other popular service platforms, including GitHub, npm, PyPI, Discord, and Sendgrid. We’ve also tightened up our sitewide search to prevent it from being misused to scrape exposed API tokens.

If an exposed API key is discovered, we unpublish the Repl. Then we use a method supported by the third party service to revoke the API key so that it can’t be misused. We then send the user a notification similar to this one, to alert them to what has happened:

![Secret notification](images/secret-notification.png "Secret notification")

Here’s what you should do if you receive a notification such as this one:

1. Log into your account with the third party service to see whether your API key has already been used to incur any unauthorized charges. Hopefully this won’t be the case, because our scanning service runs frequently.
2. Issue yourself a new API key. [For OpenAI](https://platform.openai.com/account/api-keys), you are looking for the “Create secret key” button, though the wording may differ slightly on other service platforms.
3. Rather than adding the new API key directly to your Repl’s code, [add it as a Secret](https://docs.replit.com/programming-ide/workspace-features/secrets#managing-secrets). 

Using Secrets with your code is easy, and we even have a [video walkthrough](https://www.youtube.com/watch?v=Xrg2XP1JJec) that explains exactly how to do it. If you still have questions about how to use Secrets to protect your API keys, there are many helpful people on [Replit Ask](https://ask.replit.com/) who are waiting to give you a hand, so don’t hesitate to reach out if you need assistance. 

Safeguarding your API keys is essential to prevent unauthorized access and misuse. Replit understands the importance of API key security and offers tools like Secrets to protect them. With these tools and our supportive community, you can secure your API keys and integrate third-party services with confidence.