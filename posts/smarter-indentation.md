---
title: "Tabs and Spaces - Smarter Indentation"
author: Brian Pool
date:
cover: https://blog.replit.com/images/smarter-indentation/cover.jpg
categories: eng
profiles: brianpool
---

![](/images/smarter-indentation/cover.jpg)

Code indentation isn't something you should really need to think about very often when programming, as IDEs nowadays should be smart enough to handle most of the details for you. Unfortunately, Replit's handling of indentation wasn't good enough. To remedy this, we're releasing new indentation and whitespace related features for our code editing experience, so that you don't have to think about what happens when you press tab.

## Automatic indentation detection
Replit will now (optionally) automatically detect the indentation of files that you open. That means if a file was indented with two spaces, you'll automatically get two spaces when you press tab regardless of what your normal settings are.

Also, adding indentation detection required that we unrestrict what indentation sizes you're allowed to use. Now, you can use any size between 1 and 16. That means if you use an uncommon indentation unit like 3 spaces, you're covered now!

## The indentation Swiss Army knife
There is now an element in the status bar of the code editor that shows your current indentation settings for the file. You can click on this element to show a menu which lets you do a number of things:
- Change the indentation unit for the file
- View what Replit thinks the indentation for the file is (indentation detection)
- Convert between different indentation units, e.g. from 2 spaces to 4 spaces
- Re-indent the file so that everything uses the same indent characters

![Converting indentation with the new indentation menu](/images/smarter-indentation/convert-indent.gif)

## Smarter pasting
Replit is now (optionally) a lot smarter about pasting, with the indentation of whatever you copied and the indentation of where you pasted taken into account.

![Formatting a paste in Python](/images/smarter-indentation/formatted-paste.gif)

This feature doesn't use a code formatter/linter (e.g. Prettier), so it works no matter what language you're using. Under the hood, we're analyzing whatever you copied and re-indenting it to match the indentation of wherever you pasted. This re-indentation preserves the differences in indentation between copied lines, so the code you copied and what was pasted should look identical, regardless of where you pasted.

## Visible whitespace
We've added a setting so that you can show whitespace in the editor. You can customize what kinds of whitespace are visible, so if e.g. you only care to show trailing whitespace, you can do that.

![Visible whitespace settings](/images/smarter-indentation/show-whitespace-settings.png)
![Visible whitespace in code](/images/smarter-indentation/show-whitespace-code.png)

## The future
We are still working on adding new features and improvements to code editing on Replit. There will be more to show later, so stay tuned!

Want to be a part of the journey to make the best code editing experience? [Come work with us](http://replit.com/site/careers)!