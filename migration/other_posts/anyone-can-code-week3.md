---
title: Anyone Can Code - Week 3
author: Brittany Pirkle
date: 2020-11-09
cover: https://blog.repl.it/images/anyone-can-code/week3.png
categories: projects
---

Remember how I said three weeks ago (see the first week of my journey [here](https://blog.repl.it/anyone-can-code-week1)) that anyone can code? Well, it really is true. In fact, I am kind of impressed with myself in how quickly I have been able to figure out the basics of coding ;). Using [Replit,](https://repl.it/~) [online tutorials](https://www.w3schools.com/tags/tag_img.asp), [videos](https://scrimba.com/learn/html/html-figure-image-elements-c42D8uv), and the guidance of a [few experts](https://repl.it/talk/learn/Getting-Started-with-HTML-in-10-minutes/16821) (at Repl.it) has made the learning curve way less intimidating. But if you follow along with me, it can be easy for you too!

![week 3: learning basics of html](https://blog.repl.it/images/anyone-can-code/week3.png)

Last week (read about it [here](https://blog.repl.it/anyone-can-code-week2)), I broke down the two languages I would be using - HTML and CSS -  and how to get started with Repl.it. After some self-training and trial and error with the mock Repl I made last week, I decided to jump in this week to create my actual project, a holiday e-card on a custom domain (remember domain is just the place the information is housed and is the name of the website). 

First, I decided to create an outline with all the text I wanted to add to my web page. Next, I started a new Repl and gave it a name. 

![new repl](https://blog.repl.it/images/anyone-can-code/3.1.png)

My first assumption was that creating a new Repl would be like creating a totally blank new document. I was wrong. At first I saw some text that looked like gibberish (trust me though, once you understand, it isn’t overwhelming at all). On the first line of your brand new Repl, you will see _doctype html._ All this means is this text is communicating to your web browser as an HTML doc. The HTML document itself begins with `<html>` and ends with `</html>`. Next you will see `<head>` and the information contained inside is the title and meta title for your website. For those of you who are about to google “meta title”, I will save you the trouble. A “meta title” is the text you see when you hover over a web page tab in your browser.

Lucky for you, when you start a new Repl, you will not have to think about any of this. Easy! So where do I actually add the text that I want to display? All your text, images, titles, etc. will go between `<body>` and `</body>`.

![html tags](https://blog.repl.it/images/anyone-can-code/3.2.png)

Now let’s get started adding some text. As your Repl stands now, there’s nothing to display. Referencing my outline that I made at the start, I created my heading first. Remember, last week we discussed the tags you would use to alert the browser if the text is a heading, paragraph, etc.? I chose to use the `<h1>` tag as this is the largest heading style. Make sure you use `<h1>` for the beginning and `</h1>` at the end. I had to learn this the hard way...more to come in a minute. I hit the big green “run” button after every step to make sure that the code worked.

![header](https://blog.repl.it/images/anyone-can-code/3.3.png)

Next, I added my main text using the `<p>` paragraph tag and a smaller heading using `<h2>`. Once again I kept pressing “run” at each step. Just keep repeating these simple steps to add content to your website!

![paragraphs](https://blog.repl.it/images/anyone-can-code/3.4.png)

One cool feature I like is how Repl will predict the tag I am going to use which makes it so much easier and faster than always looking everything up. 

![autofill](https://blog.repl.it/images/anyone-can-code/3.5.png)

Ok. So now for what I thought was going to be the hardest part: adding an image. I wanted my image to appear after `<h1>` but before `<p>`. Thankfully, this wasn’t too hard. To add an image, start by typing `<img`. (Notice there’s NO ending `>` here! I got this wrong at first, but quickly figured it out.) Now type `src=` which refers to the source of your image. You can link to an image on another website or an image you uploaded to your Repl.

![img src](https://blog.repl.it/images/anyone-can-code/3.6.png)

I chose to upload my image to Repl from my computer. It’s easy, just click on “new file” (hint: it’s the icon on the left next to “Files”), and upload your image. 

![add file](https://blog.repl.it/images/anyone-can-code/3.7.png)

Pay attention to the name of your image! Now after `src=`, type the name of the image EXACTLY as it is saved, including the type of file it is (e.g. familypic*.jpg*). Next, type `alt=`. Have you ever noticed how when you hover over an image sometimes a description of the picture will show up? That’s the “alt text” in action. Lastly, you can set your image’s height and width restrictions. I ended up choosing 500 pixels for both. At first, the picture was huge!

![img tag](https://blog.repl.it/images/anyone-can-code/3.8.png)

I was so proud of myself for understanding and properly (or so I thought) inputting all this code. However, when I hit “run”, this is what I got! Do you see an image? Nope! Remember, how I said pay attention to the `<>`. I had typed `<img>` instead of `<img`. Just saved you 10 minutes of problem solving… you’re welcome. (Oh and remember to add the closing `>` after `src`, `alt`, etc.)

![bug](https://blog.repl.it/images/anyone-can-code/3.9.png)

So, drum roll please….here is my finished (for this week) product using HTML. I did it!!

![webpage](https://blog.repl.it/images/anyone-can-code/3.10.png)

Join me [next week](https://blog.repl.it/anyone-can-code-week4) as I add some holiday cheer to this e-card with CSS! Let’s be honest; right now it is a tad boring… And remember, [Repl.it](https://repl.it/~) is FREE and super easy to use. Keep sharing with friends and family who are just getting started with coding too. Thanks for following along!
