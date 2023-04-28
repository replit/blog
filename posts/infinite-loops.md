---
title: Infinite Loops
author: Amjad Masad
date: 2017-01-23T08:00:00.000Z
categories: product
---

At Repl.it we aim to make the full power of programming easily accessible for
everyone. That's why when we designed our [code execution service](/api) we decided that
we would not timebox users' programs or sessions. [](preview end)

This was a great design decision because it allowed people to build complex
programs, things like infinite looping animations, and games -- like this
[fun text-based game](https://repl.it/BybT/6):

![text game](/public/images/blog/text-game.gif)

But this also meant you could hit infinite loops. And in most cases this was
okay because you can hit stop and we'd kill the program for you. Except this failed in
two cases:

1. If the program was sending so much output data to your browser that it was
causing it lock up.
2. If the program was running in your browser (as the case is with
the JavaScript languages we support).

**[tl;dr]** You'll be pleased to know that we fixed these two
instances as well and -- as always -- here are some gifs to demonstrate, followed by a technical
explanation for the curious.

![infinite loop in python](/public/images/blog/infinite-loop.gif)
*Infinite hello world in python*

![infinite loop](/public/images/blog/infinite-loop2.gif)

*Infinite loop in JavaScript*

## Browser crashing from too much output

Because we want to enable interactive programs like the text-based game
mentioned above we have to stream output from user programs directly to the
browser. To do this we first start user programs in tty-mode (we make the
program think that it's attached to a terminal), more specifically, we attach a
[pseudo-terminal (pty)](http://man7.org/linux/man-pages/man7/pty.7.html). However,
ptys also adds additional functionality that we don't need. For example it
outputs (echos) every input given to it which is useful for regular terminals
but not for us since we want to control the user experience on the client-side.

To make a pty as pipe-like as possible (i.e. raw i/o) then we can use the
following C program which uses the builtin linux [termios
API](http://man7.org/linux/man-pages/man3/termios.3.html):


```c
#include <termios.h>

int makeraw(int fd) {
  struct termios tp;
  if (tcgetattr(fd, &tp) == -1) {
    return 1;
  }
  cfmakeraw(&tp);
  if (tcsetattr(fd, TCSAFLUSH, &tp) == -1) {
    return 1;
  }
  return 0;
}
```

Now that we've made sure that user programs stream perfectly to the client-side
we need to make sure we don't crash the browser by overloading it. This is
taken care by our frontend servers written in Go. What we do is make sure
that we don't send output to the browser at a rate that exceeds 20 messages per
second. We came up with this number via trial and error while making sure we
don't cripple any existing use case (like say, animations or games).

Luckily, Go has primitives that makes this sort of thing easy. The following is
the actual goroutine we use to periodically flush the output buffer.

```go
 flushTicker := time.NewTicker(time.Second / 20)
 go func() {
   for {
     <-flushTicker.C

     if done {
       flushTicker.Stop()
       return
     }

     if outputBuf.Len() > 0 {
       flush()
     }
   }
 }()
```

With this, users will likely not see their browser lock up if they hit an
infinite loop that includes output.

## Browser locking up from infinite loops in JavaScript

We run most of our languages on our [code execution
infrastructure](https://repl.it/api). However, in order to gain access to
browser APIs, JavaScript (and compile-to-js) languages need to run on the user's
browser. This presents many interesting challenges, one of which, is protecting
the user from locking up the browser from infinite loops. This can happen
because the UI and the JavaScript running on the page all run in the same single
thread (taking turns).

The first thought that may come to your mind is "run it in a worker!" -- which
is a web standard that allows us to start a background process and interact with
it via message passing -- and this works perfectly fine to protect against
locking up the browser. But now we're back at square one -- we don't have access
to all the browser APIs that people want to use.

So the only other solution that we've seen used on [JSBin](https://jsbin.com)
is to transform the JavaScript code to add time or iteration counters to protect
against infinite loops. The problem with this solution (as of this writing) is
that it hits a couple of edgecases. Like for example the following code (which
is, by the way, adapted from an actual user code that we saw) will halt with an infinite loop error:

```js
var a;
do {
 a = prompt('hello')
 console.log(a);
} while (a !== 'quit');
```

Another edgecase that we wanted to protect against was an async
infinite loop (which should be fine, because it yields to the event loop and
doesn't lock up the browser):

```javascript
function *x() {
  while (true) yield 1;
}

var g = x();
console.log(g.next());

// Should not think that it's been running non stop for a second
setTimeout(() => {
  console.log(g.next());
}, 1000);
```

So we came up with the following set of heuristics to handle those edgecases. A loop will throw an
error if the following was true:

1. It happens in a single run (doesn't yield to the event loop)
2. A high number of iterations
3. The loop is taking too long

We implemented this using [Babel](http://babeljs.io/) and leveraged it's
`retainLines` generator option to make sure that line numbers are reported
correctly on errors.

If you're curious here is an adapted version of our Babel plugin which I think
is pretty straightforward:

```javascript
'WhileStatement|ForStatement|DoWhileStatement': (path) => {
  // A variable holding when the loop was started
  const loopStart = path.scope.parent.generateUidIdentifier('loopStart');
  const loopStartInit = dateNow();
  path.scope.parent.push({
    id: loopStart,
    init: loopStartInit,
  });

  // An iterator that is incremented with each iteration
  const iterator = path.scope.parent.generateUidIdentifier('loopIt');
  const iteratorInit = t.numericLiteral(0);
  path.scope.parent.push({
    id: iterator,
    init: iteratorInit,
  });

  // setTimeout to protect against breaking async and generator funcs.
  path.insertBefore(
    t.expressionStatement(
      t.callExpression(
        t.identifier('setTimeout'),
        [t.functionExpression(
          null,
          [],
          t.blockStatement([
            t.expressionStatement(
              t.assignmentExpression(
                '=',
                loopStart,
                t.identifier('Infinity'),
              ),
            ),
          ]),
        )],
      ),
    ),
  );

  // If statement and throw error if it matches our criteria
  const guard = t.ifStatement(
    t.logicalExpression(
      '&&',
      t.binaryExpression(
        '>',
        t.updateExpression(
          '++',
          iterator,
          true,
        ),
        t.numericLiteral(maxIteration),
      ),
      t.binaryExpression(
        '>',
        t.binaryExpression(
          '-',
          dateNow(),
          loopStart,
        ),
        t.numericLiteral(maxLoopTimeMs),
      ),
    ),
    t.throwStatement(
      t.newExpression(
        t.identifier('RangeError'),
        [t.stringLiteral(
          'Potential infinite loop. You can disable this from settings.',
        )],
      ),
    ),
  );

  // No block statment e.g. `while (1) 1;`
  if (!path.get('body').isBlockStatement()) {
    const statement = path.get('body').node;
    path.get('body').replaceWith(
      t.blockStatement([
        guard,
        statement,
      ]),
    );
  } else {
    path.get('body').unshiftContainer('body', guard);
  }
}
```

Users can also turn this off from the settings. Let us know if we missed
something or there is a better way to implement this. Hope you have infinite fun
with this.