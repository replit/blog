---
title: "Using Repl.it as a CMS"
author: Tyler Angert
cover: https://blog.repl.it/images/cms/cms-preview.png
date: 2020-03-23T00:00:00.000Z
categories: projects
---

At Repl.it, we try to dogfood (use our own product) as much as we can. Parts of Repl.it are already developed on / hosted entirely on itself-- our blog, our docs, and even our new UI library is being developed almost entirely on Repl.it. But one interesting use case we’re exploring now is using Repl.it as a CMS for all of our new marketing pages.

The previous issue with our marketing pages was that they took a long time to update. Their content, templates, and assets all lived in our main web-app repository, so any updates made would usually take at least 30 minutes to go to live. This made changing minor details laborious and discouraged design iteration. As programmers, we've internalized version control and build pipelines, but really Repl.it offers what we've needed for this all along: the ability to make a change and see it right away.

A simple solution that a lot of websites take now is to serving marketing content from an API-first CMS like Contentful. Contentful is a great product; it allows non-developers to easily edit content on the web and instantly creates APIs for developers to use. It’s simple, fast, and robust for many use cases.

But it’s limited. If your data model for your content includes nested content / content trees (like a JSON object) there isn't a straightforward way to model it in Contentful except to actually write JSON or to use workarounds. Even Contentful [has written about it.](https://www.contentful.com/blog/2015/02/17/content-trees-tags-and-facets-in-contentful/)

![Contentful UI](images/cms/contentful.png)

Our small Contentful app was basically just acting like a hosted JSON object. Lo and behold, there’s actually a product I use daily that’s perfect for creating APIs and serving hosted JSON.

We ditched the Contentful approach and just created an HTML repl on Repl.it and put all of our content as JSON files in there. In less than a minute, we had a CMS running on Repl.it and setup our React templates to call it. Best of all, since the repl is an actual computing environment, we can run scripts on each update (like clearing our Cloudflare cache). If you want even more control, you could create a Node.js repl and host content from there.

![Contentful UI](images/cms/cms.gif)

You can check it out [here](https://repl.it/@tangert/marketing-content-server)  (it’s a work in progress as we roll out our new marketing pages!). Of course, the editing experience isn’t ideal and not as finely polished as dedicated CMS services like Contentful. But at the end of the day, we’re a small team and are all comfortable writing and reading JSON, and updates to content and assets takes seconds. Soon, we’re planning on building a form renderer that lets you render JSON as a GUI, so editing will be even smoother shortly. If you’re a team looking for a lightweight solution to a hosted CMS with the power of a full computing environment, give it a try and [sign up](https://repl.it/signup) if you haven't! 
