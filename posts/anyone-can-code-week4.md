---
title: Anyone Can Code - Week 4
author: Brittany Pirkle
date: 2020-11-17
cover: https://blog.repl.it/images/anyone-can-code/week4.png
categories: projects
---

I am over halfway done with this project and I have learned so much. Coding intimidated me at first, but with Replit it has been extremely user friendly, fun, and attainable! 

![week 4: learning basics of css](https://blog.repl.it/images/anyone-can-code/week4.png)

Last week ([see last week’s blog here](https://blog.repl.it/anyone-can-code-week3)), I added the HTML elements to my web page which was the foundation. Essentially, this was all the text that I wanted to add to my holiday e-card. This week, my focus was on CSS, basically the aesthetics of my e-card: font style, colors, background colors, spacing, and overall appearance. CSS is written in a way to assign a certain element to the text and elements that are already in HTML. For example, CSS looks for the `h1` tag and assigns it whatever CSS code I add.  I can’t lie. This language was a little trickier at first, but I learned three things right from the start: 
1. Replit makes everything so much easier 
2. Attention to detail is crucial. 
3. Keeping the code organized is necessary. 

For everything CSS, make sure you are on the correct tab, “style.css.” 

![style.css](https://blog.repl.it/images/anyone-can-code/4.1.png)

My first focus was the font styling. Readability is key here so as cool as that funky text may look, it needs to be a font that is readable for your audience. [Google Fonts](https://fonts.google.com/) was the perfect way for me to choose a font. Essentially, you can go through a list of fonts and select the ones you like. Then, “select this style” and choose “import.” It can’t be any easier!

![import font](https://blog.repl.it/images/anyone-can-code/4.2.png)

Next, paste the `@import` link from Google Fonts to the style.css tab. Remove `<style>` since this code is not being added to your HTML doc, but instead directly to the CSS.

![@import](https://blog.repl.it/images/anyone-can-code/4.3.png)

Next, I chose my color palette. The colors chosen for any kind of web design are important. The two main goals are readability and accessibility. (If you want to go down a rabbit hole and learn about color theory, [here](https://studio1design.com/how-important-is-color-in-website-design/) is a good read.) [This website](https://coolors.co/) made choosing coordinating colors so easy. I knew I wanted something that was festive, but still appealing. Don’t overthink it. I had to keep myself from being sucked in to changing palettes over and over. The beauty of this website is being able to easily copy the CSS Hex codes (one of the ways that computers “see” and “understand” color). 

![colors](https://blog.repl.it/images/anyone-can-code/4.4.png)

Then, I added the copied text to my code like this: 

![body css](https://blog.repl.it/images/anyone-can-code/4.5.png)

I added `body {` and then, as you can see, other specifications for the body are added by the property tag like `font` or `background color`. Be sure to include the appropriate quotation marks, colons, and semi-colons. Remember it is all in the details! And don’t forget your closing `}`. Basically, I am telling my webpage that these are the properties I want in my body of my web page. 

I found it easiest to start at the top of my text, with `h1`, and add the properties I wanted to each portion, leaving space to keep everything more organized. In this case, I added the font family, font size, and color of my text. Replit will generate options for the properties, just like in HTML, as you type. Notice the details: colons, semi-colons, dashes, quotation marks! You might be wondering at this point how I figured out the property names. [This](https://www.w3schools.com/cssref/default.asp) website has a helpful CSS reference guide. 

![h1 css](https://blog.repl.it/images/anyone-can-code/4.6.png)

And when I hit the green “run” button, my text now looks like this (remember, we added the background color earlier): 

![happy holidays](https://blog.repl.it/images/anyone-can-code/4.7.png)

I proceeded to follow the same process for `h2` and got this: 

![h2 css and page](https://blog.repl.it/images/anyone-can-code/4.8.png)

Now for the image. Just like before, start with the  tag,  `img {`. Then I made it `display: block;` and used `auto` for the left and right margins. I didn’t know how to do this so I just Google searched [how to center an image](https://www.w3schools.com/howto/howto_css_image_center.asp)! Then I added a border, described the type and color of border I wanted and adjusted the width and height of my image. I can’t say it enough. Attention to detail and organization of the code are so important. (But try breaking things too and see how your webpage changes. Sometimes it’s really surprising!)

![img css](https://blog.repl.it/images/anyone-can-code/4.9.png)

![image](https://blog.repl.it/images/anyone-can-code/4.10.png)

Next is the actual text in my paragraph. Just like the image, I used the same border color, style, and display (to center the text). I also adjusted my margins on all sides so it lined up with the image’s margins. The margins are the space outside the border. The padding is the space in between the inside of the border and the text itself. Many of my configurations were trial and error. (This is how the pros code too I’m told!) And that’s why it is so great to have the green “run” button to see each update I make. 

For the paragraph, I simply made sure my background color was set and tweaked the padding and margins to what looked congruent with everything else. Again, trial and error to see what looks aesthetically pleasing.

![text css](https://blog.repl.it/images/anyone-can-code/4.11.png)

![p css](https://blog.repl.it/images/anyone-can-code/4.12.png)

![paragraph](https://blog.repl.it/images/anyone-can-code/4.13.png)

This project is really coming along! [Next week] (https://blog.repl.it/anyone-can-code-week5) I am going to talk about very basic responsive design.  And remember, [Repl.it](https://repl.it/) is FREE and super easy to use. Keep sharing with friends and family who are just getting started with coding too. Thanks for following along!