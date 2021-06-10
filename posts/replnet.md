---
title: ReplNet, the new internet of Repls
---

ReplNet is a new way for repls to talk to each other. Replnet enables message passing between repls and the magic of Replit makes the experience as smooth and seemless as possible. Part of our vision is for ReplNet to provide a framework for implementing microservices or distributed applications. 

## Secure Connections

## Access Control Lists
For each repl you can manage which other repls can communicate to it by modifying the access control lists. In the workspace there's a new UI for conducting these modifications. You can `Add`, `Remove`, and `View` all the other repls which have permission to directly send messages to this repl through Replnet. For example, you can write a private repl that provides some microservice and specifically grant access to other repls in your distributed application. Your private repl will not exist to outside repls which are not listed in the ACL. We do not leak the existence of your repl either, it will simply appear as if the repl does not exist instead of saying you do not have access.

**Insert Demo of using the ACL UI**



