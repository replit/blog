---
title: Improving Domain Linking for Repls
author: Matt Iselin
categories: eng
cover: https://blog.replit.com/images/rust_cover.png
date: 2022-07-04T16:00:00.000Z
---

For some time now, it's been possible to link your custom domain to your Repl. You buy that perfect domain name, connect it to your website hosted on Replit, and you're good to go! Custom domains help you create a unique home on the internet - for your blog, a product you're launching, or just a space to try new ideas.

We are rolling out domain linking improvements - direct apex domain linking, magic domain linking, and multiple domain support. We also updated our domain verification logic! You can experience these right now if you're an explorer. Otherwise, these will make it to you soon!

## Domain Verification Logic

Previously, we would verify your domain by attempting to access a special Replit proxy-enabled route on the domain. As the number of domains grew, our servers' time spent verifying domains increased. We wanted to make this process more efficient. We updated the logic to verify DNS (the internet's address book) records - speedy! - before further checks. Verification happens on a slightly different cadence, in batches now.

In addition, every evening, we reverify domains. This daily re-verification process checks to see if we can still access your repl through your domain. If we encounter a problem, your domain linking status panel will update to show the domain is no longer "verified." Where possible, we'll show you the records that we see to make troubleshooting easier.

Because we are now verifying DNS records, and services like Cloudflare's "orange-cloud" modify DNS, we added TXT record verification to save you from having to turn off Cloudflare (or other systems) protection to successfully link.

![images/domain_linking/replit-domain-linking-creating.png](https://blog.replit.com/images/domain_linking/replit-domain-linking-creating.png)

## Apex Domain Linking

An "apex domain" is the top-level name in a domain. For example, replit.com is an apex domain, but blog.replit.com is not. These have special requirements in DNS. One requirement is that the CNAME record type we typically use to link must not be at the domain's apex. Service providers like Cloudflare offer features like "CNAME Flattening" that implement just-in-time resolution to let you work around this limitation. However, if your DNS service provider does not support this feature, you were out of luck.

We built a separate proxy for your apex domains to work around this. This apex domain proxy uses a TXT record to figure out your repl's location and then forwards web traffic to it. That means you can use an A record in your domain's DNS; everything just works!

## Magic Domain Linking

As we began implementing more options for domain verification that use TXT records, we realized we could utilize this to enable ["magic" domain linking](https://replit.com/@mattiselin/dns-magic-linking). Magic linking allows your domain to work similarly to the existing <username>.repl.co domain - without the repl.co!

This apex domain proxy runs at 34.132.134.162 - that can be used for your A record (and you'll see it in the domain linking setup screen too).

Let's look at an example - I recently bought mattsrepls.com. I want all my repls to be available at that domain.

- Step 1: I create a TXT record `replit-user=mattiselin` on this domain.
- Step 2: I create an A record pointing at `34.132.134.162` (the apex domain proxy) on mattsrepls.com
- Step 3: I create a wildcard CNAME record (`*.mattsrepls.com`) pointing at `mattiselin.repl.co`

![images/domain_linking/replit-domain-linking-magic.png](https://blog.replit.com/images/domain_linking/replit-domain-linking-magic.png)

I have a Flask demo at https://replit.com/@mattiselin/flask-1#main.py. Usually, this would be https://flask-1.mattiselin.repl.co. Now that I've added these magic linking records, this is accessible at https://flask-1.mattsrepls.com too!

Our infrastructure will notice that you don't have a verified custom domain for the request and immediately kick off a DNS request to look for your `replit-user` TXT record. If we find it, we'll treat the request like it was on the repl.co domain. We cache the DNS lookup, so even though the DNS request is already low-latency, the users of your websites won't get hit with increased latency on every request.

## Multiple Domain Linking

Finally, the new verification logic enables support for multiple domains to point to a single repl. You might have a website that you want to appear at flask-1.mattsrepls.com and mattsrepls.com simultaneously - that's now possible! Each domain has an independent verification process and state.

![images/domain_linking/replit-domain-linking-multiple.png](https://blog.replit.com/images/domain_linking/replit-domain-linking-multiple.png)

Happy domain linking!