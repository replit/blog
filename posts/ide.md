---
title: "Modular, fast, small: how we built a server-rendered IDE"
author: Mason Clayton
date: 2018-02-14T08:00:00.000Z
categories: product
---

At Repl.it our mission is to make programming more accessible, which means our
coding environment needs to be lightweight, load fast, and work from anywhere in
the world. However, as with so many software projects that evolve with time, we
accumulated some bloat (luckily, we haven't included a [mail client](http://www.catb.org/jargon/html/Z/Zawinskis-Law.html) yet) and
quite a few ad-hoc hacks to glue everything together.  In this post, we'll go
over how we designed our new IDE to have a small core (everything is a plugin),
to be easily customizable (even on the fly), and to server-render.

## The old IDE
React encourages you to layout and compose your components as they appear on the
page. Our workspace started out looking something like this:

```js
<Workspace>
    <Split>
        <Editor />
        <Console />
    </Split>
</Workspace>
```
But this lacks configurability. For every language, we have a slightly different
configuration. Some have tabs, console, a web viewer, or language-specific
components like [python turtle](https://repl.it/@amasad/square). Additionally, every language has a different
engine powering it with its own interface and set of capabilities. All this
configuration logic used to get crammed into the top-level component with
ever-increasing branching logic. Furthermore, runtime configuration must be
explicitly written for every language. Modifying the layout for one language
leads to more hardcoded logic and components and single-use components. This, in
turn, caused making changes to one component a game of updating and testing
every possible parent.

## Rewrite
Starting out we had a few goals, most importantly, it needs to load quickly even
over a slow connection; server-side rendering is essential here. It also must be
easily extensible, and be configurable enough to take the shape of any workspace
environment we need in the future. We also wanted to avoid rewriting as much
code as possible from our old environment.  Looking around we didn't find any
existing solution that quite fit the bill, most environments afforded us too
little customization, were too hefty, and server-side rendering was never going
to happen without major changes to the core.

We ended up settling on building a new lightweight core (around 3000 LOC) to
achieve this. It primarily functions as a window manager and a middleman for
events. All components are bundled up into a plugin which can expose a render
target or internal state management. This was achieved using React and Redux
(although the general design does not depend on them).

## Plugins

Every workspace starts out empty (a valid state). We bootstrap the initial state
by dispatching actions dictated by the configuration. A nice side effect of this
is all configurations must be able to be reached at runtime. This is great for
debugging: open Redux Devtools you can see the state
evolving from the point of creation and can easily time-travel back and
forward. Furthermore, this makes debugging production errors a lot easier --
Redux actions tell you the whole story!

All a plugin have to do to build up its state is expose a reducer. Here is what
a simple plugin to display the running status might look like:
```js

const Component = ({ running }) => <div>{running ? 'running' : 'stopped'}</div>;

function reducer(state = { running: false }, action) {
    switch (action.type) {
        case 'EVAL_STARTED':
            return { running: true };
        case 'EVAL_ENDED':
            return { running: false };
    }

    return state;
}

export { Component, reducer };

```

When the workspace loads an instance of this plugin it will mount the
reducer within its own state.

Plugins can also register their own middleware, we call this the receiver. So
now that we have a plugin that shows the evaluation status, we need one to
actually do the evaluation. For that we simply expose a receiver and listen on
an `EVAL_CODE` action (which might be dispatched by say a "run" button):
```js

function receiver(dispatch, action) {
    switch (action.type) {
        case 'EVAL_CODE':
            dispatch(evalCode(action.code));
    }
}

function evalCode(code) {
    return (dispatch) => {
        dispatch({ type: 'EVAL_STARTED' });
        eval(code) // don't actually do this
        dispatch({ type: 'EVAL_ENDED' });
    };
}

export { receiver };

```
These plugins work together when loaded but have no direct
dependency on each other. Our evaling plugin could easily be swapped out with
something else, say something that executes the code on the server instead of
the client.

## Layout

To actually render React components we mount the window manager as the
workspace's root and pass it a tree that looks something like this:
```
              ┌─────┐
              │split│
              └─────┘
              /     \
          ┌────┐   ┌───────┐
          │tabs│   │console│
          └────┘   └───────┘
         /  |   \
        /   |    \
┌───────┐┌───────┐┌───────┐
│editor1││editor2││editor3│
└───────┘└───────┘└───────┘

```
Each node is either a built-in window managing component (tabs and splits) or
the instance id of a plugin. All relavent state for the layout nodes is contained
within the layout (i.e. tabs have an active tab, splits have a position), all changes
to the layout can be dispatched via built-in actions. This makes it trivial for any plugin to make
changes to the layout. With the layout outside of
the plugin's control and all state handled within the plugin, it becomes very
easy to drop any plugin anywhere.

We can easily do something like (if we're being silly enough):
<img src="https://i.imgur.com/CXaU75Z.gif" />

Because the layout is also a Redux state we can easily change it at
runtime. Here is for example how the debugger plugin splits shows itself below
the console:

<img src="https://thumbs.gfycat.com/LoneReflectingBass-size_restricted.gif" style="width:70%"/>

```js
function show({ wid, pluginId }) {
  return (dispatch, getState) => {
    const { layout, parts } = getState().workspace[wid];

    if (!Layout.has(layout, pluginId)) {
      const { path, to } = Layout.insert(
        layout,
        pluginId,
        'below',
        Layout.byName(layout, parts, 'console') || Layout.root(),
      );

      dispatch(
        updateLayout({
          wid,
          path,
          to,
        }),
      );
    }
  };
}

function reciever(wid, pluginId, action) {
  switch (action.type) {
    case 'DEBUG_STARTED':
      return show({ wid, pluginId });
    case 'DEBUG_ENDED':
      return hide({ wid, pluginId });
  }

  return null;
}

export { Debugger, reducer, reciever };
```

## Server-side rendering

One of the worst things about the modern web is the spinner (or is it throbber?)
so for the rewrite we decided we'd never do that and try to render as much as
possible on the server and show something on the screen as early as possible. For that we used Next.js which makes
server-side rendering a lot less painful, bootstrapping the initial state from
the server is especially nice. For the most part we try to have parity between
server and client but some components are so DOM-specific that it's almost
impossible to render on the server without including something like JSDom. For
this we have a property that the window manager sends to all plugins
`static` to inform them that, if they need to, they can render a
static version of themselves (for now it's only the editor that requires this).

## Conclusion

Going forward we're focusing on making the core framework as simple and as correct as
possible. Flowtype made Redux a whole lot easier to reason about because every
action has clear definition, but we think it can be better and are
exploring rewriting the core framework in ReasonML. We're hoping to open-source
this in the future and open it up for anyone to write plugins for.

This rewrite already unlocked for us a lot of features that can now be easily
implemented. Look out for a filetree component and a unit test runner coming to
an online REPL near you.