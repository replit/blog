---
title: Git in the Shell
author: Ryan Mulligan
date: 2023-01-30
categories: product,news
cover: https://blog.replit.com/images/git_in_shell.png
profiles: ryantmreplit
---

![Ghost in the Shell robot typing with multiply bifurcating fingers](https://blog.replit.com/images/git-in-the-shell/ghost-in.mp4)

Starting today, the Git command-line tools of all Repls provide a much better experience and integrate with your GitHub account. If you connect your GitHub account to Replit from the [Account page](https://replit.com/account), your Git commands (like `git clone`, `git fetch`, `git push`) will have access to your GitHub repositories: 

![cloning a git repository from github via the shell](https://blog.replit.com/images/git-in-the-shell/clone.mp4)

You're now able compose Git commit messages in the editor:

![editing a git commit message then pushing to GitHub](https://blog.replit.com/images/git-in-the-shell/commitpush.mp4)

Or, even do interactive rebases:

![editing an interactive rebase plan](https://blog.replit.com/images/git-in-the-shell/rebase.png)

For security, the first time each session that Git needs your GitHub token, you'll see this message:

![dialog asking to pass GitHub credentials to the shell](https://blog.replit.com/images/git-in-the-shell/dialog.png)

Then subsequent requests will run seamlessly.

Please note, this feature is not designed for Multiplayer, and we do not recommend you use it with Multiplayer because the other people could access your GitHub token.

Please let us know what you think of Git in the Shell on the [Replit Ask forum](https://ask.replit.com/t/announcing-git-in-the-shell/8167) and read on if you are interested in how we built it.

## How we built it

Let's start by explaining how the Git editor integration works. In the backend, we've set the `GIT_EDITOR` environment variable for you, so that when you run a Git command that needs an editor it knows to use the Workspace editor. To make this work, we've added a new REST API to each Repl that allows it to communicate with the Workspace. For example,

```bash
curl -X POST "localhost:8283/files/open" \
  -H "Accept: application/json" -H "Content-Type: application/json" \
  --data '{"filename": ".replit"}'
```

will open the `.replit` file.

For commit messages to work, we needed the API to wait until the file is closed. For example,

```bash
curl -X POST "localhost:8283/files/open" \
  -H "Accept: application/json" -H "Content-Type: application/json" \
  --data '{"filename": ".replit", "waitForClose": true}'
```
will open the `.replit` file and not return until the tab is closed.

The other piece of the puzzle is authentication. Git checks for the environment variable `GIT_ASKPASS`, which has an *interesting* interface.

Say Git wants to get a username for remote at https://github.com. It sends the same string to the `GIT_ASKPASS` script that it would normally send to a user on the command-line. In this case

```txt
Username for 'https://github.com': 
```

And it expects the standard output of `GIT_ASKPASS` to be the username, or a non-zero exit code if `GIT_ASKPASS` doesn't know the username to use. For GitHub, we can respond with "token" for the username if we have a GitHub token to use.

Then, it calls `GIT_ASKPASS` again for the password, like:

```txt
Password for 'https://token@github.com': 
```

and we can respond with the GitHub Token.

The REST API also provides an endpoint for the GitHub API token, which `GIT_ASKPASS` uses:

```bash
curl "localhost:8283/github/token"
```

By interfacing with these standard Git environment variables, we've been able to make the Git command line experience a lot better on Replit.

Are you interested in programing, operating systems, and other open-source technologies? [Come work with us!](https://replit.com/site/careers)