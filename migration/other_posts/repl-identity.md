---
title: Zero-Click Auth For Your Apps
author: Matt Iselin
categories: eng
cover: https://blog.replit.com/images/rust_cover.png
date: 2022-08-02T16:00:00Z
profiles: mattiselin
---

Picture this: you've built an arcade game on Replit. Gamers playing your game will head to the repl's cover page and click "Run". They love your game, and they send you feature requests and ideas in the comments. Now, you want to keep track of high scores and add other social features to your game. This used to be a show-stopper: there was no way to verify the API requests coming in, so your high-score feature was either easy to spoof, or simply didn't get off the ground.

We're rolling out Repl Identity to solve this.

## Cover Page Runs

When you click "Run" on a repl's cover page, we create what we call a "guest fork" in the background. For all intents and purposes, this is just like you clicked "Fork" on the repl - but it's ephemeral and gets cleaned up when you're finished running that repl. These stateless guest forks make the cover page experience work, but a side effect is that they don't have secrets and they don't share certain resources (like the Repl Database).

That's good for you: a user running a guest fork can't get a shell and view all of your secrets!

However, this functionality makes it hard to figure out how to authenticate a cover page run to any of your other repls that _do_ have the secrets. An isolated Repl DB means no data sharing. No secrets means no access to APIs or authentication keys. That's made it significantly harder to build multiplayer, social, or just user-oriented experiences in applications running in the cover page, because they are so isolated. That's what Repl Identity is for.

## Repl Identity

You can now see a new environment variable appear in your repls - `REPL_IDENTITY`. This is a PASETO (https://paseto.io/) token, signed by our infrastructure, that includes verifiable information about the repl.

You can write code that sends the value of `REPL_IDENTITY` to another repl that you run. The other repl can use public keys injected into each repl to verify the token is valid, then you can extract data from the token like Repl ID and username.

What does that mean for your apps? A user clicking "Run" on your cover page can be verifiably identified in your server, without clicking a single button or typing a password. That makes high score tables, social features (like chat), or even multiplayer games possible without implementing any other authentication system. The server can now trust that it knows who the user is on the other side, so it can store game state in Repl DB, access APIs using secrets, and send back responses to the client.

Once you're verifying tokens, you can just focus on building your app instead of figuring out how to securely authenticate your users.

## What about Repl Auth?

Repl Auth is designed for your users who are accessing your website from a web browser, using cookie(s) to retain the authentication between sessions. So Repl Auth handles web authentication for you. However, making Repl Auth work with an application that runs with VNC or in the terminal is not trivial. You can and should keep using Repl Auth for web applications you build! But if you find yourself unable to use Repl Auth for your project for some reason, chances are good that Repl Identity solves that problem.

## How do I Use It?

Here's a [demo](https://replit.com/@mattiselin/repl-identity#main.go):

<iframe frameborder="0" width="100%" height="500px" src="https://replit.com/@mattiselin/repl-identity?embed=true#main.go"></iframe>

This demo implements both the client and server side of repl identity in the same repl, by verifying its own token and printing the user/repl data enclosed within. When you click "Run" (when logged in to Replit), you should see your username.

If you're writing in Go, we've put together a [Go package](https://github.com/replit/go-replidentity) for this already ([docs here](https://pkg.go.dev/github.com/replit/go-replidentity)). More packages for other languages are on the way!

Using another language, or want to know how it works behind the scenes? Read on for all the low-level technical details!

To implement in your own repls, you'll need a PASETO implementation (there's a handful of them listed on https://paseto.io/) and some way of parsing Protocol Buffers (protobufs, https://developers.google.com/protocol-buffers).

The format of these tokens follows a chain of trust - it has a root, intermediate, and leaf. The leaf is what is stored in the `REPL_IDENTITY` environment variable. The footer of the leaf references the intermediate, and the footer of the intermediate references the root.

The root is a "key ID" rather than a full PASETO token. This key ID maps into the `REPL_PUBKEYS` environment variable - if you extract that, base64-decode it, and use it as an ED25519 public key, you'll be able to verify the signature.

If you're unfamiliar with the format of a PASETO token, a PASETO token is encoded as `version.type.payload.footer`. We're using `v2.public` tokens which mean the payload is unencrypted, but includes a signature. The footer can be used to store metadata, which we use to store metadata about the signing authority (such as the key ID used to sign the token).

So, you need to:
1. Read the footer of the client-provided token. This is the signing authority - the intermediate - in the form of another PASETO token.
    -  **note**: footers are double-base64 encoded (i.e. base64(base64(footer))) because they are required to be UTF-8 compliant and the protobufs embedded within are not compatible. If you're writing custom code you will need to decode twice.
3. Read the footer of the intermediate token. This will reference a specific key ID in its footer.
4. Read the `REPL_PUBKEYS` environment variable and extract the public key mapped to that key ID.
5. Verify the signature of the intermediate - if it passes verification, the intermediate includes a GovalCert protocol buffer message. This includes a public key that you can extract.
6. Use the intermediate's extracted public key to verify the signature of the client-provided token.
7. The chain has now been verified, and you can consume the payload in the client token. This is a GovalReplIdentity protocol buffer message.
8. You can also now check the "audience" claim which can be provided by a client to create a non-forwardable token (usually you can use a repl ID for this)

Once you've verified the chain and extracted the payload, you can trust the fields. Another user can't spoof the token as long as you only use `REPL_PUBKEYS` public keys to verify the chain (as the root is a private key owned by Replit).

A quick note on forwarding tokens. The client can use `REPL_IDENTITY_KEY` (a key unique to your _container_) to sign the repl identity token with an associated "audience". Servers can check that the audience matches what they expect (e.g. their own repl ID) before accepting the token. It's highly recommended that you add a signed audience claim in your clients so servers can't forward your token and pretend to be you. `createIdentityTokenAddressedTo` in https://replit.com/@mattiselin/repl-identity?v=1#main.go implements this additional signing step to make the tokens non-forwardable.

We're excited to see what you build with Repl Identity! I've already built a project on Replit that uses it - check it out here: https://replit.com/@mattiselin/BBS-Client