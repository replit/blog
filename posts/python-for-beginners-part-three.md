---
title: "Python for Beginners: Interpreting My Amazon Spending with a Repl, Part Two"
author: Brittany Pirkle
date: 2021-12-13
cover: https://blog.repl.it/images/Python_For_Beginners/python_cover_photo.jpg
categories: edu
---

‘Tis the season to...calculate my spending? Amazon has become an easy way to have something delivered almost instantly (thank you overnight shipping), but it is almost *too easy* to spend money that I need a way to keep track of my spending (and maybe delete the app off my phone!). A Python repl is the perfect solution! In my [last post,](https://blog.replit.com/python-for-beginners) I discussed the perks of using Python for this project and the importance of the right [package manager.](https://docs.replit.com/programming-ide/installing-packages)

[Importing assets](https://docs.replit.com/getting-started/creating-files#uploading-files-and-assets) is the next step. Assets are any type of file, image, video, or even GIF that can be added to a repl. Replit makes it easy to add any of these file types by going to the file tree and adding a new file. Additionally, as data changes, it is easy to update assets as well.

![main.py file in repl](images/Python_For_Beginners/pythonforbeginners_2.png)

Now that the package manager, [pandas](https://pandas.pydata.org/pandas-docs/stable/getting_started/overview.html), and assets are imported, I create the DataFrame (df). A [DataFrame](https://databricks.com/glossary/what-are-dataframes) allows pandas to store data in a table format, similar to a spreadsheet. In this case, the DataFrame is the Amazon csv file. Now I can write the first three lines of code:

![lines of python code](images/Python_For_Beginners/pythonforbeginners_2.1.png)

To tell Python I want to define a DataFrame, I write 'df.' Adding ‘pd’ tells Python to use pandas to complete this operation (which can be done because pandas was already imported as the package manager). Next, ‘.read_csv’ tells Python for a csv file to be read and stored as the DataFrame. Then, I write ‘amazon_orders.csv’ as this is the file name for pandas to read. Make sure the file name in the file tree is synonymous with the file name in the code (details matter!). Using Replit makes this part easy because code and assets are stored in the same place! The ‘head’ function is a panda function that shows a preview of the first five lines of the table and confirms if changes processed. Finally, every time I want Python to show results, I include ‘print(df)’ for computations to appear. I learned the hard way that ‘read(df)' without ‘print(df)’ gives no results. You can find a forked version of my repl [here.](https://replit.com/@BrittanyatReplit/AmazonAddictionSample-1#main.py)

With just three lines of code, I can import and preview data. However, as with almost any data set, there is some clean up that needs to be done before calculations can begin. I need to replace the ‘NaN’ in the table. Since ‘NaN’ stands for the absence of data, I use the panda function ‘df.fillna()’ to automatically fill 'NaN' with something else; in this case, 0. Again, I include ‘print(df)’ to ensure this change emerges.

![lines of python code](images/Python_For_Beginners/pythonforbeginners_2.2.png)

The last piece of data clean up is related to the ‘Item Total’ column in the DataFrame. The first problem is the data in this csv file is stored as strings. [Strings](https://vsc.instructure.com/courses/6476/pages/the-integer-floating-point-and-string-data-types) are any text-formatted data, such as “7 dogs” or “aaa.” Since Python needs all the data to be numeric-based in order to perform computations, I use the function ‘.astype(float)’ to change the string data to a numeric data type, floats. The second issue is ‘$’ because it is not a number (the $ is prohibiting the data from being a floats data type). I draft ‘.str.replace('$',' ')’ to replace the dollar sign with nothing. I also found it helpful to use the same function to replace any comma with nothing as well. There was some trial and error involved in deciphering the column heading name ("Item Total") in the original csv file matched the heading listed in the DataFrame. Without an exact match, Python did not know where to apply these changes. Just as before, I want to ‘print’ to ensure my changes occur.

![lines of python code](images/Python_For_Beginners/pythonforbeginners_2.3.png)

Finally, the fun part (or, perhaps, scary part when I see my results): deciphering how much money I spent on Amazon this year. If everything thus far is correct, the next few lines of code are fairly easy to write. Using ‘df[‘Item Total’].sum(),' the sum of money spent appears in the markdown pane. Additionally, I can replace ‘.sum()’ with ‘mean,’ ‘median,’ ‘max,’ or ‘min’ to find these data points as well.

![lines of python code](images/Python_For_Beginners/pythonforbeginners_2.4.png)

Next up is tracking spending over time. Fingers crossed, I will learn how to depict a few graphs as well. 


