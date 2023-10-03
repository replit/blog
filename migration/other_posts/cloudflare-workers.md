---
title: Deploy a Cloudflare Worker from Replit – anytime, anywhere
author: The Replit Team
categories: news
cover: https://blog.replit.com/images/cloudflare-worker/cover.png
date: 2023-03-01T00:00:00.000Z
---

![Replit x Cloudflare](https://blog.replit.com/images/cloudflare-worker/cover.png)
 
From large-scale businesses to nonprofits to anyone on the Internet, Cloudflare aims to make developer applications faster, more secure and more reliable. Cloudflare also offers an entire suite of developer products to help build the fundamental pieces of their applications. Every day, thousands of new developers around the world use the Cloudflare Developer Platform offerings from compute to storage to opinionated developer products to deploy everything from serverless functions to full-stack applications. 

With the Cloudflare Developer Platform’s mission to meet developers where they are, today, we’re excited to announce that you can now deploy Cloudflare Workers (serverless functions) from Replit! Easily deploy a Worker to Cloudflare’s global network and manage your projects anytime, anywhere and from any device. With Replit, you can experience a streamlined onboarding experience and setup with just a few clicks.

> "We've been hearing from our users that they want a way to deploy to Cloudflare Workers with Replit. We're very excited about this template and to collaborate with Cloudflare to make it easier for developers building on Replit to use whatever technologies they choose.” — Bardia Pourvakil, Head of Developer Relations at Replit

## What are Cloudflare Workers?

[Cloudflare Workers](https://workers.cloudflare.com/) make it easy to deploy serverless code instantly across the globe, providing exceptional performance, reliability, and scale. 

Using the Cloudflare Workers template, you can build serverless functions directly onto your Replit project and deploy to a highly scalable, low-latency JavaScript execution environment that’s available in over 275 locations around the globe. You can use Cloudflare Workers on Replit to: 

- Build out APIs 
- Handle form submissions from your website
- Perform A/B testing 
- Cache content on the edge

## How can I deploy a Worker on Replit? 

### Create a Repl

To get started, go to [repl.new](https://repl.new), select the **Cloudflare Workers** template, and press **Create Repl**.

![Create Cloudflare Worker Repl](https://blog.replit.com/images/cloudflare-worker/create-repl.png)

Once the project is created, you will be provided with a `README.md` file which will walk you through step-by-step directions on how to use the Worker template. 

### Set up your Worker 

Following the README, you can use the Run button to install the Wrangler CLI and set up a new project with all of the files and configurations needed to start building your first “Hello World!” Worker. 

![Cloudflare Worker Repl](https://blog.replit.com/images/cloudflare-worker/repl.png)

By pressing the Run button again, your Worker will become available on a Replit subdomain. In the example project above, we can find our project at `my-cool-project.example.repl.co`. After a few additional steps (e.g. adding Cloudflare account credentials to Replit Secrets), you can run `npm run deploy` to build and publish the Worker to the Cloudflare Global Network.

## Want to try a real-world example? 

While you can learn about the deployment experience by building a simple `hello world` example, you can build a more practical application using the Cloudflare Learn module. Here you can get a step-by-step walkthrough of how to build a [Notion-backed web form](https://replit.com/@Cloudflare/Handle-Form-Submissions-with-Cloudflare-Workers-and-Notion) using Workers and Replit. 

## Get started today!

If you’re not currently a Cloudflare Workers user, you can create a Cloudflare account [here](https://dash.cloudflare.com/sign-up/workers) to get started with our generous free tier. Whether you’re a new developer or a seasoned professional, building great web applications can involve a lot of moving parts. Both Cloudflare and Replit are looking to provide the tools and resources for developers to focus on what they do best – developing great applications! 

## What is Replit?

Replit is the fastest-growing developer community in the world. With over 20M developers across the globe, the platform allows developers to build, deploy, and host applications from any device, anywhere in the world. AI tools like Ghostwriter Chat and community features like trending feed make it the best platform for developers to build faster and share immediately.

[Get started with Replit today](https://replit.com/login), and create your first application using the [Cloudflare Workers template](https://replit.com/@Cloudflare/Cloudflare-Workers?v=1).