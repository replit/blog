---
title: "A Beginner's Guide to SQL"
author: James Gallagher
date: 2020-07-28T07:00:00.000Z
categories: projects
---

Data is absolutely everywhere. When you visited this web page, you generated data. When you took a note of your to-dos for the day in your reminders, you generated data.

All of this data needs to go somewhere! That’s where databases come in. Databases store information in a structured way so that it is accessible by [computer programs](https://computersciencehero.com/). Programmers use a tool called Structured Query Language (SQL) to access and manipulate databases.

In this guide, we’re going to provide a brief overview of SQL to help you level up your skills! Without further ado, let’s get started!


## What is SQL?

SQL was invented in the early 1970s by the IBM researchers Donald Chamberlin and Raymond Boyce. The technology may be old but it's still a crucial part of interacting with databases.

SQL is used to retrieve data from databases, insert records into a database, update a database, and to control the permissions in a database.

SQL is used with Relational Database Management Systems, or RDBMS. These are databases which are broken up into tables. Each table consists of a list of columns and rows. Tables can be linked together by creating primary and foreign keys between the tables.

[Data scientists](https://careerkarma.com/careers/data-science/), [database administrators](https://careerkarma.com/careers/database-administration/), [data analysts](https://studydatascience.org/how-to-become-data-analyst/), [business analysts](https://studydatascience.org/how-to-become-business-analyst/) and [back-end web developers](https://careerkarma.com/careers/web-development/) are several of the many types of technologists who use databases in their work.


## Inserting Data into a Database


### Create a Table

The [CREATE TABLE](https://www.google.com/url?sa=t&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwijn6yqgePqAhV0oVwKHZnUD60QFjAAegQIBBAB&url=https%3A%2F%2Fcareerkarma.com%2Fblog%2Fsql-create-table%2F&usg=AOvVaw1vlxV4UV8ve5miYhGsDVaB) statement creates a new table in a database. You can use this command to specify what columns should appear in a database and the types of those columns.


### Insert a Record

The [INSERT INTO](https://careerkarma.com/blog/sql-insert/) statement inserts a new row into a database. Depending on the structure of a table, this statement can be used to insert some or all the values into a record.


## Selecting Data from a Database


### Selecting Data

The [SELECT statement](https://careerkarma.com/blog/sql-select/) selects data from one or more tables. It can be used to retrieve all the rows in a table or only rows that meet a set of conditions. You can filter out what columns will be returned by the SELECT statement.


### Where Statement

The [WHERE](https://careerkarma.com/blog/sql-where/) statement allows you to select a record based on a condition.

For instance, you could select all of the names in an Employees table that start with the letter “B”. You could select all the people in an Employees table who have worked for a business for at least four years.


### Ordering Data

The [ORDER BY](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwi-54GUguPqAhXTT8AKHbnqC6EQFjAAegQIBBAB&url=https%3A%2F%2Fcareerkarma.com%2Fblog%2Fsql-order-by%2F&usg=AOvVaw0jds79ITS9idNt8V0HyXDz) clause sorts data by a particular column name. It can be used to sort data in either ascending or descending order.

You could sort a list of employees in ascending order based on the day they were hired. You could sort a list of coffee products by their prices in descending order.


### Limiting Data

SQL databases can contain a lot of records. The [LIMIT clause](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjorsD7gePqAhXLiFwKHUj5DakQFjAAegQIBBAB&url=https%3A%2F%2Fcareerkarma.com%2Fblog%2Fsql-limit%2F&usg=AOvVaw2_D44T151S6h475cDfrhmu) allows you to limit how many rows are returned by a query. For instance, you could return only the first five responses from a particular query.


### Query Values Using Between

The [BETWEEN](https://careerkarma.com/blog/sql-between/) operator allows you to select records where a column value is within a particular range. For instance, you could use BETWEEN to retrieve a list of employees who work at a business and who earn between $20,000 and $30,000. You could use BETWEEN to retrieve a list of all the coffees at a cafe which cost between $2.00 and $2.50.


## Updating a Database

Updating a database allows you to modify the information you have already stored, and you can do so by doing the following:


### Updating Records

The [UPDATE](https://careerkarma.com/blog/sql-update/) statement amends the contents of a table. This statement will change all the values in a database that meet a particular condition or set of conditions. You can use a WHERE statement to select which values should be updated.


### Deleting Records

The [DELETE](https://careerkarma.com/blog/sql-delete-row/) statement removes one or more rows from a table. By default, this command deletes all the records in a table. The DELETE statement is usually used with a WHERE statement so that only particular records are deleted.


## Conclusion

We’ve only just begun talking about what features SQL has to offer. Given how widely used the technology is, it should not surprise you that there is more to learn. If you have already mastered the topics we’ve covered, here are a few more topics to research:



*   [Alter the structure of a table](https://careerkarma.com/blog/sql-alter-table/)
*   [Add a column to a table](https://careerkarma.com/blog/sql-add-column/)
*   [How to use unions](https://careerkarma.com/blog/sql-union/)
*   [How to use aggregate functions](https://careerkarma.com/blog/sql-aggregate-functions/)
*   [How to write subqueries](https://careerkarma.com/blog/sql-subquery/)

You’re already on your way to becoming a master of SQL. The more time you invest in practicing SQL, the better you’ll get at working with databases!

**_About the author_**

<img src="https://careerkarma.com/blog/wp-content/uploads/2020/01/james-gallagher-300x300.jpg" alt="James Gallagher" style="height:150px; width:150px; display:inline-block; horizontal-align:left;">

_James Gallagher is a writer at [Career Karma](https://careerkarma.com/) where he focuses on coding tutorials and technical articles. ([twitter](https://twitter.com/jamesg_oca))_
