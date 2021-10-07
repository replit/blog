---
title: "Git: An Introduction for Beginners"
author: James Gallagher
date: 2020-06-29T07:00:00.000Z
categories: projects
---

When you’re working on a software project, it’s crucial to keep a log of all the changes made to the project. This will help you see how your work has evolved over time. It will also allow other collaborators on a project to keep track of what changes have been made and by who. That’s where Git comes in.

Git is a distributed version control system that helps you keep track of your code. Using Git, you can save changes to your code over time without overwriting previous versions. Because Git is distributed, every developer can have a copy of a repository. This means multiple developers can work on the same project, at the same time, efficiently.

With the right investment of time and energy, you’ll be able to quickly become a Git master. This week we’ve prepared a list of tutorials for you on beginner Git concepts. Let’s dive into a few of the most popular and useful Git commands you should learn how to use.

## Pushing Code to a Repository

A repository is another word for a project. In Git, there are two types of repositories: local and remote. Local repositories are your own copy of a project stored on your machine. Remote repositories are where the main copy of a project is held.

There are a few steps you need to take to make a change to a remote repository.

### [Initialize a Repository: git init](https://careerkarma.com/blog/git-init/)

The first step is to use the git init command to initialize a repository. This will allow you to get set up with Git on your local machine, whether or not your project already uses Git.

### [Adding Changes to a Commit: git add](https://careerkarma.com/blog/git-add/)

Once you’ve made changes to some code, you are ready to add them to a commit using git add. This command moves your changes to the staging area, which is where code goes before you are ready to push it to a remote repository.

### [Creating a Commit: git commit](https://careerkarma.com/blog/git-commit/)

You can use the git commit command to create a commit. A commit is like a record of a project at a certain period of time. This command will move all your files from the staging area into their own commit. Upon creating a commit, you’re ready to push your code.

### [Pushing Your Code: git push](https://careerkarma.com/blog/git-push/)

The git push command moves all of the commits you’ve created on your local machine to the remote repository. When you run this command, the changes you’ve made will be visible to all the other developers working on a project.

## Retrieving Code

There are three different commands you can use to retrieve code using Git: pull, fetch and clone.

### [Retrieving Updates to a Codebase: git pull](https://careerkarma.com/blog/git-pull/)

The git pull command allows you to retrieve updates to a codebase. Using this command you can check to see if a remote repository has been updated. If it has been, the updated code will be downloaded onto your computer.

This command does not change your local copy of a repository. It will create a new version of the codebase for you to view, which you can then merge with your existing version.

### [Retrieving Updates to a Codebase: git fetch](https://careerkarma.com/blog/git-fetch)

The git fetch command is similar to git pull. The main difference is that git pull directly changes your local working copy of a repository. 

### [Retrieving a New Codebase: git clone](https://careerkarma.com/blog/git-clone/)

If you don’t already have a codebase downloaded to your system, you can create a copy of it using git clone. This will download all of the code and the commit history for a particular project and create your own local version of the repository.

## Branching

Branches allow you to make changes to your code without having to update the main version of a codebase. You can save these changes on a branch, which has its own independent line of development. When you’ve finished making a change, you can merge that branch and make it part of the full codebase.

### [Create a Branch: git branch](https://careerkarma.com/blog/git-branch/)

The git branch command allows you to view, create, rename and delete branches.

### [Switching Branches: git checkout](https://careerkarma.com/blog/git-checkout/)

The git checkout command allows you to work with different branches on your local computer. You can create a new branch or navigate to another branch to make changes using the git checkout command.

### [Merging Branches: git merge](https://careerkarma.com/blog/git-merge/)

When you’re ready to move a change from a branch to another branch – or to the main version of your codebase – you can use the git merge command. This command combines the history of two independent branches to create one branch.

## Advanced Tutorials

Are you ready to take your learning to the next level? Well, good news: we’ve got a few advanced tutorials for you that will push your knowledge to the limits. The following tutorials are great for those who have mastered the fundamentals:

*   [Capture a point in the history of a repository using git tag](https://careerkarma.com/blog/git-tag/)
*   [View the history of a Git repository using git log](https://careerkarma.com/blog/git-log/)
*   [Compare data in your repository using git diff](https://careerkarma.com/blog/git-diff/)
*   [Revert an existing commit using git revert commit](https://careerkarma.com/blog/git-revert-commit/)
*   [Save your code for a later date using git stash](https://careerkarma.com/blog/git-stash/)

Once you start using these commands they’ll become natural. Making changes to a Git repository is something you may end up doing every day, and with practice comes perfection. While there are more advanced use cases for Git, we’ve covered the main commands you need to know in this tutorial.

_If you’re looking to learn more about using the Git command line, check out Career Karma’s “[What is Git?](https://careerkarma.com/blog/git-clone/)” guide._


**_About the author_**

<img src="https://careerkarma.com/blog/wp-content/uploads/2020/01/james-gallagher-300x300.jpg" alt="James Gallagher" style="height:150px; width:150px; display:inline-block; horizontal-align:left;">

_James Gallagher is a writer at [Career Karma](https://careerkarma.com/) where he focuses on coding tutorials and technical articles. ([twitter](https://twitter.com/jamesg_oca))_