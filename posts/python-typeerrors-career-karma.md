---
title: "Top 8 Python TypeErrors (and How to Solve Them)"
author: James Gallagher
date: 2020-09-02T07:00:00.000Z
categories: projects
---

Encountering errors is a natural part of working in [computer science](https://computersciencehero.com/). Whether you are a seasoned coding expert or a newbie, seeing some red text in a console accompanied by an error message is an experience that you will have often.

Python errors appear in red but that doesn’t mean you should be intimidated. Often, the solution to a problem is easy to find, you just need to know how to respond to the different types of errors that you may encounter.

In this guide, we break down the top eight Python TypeErrors and discuss how to solve them. By the end of reading this article, you’ll be equipped to handle a range of different errors you may encounter.

## What is a TypeError?

A TypeError is raised when you try to perform an action on a value or a function whose data type does not support the action. 

For instance, if you try to call a string object as if it were a function, you’ll receive an error; if you try to iterate over a None value, Python will raise an error. TypeErrors are one of the most common types of errors in [Python](https://careerkarma.com/blog/what-python-is-used-for/).

## ‘module’ object is not callable

This error is raised when you [try to call a module object in your code](https://careerkarma.com/blog/python-typeerror-module-object-is-not-callable/). To solve this error, reference the specific functions and variables you want to access from a module instead of calling an entire module.

## a bytes-like object is required, not ‘str’

This error occurs if you [treat a string as a bytes object](https://careerkarma.com/blog/python-typeerror-a-bytes-like-object-is-required/). This error is raised if you open a file as a binary instead of a text file. Fix this error by opening all text files in a program in text mode (without a “b” in the open() statement).

## string indices must be integers

Strings are indexed from zero. Every subsequent character in a string has an index value one greater than the last. This error occurs when you [specify a string value as an index number instead of a valid integer](https://careerkarma.com/blog/python-typeerror-string-indices-must-be-integers/).

To solve this error, only use integers to access items from an indexed object like a string or a list.

## list indices must be integers or slices, not str

Like strings, lists are indexed from zero. You can only retrieve a value from a list by specifying an integer index value or a range of values using slicing notation.

To fix this error, [use numbers to access items from a list](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwiSkbPC8LrrAhVfThUIHZCfCj8QFjAAegQIAxAB&url=https%3A%2F%2Fcareerkarma.com%2Fblog%2Fpython-typeerror-list-indices-must-be-integers-or-slices-not-str%2F&usg=AOvVaw28R-lo_t7iSINh1evxGrTH). If you are trying to access items from a list of dictionaries, make sure you first access a dictionary before trying to access an item from the dictionary.

## ‘list’ object is not callable

To access items in a list, you should use index notation:

    languages = [“Python”, “JavaScript”, “Java”]

    print(languages[0])

Index notation is where you enclose an index value in square brackets at the end of a value. The above code returns the first item in the “languages” list. This value is “Python”.

If you try to access a list using curly brackets instead of square brackets, you’ll see the “‘list’ object is not callable” error.

## ‘str’ object is not callable

The cause of this error is the same as the last error. You can only access items in a string [using indexing notation](https://careerkarma.com/blog/python-typeerror-str-object-is-not-callable/). This means you need to use square brackets and specify the value in the string you want to retrieve. Using curly brackets returns an error.

## ‘nonetype’ object is not iterable

You can only use a “for” loop on an iterable object. This is because for loops can only iterate over a sequence of values. To solve this error, make sure the objects you are trying to iterate over [are not equal to None before you iterate over them](https://careerkarma.com/blog/python-typeerror-nonetype-object-is-not-iterable/).

## ‘builtin_function_or_method’ object is not subscriptable

To call a built-in function or method, you must specify the name of that method, followed by a set of curly brackets. The curly brackets denote a function call.

This error is caused by using square brackets to call a function. To fix this error, [use curly brackets to call a function](https://careerkarma.com/blog/python-builtin-function-or-method-is-not-subscriptable/).

## Conclusion

There are only a finite number of TypeErrors that you can encounter. As you start to encounter more of these errors, you’ll figure out how they work and how you can solve them. Like anything in programming, the more practice you get, the more you will improve.

If you’re looking to level-up your knowledge of errors even further, check out a few of our more advanced tutorials on Python TypeErrors:

*   [object of type ‘NoneType’ has no len()](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwi30dGf8brrAhWCZxUIHSG8CPIQFjAAegQIAhAB&url=https%3A%2F%2Fcareerkarma.com%2Fblog%2Fpython-typeerror-object-of-type-nonetype-has-no-len%2F&usg=AOvVaw0wslvpV3ZSdUqIpOt3LL_1)
*   [can only concatenate list (not “int”) to list](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwiH2OGj8brrAhX1WxUIHXHJBlkQFjAAegQIBBAB&url=https%3A%2F%2Fcareerkarma.com%2Fblog%2Fpython-typeerror-can-only-concatenate-list-not-int-to-list%2F&usg=AOvVaw176iRbYP7Q6QtsIhNkuXRI)
*   [‘float’ object is not subscriptable](https://careerkarma.com/blog/python-typeerror-float-object-is-not-subscriptable/)
*   [can’t multiply sequence by non-int of type ‘str’](https://careerkarma.com/blog/typeerror-cant-multiply-sequence-by-non-int-of-type-str/)
*   [‘function’ object is not subscriptable](https://careerkarma.com/blog/python-typeerror-function-object-is-not-subscriptable/)

When you encounter an error, the best thing you can do is read the message in detail. Most error messages tell you everything you need to know to fix an error once you understand how they work and what they mean.

**_About the author_**

<img src="https://careerkarma.com/blog/wp-content/uploads/2020/01/james-gallagher-300x300.jpg" alt="James Gallagher" style="height:150px; width:150px; display:inline-block; horizontal-align:left;">

_James Gallagher is a writer at [Career Karma](https://careerkarma.com/) where he focuses on coding tutorials and technical articles. ([twitter](https://twitter.com/jamesg_oca))_