---
title: Making Repl.it Collaborative at Heart
author: Amjad Masad
date: 2019-09-18T18:18:49.181Z
categories: product
---

Coding, people believed, was an activity hackers did alone. While that might
have been true in the past, the world is changing. New programmers come online
every day and they want to effortlessly work and interact with others while
writing code. Yet collaborative coding environments have remained troublesome to
setup.

Last year we launched Multiplayer, our real-time collaborative system, in
beta. We’ve learned a lot since then. We’ve learned that while real-time coding
is useful and fun, asynchronous collaboration is important for users working on
long-term projects (which people are increasingly doing on Repl.it). We’ve
learned that Multiplayer needs to be a core feature of the product -- not
something you “turn on.” This meant a redesign of our core protocol and
infrastructure to make it collaborative at heart.

Repl.it is now natively [Multiplayer](/site/multiplayer): Collaborators can code together at the same
time or asynchronously, real time editing is more robust, and every IDE feature
works seamlessly in a collaborative setting.

<div class="video-container" style="text-align: center;margin: 30px 0;"><iframe width="475" height="275" src="https://www.youtube.com/embed/kO0EJJcuW1k" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

<style>
.video-container {
position: relative;
padding-bottom: 56.25%;
padding-top: 30px; height: 0; overflow: hidden;
}

.video-container iframe,
.video-container object,
.video-container embed {
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
}
</style>

***

## Protocol Changes & Operational Transformation

The major challenge in making Repl.it collaborative at heart was adapting all
our existing functionality to work seamlessly in a multiplayer environment. For
a very long time we’ve gotten away with keeping the protocol very
simple. Modeled after the Read-Eval-Print-Loop with a strict state machine. Only
one action could be processed at a time and had to run to completion.

![REPL protocol](/public/images/blog/protov1.png)

As features were added we ended up with something like a
Read-(eval|format|lint|write file|etc.)-Print-Loop. This lead to some unititive
behavior: what happens if someone could format code while someone else was in
the middle of debugging? In a multiplayer setting, these issues compounded
making the experience buggy and slow at times.

Enter Collaborative Development Protocol (CDP): A scalable service-oriented approach
for remote development and collaboration. It starts with channels -- every
function is an isolated channel. Want to write to a file? You open a
channel. Want to eval? You open a channel. Want to install a package? You do it
on the package manager channel. Even opening a channel occurs on a control
channel everyone starts with. With channels as the core concept, collaboration
is built right into the design. To share a resource, clients need only connect
to the same channel.

Here is how'd you implement a simple REPL using CDP:

```javascript
import CDP from '@replit/collab_dev_proto';

const client = CDP.connect({ language: 'python' });

// channel 0 is the control channel
const control = client.getChannel(0);

const evaler = await control.send({
  openChannel: {
    name: 'evaler',
    service: 'eval',
  }
});

evaler.on('command', command => {
  if (command.type === 'state') {
    console.log('Running ', command.status ? 'started' : 'stopped');
  }

  if (command.type === 'output') {
    console.log('> ', command.output);
  }
})

const code = window.prompt('type your code')

const response = await evaler.send({
  eval: code,
});

if (response.type === 'error') {
  console.error(response.error)
} else {
  console.log('=> ', response.result);
}
```

Messages concerning everyone are shared by broadcast. Multiple clients can
attach to a channel by using a pre-decided upon channel name, where everyone can
read/write. For example, a client can send an eval command to the “evaler” and
all other clients will get a message that evaling has started, and then everyone
receives the same output.

Finally, and perhaps most crucially, file changes are always communicated via
Operational Transformation. Operational Transformation (OT) was designed to
handle real-time collaborative text document updates, and if Repl.it was going
to be collaborative at heart, it needed to speak OT everywhere there was text to
update.

## File Watching & File Changes

In the request-response model of the old protocol, file changes had to be
explicitly asked for. In the new model, however, the client could have a channel
with the server (i.e. the container you’re coding in) where file changes are
communicated back-and-forth through OT. This made it more efficient versus
sending whole files, but, more importantly, it made file changes work
concurrently and collaboratively.

Another challenge we had to overcome was moving the file authority from the
client to the server. In the past, we made the owner of the repl write  file
changes from the browser. If we were to do asynchronous collaboration, there
would have needed to be some sort of negotiation to figure out which client
would be responsible for this in case the owner is not online. But the more sane
thing to do was to just move the file authority to the server, which everyone is
connected to in the first place.

With the server being the authority on files and file changes, we could now
implement a file watching daemon that generates OT messages and broadcasts them
to subscribed clients. This has the awesome side-effect of programmatic changes
appearing in the editor in real-time complete with its own cursor:

![Real time file changes](https://storage.googleapis.com/replit/images/1567124617864_552666ee140c42022467d20fb596ce60.gif)

***

This has been a high-level overview of how we made Repl.it collaborative at
heart. In the future, we’ll dive into specific technical and implementation
details along with open-sourcing some of the components. For now though, please
try it out! Open up a repl, hit that “Invite” button in the header, and starting
coding with your friends or coworkers.

![Multiplayer](https://repl.it/public/images/multiplayerhero.png)