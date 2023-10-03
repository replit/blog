---
title: Analytics For Every Repl
author: Lincoln Bergeson
date: 2022-10-12T12:00:00Z
cover: https://blog.replit.com/images/analytics/thumbnail.jpg
categories: product,infra
profiles: lincoln-replit
---

Web hosting on Replit is simple yet effective. When you start a server in your repl, we automatically detect which port it opened on and provide a public endpoint for you to access it.

In other words, every HTTP request that goes to a `*.repl.co` domain is reverse-proxied through our secure infrastructure. This lets us do some cool things that more basic hosting providers simply can't do.

One of these is analytics for your website or API. Have you ever wondered how many people visited your web site, what browsers they used, and whether they had any issues? Now you can find out!

As of today, web analytics on Replit is automatically available in every repl, without installing any third-party JavaScript packages.

To access it, just add `/analytics` to the end of your repl's URL, such as `https://replit.com/@user/slug/analytics` after enabling the Explorer role on your account.

## Web Analytics Dashboard

<video src="https://blog.replit.com/images/analytics/explainer.mp4"  class="css-3qjkrt" autoplay muted playsinline loop controls></video>

The dashboard shows:
- **Page views:** The number of HTTP requests your repl received per day
- **Unique page views:** Total unique IP addresses that visited your website
- **Top URLs:** The ten most visited URL paths on your website (query parameters are stripped)
- **Top Referers:** What website most users were on before they came to your site
- **Countries:** A heatmap showing how many hits came from different countries around the world, based on IP address
- **Browsers:** The top browsers, operating systems, and devices used to access your website, arranged in a pie chart
- **Request errors:** 4xx and 5xx responses sent from your repl, arranged by URL, and a "failed to proxy" error, which indicates that your repl couldn't be reached at all
- **Request duration:** How many seconds it took for your repl to process and respond to HTTP requests

Let us know what else would be useful to see on this dashboard! Leave your feedback in [this repl](https://replit.com/@replit/Repl-Analytics-Feedback?v=1).

## Limitations

Note that the analytics page has a few limitations as of this writing:

- This feature is in early beta, so aspects of it are subject to change. In fact, you can help us shape this feature!
- The pages bases geolocation on IP address, so it's an estimation only that can be tricked by VPNs and other services that hide IP addresses.
- Like all other analytics software, our browser detection is based on the [HTTP User Agent](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent), an arbitrary string provided by the client known to be spoofable.

## What's Next?

We're committed to making Replit a superb place to host websites and other applications of all kinds. Analytics gives you the tools to understand how your repl is behaving after you write all the code and hit that "Run" button. 

There's plenty more we could add to the dashboard! If you find this feature useful, we'd like to be in touch and understand your use case more. Please leave a comment on [this repl](https://replit.com/@replit/Repl-Analytics-Feedback?v=1) with your feedback.

Hosting and deployments are evolving at Replit. This is just the first of many new features we'll introduce over the next few months as we rethink from first principles how software creators can deploy web apps in the fastest and simplest way possible.