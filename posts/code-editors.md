---
title: "Ace, CodeMirror, and Monaco: A Comparison of the Code Editors You Use in the Browser"
author: Faris Masad
date: 2021-12-14
categories: eng,infra
cover: https://blog.replit.com/images/code-editors/code-editors.png
---

I've been working on Replit for roughly six years now, and as the team has grown, I've focused on the IDE (what we call the workspace) portion of the product. Naturally, I was increasingly preoccupied with the code editor. While we've considered creating a code editor that meets our needs, the complexity involved in developing one, the richness of open-source choices available, and the size of our staff made it a fruitless rabbit hole to enter. Our time is best spent elsewhere. I have had the pleasure (and the pain) of using [Ace](https://ace.c9.io/), [Monaco](https://microsoft.github.io/monaco-editor/), and [CodeMirror](https://codemirror.net/6/) in production settings, sometimes simultaneously (more on that later). In this post, I'll go over some Replit history, my experience using the editors, and how they stack up against one another.

*If you're here for a direct comparison, feel free to [skip to the end](#head-to-head), where I recap and compare.*

## The story

### Prelude: Ace

In the early days of Replit, around 2011, there was no code editor. It was a pure [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) interface, a console with a simple input box. Adding a code editor was an obvious next step, especially if we cater to more complex programs. Code editors give us features like syntax highlighting, editor shortcuts, auto-indentation, search and replace, etc. Cloud9 released Ace at the time as a feature-full, performant web code editor. Ace editor is still actively maintained; it has a rich ecosystem and supports many languages, keybindings and works great in the browser.

![OG Replit UI](https://blog.replit.com/images/code-editors/repl-dot-it.png)
*Screenshot of the original replit interface with Ace. Courtesy of our community members who re-hosted the open-source version of Replit from 2011 https://www.repldotit.com/*

We used Ace until around late 2017 when we switched to Monaco. While Ace was still being maintained, only one person was working on it. After Amazon acquired Cloud9, it appeared as though they deprioritized the open-source project. The editor was not receiving as many updates, issues were racking up on GitHub, and the maintainers added almost no features. Overall, the API started to feel outdated and clunky. The maintainer is great, but there's only so much he can do.

### Interlude: Monaco

As you might know, Monaco is the editor that powers VSCode; in fact, Microsoft built VSCode around Monaco. If we switch to Monaco, we thought we'd be able to get all the cool updates and features from the good folks working on VSCode. Monaco had a shiny and modern UI that matched our website better, had great autocomplete for JavaScript, HTML, CSS, and seemed to have APIs that would make writing a language client for LSP easier. The docs were great, shipped with TypeScript definitions, and had more extensibility features from a development standpoint.

![Monaco](https://blog.replit.com/images/code-editors/monaco.png)
*Screenshot of stock Monaco (no configuration), notice the clean and polished UI*

Switching came at a cost, it was missing a lot of Ace's features, but we were confident that it would surpass Ace in no time with the community's excitement and contributions. The first issue was that there were a lot of languages modes missing from Monaco; even though VSCode had them, they relied on running in Nodejs/Electron and not the browser. So we started writing language modes for Monaco and contributing back to the project. We added Scala, Julia, Scheme, Clojure, and fixed bugs with various languages like Python. I wrote a syntax highlighter for Monaco to utilize all the languages Ace supports via an adapter. The last two missing bits were keybindings for Vim and Emacs, but it wasn't long before someone released support for them on npm.

Another problem with Monaco was the build tooling. While Microsoft built Monaco with web technologies, it didn't mesh well with the ecosystem and build tooling of the web. I had to precompile Monaco as a Webpack DLL and add many Webpack configurations to make it work. It was excruciating to add, and it increased the complexity and overhead of our build system. A few months later, Microsoft released a Webpack plugin for Monaco, which made it slightly better but wasn't perfect, especially as we moved our frontend to Next.js. Unfortunately, Monaco also didn't have an easy way to lazy-load modules and do code-splitting, so it was tough to get small bundle sizes. It added a whopping 5 megabytes (uncompressed) to our workspace bundle, and that's not something we take lightly.

Monaco also doesn't work well on mobile. We tried to contract with people to make it work, but no one was biting. Then I wanted to do it myself, and that was when it dawned on me, it's tough to navigate the Monaco codebase. It's too intertwined with the rest of the VSCode codebase, and the package itself is almost like an afterthought. Even the VSCode codebase is not particularly great itself, it's probably [one of the oldest TypeScript project out there](https://web.archive.org/web/20150502200822/https://www.zdnet.com/article/microsofts-browser-based-dev-toolbox-how-monaco-came-to-be/), and it's written in [enterprise Microsoft fashion](https://www.youtube.com/watch?v=FyCYva9DhsI). While we did get to something semi-usable on mobile, we didn't want to maintain a fork of VSCode as the changes we made were not going to get accepted upstream, and it was still a long way from being usable in production. So I decided the best path forward was to keep using Ace on mobile. It wasn't perfect either, but it was okay-ish.

So we wound up with two code editors on Replit: one for desktop computers and one for mobile. Every new feature had to be ported over to Ace (mobile). We had to write a language client for Ace for LSP features, and we had to write an operational transformation adapter for Ace to support multiplayer, and so on. In many cases, we didn't simply didn't find the time to port things. For example, we never ported the code threads feature to mobile.

### Postlude: CodeMirror

In late 2018 Marijn announced [a rewrite for CodeMirror](https://web.archive.org/web/20180830201622/https://codemirror.net/6/) to modernize the editor, CodeMirror version 6 with [an excellent design doc](https://web.archive.org/web/20181109055050/https://codemirror.net/6/design.html). One of the primary motivators for the rewrite was adding support for touch devices. Around the time, we recognized mobile (ubiquity) as a crucial part of our strategy; if we were to bring the next billion software creators online, we had to be available on mobile. CodeMirror would achieve that by leaning on native browser text editing (via contentEditable) rather than implementing text editing entirely in the library/javascript.


[ProseMirror](https://prosemirror.net/) inspired CodeMirror 6's API design, another project by Marijn. I had played with ProseMirror earlier for a WYSIWIG project I was working on and loved it. ProseMirror has a very tiny core, and everything else was a plugin. It was modular, pluggable, functional, and incredibly empowering as a library user. So I decided to get the company to sponsor the development of the new version of CodeMirror, and I even funded the project personally.

Last year CodeMirror 6 announced a beta release, and I was extremely excited to start adding it to Replit, and so were the rest of the team. We started playing with the editor, and while it has a bit of a learning curve, you feel like a super-code-editor-developer when you finally "get it." To get the ball rolling, we started to adopt CodeMirror incrementally. We first added it as the defacto read-only editor on Replit, then started adding it to different parts of the website where the code gets edited.

Earlier this year, we took a leap of faith and started integrating CodeMirror into our mobile environment. From a user perspective, CodeMirror is objectively better than any other editor out there on mobile. Even though it didn't yet support all the languages we had support for and some other features, it was still worth it. The result of the rollout was more positive than we ever expected. Mobile users who were part of the CodeMirror rollout were almost 70% (!) more likely to retain than their Ace counterparts in the cohort. With CodeMirror's pluggability, it was clear that this is only the beginning of us delivering more value on mobile, first starting with porting the desktop features that were missing on mobile into CodeMirror.

![Codemirror on Replit mobile](https://blog.replit.com/images/mobile/codemirror.png)

The community around CodeMirror 6 is still in its infancy, so we have to write many things ourselves, sponsor efforts for specific features, and work with Marijn to squash bugs. We hope to help bootstrap and give back to the CodeMirror community through our contributions. To list a few things under active development that we plan on open-sourcing: Vim Mode, Emacs Mode, LSP client, Indentation Markers, Color Picker for CSS, language parsers, and many other things that we'll announce in a future post when we release CodeMirror for desktop. I think people are excited about the new CodeMirror, and we'll see the community and ecosystem proliferate over the next year or two. Many people are rushing to use it in production.

We are incredibly excited to build more and more features on top of CodeMirror and make it our partner in making coding more accessible. We always said we would have to develop our own editor eventually to craft experiences the way we like. Still, I think we're pleased with what we can achieve with CodeMirror extensions.

## Head-to-head

Let me recap to give you an easier time to find what suits you. Again, this is my personal experience; it may not reflect your experience.

For each section, I will score the editors from 1 to 3, where 3 is best.

### Stability

#### Ace

**Score: 3**

Extremely stable and reliable. The editor is battle-tested and has been powering many tools for over 10 years, and I have not experienced any breaking changes all the years I've used it. There may have been releases introducing minor bugs, but they're quickly patched.

#### Monaco
**Score: 2**

Monaco has a stable editing experience; bugs are patched quickly since they affect VSCode, the maintainers are good about publishing releases continuously. A point deduction is in place because the API is not the most stable and has subtle changes that may be annoying for you. Microsoft is yet to release a v1.0.0 semver.

#### CodeMirror 6

**Score: 1**

CodeMirror is still in beta, the project has a bunch of subtle bugs, but Marijn is extremely quick to respond and patch them up. While the project is still in beta, I think Marijn is happy with the current API, and it's unlikely that we'll see significant breaking changes. CodeMirror 6 is starting to get adopted in production by many companies, even Chrome devtools [will likely migrate to use it as the editor over the next year.](https://github.com/ChromeDevTools/devtools-frontend/commit/6da128c3ae6b6dd0d4602059c23f8c4003823f5b#diff-592cac14b3eeb584a09b80d2696a73223ad0a79e4a8e6765f875a6f4492b4525)

### Out of the box experience

#### Ace
**Score: 2**

Excellent out-of-the-box experience with support for so many features and languages, including some basic JavaScript linting (using JSHint) and autocomplete. The UI is a little dated, so you might wanna mess with that.

#### Monaco
**Score: 3**

The UI is very polished. The editor ships with many features, including very good IntelliSense for HTML, CSS, and JavaScript out of the box.

#### CodeMirror 6
**Score: 2**

The editor requires some configuration to get it to a good place. This is a trade-off for the modular nature of the project. There is a [`basic-setup` package](https://codemirror.net/6/docs/ref/#basic-setup) combining some basic modules and re-exports the core modules. The basic UI is good.

### Modularity, bundling, and footprint
#### Ace
**Score: 2**

Ace is slim, modular, and you can lazy load features. However, Ace is an old project and ships with a homebrewed module system, it's not hard to make it work within your app, but it requires some configuration.

#### Monaco
**Score: 1**

Monaco has a huge bundle size, floats somewhere around 5 megabytes, and lazy-loading features are not possible as far as I'm aware. Monaco also needs special configurations in your bundle system, and it is tough to get it to cooperate.

#### CodeMirror 6
**Score: 3**

CodeMirror is built with modern technologies. You can even use ES6 modules to import it with no bundler involved. Lazy-loading features is a breeze; dynamic ES6 imports are all you need. The project is very modular and has a very slim core.

### Extensibility and advanced features

#### Ace
**Score: 2**

Ace has many configuration options that work great and has good extension points. They're not very generic but will get you very far. The APIs do feel a little dated as well, but definitely solid. I was comfortable monkey-patching Ace when I needed to as it was easy to read through the Ace codebase, and the internals hadn't changed in almost a decade.

#### Monaco
**Score: 2**

Monaco sport many configuration options and has APIs to modify the editor behavior and the underlying features. That said, the extension points are somewhat limited and specific. I often struggled with the editor and needed to monkey-patch, but it was scary as the codebase is far from straight forward and the internals constantly changed. Eventually, we stopped upgrading because it was nearly impossible to support some of our added features.

#### CodeMirror 6
**Score: 3**

CodeMirror is built with extensibility in mind and is one of the primary design principles; this extensibility allows CodeMirror to be modular. In fact, the core itself (`@codemirror/view` and `@codemirror/state`) is essentially an extensible text area. All the "code" features are implemented as extensions. Basic things like syntax highlighting and line numbers are implemented as extensions and packages. These packages act as a great resource when authoring your own extensions.

Building fancy extensions with CodeMirror is a breeze, and the amount of power it has to offer you as an extension developer is insane! The extension points are generic, so the world is your oyster.

### Community and documentation.

#### Ace
**Score: 2**

Over the years, Ace has accumulated a rich ecosystem, tons of articles, and blogs on using ace. There's support for every language highlighting under the sun and many other community packages.

API documentation is not the best but is enough for most things. Well-structured (albeit old) codebase makes for an excellent supplementary resource. There is a good guide on the website.

#### Monaco
**Score: 2**

Monaco had gathered momentum around 2018, but it felt like that community energy quickly dissipated. You will find a bunch of community-maintained packages on NPM.

Monaco's API documentation is good enough but could be better. Monaco has no official guides as far as I know, which makes it hard to get started. You probably have a tough time using the codebase as a supplementary resource due to how the project is structured.

#### CodeMirror 6
**Score: 3**

I see a lot of energy around CodeMirror 6 from the community. We're trying to help seed the community with some packages we see as essential. Stay tuned!

The documentation is fantastic, and I expect to get better with time. There's an excellent write-up on the system, getting started, and a lot of examples accompanied by lengthy explanations.

I mentioned this under extensibility, but most features are implemented as extensions, and they act as an awesome resource for you to go and see what's the "blessed" way of doing certain things.

### Performance

*Disclaimer: no explicit benchmarks data*

#### Ace
**Score: 3**

Ace was built in an era where browsers and machines were not as powerful as they are now, so the editor today is very performant.

#### Monaco
**Score: 2**

Monaco has a lot of performance optimizations but can be a little clunky. Replit has a lot of users on low-powered machines, and they've been feeling the pain with Monaco.

#### CodeMirror 6
**Score: 3**

CodeMirror so far feels very performant. The creator put a lot of care into this.

### Mobile support

I'm not going to score here. If you want a code editor that supports mobile, you should use CodeMirror 6. Ace has not-bad support but does not come close, and Monaco is unusable on mobile.

I'd go as far as saying that CodeMirror is probably suitable even for native applications as a webview component. Most things in CodeMirror are serializable so you can interop with the webview from your native code.

## Thank you for reading!

As mentioned in the article, we are slowly rolling out CodeMirror to everyone, if you want to get a sneak peek, you can enable the explorer role from [the account page](https://replit.com/account) or append `?codemirror=1` query parameter to any repl URL.

As a teaser of what's to come next year, I will leave you with this video:

<video controls webkit-playsinline="true" playsinline="" src="https://blog.replit.com/images/code-editors/codemirror-self-authoring.mp4"></video>
