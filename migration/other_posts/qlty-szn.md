---
title: QLTY SZN 1
author: Replit Team
date: 2022-04-18
categories: infra, eng
---

*A commitment to quality*

One of our competitive advantages is making bets on technologies before the rest of the market catches on. One such bet we've made is on [CodeMirror](https://blog.replit.com/codemirror). We switched our editor from a proven but stagnant technology, Monaco, and towards CodeMirror. We know we made the right decision because:

- We can now make changes, most importantly bug fixes, much more quickly.
- The new search panel we were able to build is much better than the version that shipped with Monaco.
- The new editor's improved performance is already showing up in better user onboarding success.
- CodeMirror's extensibility will enable us to ship one of the most most long-awaited features: Themes!

Alongside taking bold technology bets, one of our operating principles is moving with urgency and focus. In doing so, we have shipped some amazing things with a small team in an incredibly short period of time. See [SHPNG SZN](https://twitter.com/amasad/status/1355250173971025920).

We realize that we moved a bit too quickly in upgrading our editor. The editing experience degraded in some ways we hadn't accounted for. We’re really sorry for the trouble this may have caused some of you. Since then, the workspace team been all hands on deck furiously fixing bugs and improving the user experience for the past month.

## This Month in Quality Improvements

Instead of just making promises, we're going to show you what we've done to improve Replit's stability and performance in the past month. 

We've fixed **over 80 bugs** in the editor in the 6 weeks since the wider CodeMirror rollout began. Here are some of the areas we have got fixes for:

- Editor-wide and language-specific (Swift & Lua) indentation issues
- Autocomplete issues HTML, CSS, JS, TS, Python, and Markdown
- Syntax highlighting issues
- Issues with the line gutter being wobbly and not highlighting the line
- Code collapsing issues in Python
<hr />

We've cut workspace crashes (we call them [BSODs](https://en.wikipedia.org/wiki/Blue_screen_of_death)) by more than 90% in the last month as well:

<img src="https://blog.repl.it/images/qlty-szn/bsods-chart.jpg" alt="BSODs per day" width="100%" style="width:100%"/> 

<hr />

We also reintroduced p_olish Fridays, a day where our engineers are invited to help fix bugs, make quality of life improvements, and polish things internally. Our most recent iteration we merged 29 PRs that you can see in the screenshot below:

<img src="https://blog.repl.it/images/qlty-szn/polish-prs.jpg" alt="p_olish PRs" width="100%" style="width:100%"/>

## User Feedback

We realize how important hearing user feedback is before we launch new features, so we've begun to collect more pre-launch feedback in small group settings.

This type of feedback has already helped influence recent launches, like new [site-wide search](https://blog.replit.com/search) and redesigned profile pages.

We've got more plans on that front, but the proof is in the pudding, so we won't speak on them yet.

<hr />

_**Stay tuned for moar QLTY poasts!**_