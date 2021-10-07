---
title: reCAPTCHA and the anonymous experience 
author: Amjad Masad
date: 2020-11-4
categories: product
---

When we started Repl.it, we set out to remove all friction from getting started with programming. That also meant getting out of the way and letting you code as quickly as possible. As part of that, and for a long time, you could start coding on Repl.it without a user account. 

We anticipated that giving free unfettered compute to the universe would be challenging. Still we didn't flinch and made it a point to innovate on sandboxing, security, and anti-abuse tools, and we've been largely successful at that. Today, Repl.it the largest open compute platform on the internet, one where you don't need a credit card or even an account to start executing. We run 150,000 concurrent containers, which is 10x what we used to run last year.

We have our fair share of war stories, like when we had to battle dark-web hackers trying to sell DDoS attacks from our site for Bitcoin. Luckily reCAPTCHA from Google was a massive help, protecting against botting made it possible for us to continue to grow and offer our services for free.

Sadly, earlier this year, Google surprised us that they're going to be charging for reCAPTCHA. Of course, it makes business sense for them, but for a startup like ours, operating at the scale we operate at, it meant that we have to pay them more than we make in monthly revenue<small>[1]</small>.

That leaves us with two choices:

- leave the site vulnerable to botting and attacks resulting in an immense amount of time spent fighting abuse and risking outages
- phase out the anonymous experience and focus our efforts and tools on securing the logged-in user experience

We decided to go with the latter, and we hope you'll stick with us and create an account. Beyond the 5 minutes it takes to sign up, there is only an upside to doing so. We don't collect much data, and we respect user privacy. You're also going to unlock many features that were invisible for you in the anonymous experience:

- Name and organize your repls
- [Host apps and websites](https://repl.it/site/hosting)
- [Collaborate with others in Multiplayer](https://repl.it/site/multiplayer)
- Claim and build a profile with the repls you're most proud of
- Particpate in our [community forums](https://repl.it/site/community)

And many more that we're sure you'll enjoy discovering.

## Timeline

Google gave us only one month to move off, so we're going to have to move fast. Here are the changes to expect in the upcoming few weeks: 

- We'll transition our language pages (`/languages/{lang_name}`) to a barebones REPL with limited opportunity for abuse. That way if you're used to using Repl.it to try out just a bit of code, you can continue to do that without logging in
- repl.run, the url endpoint you could access command-line apps will redirect to the repl. repl.run is inherently anonymous, which makes it an attack vector without captcha
- finally, you'll have to login to create a repl and save your work

We remain committed to openness and instantness -- two principles that have made Repl.it special. I am thrilled to see you on the inside!

-----
<small>1: it's worth noting that we're already big Google Cloud customers, and our spend only continues to grow with them. </small>