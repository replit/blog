---
title: "Data Loss: a sad tale with a happy ending"
author: Luis Héctor Chávez
date: 2021-09-10T22:00:00.000Z
cover: https://images.unsplash.com/photo-1495427513693-3f40da04b3fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1351&q=80
categories: infra
---
Earlier this year, we discovered that we were losing data for some of our users. This manifested as either repls being completely empty after reloading, or some of the changes to files not being present after reloading. Obviously losing data is the worst we can do, so we had to fix this immediately. This blog post narrates the adventure of how we discovered this, how we fixed it, and the lessons we learned during the way.

## The discovery

Throughout the year, we had had some worries about some theoretical cases in which users could lose data. We have had a few complaints from people that their code wasn't correctly saved, and since we weren't sure what caused them, we just tried to fix bugs here and there one at a time in an unstructured fashion.

Around mid-July, we got an alarmingly large number of reports of people about their code not saving correctly in a short amount of time, ironically just after deploying one such fix. This meant two things: our intuition about folks losing data was correct, but the way we were fixing it was not! This led to the immediate discovery that there were months- or years-old bugs that were silently losing _or_ corrupting data, and some of them turned out to be [load-bearing bugs](https://twitter.com/amye/status/1097686448260579328) that couldn't be fixed in isolation (since fixing them triggered _other_ kinds of data loss). This made us start a much larger project to have better guarantees and incrementally fix things without regressions.

<figure>
  <image src="./images/data-loss/simpsons-bugs.gif">
  <figcaption>Homer Simpson doing a dramatic impression of this whole situation</figcaption>
</figure>

## The fix

First order of business was to restore order to the world. Luckily, since this got noticeably worse _just_ after a deployment, we had the advantage that a [revert-first, ask questions later policy](https://outage.party/) worked wonderfully. But now we also had to fix the several months-old corrupt data that we had already persisted, because corrupt data was causing repls to not be able to load at all! We decided to address this in a more structured approach:

* Log and monitor all the places where we were suspecting that data could be lost. This way we could clearly see whether a change was indeed improving something or not.
* When a repl was being loaded _and_ we discovered that the data that was being loaded was corrupt, discard the corrupt part of the data and salvage whatever we could. The rationale was that it's preferable to have a partially-restored data rather than a permanently inutilizable repl.
* Make sure that we could never persist data that was corrupt by carefully analyzing the output of the filesystem snapshotting tool before committing it. This meant that we could have a good guarantee that anything written after a certain point in time was not corrupt.
* Write a batch [Dataflow pipeline](https://cloud.google.com/dataflow) that could go through all of the older repls efficiently and perform the same salvaging operation that was run live when repls were being loaded.
* Finally, remove all the scaffolding introduced earlier to make repls load fast again.

In case anybody is curious, the root cause happened to be a bad interaction between how Golang's [`exec.Cmd`](https://pkg.go.dev/os/exec#Cmd) handles stdin/stdout if they can be directly connected to the underlying process, how one of the userland tools that we use to save repls' filesystem snapshots didn't quite check for _some_ obscure failures in the very last call to the [`write(2)`](https://man7.org/linux/man-pages/man2/write.2.html) and/or [`splice(2)`](https://man7.org/linux/man-pages/man2/splice.2.html) syscalls that could happen when the system is under heavy load, and the system running short on available disk space. All of these factors together meant that we could sometimes get a silently truncated stdin/stdout from one of those programs, and no error being raised!

By the end of July, we had [all the mitigations](https://blog.replit.com/changelog-07-21) in place, [thus solving the problem once and for all](https://www.youtube.com/watch?v=IjmtVKOAHPM)!

## Never let a good crisis go to waste

Once we had stopped the bleeding and we were sure that we were no longer losing users' data, we decided to improve things to avoid regressions in the future. With logging and monitoring in place, plus tests for all the ways in which we knew we had lost data in the past, we felt _a lot_ more comfortable making changes.

All of the things that we had suspicion that were losing data received a large overhaul to make them more understandable. During that refactoring, we discovered that there were two more places that were not only prone to losing data, but also being very slow: handling filesystem snapshots and persisting [Operational Transformation](https://blog.replit.com/collab#protocol-changes--operational-transformation) history for each file. During the course of the next month we _very slowly_ rolled out a few changes that would simultaneously make those two operations more reliable _and_ faster! Today, repls load quicker than they did back in July, and they are more responsive as an added bonus, especially in multiplayer!

## Lessons learned

* Losing user data is pretty much the worst that we can do for our users, and that needs immediate attention.
* It's fine to live with brokenness for limited periods, as long as we fix things that are legitimate problems that affect people.
* Measuring things in general is extremely important. Adding measurement and logging _before_ improving things is critical.
* Once we decide to fix something, might as well improve it.