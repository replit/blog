---
title: Ethical hacking on Replit
author: J Malcolm
date: 2022-08-15
categories: Other
cover: https://blog.replit.com/images/default.png
---
We’re proud to say that Replit was built by and for hackers. A hacker, as defined in an [early Internet glossary](https://www.rfc-editor.org/rfc/rfc1392.html), is “A person who delights in having an intimate understanding of the internal workings of a system, computers and computer networks in particular.” It’s this sense of curiosity and delight that motivates our community to grow and share their skills, and to show off their creations in our Community.

The media often misuses the word “hacker” to refer only to malicious cybercriminals. While that’s not what it means, there are some “black hat” hackers who seek to spoil the experience of others. This is true on Replit and other places - such hackers use platforms to distribute spam or malware, attack third-party services, or steal resources. That’s not part of our ethos of hacking, and those activities are prohibited by our [Terms of Service](https://replit.com/site/terms).

With that said, the line between ethical hacking and abuse isn’t always obvious, particularly to young hackers who are just starting out. In particular, many of our users begin their programming journey on Discord, where Replit has a [large community](https://discord.util.repl.co/). Hacking on bots to interact with Discord’s service is a great way to learn, but some of these bots have malicious functions that aren’t allowed to be hosted on Replit. 

To make things a bit clearer, here are some examples of the most common violating repls that we come across on a daily basis, with explanations of why we don’t allow them.



* **Nuke and raid bots.** Bots designed to disrupt Discord servers are one of the most common violating repls that we see. Because these are used to attack third-party services, we do not allow them.
* **Snipers and grabbers.** Scripts that steal credentials or tokens from other users are not allowed. A common example of this that we see are Discord Nitro snipers or generators. There’s no such thing as “free Nitro”... even if they claim to “generate” Nitro, these scripts are actually attempting to find and steal tokens that other users have already purchased. Other examples that fall into this category include token grabbers and IP loggers. These are commonly combined with “free Nitro” or “free Robux” scams, that are designed to fool users into giving up their login tokens or IP addresses by clicking on a malicious link or scanning a malicious QR code.
* **Mass DM and spam bots.** Our rules against spamming prohibit posting spam to Replit, but they also prohibit tools that are designed to spam other platforms. Mass DM bots fall into this category, and aren’t allowed.
* **Phishing.** It may seem obvious, but creating a fake version of a third party website login page to steal user credentials is absolutely not allowed on Replit. Phishing sites that simulate bank websites are taken particularly seriously. If you publish such a page, don’t expect to get off with just a warning.
* **DDoS attacks.** Repls designed to attack a third party service with a high volume of requests are not allowed. If you are writing a script that interacts with a third party website or service, make sure to rate limit your requests so that your script is not interpreted as an attack.
* **Exploits**. Repls that exploit known vulnerabilities to gain unauthorized access to a third party service or to disrupt its operation are not allowed. The same applies to repls that actively scan for vulnerabilities, unless you have permission from the owner of the systems that you are scanning.

As hackers ourselves, we recognize that some of the techniques of black hat hacking are also used for benign reasons. With that in mind, here are some things that we do allow.



* **Scripted interaction with third party websites and services**. Coding a bot to help you use your account on a third party website is generally fine with us, so long as you don’t overload the site. Examples of this would include a bot to notify you when a certain event occurs, to keep your account online, or to automate actions that you could otherwise perform manually.
* **General-purpose security tools.** Tools used by security researchers are generally allowed, provided that they can’t be directly deployed in attacks. A good example of this is a password cracking tool that uses generally-applicable techniques such as brute force or dictionary attacks to guess a supplied password. Such tools are a common coding exercise, and a good way to learn about encryption.
* **Private repls for authorized penetration testing.** If you’re learning about network security and want to test out how common network attacks such as command injection and cross-site scripting work, the best way to do that is by using a private repl. In that way, you can ensure that the tools you’re using are only used against authorized targets. You can make as many private repls as you want for just [150 Cycles per month](https://replit.com/cycles).

Infringing our Terms of Service can lead to a warning, or in serious cases even to a suspension or ban from using Replit. But if your code doesn’t attack a target, exploit a vulnerability, or steal a token or credential, you most likely have nothing to worry about! Feel free to learn, experiment, and have fun. If you have any questions, we’d be happy to hear from you at [contact@replit.com](mailto:contact@replit.com).
