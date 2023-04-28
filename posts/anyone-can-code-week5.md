---
title: Anyone Can Code - Week 5
author: Brittany Pirkle
date: 2020-11-23
cover: https://blog.repl.it/images/anyone-can-code/week5.png
categories: projects
---

How are we already into week 5 of this project? It’s amazing how much I have learned in such a short time. (If you need a recap of the last four weeks, you can go [here](https://blog.repl.it/)). When the basic foundational steps are broken down into small chunks, the world of code doesn’t seem as overwhelming as I thought it would be!

![week 5: responsive design](https://blog.repl.it/images/anyone-can-code/week5.png)

This week the focus was on responsive design. Responsive design is all about creating web pages that work with any screen size. Do you notice how a website shows up differently on your mobile device versus a desktop device? This is responsive design at work. Responsive design is all about using HTML and CSS to shrink, enlarge, resize, etc. various parts of a website so they are aesthetically pleasing on all devices. Here's a [quick 5-minute course from FreeCodeCamp and Scrimba](https://www.freecodecamp.org/news/learn-responsive-web-design-in-5-minutes/) that I read to get started.

This process is essentially two parts. The first part is to change the image and text to be responsive. Meaning no matter what device I am using, the text and images will change to accommodate the size of the device’s screen. The second part is to ensure flexibility on the screen. Have you noticed that content is “stacked” top-to-bottom when you look at it on a mobile device, but sits side-by-side when in a desktop view? These changes can be done in either language, HTML or CSS. I chose to code in CSS. [Here](https://www.w3schools.com/html/html_responsive.asp) is a resource for doing responsive design with in-line styles in HTML. (But keeping all your styling in CSS is best practice, I'm told, so you don’t have to remember which content was styled where.)

In the CSS tab, I added the `content` div element that allows the text and the image to be moved around together. `Width` is referring to the size of the content area or padding area (I talked about what padding is last week). `margin-left` and `margin-right` are set to auto, meaning I just want my margins to be automatically set and my content to be centered. `Display` was introduced last week (the type of box that is used for an element), but I used a block display then. I changed my display this week to ‘flex’ as I need the elements to change depending on the screen size. Flexbox allows for proper vertical alignment of a box so that it is always centered no matter the size of the screen. Setting my `flex-flow` element as a row is saying that I want my flex items to be set in a row inside the flexbox area. (For more on flexbox, you can go [here](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)). `justify-content` refers to the arrangement of my elements on the x-axis. (Remember, the years of plotting graphs on an x and y axis?). `align-items` refers to the alignment of my elements on the y-axis. I wanted both of these to be centered. 

![flexbox](https://blog.repl.it/images/anyone-can-code/5.1.png)

Next the focus is on adding media inquiries to tell my web page what to do as the text and image get smaller. This code moves my text and image from side-to-side to top-to-bottom when the screen reaches the max width of 1200px. Notice how `flex-direction` used to be ‘row’ and now is ‘column’. Essentially, this element is what will change my web page from a desktop viewing, where everything is side-by-side, to a mobile device viewing, where the elements are top-to-bottom. 

![mobile and tablet size](https://blog.repl.it/images/anyone-can-code/5.2.png)

The last portion of code handles the case when the window or screen gets very small and my 500px image would extend beyond the edge of the screen and you’d have to scroll. We don’t want that! When the viewing screen is less than 580px, the width of my image will be 83% and the width of my text will be 80% of the original size. 

![smaller size](https://blog.repl.it/images/anyone-can-code/5.3.png)

The cool part about repls is that I can move the sidebar back and forth to see the text and image change sizes to help me determine the best percentiles and pixels for each element. You can also click the button next to the URL in the repl output pane to open your webpage in a new tab if you want to see it full screen.

Lastly, for fun I added a background image in the body portion of my code. [This website](https://www.pexels.com/) (or [this one](https://unsplash.com/) too…) is a great resource as the images are not copyrighted and can be easily added to a web page. All I did was copy the image address and place it inside the element, `background-image` and made sure the `background-size` was set to cover the whole web page. 

![background image](https://blog.repl.it/images/anyone-can-code/5.4.png)

Here’s my repl if you want to check it out: https://repl.it/@BrittanyPirkle/Holidaycard2020

<iframe frameborder="0" width="100%" height="500px" src="https://repl.it/@BrittanyPirkle/Holidaycard2020?lite=true"></iframe>

Stay tuned for [next week] (https://blog.repl.it/anyone-can-code-week6) as I talk all about website domains (the link where you can find your site) and what NOT to do when setting up your own website domain. Remember, [Repl.it](https://repl.it/) is free and seriously so easy to use!