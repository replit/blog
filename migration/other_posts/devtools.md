---
title: Inspect your HTML/CSS/JS Repls with native DevTools
author: "Alexandre Cai & Faris Masad"
date: 2022-07-15T00:00:00Z
categories: eng,product
profiles: alex-jungle-cat,masfrost
---

We recently launched a new Replit-native way to inspect and debug web pages you build on Replit. Whether you're learning the basics or hosting a rich application, quickly being able to inspect the console and DOM is critical to your workflow.

Browsers ship with developer tools (e.g. [Chrome](https://developer.chrome.com/docs/devtools/)), but they have a few shortcomings when working on Replit:

1. Inspecting the nested webview iframe using browser DevTools can be complicated
2. There are no solid solutions for developers working on mobile devices
3. Some schools block access to browser DevTools

Now all repls that show a webview have access to a Replit-native set of DevTools. Just click the wrench icon to bring it up:

You can access the console:

<video src="https://blog-images.util.repl.co/devtools/console.webm" controls></video>

Or inspect the DOM:

<video src="https://blog-images.util.repl.co/devtools/inspect-dom.webm" controls></video>

And more.

## How we built it: Eruda

[Eruda](https://github.com/liriliri/eruda) is the most complete, out-of-the-box solution that works great on mobile. At Replit, we love betting on cool open-source software projects, and we care deeply about supporting our [mobile users](https://blog.replit.com/mobile-v2).

Eruda was a no brainer decision for us.

## Challenges: permissions, security, and timing

### Permissions
Browser DevTools run with higher privileges than the JavaScript loaded with the page. Notably, this allows the tools to inspect *all* network traffic (images, video, etc.). While some are difficult, if not important, to inspect, others can be easily watched by spying on calls to `window.XMLHttpRequest` and `window.fetch`. 

Eruda implemented an open source solution to this, [chobitsu](https://github.com/liriliri/chobitsu), which is an implementation of the [Chrome DevTools protocol](https://chromedevtools.github.io/devtools-protocol/) in JavaScript. The Chrome DevTools does not interact with the page directly but talks to an API that implements the protocol. Using a solution based on the Chrome DevTools protocol affords us maximal flexibility for future iterations.

### Security
The nature of a DevTool requires us to have underlying access to the DOM, the `window` object, cookies, and other resources that are only available if we comply with the [same origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy). If you inspect the page, you'll notice we host devtools with the same origin as the repl itself within a *magic* `__devtools_wrapper.html` file. All Repls have this hidden file that serves as a wrapper page for business logic related to the DevTool, including its injection and toggling.

### Timing
The greatest challenge we have had so far is ensuring the DevTools is not missing information it should have captured. We need to ensure our DevTools run before any JavaScript on the page, so we can correctly capture all events the user might need for debugging. For example, an error may be displayed on the `console` before our tools load.

Our first attempt looked roughly like this:

```html
<iframe src="/"></iframe>
<script src="devtools.js"></script>
```

By the time the devtools script kicks in, the iframe could have run some of its scripts. So we were missing some of the action.

Attempt two looked like this:
```html
<iframe id="iframe"></iframe>
<script>
  iframe.src = "/";
  // modify iframe here
</script>
```

The reference of `iframe.contentWindow` will change after `src` changes, and there is no way to know precisely when that happens. Modifying the `contentWindow` at the wrong moment means we will be working with a disposed (and hence useless) `window` object.

So we came up with attempt number three: we load an `iframe` without `src`, then run.

```ts
const res = await fetch("/");
const html = await res.text();
injectDevTools(html);
iframe.contentDocument.open();
iframe.contentDocument.write(html);
iframe.contentDocument.close();
```

This works pretty well for the initial page, but the DevTools disappear when the user navigates to another page. To fix this, we listen to the `window` 's `unload` event and run the logic above again for any navigation. The last bug we had is that `location.reload` within the iframe breaks since the `iframe` technically has no `src`, which was then fixed by adding a `history.pushState` call on top.

## Try it out!

We hope you like the new Replit-native DevTools. We're really enjoying the experience when working in the webview, either on desktop or mobile.

And if you enjoy hacking on frontend infrastructure (or other things...), consider [joining us](https://jobs.lever.co/replit/35f0e743-429c-4f60-ba07-8de9bbc8fffc)!
