---
title: Announcing Secrets Management 
author: Faris Masad
date: 2021-04-19
cover: https://blog.repl.it/images/secrets.gif
categories: product
---


Replit is the go-to place for a lot of people to build their applications. People build chatbots, web applications, games, and so much more. Naturally, projects like this need to maintain sensitive information (secrets). Today we're announcing a new and improved way to manage secrets.

To give you an idea of how and when this is useful, let me give you some examples. To [build a Discord chatbot](https://www.codementor.io/@garethdwyer/building-a-discord-bot-with-python-and-repl-it-miblcwejz), the programmer would have acquired a Discord API key. If the key is exposed, then anyone can come along and send messages as the bot. Before we gave a database for every repl, applications would use an external database with access credentials stored somewhere in the code. Exposing the database connection credentials is disastrous for obvious reasons. When someone builds a web application with authentication (users), the server signs cookies with a cryptographic key, ensuring that the visitors are who they say they are. Stay tuned for an announcement for a Replit authentication system, so you don't have to worry about signing cookies either.

Traditionally, people purchased [the hacker plan](https://replit.com/site/pricing) to make their repls private and keep their secrets secure. However, that meant hiding the repl and the code from the world. People wanted to also [share their repls with the community](https://replit.com/talk/share). Code sharing allows our community members to get feedback, teach each other, gain customer trust, and get all the goodness that comes with open source. For this reason, in 2019, we introduced the first iteration of the secrets feature to Replit, the dotenv file (".env"). The file followed a line-based `key="secret"` format, which was consumed as environment variables in the code, only exposing the "key" part and keeping the secret safe.

Dotenv served its purpose for our advanced users. They were able to use it to store data and configurations they want to hide. However, dotenv had many shortcomings. Unless people followed a Replit-specific tutorial or went scouring through our docs, the feature was undiscoverable. Beginners required an understanding of environment variables, and an empty free form file was overwhelming. 

The issues of dotenv even extended to the advanced users. The lack of a public standard for dotenv confused people when following external resources and tutorials. Another problem was that the dotenv file was not an actual file. Still, we communicated it as if it were. Some programmers would try to read it from the file system and be confused because it was not there. We did not write dotenv to the filesystem because forking relied on making a copy of the filesystem of a repl. It also gave us the flexibility of encrypting dotenv and taking other security measures to keep everyone's dotenv safe.

It has become apparent to us that we needed a better solution. What made the most sense for us is to add a GUI that is easy to use for learners and keeps our advanced users productive.

![SecretsSidebar](images/secrets.gif)

Adding new secrets is only a couple of clicks away. The key and value format is now a simple form with two text boxes. You can add multiline secret values, which was a common source of confusion for people using dotenv. The sidebar comes packed with inline documentation, but more importantly, a code inserter for all your favorite languages, so using your keys is also a click away. We also decided to hide the values by default since they are usually sensitive. You can click on a key to see the secret value and edit it. We created an introductory tour to guide users when they open the sidebar for the first time.

For now, the primary purpose of the feature is to hide secrets. In the future, you can use it to configure different environments (i.e., production/development) for a repl when we launch "Deployments". This change will also unlock some features for us such as retaining `key`s when someone forks a repl with secrets.

Look for a lock icon in your repl's sidebar to store and use your `SUPER_SECRET_KEY`. You can visit the docs for further reading https://docs.replit.com/repls/secrets-environment-variables.

*Note: If you have an existing dotenv file, we will migrate it to the new GUI. If you face any issues with the migration or have any feedback, please let us know. One common complaint we have received from our beta testers/power users is that the GUI lacks the functionality to copy and paste environment variables between repls quickly. We will be exploring ways to make that possible and keep you productive!*