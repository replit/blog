---
title: Tips for safer social repl development 
author: J Malcolm
date: 2022-05-18
cover: https://blog.replit.com/images/safer-social.png
categories: other
---

Replit makes coding into a social activity, in many different ways. You can easily share your repl with our vibrant developer [community](https://replit.com/community/all) to receive feedback, tips, and kudos. Our [multiplayer features](https://replit.com/site/multiplayer) allow you to write, review and debug your code together with buddies. And with access to the full power of the Internet and dozens of powerful programming languages, you can even write code that [brings other users into your repl](https://replit.com/community/multiplayer) in real time.

This isn’t a new feature. In fact, our co-founder Amjad Masad has written about how a 12-year old user of Replit [hacked the first chat app](https://blog.replit.com/internet-of-fun) and community space on Replit way back in 2018. Amjad also explains how it didn’t take long for spammers and other bad actors to find this chat room, and how that spurred the development of moderation features and filters.

Today, you can find any number of multiplayer games, chatrooms, and other social apps on Replit, many of which have faced similar challenges to remain free of spam, profanity, and other abuse. So if you’re developing a repl with social features, what do you need to know? While it isn’t intended as a comprehensive guide, this blog post will point you in the right direction to stay a step ahead of users with mischievous or harmful intentions.


## Safety by design

The very best way to avoid the abuse of your repl is to think about the ways in which it could be misused while you’re still planning it out, so that you can take proactive steps to avoid such misuse. Every app is different, so there’s no one-size-fits-all solution. But an example of a common safety feature for apps that allow messaging is to include rate limiting and filtering to prevent users from sending repeated, spammy, or abusive messages.

If your repl also allows its users to chat with each other, allowing them to block unwanted communications is a good safety precaution to take. But an even better one may be to disallow direct messaging altogether, by limiting users to public group chats. This is an especially good idea if your repl is targeted at minors.

A good way to brainstorm how your repl should be designed to keep its users safe is to look at other popular apps in the same category. If you’re making a Twitter clone, what features does Twitter use to prevent malicious users from spoiling other users’ experience? And how does this compare to TikTok, or Instagram? (Hint: if you’re not sure how major social media platforms stack up on these safety features, [this article](https://www.intego.com/mac-security-blog/a-parents-guide-to-protecting-kids-privacy-on-social-media/) contains a decent rundown.) 


## Don’t reinvent the wheel

Seeing your repl being misused to spread profanity and abuse can be discouraging and hurtful. But writing the code to detect and stop such abuse can feel daunting, and including a list of offensive words and phrases in your repl can be unpleasant. The good news is that you might not have to do so. In all likelihood, someone has had the same problem before you, and has shared the code that they developed.

Whether you’re writing in [Python](https://github.com/ben174/profanity), [PHP](https://github.com/jcrowe206/BadWordFilter), [Javascript](https://www.npmjs.com/package/bad-words), or some other language, there is a good chance that a [bad words list](https://github.com/LDNOOBW/List-of-Dirty-Naughty-Obscene-and-Otherwise-Bad-Words) library already exists for it. If so, you may also be able to [install it as a package](https://docs.replit.com/programming-ide/installing-packages) so that you can use it in your repl.

And that’s just the start; there are also libraries that can help you with other safety features such as content moderation and URL filtering. Repl itself is a goldmine of working code examples from users with similar repls to yours. Ask them on their spotlight page: what worked well, and what didn’t?


## Establish and enforce good behavior guidelines

Being prepared for badly behaved users is important. But most users want to do the right thing, so you should give them the chance to do that. Rather than assuming they know what behavior is and isn’t allowed, it’s a good idea to spell it out for them. You can do this by displaying or linking to a simple list of rules before a user is able to use your repl’s social features.

It doesn’t have to be long or legalistic. You could start with something as short and simple as this, based on our [Discord Code of Conduct](https://code-of-conduct.discordmods.repl.co/) (and yes, feel free to borrow them for your repl if you like!):



* Remain civil and respectful at all times. Don't be toxic or mean.
* No hate speech, including any form of slurs, discrimination, or harassment.
* No NSFW content of any kind, including sexualized language or imagery, profanity, or content promoting self-harm.
* Do not share others' private information without their explicit permission.
* No spamming, unnecessary or repeated pinging, or unsolicited self-promotion.

Once you have set your rules, you need to make sure that they are enforced. This means checking in on your repl to make sure that its users are behaving, and taking action if they’re not. If you’re lucky enough that your repl has gathered an active community of its own, you can ask trusted members of that community to help you out. Make sure that they have a way to contact you when you’re not around.

Finally it’s also worth noting that you are responsible to ensure that users of your repl comply with [Replit’s terms of service](https://replit.com/site/terms). If we find that your repl is being misused, then we may have to unpublish it, even if you aren’t directly responsible. In addition to the good behavior rules above, this includes allowing your repl to be used to break the terms of service of another website.

We don’t expect the impossible; even the biggest Internet platforms are playing a cat and mouse game to prevent abuse. But you can give yourself a head start by re-reading this post before you publish your next repl. Apps thrive when their community of users feel safe, so you’ll be glad that you took the time to think about this sooner rather than later. Happy coding, and stay safe!
