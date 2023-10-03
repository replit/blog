---
title: A Python Framework With Built-in Database and Auth Support
author: Spencer Pogorzelski
date: 7/28/2021
categories: product
---

Replit enables coders to build apps quickly. With nothing but a browser, a developer can spin up a server, store data in Repl DB, and authenticate users using Repl Auth. However, until today, users had to string together all these components to build an app. This is why we're excited to announce `replit.web`, a Python framework focused on making apps quickly. Building an app with user auth and persistence has never been easier:

```py
import flask
from replit import db, web

app = flask.Flask(__name__)
users = web.UserStore()

@app.route("/")
@web.authenticated
def index():
    hits = users.current.get("hits", 0) + 1
    users.current["hits"] = hits
    return f"You have visited this page {hits} times"

web.run(app)
```

## Repl Auth

[Repl Auth](https://docs.replit.com/hosting/authenticating-users-repl-auth) is the built-in authentication system that ships with every Replit app. While Auth is super simple, it still required some code wrangling to integrate it into your app. Since `replit.web` extends the popular [Flask](https://flask.palletsprojects.com/en/2.0.x/) web framework, authenticating a route is now as easy as using the `web.authenticated` decorator to require authentication. The current user is then accessible under `web.auth.name`:

```py
@app.route("/")
@web.authenticated
def index():
    return f"Hello, {web.auth.name}"
```

## Repl DB

The magical experience of the new framework would not be possible without [Repl DB](https://docs.replit.com/hosting/database-faq) -- the fully-managed cloud database that comes with every repl -- that provides the effortless persistence. DB can be used like a regular Python dictionary and it it even supports nested setting feature:

```py
db["bob"] = {"score": 0}
db["bob"]["score"] += 100
db["bob"].get("friends", []).append("Alice")
print(db["bob"]) # => ObservedDict(value={'score': 100, 'friends': ObservedList(value=['Alice'])})
```

`replit.web` combines DB and Auth to provide `web.UserStore`, an instance of the db keyed by the usernames of authed users, which makes it straightforward to store user data: 

```py
users = web.UserStore() # optionally, pass a prefix

users.current # shorthand  for users[web.auth.name]
```

## The fastest building experience

In addition to DB and Auth `replit.web` tries to make every aspect of web app development easier, including utilities such as ratelimiting and requiring parameters. To test out the framework, we decided to build ReplTweet, a fun Twitter clone for Replit users. Users can login, read tweets, like them, and tweet out their own thoughts. The whole application clocked in at 150 lines of code. You can give it a spin [here](https://replit.com/@Scoder12/repltweet?v=1), or follow [the tutorial](https://replit-py.readthedocs.io/en/latest/web_tutorial.html#building-repltweet) to build your own.

Our goal is for this framework to be the fastest way to make Python web apps. Right now, it's focused on small apps and prototyping. As with everything we do at Replit, this is an early release, and we'd be looking to you, our beloved community, to give us feedback on how we can improve it.

Please visit the docs to get started and if you build an app, make sure to add the hashtag [#replitpy](https://replit.com/apps/replitpy) so we can see what you build. Let's get the hashtag trending!
