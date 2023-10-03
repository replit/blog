---
title: HTTPS by default
author: Newman Hu and Sidney Kochman
date: 2-26-2021
cover: https://blog.repl.it/images/alwayson.jpg
categories: product
---

The easiest, fastest way to put a server on the internet should also come with secure defaults. That's why we're excited to announce that Replit is now HTTPS-first, which brings additional privacy, integrity, and security benefits to servers hosted on our platform. This applies to every [HTTP server repl](https://docs.repl.it/repls/http-servers) on Replit.

![example_flask_repl](https://blog.repl.it/images/secure_hosting/repl_flask_example.gif)



## HTTPS-first

Our hosting infrastructure makes it easy for anyone to instantly have a secure, HTTPS-secured server by default without having to lift a finger.

Any repl can open up a port and we'll automatically give it a publicly-accessible URL. Routing requests from the internet through to individual repls is handled by a component of our infrastructure we call the proxy.

On Replit, HTTPS-first means that the proxy will redirect any HTTP request to a server repl to HTTPS before it even reaches your app. Additionally, we serve [HTTP Strict Transport Security headers](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security) to clients to ensure that they know to make future requests over HTTPS instead of HTTP. This makes the easy path and the secure path one and the same.

## How we issue certificates

Replit is responsible for around half a million HTTPS certificates. The proxy is responsible for requesting, storing, serving, and renewing these certificates using the Automatic Certificate Management Environment protocol. 

ACME allows us to programatically request HTTPS certificates from certificate authorities such as [Let's Encrypt](https://letsencrypt.org). Essentially, ACME provides methods for us to prove to Let's Encrypt that we do in fact control the names that we're requesting certificates for. If we can do this, then Let's Encrypt will grant us certificates that are widely trusted by modern operating systems and browsers.

## Validation

We use two types of ACME validation to prove that we control the names we're responsible for: HTTP-01 and DNS-01.

### HTTP-01

HTTP-01 validation is a straightforward way to prove that we control our names. The ACME server gives us a token, and then all we have to do is respond to that challenge by providing a specific token at a path on the domain under `/.well-known/acme-challenge/`. This is typically very quick to validate.

HTTP-01 is the method we use to issue certificates for [custom domains that serve repls](https://docs.repl.it/repls/web-hosting). Since those domains must already have CNAME records pointing at the proxy, we can do this without requiring the domain owner to make any other changes.

### DNS-01 and wildcard certificates

DNS-01 validation is a more flexibile type of validation, though it requires more moving parts and is typically slower than HTTP-01 (on the order of a few dozen seconds.)

This type of validation requires that we control the DNS records for a given name. This is true for the URLs that we provide to every server on Replit, i.e. the repl.co domain.

DNS-01 validation also has a unique feature: we can use it to issue wildcard certificates. On Replit, we issue every user a certificate that is valid for `*.<user>.repl.co`. This is important because it means that we only have to issue one certificate per user regardless of how many servers they have. We only have to pay the user experience cost of requesting a new certificate the very first time that any of a user's repls receive traffic, and then any new server repls from that user can immediately use the previously-issued wildcard certificate.

To do DNS-01 validation, we tell our DNS provider to set a TXT record at `_acme-challenge.<user>.repl.co` with the value that the ACME server provides. Once we observe that our DNS provider is serving this record, we ask our ACME server to validate the challenge. If it also sees that the record has the expected value, then our certificate request is granted and we've successfully requested this user's new wildcard certificate.

## Renewals

Our certificate authority, Let's Encrypt, issues certificates that are valid for only 90 days. This means that certificate renewal must be a very regular process for us.

On any given day we typically renew between 5,000 and 10,000 certificates. Whenever we handle an HTTPS request, we check how much lifetime is left in the certificate. If it expires in fewer than 30 days then we'll renew the certificate using the same process that we used to issue the certificate initially.

To account for our ACME provider's rate limits and renewal hot spots when many certificates are issued at approximately the same time, the proxy will enter a conservation mode where it defers certificate renewals when we don't have any spare ACME orders remaining for our account. This ensures that we can still issue brand-new certificates at any given moment. Because we start trying to renew a certificate with 30 days of lifetime remaining, there's no interruption of service if we delay renewal by a few hours, days, or even weeks. We also have a circuit breaker that will ignore order conservation and always kick off a renewal if a certificate we're using is very close to expiration.


![example](https://blog.repl.it/images/secure_hosting/curl_example.png)

## Get to building!

HTTPS-first is a milestone for our vision of how easy, simple, and fast web hosting should be. [We've been iterating on hosting for almost three years](https://blog.repl.it/deploy) and we think you'll be thrilled at [what's in store](https://twitter.com/amasad/status/1359553366590779399).

Together with [Always On](https://blog.repl.it/alwayson), [Database](https://blog.repl.it/database), and [the huge suite of tools](https://docs.repl.it) on Replit, there's no better place to build.

Thank you to the team at Let's Encrypt for the wonderful service they provide. They are essential to allowing us to deliver HTTPS to everyone on Replit.

Happy coding! We can't wait to see what you make.

![always on](https://blog.repl.it/images/alwayson.jpg)