---
title: "Introducing the Replit Desktop App"
author: Sergei Chestakov
date: 2023-09-14
cover: https://blog.replit.com/images/desktop-app/desktop-app-cover.jpg
categories: product
---

![](https://blog.replit.com/images/desktop-app/desktop-app-cover.jpg)

Replit is first and foremost a cloud-based company. You can code, run, and [deploy](https://blog.replit.com/autoscale) your favorite apps using virtually any technology or framework, all on one platform. But just because we’ve created a cloud-based product doesn’t mean that you have to be limited to using Replit in the browser. That’s why today we’re super excited to announce the official [Replit Desktop App](https://replit.com/desktop).

## About the app

With the Replit Desktop App, you can finally enjoy a native Replit experience free of browser distractions, on macOS, Windows, and Linux. This new form factor allows you to stay focused on coding with a “zen-mode” like experience, quickly create multiple windows for different Repls, and easily access Replit from your dock or home screen.

![Multiple Replit screens open on macOS](https://blog.replit.com/images/desktop-app/desktop-app-macos-screens.png)

The app also allows you to configure several [keyboard shortcuts](https://blog.replit.com/configurable-keybindings-for-the-workspace) for the editor that are normally not accessible in the browser. For example, `Ctrl/Cmd + T` to open a new pane and `Ctrl/Cmd + W` to close a pane, which are typically reserved for opening and closing tabs respectively. We’ve often heard the complaint that many developers on Replit find themselves accidentally closing their tab and ending the session abruptly because they’re so used to these shortcuts from other IDEs and trigger them out of instinct. This helps Replit feel more familiar and prevents you from disrupting your flow.

Another motivation for building a standalone app was frequently hearing from developers that coding in the browser “feels weird”. Despite the increasing prevalence of online IDEs and other cloud-based environments, it’s still natural for many seasoned developers to prefer a more native desktop experience when programming, especially if that’s where they’ve done the majority of their coding in the past.

In addition to making it easier to come back to Replit, we also hope to help you focus specifically on coding within the app. While Replit is more than just an IDE, and is full of exciting features like the [Community](https://replit.com/community/all), [Bounties](https://replit.com/bounties), and [100 Days of Code](https://replit.com/learn/100-days-of-python), we’ve made the deliberate decision to keep the native app experience centered around the IDE so that you can stay focused on building and deploying your applications and quickly come back to your favorite projects.

After starting the app and logging in, you can search for and open an existing Repl or create a new one. From there, you’ll be dropped right into the Workspace, or the Replit IDE, which should look very familiar. The Workspace in the app is almost the same as what you’re already used to on the web – a comprehensive set of development tools and features for creating, debugging, and managing your code. There are a few key differences, however, including an updated navigation menu which you can use to switch between Repls, create new ones, and open new windows, all without ever leaving the Workspace:

<video controls autoplay muted loop src="https://blog.replit.com/images/desktop-app/desktop-app-nav-menu.webm" alt="Navigation menu selections in the Replit Desktop App"></video>

But that’s not the only thing that packaging Replit in a desktop app unlocks. For example, if you open the devtools from the Webview in the app, we will launch the native Chromium devtools that you might be familiar with if you’ve done web development with Chrome. The native devtools are as powerful and feature-rich as those in your browser which can help a ton when debugging your websites and apps.

![](https://blog.replit.com/images/desktop-app/desktop-app-integrated-devtools.png)

While you still need to be connected to the internet to use the app, we hope to add lots more native functionality that ties into your OS and file system over time, in addition to the features we’ve already added such as deep linking and native devtools. We’re excited about the powerful capabilities that moving Replit out of the browser and onto your OS unlocks and hope to take advantage of this more and more in the future.

## How we built it

So how did we build a fully featured desktop app for every OS in a matter of months? We developed the app using [Electron](https://www.electronjs.org/). We chose Electron specifically because we knew that we wanted to build an app that worked on macOS, Windows, and Linux so that we could get it in the hands of as many developers as possible and enjoy the benefits of having a single codebase which allowed us to ship features faster and to all platforms at once. Additionally, the adoption of Electron by many of the apps we know and love such as Figma, Notion, and Slack helped us feel confident in embracing it too.

![](https://blog.replit.com/images/desktop-app/replit-electron.png)

We did consider other alternatives though when we set out to build the app. For example, React Native now features [bindings](https://microsoft.github.io/react-native-windows/) for both macOS and Windows which was appealing since we already use React Native in our [mobile app](https://blog.replit.com/mobile-app). However, it does not yet have official support for Linux which was a key requirement for us.

We were also really excited about [Tauri](https://tauri.app/), which is a brand new Rust-based alternative to Electron. Tauri is great because it’s very fast and prioritizes performance, bundle size, and security. Amazingly, Tauri apps are regularly single-digit MBs in stark contrast to Electron apps which can easily exceed 100 MBs. This is because it relies on your OS’s native web renderer and other built-in components rather than packaging your source code with both Chromium and Node in its entirety, as Electron does.

Unfortunately, while Tauri seemed super promising, it proved a little too early for us to adopt. Given how new it is (the first stable version was only released in June of last year), the community is still quite small and the framework is still far from feature parity. Certain key features we needed, such as deep linking and the ability to expose native APIs to remotely loaded URLs, were not yet implemented when we set out to build our app. Additionally, the use of native web renderers instead of packaging a stable Chromium instance meant that we had to worry a lot more about writing OS-specific code and subtle differences in how UIs would be rendered on each platform. Lastly, the use of Rust instead of Node for the native code would have resulted in a faster app but came with the downside of making it harder to iterate quickly and for other engineers on the team to contribute, which was important for us given that we are still a small startup.

Electron proved to be a great choice for us to bootstrap our app and integrate with our existing stack as we’re easily able to remotely load a subset of our website and expose native Node-based APIs to the web client. This allowed us to do things like open new windows and display native message boxes directly from the web app. Reusing code with the website was also super convenient because it meant that we could use our existing components and UI library, [RUI](https://blog.replit.com/rui-eng), really easily.

After we built a working version of the app, we needed a way to package and distribute it to the world. To do this, we used [Electron Forge](https://www.electronforge.io/), which is a tool that lets us build distributables for each platform (e.g. `.dmg` for Mac, `.exe` for Windows, and `.deb` for Linux), sign the apps with a valid code-signing certificate, and publish the packaged distributables to a registry of our choice (in our case, we used GitHub releases). We do these steps in CI across different machines using GitHub Actions to ensure that the app is properly built and signed for each platform (macOS, Windows, Linux) and architecture (x86, ARM) that we support.

Finally, we built a custom update release server based on [Hazel](https://github.com/vercel/hazel) which acts as a proxy for our privately hosted GitHub releases that are used by the download page to fetch the relevant distributable for a given platform and architecture. It also exposes endpoints that enable auto-updating for our macOS and Windows apps. It’s even deployed on Replit, having been one of the first internal adopters of our new Deployments capabilities months before they were released to the public, which helped us ensure that they were ready for production.

## Download the app today

Give the Replit Desktop App a try today by visiting [replit.com/desktop](https://replit.com/desktop) to download the latest version!

As always, please [let us know what you think](https://ask.replit.com/t/introducing-the-replit-desktop-app/63651) and which features you’d like to see next. We hope you enjoy using the native Replit Desktop App and are excited to see what you build with it!




