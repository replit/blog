---
title: "Packages: Powered Up"
author: Jake Hamilton
date: 2023-08-25
cover: https://blog.replit.com/images/packages-cover-image.jpeg
categories: eng
profiles: JakeAtReplit,insprd
---

![](/images/packages-cover-image.jpeg)

Package management on Replit just got an upgrade. We’re releasing new features that make it faster to load, simpler to manage, and easier to troubleshoot packages for your projects.

Read on to learn about the new additions or [try it out now](https://replit.com/new) on Replit!

## Why we built the Packages tool

Software projects already demand enough from developers implementing features, leaving those same developers little time to build everything from scratch. Pulling in code from other organizations or individuals can jump-start projects and help ensure their security, functionality, and integrity. However, existing package management tools are disconnected from each other and can be clunky to work with on the command line.

This is where Replit shines. We built [UPM](https://blog.replit.com/upm), the Universal Package Manager, to manage packages for multiple languages using the same tool. With UPM, we were able to build package management into Replit, making one of the many tasks of software development easier and more approachable. However, we don’t plan to stop there! With this tooling, Replit is in a unique position to provide the best package management experience in the industry. To do so, we identified some key areas for improvement.


## Streamlined package installation

As more developers continue to build on Replit, we're always on the lookout to make setup steps even more convenient. While many projects have ready-to-use templates, there are still essential packages that you might need. The most common packages installed on Replit are now shown as suggestions for JavaScript and Python projects. No more searching for `moment` or `pandas`, they’re now just a click away.

![Package suggestions](/images/packages-powered-up/suggested-packages.png)

## Efficient package management

You can now queue additional package install and uninstall actions while the package manager is running. All packages in the queue will be batched together, significantly reducing the workload. This results in a noticeably faster and smoother experience.

<video controls autoplay muted loop src="/images/packages-powered-up/batched-actions.webm" alt="Multiple packages being queued to install or uninstall. Queued actions can also be cancelled."></video>

## Easier errors

Sometimes you might run into issues while installing a package. The improved error handling provides detailed insights into what went wrong and makes it more clear which actions failed. You can jump right to the console to gather more information and troubleshoot effectively. In addition, thanks to the queueing system we built into Packages we’re now able to handle these errors gracefully and continue to process future installs and uninstalls.

<video controls autoplay muted loop src="/images/packages-powered-up/error-handling.webm" alt="A failed package installation. When the error occurs, a message is shown and two buttons are presented: Console, Try Again. Clicking on Console opens the Console tool to view the associated logs."></video>

## Responsive resizing

The Packages tool now adapts seamlessly to various pane sizes. The new responsiveness will complement larger monitors while still providing utility on smaller displays.

<video controls autoplay muted loop src="/images/packages-powered-up/resizing.webm" alt="Resizing the Packages tool changes the number of columns of packages displayed."></video>

## Future developments

We’re continuing to make Replit faster and easier to work with. For Packages, much of that comes down to the underlying technology powering it all: [UPM](https://blog.replit.com/upm). Making UPM even better will give us the ability to make projects safer, easier to manage, and faster to work with. We’ll be working on making the package install, uninstall, and info processes more efficient, enabling us to bring more powerful tooling to Replit.

Ready to shape the future of Replit? [Come work with us](https://replit.com/site/careers)!
