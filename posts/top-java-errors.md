---
title: Top 8 Common Java Errors for Beginners - and How to Solve Them
author: Matthew Wallace
date: 2021-06-08
cover: https://blog.replit.com/images/books.jpg
categories: projects
---

Did you know that in Java's standard library, there are a total of more than 500 different exceptions! There lots of ways for programmers to make mistakes - each of them unique and complex. Luckily we've taken the time to unwrap the meaning behind many of these errors, so you can spend less time debugging and more time coding. To begin with, let's have a look at the syntax errors!

## Syntax Errors

If you just started programming in Java, then syntax errors are the first problems you’ll meet! You can think of syntax as grammer in English. No joke, syntax errors might look minimal or simple to bust, but you need a lot of practice and consistency to learn to write error-free code. It doesn’t require a lot of math to fix these, syntax just defines the language rules. For further pertinent information, you may refer to [java syntax](https://codegym.cc/groups/posts/java-syntax) articles.

### Working with semicolons (;)

Think of semi-colons (;) in Java as you think of a full-stop (.) in English. A full stop tells readers the message a sentence is trying to convey is over. A semi-colon in code indicates the instruction for that line is over. Forgetting to add semi-colons (;) at the end of code is a common mistake beginners make. Let’s look at a basic example.

<iframe frameborder="0" width="100%" height="500px" src="https://replit.com/@LubainaKhan/SyntaxErrorMissingSemiColon?lite=true"></iframe>

This snippet will produce the following error:

```java
Exception in thread "main" java.lang.Error: Unresolved compilation problem:  
Syntax error, insert ";" to complete BlockStatements  
  
at topJavaErrors.JavaErrors.main(JavaErrors.java:3)
```
  

You can resolve this error by adding a ; at the end of line 3.

```java
String x = "A";
```

### Braces or parentheses [(), {}]
  

Initially, it can be hard keeping a track of the starting / closing parenthesis or braces. Luckily IDEs are here to help. IDE stands for integrated development environment, and it's a place you can write and run code. Replit for example, is an IDE. Most IDEs have IntelliSense, which is auto-complete for programmers, and will add closing brackets and parentheses for you. Despite the assistance, mistakes happen. Here’s a quick example of how you can put an extra closing bracket or miss the ending brace to mess up your code.

<iframe frameborder="0" width="100%" height="500px" src="https://replit.com/@LubainaKhan/SyntaxErrorMissingBrace?lite=true"></iframe>
  

If you try to execute this, you’ll get the following error.

  
```java
Exception in thread "main" java.lang.Error: Unresolved compilation problem:  
Syntax error on token ")", delete this token  
at topJavaErrors.SyntaxErrors.main(SyntaxErrors.java:11)
```
  

You can resolve this exception by removing the extra `)` on line 9.

<iframe frameborder="0" width="100%" height="500px" src="https://replit.com/@LubainaKhan/SyntaxFixMissingBrace?lite=true"></iframe>
  

Output

  
```
My full name is: Justin Delaware

```
  
  

### Double Quotes or Quotation Marks (“ ”)

  

Another pit fall is forgetting quotation marks not escaping them propperly. The IntelliSense can rescue you if you forget the remaining double quotes. If you try including quotation marks inside strings, Java will get confused. Strings are indicated using quotation marks, so having quotation marks in a string will make Java think the string ended early. To fix this, add a backslash (\\) before quotation marks in strings. The backslash tells Java that this string should not be included in the syntax.

<iframe frameborder="0" width="100%" height="500px" src="https://replit.com/@LubainaKhan/ErrorDoubleQuotes?lite=true"></iframe>

  

Output
  
```java
Exception in thread "main" java.lang.Error: Unresolved compilation problems:  
Syntax error on token "Java", instanceof expected  
The preview feature Instanceof Pattern is only available with source level 13 and above  
is cannot be resolved to a type  
Syntax error, insert ")" to complete MethodInvocation  
Syntax error, insert ";" to complete Statement  
The method favourtie(String) is undefined for the type SyntaxErrors  
Syntax error on token "language", ( expected  
  
at topJavaErrors.SyntaxErrors.main(SyntaxErrors.java:5)
```
  
  

In order for you avoid such exceptions, you can add backslahes to the quotes in the string on line 4.

<iframe frameborder="0" width="100%" height="500px" src="https://replit.com/@LubainaKhan/ErrorFixDoubleQuotes?lite=true"></iframe>

  

Output

  
```
What did Justin say?  
Justin said, "Java is my favourite language"
```
  
  

Here’s your required output, nicely put with double quotes! :)

  

## Other Miscellaneous Errors

  

### Accessing the “Un-Initialized” Variables

  

If you're learning Java and have experience with other programming languages (like C++) then you might have a habit of using un-initialized variables (esp integers). Un-initialized variables are declared variables without a value. Java regulates this and doesn’t allow using a variable that has not been initialized yet.

  
<iframe frameborder="0" width="100%" height="500px" src="https://replit.com/@LubainaKhan/ErrorUnInitializedVariables?lite=true"></iframe>



If you attempt to access an uninitialized variable then you’ll get the following exception.

  
```java
Exception in thread "main" java.lang.Error: Unresolved compilation problem:  
The local variable contactNumber may not have been initialized  
at topJavaErrors.UninitialziedVars.main(UninitialziedVars.java:5)
```
  

You can initialize the variable “contactNumber” to resolve this exception.

  
```java
int contactNumber = 9935856;
```
  
  

### Accessing the “Out of Scope” Variables

  

If you define a variable in a certain method you’re only allowed to access that in the defined scope of it. Like each state has their legitimate currency, and that cannot be used in another state. You cannot use GBP in place of USD in America. Similarly, a variable defined in one method has restricted scope to it. You cannot access a local variable defined in some function in the main method. For further detailed illustration let’s look at an example.
  
<iframe frameborder="0" width="100%" height="500px" src="https://replit.com/@LubainaKhan/ErrorOutOfScope?lite=true"></iframe>
  

Output

  

As soon as you run this snippet, you’ll get the exception

  
```
Exception in thread "main" java.lang.Error: Unresolved compilation problem:  
country cannot be resolved to a variable  
  
at topJavaErrors.OutOfScopeVars.main(OutOfScopeVars.java:9)
```
  

You can not access the variable “country” outside the method getPersonalDetails since its scope is local.

### Modifying the “CONSTANT” Values

  

Java and other programming languages don't allow you to update or modify constant variables. You can use the keyword “final” before a variable to make it constant in Java. Apart from that, it’s a convention to write a constant in ALL CAPS for distinction purposes, As a constant resource is often used cross methods across a program.

<iframe frameborder="0" width="100%" height="500px" src="https://replit.com/@LubainaKhan/ErrorModifyingConstant?lite=true"></iframe>


  

Output
```java
Exception in thread "main" java.lang.Error: Unresolved compilation problem:  
The final field ConstVals.SSN cannot be assigned  
at topJavaErrors.ConstVals.main(ConstVals.java:5)
```
  
Remove line 4 for the perfectly functional code.

### Misinterpretted Use of Operators ( == vs .equals())

  

A lot of beginners start working with integers while learning the basics of a programming language. So it can be a challenge to remember that for string comparisons we use the “.equals()” method provided by Java and not == operator like in integers.

  
<iframe frameborder="0" width="100%" height="500px" src="https://replit.com/@LubainaKhan/ErrorUseOfOperators?lite=true"></iframe>

  

Output

  
```
It's not a Wednesday!  
It's a Wednesday!
```

  
The output is contradictory because “today” and “thirdWeekDay” are referred to 2 different objects in the memory. However, the method “.equals()” compares the content stored in both arrays and returns true if it’s equal, false otherwise.

### Accessing a non-static resource from a static method

  

If you want to access a non-static variable from a static method \[let’s say the main method] then you need to create an instance of that object first. But if you fail to do that, java will get angry.

<iframe frameborder="0" width="100%" height="500px" src="https://replit.com/@LubainaKhan/ErrorAccessingNonStaticResource?lite=true"></iframe>

  

Output

  
```
Exception in thread "main" java.lang.Error: Unresolved compilation problem:  
Cannot make a static reference to the non-static field postalCode  
  
at topJavaErrors.NonStaticAccess.main(NonStaticAccess.java:17)
```
  

You can fix it, just by replacing line 9.

  
```
// Accessing the non-static member variable

// by creating an instance of the object  
System.out.println("What's the postal code of your area? " + address.postalCode);
```

### Conclusion

  

Programming errors are a part of the learning curve. Frequent errors might slow you down. But as a new programmer, it’s okay to learn things slowly. Now you’re familiar with some of the most common issues. Make sure you practise enough to get ahead of them. Happy coding and keep practising! :)
