---
title: "7 Questions to Help You Prepare for a JavaScript Interview"
author: James Gallagher
date: 2020-08-14T07:00:00.000Z
categories: projects
---

Job interviews are stressful enough. Technical interviews take the process a step further. In a technical interview, knowing the answer to a question does not necessarily mean you’ll be able to answer it. You need to know how to articulate the complex technical topics that you’ve mastered.

The number of different questions you are asked in a [front-end developer](https://careerkarma.com/wiki/how-to-become-front-end-developer/) interview may feel intimidating. Do not let this set you back. With adequate preparation, you can [answer the questions an interviewer has prepared](https://careerkarma.com/blog/how-to-answer-technical-interview-questions/). Remember, interviewers do not want to trick you. They want to evaluate your knowledge of coding.

In this guide, we cover seven questions that will help you prepare for a [JavaScript technical interview](https://careerkarma.com/blog/what-is-javascript-used-for/). Without further ado, let’s dive into the questions.


## ‘Explain two methods for iterating over an object’

Objects are a crucial part of JavaScript. You do not get far without knowing how to iterate over one. To iterate over an object, you can use:

**Object.getOwnPropertyNames()**: This method returns all the properties associated with an object. Pair this method with a forEach loop to iterate over an object.

**Object.keys() and Object.values()**: [Object.keys()](https://careerkarma.com/blog/javascript-object-keys/) is a method that lists all of the _enumerable_ properties of an object. [Object.values()](https://careerkarma.com/blog/javascript-object-values/) lists all of the values in an object. You use these methods with a forEach loop to iterate over the keys in an object.

**For-in loops**: A [for in loop](https://careerkarma.com/blog/javascript-for-loop/) is a special type of loop that executes a number of times equal to the length of an object. Each value in a for in loop corresponds to a value in the object over which you are iterating.


## ‘What is the difference between var and const?’

Variables that use the “var” keyword are only accessible in the function in which they are declared, or in the global object if they are declared outside a function. “const” variables are only accessible in the block in which they are declared, like a function or an if-else statement.

“var” variables are referenced before they are declared, whereas “const” variables cannot be referenced without first being declared.


## ‘What is the spread operator? How can you use the spread operator to add an item to an array?’

The [spread operator](https://careerkarma.com/blog/javascript-spread-operator/) lets you expand an iterable object into the arguments of a function. It is commonly used to create copies of an array or to specify arguments in a function. The spread operator is represented as a set of ellipsis (...), or three dots.

To add an item to an array using the spread operator, you specify the spread operator as an argument inside a new array:

var cookies = [“Chocolate Chip”, “Chocolate Fudge”];

var new_cookies = [“Lemon Drizzle”, ...cookies];

The new_cookies array contains all the values from “cookies” as well as the additional value we specified in “new_cookies”.


## ‘Define the term higher-order function.’

A higher-order function is a function that accepts another function as an argument.

The most common higher-order functions are [map](https://careerkarma.com/blog/javascript-map/), [forEach](https://careerkarma.com/blog/javascript-foreach-loop/), filter, and reduce. For instance, the map() function is used to transform items in an array and return a new array. The terms under which an array is transformed is specified in a function in the map() function.


## ‘What is an arrow function? When might they be used?’

[Arrow functions](https://careerkarma.com/blog/javascript-arrow-function/) allow you to declare a function without using the “function” keyword. Arrow functions are syntactic sugar for the traditional method. Here’s an example of an arrow function:

show_day = () => { console.log(“It’s Monday!”); }

This code prints “It's Monday!” to the console. This code is more concise than a traditional function which would use the function() keyword.


## ‘What is the main purpose of an ES6 template literal? When might they be used?’

Template literals were introduced in ES6 as a new way to format strings. Template literals allow you to [interpolate a value](https://careerkarma.com/blog/javascript-string-interpolation/) directly into a string. You do not need to concatenate strings to format them if you use a template literal.

var name = “John”;

var day = “Monday”;

console.log(`Hello there, ${name}. It’s ${day}.`);

Template literals must be declared between backticks (``).


## What is the difference between == and ===?

The == operator compares whether two values are equal after converting those values to the appropriate type. This operator is called the abstract equality operator.

The === operator compares whether two values are equal and does not convert their values. This means the === operator says two items are false if they are equal but have different data types. This operator is called the strict equal operator because it considers the data type of two values when making a comparison.

For the most part, the === operator is preferred.


## Conclusion

It’s impossible to predict exactly what questions you are asked in an interview. However, this should not let you evade practice altogether: any question that you practice will help you improve your chances of success in a technical interview. Remember to practice and apply these concepts as you’re building out your [JavaScript Projects](https://careerkarma.com/blog/javascript-projects/). 

With the questions we’ve covered above, you can revise your knowledge of a range of JavaScript concepts that could come up in an interview. Hopefully, once you get the job offer don’t forget to check our [JavaScript developer salary guide](https://careerkarma.com/blog/entry-level-full-stack-developer-salary/).


**_About the author_**

<img src="https://careerkarma.com/blog/wp-content/uploads/2020/01/james-gallagher-300x300.jpg" alt="James Gallagher" style="height:150px; width:150px; display:inline-block; horizontal-align:left;">

_James Gallagher is a writer at [Career Karma](https://careerkarma.com/) where he focuses on coding tutorials and technical articles. ([twitter](https://twitter.com/jamesg_oca))_