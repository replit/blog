---
title: "Prepare for a Python Interview with These 7 Questions"
author: James Gallagher
date: 2020-08-25T07:00:00.000Z
categories: projects
---

How you respond to questions in a technical interview has a massive impact on whether you’re offered a job with an organization. If you can answer technical questions well and explain your reasoning, your chances of being offered a job is greatly improved.

The best way to prepare for a technical interview is to practice questions. While it’s not possible to know exactly what you might be asked, any preparation you do will help you build up your confidence explaining complex technical topics.

To help you on your journey, we’ve prepared a list of seven questions about Python that you can use to practice for your next [full stack developer](https://careerkarma.com/blog/full-stack-developer/) technical interview.


## How would you retrieve the last two items from a list?

To retrieve the last items in a list, you can use list indexing. 

The most efficient way to do this is to use [negative index numbers](https://careerkarma.com/blog/python-array/). This is because negative index numbers work backward from a list. Here is a code snippet that retrieves the last two items from a list:

    cakes = [“Chocolate”, “Carrot”, “Lemon”]

    print(cakes[-2:])

# [‘Carrot’, ‘Lemon’]


## How would you remove duplicate items from a list?

There are many ways you can [remove duplicate items from a list](https://careerkarma.com/blog/python-remove-duplicates-from-list/). The most Pythonic way to do this is to convert a list to a set and then convert the set back to a list.

Sets can only store unique values. When you convert a list to a set, all duplicate values are removed:

    cakes = [“Chocolate”, “Carrot”, “Lemon”, “Chocolate”]

    cakes_set = set(cakes)

    cakes = list(cakes_set)

    print(cakes)

# [‘Carrot’, ‘Chocolate’, ‘Lemon’]

It’s worth noting that sets do not maintain their order. This means the positions at which elements exist in a list may change if you use the set approach.


## Write a list comprehension that prints even numbers between 1 and 50.

[List comprehensions](https://careerkarma.com/blog/python-list-comprehension/) are an essential concept in Python. List comprehensions let you define a list based on the contents of an existing list. Here is a list comprehension that prints the numbers between 1 and 50:

    one_to_fifty = [x for x in range(50)]

    print(one_to_fifty)

# [1, 2, 3, 4…]

We use conditionals inside a list comprehension to change the values in a list based on a particular condition. Add an “if” statement to our list comprehension that checks if an item is even. If an item is even, it should be added to our list:

    one_to_fifty = [x for x in range(50) if x % 2 == 0]

    print(one_to_fifty)

# [0, 2, 4, 6, 8…]

The modulo operator lets us check for a remainder when we divide a number by two. If no remainder exists, it means a number is even.


## What is the difference between a list and a tuple?

Both lists and [tuples](https://careerkarma.com/blog/python-tuples/) are collection data types. This means they can store multiple items.

Lists are mutable whereas tuples are immutable. This means you can modify the items in a list but you cannot modify the items in a tuple.

In addition, lists are ordered whereas tuples are unordered. When you add an item to a list, it is added to the end. The same cannot be said for tuples. Items are added to a random position in a tuple because tuples have no order.


## What are *args and **kwargs? How do these methods differ?

The [*args and **kwargs keywords](https://careerkarma.com/blog/python-args-kwargs/) let you accept a variable number of arguments in a function. They are useful if you do not know how many keywords a function may need to accept in advance.

The *args keyword is a list of non-keyword arguments. *args stores all of the arguments that are passed to a function as a list. The **args keyword is a list of keyword arguments. These are arguments that have a key (a name) and a value. These keyword arguments are stored in a dictionary.


## When should you and shouldn't you use a list comprehension?

List comprehensions are a concise way of creating lists based on the values in another list. You create a comprehension based on any iterable, such as a string or a dictionary.

You should use a list comprehension if you want to perform a simple transformation on a list. For instance, if you want to increase numbers in a list by 10%, a list comprehension would be apt.

For more advanced functions, a list comprehension is not useful. This is because list comprehensions are designed to make code shorter. If a comprehension uses multiple “if” and “else” statements, it may be best represented using another approach.

In addition, list comprehensions should not be used if you do not want a list. They’re useful if you want to transform a list into a new list; if you just want to change a list, you may want to use a standard “for” loop.


## Explain how you would format a string using the % operator and the format() syntax?

Both the % operator and format() method let you add values inside a [Python string](https://careerkarma.com/blog/python-string-methods/).

The [% operator](https://careerkarma.com/blog/python-what-does-s-mean/) is available in both Python 2.x and 3.x. This operator uses %s to state where a string value should appear in a string. A string using the % operator should be followed by a percentage sign and a list of values that you want to add into a list:

    print(“Hello, %s. It's %s.” % (“Alex”, “Monday”))

# Hello, Alex. It’s Monday.

The format() method uses curly braces to state where values should be added to a list. The format() method, like the % operator, is added after a string. The format() method should contain a list of values that you want to format into a string:

    print(“Hello, {}. It’s {}.”.format(“Alex”, “Monday”))

# Hello, Alex. It’s Monday.


## Conclusion

[Technical interviews](https://careerkarma.com/blog/technical-interviews/) can feel overwhelming, especially if you have not done one before. You should not let your nerves discourage you from practicing. The more practice you get before your interview, the more likely it is that a question you’ve practiced comes up in your interview.

Think about how good it would be if your interview included some of the questions that we’ve covered in this article. You would be in a great position to answer those questions. Like writing resumes, technical interviews are a skill. You’ll only get better with practice.


**_About the author_**

<img src="https://careerkarma.com/blog/wp-content/uploads/2020/01/james-gallagher-300x300.jpg" alt="James Gallagher" style="height:150px; width:150px; display:inline-block; horizontal-align:left;">

_James Gallagher is a writer at [Career Karma](https://careerkarma.com/) where he focuses on coding tutorials and technical articles. ([twitter](https://twitter.com/jamesg_oca))_