---
title: New Workspace Features to Keep Your API Keys Safe
author: Brady Madden
date: 2023-08-16
cover: https://blog.replit.com/images/secret-scanner-cover.jpeg
categories: product
---

![](https://blog.replit.com/images/secret-scanner-cover.jpeg)

As the community using Replit continues to grow, we want to help all users follow best practices and [store API keys and secrets securely](https://blog.replit.com/keeping-your-api-keys-safe), rather than directly in code. Our [**Secrets** feature](https://www.youtube.com/watch?v=Xrg2XP1JJec), available in every Repl, allows you to store API keys [securely](https://docs.replit.com/programming-ide/workspace-features/secrets#how-replit-keeps-your-secrets-safe) where other users running or forking your Repl can’t access them. Now, we’re introducing new Workspace features to proactively help you protect your API keys and secrets.

When Replit detects that you’re attempting to paste a likely secret value, like an API key or token, into a file, our Secret Scanner will warn you and give you the option to store that value as a Secret instead. The scanner runs behind the scenes and is completely client-side. You won’t know it’s there unless a potential secret value is encountered.

## How it works

The Secret Scanner uses a list of known API key patterns and regexes to identify a likely secret value and warn you. Within the Secrets feature, data is encrypted with AES-256 at rest, and encryption keys are stored in a secure location that is protected by multiple layers of security. To help protect against key compromise, encryption keys are rotated regularly. Only you and your invited collaborators can see Secret values in a Repl.

## Stay in flow

We designed the secret value warning to get your attention while coding and simultaneously maintain your flow. When Replit notices that part of your pasted text may contain a potential API key or secret, we display the identified string as ghost text, which will look familiar to Ghostwriter users.

![Secret scanner popping up inline while coding](https://blog.replit.com/images/secret-scanner-inline.gif)

A warning tooltip will appear near the potential secret value with keyboard shortcuts to either add a secret or continue pasting the text into the document. This prevents the secret from ever making it into the file - where other users could see it - or into the file history. The portions of your pasted text that do not contain potential secrets will be pasted normally.

## Stay protected everywhere

No matter how you write code, we want to provide you with the same security features. The scanned secrets warning is also available on the Replit Mobile App, so you can use it to protect your API keys and secrets even when coding on your phone.

![Secret scanner in the mobile app](https://blog.replit.com/images/secret-scanner-mobile.gif)

Since its initial launch, the scanned secrets warning has prevented more than 500 API keys and secrets from ending up in open source code on [Replit.com](https://replit.com/) and instead stored them securely in Repl Secrets. We’ll continue to enhance our scanning capabilities as part of our ongoing commitment to user safety and security.

For more information on keeping your API keys secure, check out our previous [blog post](https://blog.replit.com/keeping-your-api-keys-safe) and [video](https://www.youtube.com/watch?v=yFe49GDjpAo).

## Work at Replit

Are you interested in building and securing the next-generation development environment? [Come work with us](http://replit.com/site/careers) on our goal of empowering a billion software developers.



