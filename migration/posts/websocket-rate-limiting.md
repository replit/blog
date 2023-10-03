---
title: Distributed Websocket Rate Limiting
author: Amjad Masad
date: 2016-06-26T07:00:00.000Z
categories: projects
---

[Rate limiting](https://en.wikipedia.org/wiki/Rate_limiting) is standard
practice for services offering an API. It's used for both protecting against bad
actors, for example, attempting
[DOS](https://en.wikipedia.org/wiki/Denial-of-service_attack) attacks and to
simply enforce limits on the service. There are many resources on the web on
how to implement a rate limiter in your favorite language/stack. However, I
couldn't find anything on how to rate limit Websocket connections (they differ in that they are persistent connections).[](preview end)

If you're implementing an HTTP API rate limiter and your service endpoint is a
single server then it's pretty simple -- you keep an in-memory variable that you
increment. Things get trickier, however, when you're serving requests from multiple
servers. That's when you start needing a central shared "state". For this, most
developers use [Redis](http://redis.io). In fact, the rate limiting use
case is so prevalent in Redis that it gets a mention on the docs for the
[INCR](http://redis.io/commands/INCR) function:

```
FUNCTION LIMIT_API_CALL(ip)
ts = CURRENT_UNIX_TIME()
keyname = ip+":"+ts
current = GET(keyname)
IF current != NULL AND current > 10 THEN
    ERROR "too many requests per second"
ELSE
    MULTI
        INCR(keyname,1)
        EXPIRE(keyname,10)
    EXEC
    PERFORM_API_CALL()
END
```

The requirement here is to limit calls to 10 calls per second per IP address. So
a key is constructed by concatenating the user's IP address with the current
timestamp. This is then incremented with every call and checked to make sure
they haven't exceeded the limit. Simple enough (you can also implement this using
your favorite language and Redis library).

In our case, our [code execution API](/site/api) gives our
customers and users an HTTP and a Websocket interface. The reason you'd
need a persistent connection is to build a [stateful
interpreter/REPL](/site/blog/swift). But persistent connections costs us system
resources because we need to start a container and an interpreter/compiler
process that waits for the next command to execute. For this reason we have to
enforce a limit on concurrent open connections. The challenge with this is
implementing it
for a distributed service (we serve our users from different servers with no
centralized server managing state). As we've seen above, Redis is the go-to
technology to solve this problem. However, our use case differs in that we don't
limit calls for a certain time interval, instead our limit is one the total number of
open connections at any given time.

The first solution that came to mind:

1. Have every server store and update in Redis the current number of connections
   *per user* they're handling
2. Every time a request comes in, we aggregate the number of connections for a
   given user that all servers are handling and check it against the limits
   imposed by our service

More concretely, here is how this can be implemented:

1. Servers are assigned unique IDs (this could be their IP addresses or what have
  you)
2. Servers maintain their connection count in a key made up of their unique id
  and the user id: `customer-limit-{userId}:{serverUid}`
3. Maintaining a count is done by simply constructing the key and
  incrementing/decrementing it on every connection/disconnection
  respectively
4. Count aggregation for a given user is done by using the Redis pattern
  matching feature: `KEYS customer-limit-{userId}:*` and then `MGET` to get all
  the counts
5. Finally sum the counts and check it against the limits imposed by our service
  for every incoming request for every user

This serves our purpose but it has a fundamental flaw. One of the basics in
designing distributed systems is to plan for failure -- but this assumes that
our servers never fails. If a server goes down (or if the network fails) then it
never gets a chance to decrement it's user count and we have zombie "concurrent
users" counted on our customers for ever. Oops.

To handle this I took a similar approach to Redis -- using the `EXPIRE` function
to set an expiration time on our keys. But since we care about the total count
we can't just ignore older keys. We need to constantly refresh them (something
similar to the [DRAM refresh
process](https://en.wikipedia.org/wiki/Memory_refresh)):

```go
/* starts a goroutine that continuously refreshes keys owned by us */
func refresher(pool Pool) {
	go func() {
		for {
            // Grab a redis connection
			conn := pool.Get()
            // Get all keys that is "owned" by this server
			keys, err := redis.Strings(conn.Do("KEYS", "*:"+serverUid))
			if err != nil {
				debug("error refreshing keys", err)
			} else {
				for _, key := range keys {
					// Expire in 10 minutes unless refreshed (we do it every 3 minutes)
					conn.Do("EXPIRE", key, 10*60)
				}
			}

			conn.Close()

            // Sleep for three minutes and refresh again.
			time.Sleep(time.Minute * 3)
		}
	}()
}
```

This function starts a goroutine that continuously refreshes all keys owned by the
server/process. If a server goes down then its keys will be expired (deleted) in 10
minutes. And the connection count will be correct again!

This works pretty well in practice but [let me know](https://twitter.com/amasad) if you see any flaws in it 😊
