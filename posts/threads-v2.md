---
title: Discuss code in context with Inline Threads
author: Devin Halladay
cover: https://blog.replit.com/images/threads-v2/og-image.png
categories: news,product,design,edu
profiles: theflowingsky,adrianapoz,ArnavBansal
date: 2022-10-13
---

Part of what makes Replit so exciting to us is our community. We're always looking for new ways to help our creators connect, collaborate, and create something great together. 

When you're coding a great idea, we want to help you stay in creative flow, without being isolated from your friends or team. Since [their introduction in 2021](https://blog.replit.com/threads), Threads have been important for collaborative creation on Replit, especially for educators and students.

**Today, we're excited to release a new version of Threads and Chat.** There's something in this release for everyone: from hobbyists and hackers, to students and educators, to teams and professionals.

![Inline Threads, Inbox, and Chat](https://blog.replit.com/images/threads-v2/hero.png)

## What's a thread?

**Threads are discussions about selections of code.** Each discussion is displayed in-line with your code, so you can stay in flow without context switching.

You can create a thread for many different things, like code reviews, debates, feedback, and general chat. For example, teachers all over the world use Threads to grade and give students feedback. At Replit, we use Threads daily to plan projects and give feedback — in fact, we used them to edit this very post.

**To get started, select some code, right-click, and select "Start thread"**. An input field will appear, where you can type a comment for yourself or your collaborators. _Pro tip: You can also use the keyboard shortcut `alt+/` to start a Thread._

Pretty simple, right?

<video src="https://blog.replit.com/images/threads-v2/create-thread.mp4"  class="css-3qjkrt" autoplay muted playsinline loop controls></video>

---

## Highlights in this release

### Inline Threads
Threads are more contextual to the code you're discussing, so your cursor never leaves the editor.

![An inline thread](https://blog.replit.com/images/threads-v2/inline.png)

When code has a thread attached, you'll notice a subtle highlight on the text. Along the right edge of the editor, you'll also see a thread indicator. Click it to open the associated thread.

We also made some small improvements to help you be more productive:
1. **Quickly jump between threads with arrow buttons** — Great for catching up on recent discussions!
2. **Improved Markdown styles for comments** — Try adding some `code` or *italics*, an image or @mention.

### A new and improved inbox
With [layout Splits](https://blog.replit.com/splits), you can now put the inbox anywhere you want. Simply open a new tab and select **Threads** from the tool menu. Now, you can drag the tab wherever you want for easy access. We've also improved the organization of the inbox, with new options to filter and sort your discussions. _Pro tip: Use "Sort by Code Order" to make code reviews a breeze!_

![The new and improved inbox tab](https://blog.replit.com/images/threads-v2/inbox-tab.png)

### Chat is now a tab
Chat is a favorite feature of many Replit creators, so we've made some improvements there too. The new Chat pane, available from the **New tab** menu, lets you put chat anywhere you want in the workspace. _Pro tip: group Chat with the shell tab for quick access._

![The new Chat tab](https://blog.replit.com/images/threads-v2/chat-tab.png)

---

## What's next for Threads

This release is a quality-of-life improvement. In the long term, we're excited to explore more ways Threads can make you more productive and connected.

- **Mobile Threads and Chat** — Chatting with friends on your phone will be just as seamless as on desktop.
- **Instant messaging** — Creators love the speed and ephemerality of Repl chat, so we're exploring real-time messaging in threads.
- **Code review** — Creators learn a lot from reviewing each other's code. We think Threads are a natural place to add a code review feature.
- **AI code suggestions** — With AI Mode, we can explore automated AI code reviews and edit suggestions.

<video src="https://blog.replit.com/images/threads-v2/code-review.mp4"  class="css-3qjkrt" autoplay muted playsinline loop controls></video>

---

## What do you think?
We're looking forward to hear how you use threads to collaborate! Play around a bit and let us know what you think about the new design in the comments [here](https://replit.com/@util/Threads-v2-Feedback?v=1).

<script>
  window.addEventListener('load', videoScroll);
window.addEventListener('scroll', videoScroll);

function videoScroll() {

  if ( document.querySelectorAll('video[autoplay]').length > 0) {
    var windowHeight = window.innerHeight,
        videoEl = document.querySelectorAll('video[autoplay]');

    for (var i = 0; i < videoEl.length; i++) {

      var thisVideoEl = videoEl[i],
          videoHeight = thisVideoEl.clientHeight,
          videoClientRect = thisVideoEl.getBoundingClientRect().top;

      if ( videoClientRect <= ( (windowHeight) - (videoHeight*.5) ) && videoClientRect >= ( 0 - ( videoHeight*.5 ) ) ) {
        thisVideoEl.play();
      } else {
        thisVideoEl.pause();
      }

    }
  }

}
</script>