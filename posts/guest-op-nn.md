---
title: "Guest Blog Post: Neural Networks and Primes"
author: Ollie Parish
date: 2018-05-03T00:00:00.000Z
categories: eng
---

Ollie Parish, also known as [@op](https://repl.it/@op) on Repl.it, is an avid Repler and constantly pushes our systems to its limits (in the best way).  In this guest blog post, he describes his journey in using neural networks to generate large primes.  You can also check out the repl described in his research: [https://repl.it/@op/DNN-3-1](https://repl.it/@op/DNN-3-1)

## Using Neural Networks in the Search for Large Prime Numbers 

![visualization of the neural network](/public/images/blog/op-nn-visualization.png)

 As a self taught programmer of age 16, I knew from the start that taking on the complex topic of neural networks and then trying to combine it with the famously difficult field of prime numbers would be a challenge. To simplify the problem, I first split it into separate areas which I would tackle independently:

 - Researching neural networks and the number theory of prime numbers
 - Writing a basic neural network in python and optimising it as far as possible
 - Finding the most effective prime number checking algorithm for use in the final program
 - Implementing the prime number checking algorithm into the neural network architecture

### Research

 Inspired by the triumphs of the “AlphaGo” project by DeepMind, I focused my research into the extensions and optimisation techniques that are so common in neural network design. There are many useful packages in machine learning, such as tensor flow, which can generate complex neural networks which work well, very quickly, but for this project I really wanted to develop an understanding of the inner workings of modern neural networks. So I went through the arduous calculus myself giving a much less efficient but more rewarding program.

> The goal with this project was to utilise, as far as possible, the enthusiasm
> and research into neural networks and machine learning within academia,
> while allowing me to further explore the intriguing world of prime numbers.

 Researching into the myriad of prime number checking algorithms was more difficult; information about them online was confusing and contradictory. This is one area where repl.it was very helpful, being able to quickly make precise time and accuracy measurements for each of the common primality verification algorithms and then producing graphics and visuals to help wade through the dense data was both faultless and invaluable to this project. Beyond this, the ability to use the data manipulation capabilities of “numpy” coupled with the complete customisability of “matplotlib” in graphic generation, means that I've been able to expand my knowledge base in a remarkably practical direction, gaining the skills required to create much more interesting and fruitful plots than the visuals produced by Microsoft Excel or Google Sheets.
 
### Design

 The next task was to attempt to reproduce and develop the findings of my research and actually create the neural network. I began with the forward propagation process, effectively, the executing of the network to produce a result. Underpinning the whole concept of neural networks and a large field of machine learning is the seemingly forced idea of passing data through neurons, which are linear single-output functions acting on the input data. In forward propagation, the input data is fed through a larger network of neurons each altering the data slightly to produce a new result. The reason this is so powerful, is that it allows for optimisation; each of the neurons can simply be repeatedly tweaked to produce better and better outputs. This is the process of back propagation, using multivariable calculus and matrices to accurately and remarkably efficiently arrive at the optimal set of neurons to produce the most useful output for a given task. With these two pieces, my first basic neural network was born, ready to train with the search for prime numbers.


 On the prime number side, the key idea was, instead of searching for prime numbers directly, to search for prime number sequences, sequences of numbers with many prime numbers along them, the classic example being the Mersenne primes, of the form `2^n - 1`. It's important to note here that not every number is prime, just a large proportion. In this way, to find a large prime number, only the numbers in the sequence would be checked for primality, not every number of a given magnitude. The Mersenne approach is the conventional method, producing the largest 200 prime numbers found so far.

### Results

 The results I found are promising, providing a thought-provoking insight into how neural networks and machine learning can be used in the field of prime numbers. I designed the final program to produce a number of prime sequences and rate them based on how many of their early values were prime. The most commonly used sequence for finding large prime numbers is the Mersenne primes, producing the largest 10 prime numbers found, so I used this as a baseline in analysing my results.

![primality sequence comparison](/public/images/blog/op-nn-barchart.png)

 The goal in the end was to create, with the neural network, a sequence capable of finding very large prime numbers. I approached this in several different ways, the first was in the low numbers, a sequence was produced with non-integer coefficients with all of its first 20 values prime, but this had a very steep drop off in accuracy soon after. After a lot development, the neural network next produced some effective exponential sequences, with more of the desirable attributes in a prime number sequence, an exponential part, high continuing accuracy and simple integer coefficients, easy to lift and use elsewhere; two of these sequences are shown above. These fair well when compared to the Mersenne primes, however, to truly challenge the Mersenne primes a much bigger accuracy may is required. As a test of these sequences, some large prime numbers were produced, one, in under a second, of the length used in RSA encryption, and the largest locatable with the available resources, comprising of 4473 decimal digits. This is not very near to the largest prime numbers on record of over 23 million digits, but still an exciting prospect, and a stimulating excursion into the world of number theory and neural networks which I have enjoyed thouroughly and will not soon forget.

#### The Role of repl.it in this project

This service has been invaluable in this project, it provided a flexible platform, hosting all of my neural network python code. Using Python was easy and fast, this website provides the means, via Matplotlib and Numpy, to do complex data analysis and visualisation within 5 minutes online, far more powerful than Google Sheets or Microsoft Excel, without any downloads. However, the most exciting part is the potential in education, I've learnt so much about problem solving and programming thanks to this platform, and with the new student functionality, I think it could really transform the way young people learn to use code. By providing a much more accesible platform, I believe it could seriously boost the involvement and adoption of coding into everyone's lives.
