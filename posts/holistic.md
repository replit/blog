---
title: Building Towards a Holistic Development Service
author: Amjad Masad
date: 2017-03-27T07:00:00.000Z
categories: eng
---

Software development is one of the first -- if not the first -- examples of what
J. C. Licklider called the _[Man-Computer
Symbiosis](https://groups.csail.mit.edu/medg/people/psz/Licklider.html)_. A
_"cooperative interaction"_ between people and computers where the person is
concerned in what may be classified as the creative aspect of the work such as
setting the goals, formulating the hypothesis and evaluating the results while
the computer does all the _"routinizable work"_.

This symbiotic partnership is especially effective for work that puts to the
test our intellectual capacity like keeping all the moving parts of a large
software system in our head. Or as Dijkstra warns us _"the competent programmer
is fully aware of the strictly limited size of his own skull"_.

This begins to explain why software engineers are so passionate about their
tools. From the good old [editor wars](https://xkcd.com/378/) to [JavaScript
fatigue](https://medium.com/@ericclemmons/javascript-fatigue-48d4011b6fc4),
we're continuously adding and improving on our arsenal because this is the best
way we know how to become better engineers. From a business point-of-view, it
might also explain the seemingly sudden rise and growth of the developer tools market:
hosted version control, infrastructure, devops and automation etc.

Despite all this success I think we've fallen victim to the onetime useful Unix
dictum _Do One Thing and Do it Well_. Roughly speaking, we separate our tools by
development life-cycle stages: authoring, executing, testing, building, and
deployment. Which limits how much information each tool has at its disposal and
therefore how much utility it can provide. Sharing the work isn't easy. The text
stream as the "universal interface" means that, for example, tools need to re-parse code at
every stage of the life-cycle to extract whatever meaningful information it
needs.

In practice it means I can't upgrade to the latest release of my favorite
programming language because I need to wait on all my tools to upgrade their
parsers. And this is not a theoretic problem, consider the fact
that the website that you're probably reading this on was authored in ES2016
JavaScript, parsed and compiled to ES5 and then parsed again and minified and
then parsed yet again to finally run in your browser which most likely runs
ES2016 (back full-circle).

However, we'd like to take a stab at the problem from an angle that we, at
Replit, are uniquely situated to do. Our mission is to make programming more
accessible, so when we design we focus on the hobbyist and the learner (although
a lot of engineers also get a lot of value from our service). This relieves us
from the pressure of having to build tools that needs to compete and achieve
parity with existing development tools. Our users are open to things that makes
it easier for them to learn, play, and share.

We're building towards a holistic development service from the ground up. It all
started from a [service](/api) that could execute user code. Then it gained the ability
to [monitor the file system](file-updates) and understand basic project structure and
modules. Then it grew to do simple code intelligence tasks like [Linting](pylint). Then
when we released our [educator tools](/classroom), the same service running on the same files
gained the ability to run unit tests. And now it's growing to understand
deployment. We envision this to become a __long-lived always-on service that
understands code in all its stages and can be put at your disposal anywhere you
are regardless of your device, platform, or the programming language you're
using__.

Since all this has happened organically -- at startup development speed -- some
of it is adhoc and janky, however, all behind a single neat protocol. As we
continue to build more products that use the same primitives (project
filesystem, code execution, code intelligence, etc) it became clear to us that
we we have the opportunity to build something general and abstract that allows
to not only move faster but -- more importantly -- to provide a better service
for our users.

With time we'll be sharing more technical details and hopefully build parts of
it in the open.