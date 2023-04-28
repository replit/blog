---
title: "Hack Week 2022 Recap"
author: Jeffery Matthews
date: 2022-03-09T00:00:00.000Z
categories: events
---
Hey, everyone!

I’m sure you all heard about the infamous, annual Replit [Hack Week](https://twitter.com/Replit/status/1481412336053194755), but what exactly is it? Every year, we come together as a team to brainstorm, hack, and push the limits of our platform to set the tone for the year.

During the first Hack Week last year, our team integrated [Nix](https://blog.replit.com/powered-by-nix) into Replit which transformed how we do infrastructure, packages, and languages. Nix also allows users to configure Replit to suit their needs. 

[![Old Tweet](https://blog.replit.com/images/hackweek22/G3IKB.png)](https://twitter.com/tylerangert/status/1347933767772499968?s=20&t=QPLnuaBDnElcoWIx-_453A)

In line with our purpose for Hack Week ‘22, the theme for the year is “Community and Extensibility”.

Our overall goal is to produce tools that make Replit extensible, provide users with ownership, clear roadblocks for configuration and create attachment to our products via customization. With engaging community features and implementations, you can showcase your creations to the world and make new friends in the process.

While we want to create a platform that’s truly extensible, we also want to expose the [next billion software creators](https://blog.replit.com/b) to a thriving, social community.

***This is more important than ever.***

![Hack Week '22](https://blog.replit.com/images/hackweek22/G3IQU.png)

## Judges

Without further ado, let’s introduce our judges and projects for Hack Week!

We were honored to be joined by [Christina Cacioppo](https://twitter.com/christinacacii) and [James Cham](https://twitter.com/jamescham) as the judges for this year’s contest.

Christina is the founder of [Vantam](https://www.vanta.com/landing/yc), a startup that automates security and compliance, which was in the same YC ‘18 as [Amjad and Haya](https://blog.replit.com/yc). She also writes legendary posts about what makes programming learnable.

James is an early-seed stage investor at [Bloomberg Beta](https://www.bloomberg.com/company/values/innovation/bloomberg-beta) and computer theorist that is truly passionate about the future of programming.

## Projects

This year, we joined together in San Francisco to create over 10+ running demos and presentations. From customizable skins and themes to an interactive Replit World, [our team](https://replit.com/site/about) produced projects that will be shipped throughout the year!

## Replit World

![Replit World Sign](https://blog.replit.com/images/hackweek22/G3IM2.png)

Replit World is the next evolution of our growing community. In an interactive universe, users can express themselves with fully customizable avatars and create sub-worlds within worlds. Our community wants to show off their coding superpowers, so we built an ecosystem where you can make friends while doing so.

![Replit World](https://blog.replit.com/images/hackweek22/G3IM4.png)

By allowing users to create an identity, it brings you closer to the projects you work tirelessly on. Not only will Replit World help people get discovered, but it will allow you to learn about new projects from upcoming programmers. From an educational standpoint, [teachers](https://replit.com/site/teams-for-education-case-study) can build custom worlds to onboard new learners with coding problems as they are guided thru Replit’s universe.

![Kaboom Land!](https://blog.replit.com/images/hackweek22/G3IM5.png)

For example, there’s Kaboom! Land, where you can share your next great [Kaboom](https://kaboomjs.com/) game or search for other games from creators. Or how about on your next coding break, take a scroll at the casino in Las Replit, where you can play games and relax for a quick moment. The sky is the limit.

Team Member(s): Kenton, Joe, Laima, Abdel, Dan F., Lena, Tiga, YK

## Site-Wide Search

The UI/UX of search bars can make or break your overall experience in any program imaginable. With a broken search bar, users are often left frustrated and limited because they cannot find what they are looking for due to a simple mistake.

We want everyone to have a smooth and seamless experience using Replit and this enhanced search project brings us one step closer to comfort.

Backed by elastic search, you can make pretty sophisticated search queries. Let's say you played a game with swords from [Kajam](https://blog.replit.com/kajam-winners) and all you remember is there was something huge.

![Site-Wide Search](https://blog.replit.com/images/hackweek22/G3IOD.png)

Type in your search “kajam sword huge” and BOOM. The Repl appears as the top inquiry and the search matched your phrases. There’s additional weighting on Repls with runs and reactions to bring relevancy and the social element into search. Also, the results filter the search into categories by Repls, users, and code.

Did someone say deep linking? Let's say you want a usage example of import matplotlib, you can put the phrase in quotes and it'll search. Results will show the phrase from the code with in-line scrolling and automatically scroll to the proper lines of code within the Repl. How cool?

Team Member(s): Lincoln

## Element Inspect

Coming from the same ambitious search team as before, an element inspect tool was created.

There are hoops and ladders to crawl through to get to your Repl elements using the inspect function. On a mobile device, there’s no way for the user to inspect the element at all. 

By implementing a handy, in-browser toggle, we can now inspect elements similar to other dev tools. From elements to network code, you can view the entire profile of Repls - including mobile!

![Element Request](https://blog.replit.com/images/hackweek22/G3IVI.png)

Team Member(s): Faris

## Funbox

Who doesn't like to have a little fun now and then? You can already create games, bots, and more in Replit, but what else is in store?

Tiga created a quirky tool called "The Fun Box". The toolkit gives developers the option to make their coding experience more fun and engaging by implementing unique effects.

![Trippy Visual Effects](https://blog.replit.com/images/hackweek22/giphy80a602973f91465f.gif)

From classic typewriter sounds to trippy visual effects, this is perfect for coders who want to inject some creativity into their work with just a few clicks.

Team Member(s): Tiga

## Help Center Revamp

As programmers, we all know how important it is to have quick and easy access to help documentation and support from the community. With our new Help Center, you can get support, documentation, report bugs, and much more info quickly and easily – without ever having to leave your coding environment!

![Help Center Widget](https://blog.replit.com/images/hackweek22/G3IOM.png)

Move the widget around your screen as needed, or keep it docked on one side for easy access. And if you need more information than the widget provides, just click through to the full online help center.

Team Member(s): Shane, Brittany, and McKinley  

## Extensions

Extensions are powerful assets within Replit when used correctly. Various projects developed during Hack Week were built upon the Extension API. Not only can you run arbitrary code and custom file types, you can also render JSX files within the editor. With this powerful abstraction, extensions let us build whatever we want, when we want in the Replit space.

Replit is a [fun and addictive way](https://replit.com/@ColoredHue/Sir-this-is-a-Wendys?v=1) to spend your time and build the future, but sometimes you need a break from the programming challenges. That's where Gaming Extension comes in. With the Extension API you can create plug-ins and open a game such as tic-tac-toe to fire up a quick round. 

![Tic Tac Toe Example](https://blog.replit.com/images/hackweek22/G3IOY.png)

*But don’t you need two people to play, you ask?*

Well, yes. But that’s the beauty of the Extension API. You will now have the ability to play multiplayer games in real-time with friends within the IDE! The fancy part of this is that it is not using a websocket or any sort of real-time technology. It makes use of Replit’s [multiplayer](https://replit.com/site/multiplayer) file system under the hood to actually play a game.

![Maps Extension](https://blog.replit.com/images/hackweek22/G3IOV.png)

In addition to a fully functional shell console, the team also created an interactive media and hex editor. From embeddable YouTube videos to maps, the options are endless to what these extensions can do.

Team Member(s): Tyler and Sergei

## Custom Themes

Dreams are coming true through Hack Week projects. In high anticipation and the most requested feature across our support categories, we’re excited to announce that custom themes are here!
 
This new feature is built on top of the Extension API, so it's easy to create your own themes or customize existing ones. We think you'll find that they add a lot of flexibility and personality to your Replit account sitewide.

![Valentine's Theme](https://blog.replit.com/images/hackweek22/G3IMA.png)

With the current experience, you're stuck with [dark, light, or spooky themes](https://blog.replit.com/themehowto). But let’s say you want to make a Valentine’s Day Theme? You can customize your theme with hex codes and we’ll provide some guidance if there's a color combo that’s not easily readable. With helpful tips as you input hex codes, the theme customizer will ensure proper contrast and color balance throughout your site.

Today, you can edit themes and extend your Replit experience but tomorrow, you can imagine that paradigm applying to almost anything across the platform. The mental model of Replit is switching from:

Replit as a website —>  Replit as a computing platform

*This is powerful.*

Team Member(s): Barron, Mike, Tala, and Jeremy

## Raspberry Pi

Creators are already using [Raspberry Pi](https://www.raspberrypi.org) to build things and many are learning how to code for the first time on these devices. The idea of running your own Repl on a Raspberry Pi would open a door of possibilities for users. That idea is now a reality.

We’re proud to announce that anything you can build with a Raspberry Pi, you can now build inside a Repl. We want people using Raspberry Pi to unlock the full capacity and power of their devices with Replit from anywhere in the world.

![Raspberry Pi Connection](https://blog.replit.com/images/hackweek22/unnamed77f43b8a23afed01.gif)

Using a simple Replit process and QR codes to sync the devices, it is a quick and seamless process to get a brand new vanilla Raspberry Pi running. *Yummy.*

By connecting any device to Replit (Mac, Linux, Unix-type, etc.), you can see the status of all your devices and sync your Repls anywhere. Plug your Pi into a TV and play Tetris with friends. Connect your Pi to a thermostat and receive real-time weather updates from anywhere. Strap a Pi to some wheels and build the next robotic innovation.

As with our other extensible tools, our integration with Raspberry Pi will allow you to build whatever your heart desires.

Team Member(s): Connor B., Conner, Derek, Dan

## Language Notebooks

Last, but not least, let’s check out the final project of Hack Week!

Don't you wish there was an easy way to keep track of your code snippets and findings while working on a project? With digital notebooks built inside of Replit, now there is! Save and track snippets of code in various languages, along with any other information you might need for your project.

![Language Notebook](https://blog.replit.com/images/hackweek22/G3IS6.png)

With multi-language notebooks, this is a [great tool for teachers](https://replit.com/site/teams-for-education) to walk through students' notes, questions, and more. Best of all, it's easily searchable and accessible from anywhere with Replit.

As with many of the other Hack Week projects, language notebooks was built with the Extension API.

*Synergy.*

Team Member(s): Scott and Reza

## Hack Week '22 People's Choice Awards

While all projects presented during Hack Week ‘22 were simply amazing, there could be only 1 winner.

The winner of Hack Week '22 People's Choice Award went to... *drumroll please…*

***Custom Extensions***!

Honorary mention: Tie - **Site Wide Search** and **Raspberry Pi + IOT**!

## Conclusion

If you made it this far, you truly must be as excited for the [future of Replit](https://blog.replit.com/mobile-v2) as we are. While remaining innovative along the way, we are committed to putting our community first as we onboard the next billion software creators to programming.

Does building the future of programming and technology excite you? Find your fit with us and [learn more](https://replit.com/site/careers).

Stay tuned for our next shipment and until next time!

![Replit Next Billion](https://blog.replit.com/images/hackweek22/G3IKW.png)