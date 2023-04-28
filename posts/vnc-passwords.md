---
title: Securing your graphic repls
author: Luis Héctor Chávez
date: 2021-04-07T17:00:00.000Z
categories: product
---

Have you ever wished to be able to protect your graphic repls against prying eyes? Starting today, all VNC connections are automatically protected by the same token that keep your connection to the repl secure. There is nothing you need to do, since this is completely transparent.

We also acknowledge that some of you want to access your repls with the stock [noVNC](https://novnc.com/) client. For that case, we are also allowing you to access it with the `runner` username and a password of your choosing: All you need to do is create [a secret](https://docs.replit.com/repls/secret-keys) called `VNC_PASSWORD`. Due to limitations in the [Remote Framebuffer](https://en.wikipedia.org/wiki/RFB_protocol) authentication mode that is currently being used, only the first 8 characters in the password are considered at the moment, so try to auto-generate it with your password manager (like 1Password / LastPass) to make them harder to guess. The detailed steps can be found in our [official docs](https://docs.replit.com/repls/vnc).

Don't worry about having to type the password every time you launch it: it will be transparently filled in when you access your repl from the website.

Happy graphic repling!