---
title: Top 7 CSS Interview Questions
author: Christina Kopecky 
date: 2020-10-09
categories: projects
---
In web developer job interviews, you may come across some Cascading Style Sheets (CSS) questions when a hiring team assesses your knowledge of the differences between the main languages used in [web development](https://careerkarma.com/blog/best-web-developer-bootcamps/). The cool thing is CSS and HTML are used by all web developers ranging from [Wordpress developers](careerkarma.com/careers/wordpress-developer/) to [Python developers](https://careerkarma.com/blog/how-to-learn-python/).

Here are seven of the most asked interview questions about standard CSS:

## 1. Why was CSS created and how does it work? 

**Answer:** Prior to the creation of CSS, styling was created inline as an attribute to the element. As websites grew and became more complex, so did the Hypertext Markup Language (HTML), its elements, and those element’s inline style attributes. [Cascading Style Sheets](https://careerkarma.com/blog/what-is-css/) was created to abstract all the styling away so it left the HTML to be cleaner, DRY, and more readable. 

CSS works by using selectors – and those selectors can be tags, class names, or id names	– to create style rules for that particular element. If a selector points to the same element twice in a stylesheet, specificity or the cascading nature of CSS wins the race. 

**Good to hear**: W3 Consortium creates the specifications used for CSS, breakpoints to create responsiveness.

## 2. Tell me three ways you can use CSS in an HTML document

**Answer:**

1. Inline Styling
2. Internal Stylesheet
3. External Stylesheet

**Good to hear:** Mention where the internal and external stylesheet is inserted. 

## 3. What are media queries used for? 

**Answer:** Media Queries are used to modify styles at different parameters. This can aid in the responsive design process by creating style rules for different breakpoints. 

**Good to hear:** Different general device types and examples of parameters that can be used to create a media query.

## 4. Why would you use class over id and vice versa?

**Answer:** A classroom analogy would be great to use here. A “class” room has multiple students who are grouped together by a similar trait (they are all in the same grade or subject). One student has their own “id” with their own schedule that is unique to them.

Use an id only once in an HTML Document. Use a class to group similar elements together that have the same style rules. [This article](https://careerkarma.com/blog/css-class-vs-id-2) can help you differentiate between the two.

**Good to hear:** Ids can also be used to jump to different parts of a webpage by using them as `“#id-goes-here”` as your href and then `id=“id-goes-here”` as the attribute where you want the link to go.

## 5. Differences between Flexbox Model and Grid

**Answer:** Flexbox is an extension of the Box Model and uses all the same margins, padding, content, and border properties that Box Model does.  It allows for better flow of our content in our responsive layouts by using flex properties such as justify-content and align-items. CSS Grid, in contrast, allows for more control by using properties that control the layout in a 2-D space of rows and columns.

**Good to hear:** CSS Grid allows for precision in placement with less focus on flow and Flexbox allows for a focus on responsive flow and less precision on placement. 

Take a look at this in-depth article to dive into [CSS Grid vs Flexbox]( https://careerkarma.com/blog/css-grid-vs-flexbox).

## 6. Tell me what you know about Specificity

**Answer:** At a high level, specificity refers to how important a selector is in CSS. Based on how a selector is written, it’s assigned a number. The higher the number, the more specific it is. When a style block is more specific than another style block that points to the same element, the more specific style block’s styling rules win. 

**Good to hear:** Mention the important keyword and the different values associated with the different symbols, tags, classes and ids. 

## 7. What is the difference between em, rem, px, pt, and %? 

**Answer:** There are two different main types of CSS [fonts-sizes](https://careerkarma.com/blog/css-font-size/). **Pixel- and points-size font are fixed width fonts that are often used in publishing. These stay the same size no matter the device or settings you are using.**

Em, Rem, and % are all relative size fonts that depend on how they are used. In most browsers, the default font-size is 16px. To adjust the default setting, use px to adjust the size in the root element. This will be equal to 1rem. Ems and % are very similar, but instead of being in relation to the root element, it’s in relation to the child’s parent’s font-size. 

**Good to hear:** Why it’s important to use ems, rems or % as much as possible (to keep your web design responsive). 

## Conclusion
These are just some of the CSS interview questions that you can come across in a developer interview. For more practice, check out [these questions](https://careerkarma.com/blog/css-interview-questions) compiled by Career Karma, a top resource to find [online coding bootcamps](https://careerkarma.com/blog/best-online-coding-bootcamps/)! Good luck in your job search!

About the author

<a href="https://careerkarma.com/blog/author/christina-kopecky/"><img alt="Christina Kopecky" src="https://careerkarma.com/blog/wp-content/uploads/2020/06/image-3-300x300.png"></a>

Christina Kopecky is a writer at Career Karma where she focuses on coding tutorials and technical articles. ([LinkedIn](https://www.linkedin.com/in/cmvnk/))
