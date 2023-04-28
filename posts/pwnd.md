---
title: We've Been Pwned
author: Mason Clayton
date: 12/3/2020
cover: http://repl.art/replit.png
categories: eng
---

As long as I can remember Replit has been receiving a large number of vulnerability reports. We're very grateful for these and take them extremely seriously. However, 99% of them stem from a misunderstanding of what we do. Our main product is RCE (remote code execution) and naturally this leads to a whole lot of RCE vulnerability reports.

Fed up with low effort and time consuming vulnerability reports I set up [this repl](https://repl.it/@turbio/repl-bounty) earlier this year. The bounty is simple: read my secret or edit my file and receive a $1000 cash prize. Either would be a critical vulnerability in our infrastructure. Having a clear goal and a prize was a good motivator, and indeed there was a lot of initial interest with many valiant attempts.

All was quiet until [PDanielY](https://repl.it/@PDanielY) was messing with our developer API (currently in closed alpha). Here is how he tells the story:

> I was trying to make a repl.run clone and then when I tried to use it run a public repo on my alt, I saw that my main account actually connected to the repl and I could edit files and stuff.

This was ultimately due to an oversight in the token minting code used by our developer API. It used a long since deprecated method of generating tokens when accessing repls owned by someone else. Instead of producing a temporary transparent fork you'd get full access to the underlying repl. Yikes!

Once PDanielY alerted us we verified it looked suspicious and immediately revoked all developer tokens. Next we looked at the logs to see if anyone other than PDanielY have exploited the bug and luckily, we found none (the alpha developer program has only a few developers).

Although we have no evidence of any unauthorized repl access it's a good idea to rotate credentials just in case. If you have any repls holding secrets in `.env` files now is a good time to regenerate those.

We're very appreciative to PDanielY for his responsible disclosure. Despite being one of our youngest community members he handled this with extreme maturity -- thank you! We're going to award him the prize but we'll keep [the bounty](https://repl.it/@turbio/repl-bounty) open. Good luck!