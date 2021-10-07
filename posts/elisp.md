---
title: "Adding a language to Repl.it: Emacs Lisp"
author: Radon Rosborough
date: 2019-06-24T21:26:53.000Z
categories: product
---

At Repl.it, we want to provide a top-tier online programming
experience in as many languages as we can support. Today, we’ll show
you just how we do that.

Let's look at our 64th and newest language, [Emacs
Lisp](https://en.wikipedia.org/wiki/Emacs_Lisp).

Emacs Lisp is the [scripting
language](https://en.wikipedia.org/wiki/Scripting_language) used by
the [Emacs](https://www.gnu.org/software/emacs/) text editor. What
makes Emacs Lisp on Repl.it interesting is that Emacs Lisp runs
exclusively in the Emacs editor, which is a full, interactive
application—not just a command-line program like Python or Ruby.

You might be wondering how we handled this. In fact, our
infrastructure was already generic enough to deal with a repl inside
of Emacs inside of Repl.it!

* [Check it out here!](https://repl.it/l/elisp)

Let’s take a look at how this was implemented. You might be surprised
at just how little code was required!

## Polygott

The first stop in adding any new language is
[Polygott](https://github.com/replit/polygott), our open-source
project which contains instructions on how to install most of our
supported languages.

We use [Docker](https://www.docker.com/) to run repls, so this project
contains a Dockerfile which reads a configuration file for each
language to find out what to install. The file for Emacs Lisp, minus
the parts used for testing and other miscellany, [looks like
this](https://github.com/replit/polygott/blob/75603d8168da4860ee3bbf74e42e6ad243c3fe86/languages/elisp.toml):

```toml
name = "elisp"
packages = [
  "emacs26"
]
aptRepos = [
  "ppa:kelleyk/emacs"
]
```

Emacs Lisp just needs the [Ubuntu
package](https://packages.ubuntu.com/bionic/emacs-nox) for Emacs—but
since we want the latest version of Emacs ([as requested on
Reddit](https://www.reddit.com/r/emacs/comments/c5df1x/adding_a_language_to_replit_emacs_lisp/es19ksb)),
we pull from [Kevin Kelley's
PPA](https://launchpad.net/~kelleyk/+archive/ubuntu/emacs) instead.
There are other keys that can be used in the configuration files of
Polygott for more complex installation and configuration procedures.

That's all we really need to pull Emacs Lisp into our Docker images.
Onwards!

## Prybar

Next up is turning Emacs into a repl for Emacs Lisp. This is handled
by another of our open-source projects,
[Prybar](https://github.com/replit/prybar). The idea of Prybar,
written in [Go](https://golang.org/), is to take every programming
language that has a repl and expose them all behind the same
command-line interface (with some shared basic options, like setting
the interactive prompt).

We used to implement language repls using a client-server protocol:
the user would type in some input, we would send it to the repl
server, and the server would send back the result and output. This
required us to write a repl server for every language: a small Python
script for Python, a small Ruby script for Ruby, and so on.

Now, though, our philosophy is to get out of the way as soon as
possible. This means that instead of managing communication between
the client and the programming language, we just start the programming
language's built-in repl and then let it handle everything. This means
several things: less work for us, more supported languages for you,
language-specific features like tab-completion, and a repl experience
on Repl.it that is more similar to your offline development.

That said, sometimes languages' built-in repls don't provide all the
features we need. In these cases, we try to use the language's [C
bindings](https://en.wikipedia.org/wiki/Language_binding) (via
[cgo](https://golang.org/cmd/cgo/)) to access hidden functionality,
and otherwise we write a small script in the language to emulate the
features we need.

Unfortunately, Emacs does not provide an expressive command-line
interface or good C bindings. What it does provide, though, is an
excellent repl for Emacs Lisp, right inside Emacs:
[IELM](https://www.masteringemacs.org/article/evaluating-elisp-emacs#the-interactive-emacs-lisp-mode).
So we wrote a [small
script](https://github.com/replit/prybar/blob/8f73354aa080e98d2b0ab248a80e086e4004947f/prybar_assets/elisp/repl.el)
which parses the Prybar configuration options and then jumps into
IELM. You can try it out on your machine with Docker:

```sh
$ docker run -it --rm replco/prybar prybar-elisp -i
```

(And while you're at it, try replacing `prybar-elisp` with
`prybar-python3` or `prybar-ruby`!)

## Evaluation server

Now that we have the tooling in place, let's see what our evaluation
API needs to know in order to provide Emacs Lisp as a language on
Repl.it.

For the most part, we just need to write a single JSON file. The
important bits look like this:

```json
{
  "category": "Practical",
  "displayName": "Emacs Lisp (Elisp)",
  "entrypoint": "main.el",
  "icon": "https://icons--util.repl.co/emacs.svg",
  "image": "images.repl.it/polygott",
  "name": "elisp",
  "tagline": "Scripting language for the extensible text editor.",

  "interpreter": {
    "command": [
      "/run_dir/prybar-elisp",
      "--ps1",
      "\u001b[33m\uEEA7\u001b[00m ",
      "-i",
      "-c",
      ";; Hint: To type M-x, use ESC x instead."
    ]
  },

  "consoleHeader": "GNU Emacs 25.2.2"
}
```

This file does several things:

* Tells the frontend some basic information about the language (where
  to list it, what its tagline is, where to get the icon). Note that
  we host many of our web assets (not to mention internal tooling) on
  Repl.it, because we love dogfooding.
* Tells our Docker container manager which Docker image to use for
  this language; for new languages, we use Polygott.
* Tells the container how to start a repl for the language. We use
  Prybar with a custom ANSI escape sequence to generate that classy
  repl prompt you see in every language on Repl.it.

## Frontend

All that's left at this point is to update a few configuration files
on the Repl.it website. These define things like syntax highlighting
rules, starter code in the Examples panel, and which categories are
listed on the [Languages](https://repl.it/languages/) page.

## Conclusion

We are proud of how generic we have been able to make our
infrastructure without sacrificing good support for individual
languages. It took a lot of work to get to being able to add a
language (in theory) with only a few configuration files.

In fact, most of the work in adding Emacs Lisp was integrating it into
Prybar. This is important to us. We think that by abstracting language
differences behind a common, *open-source* interface, we can not only
free up more time to ship features on Repl.it, but also give back to
the community in the form of better developer tooling for all.

Let us know what languages you are most excited to see on Repl.it at
our [language requests](https://repl.it/language-requests/) page. And
if you're particularly excited about one, we are always accepting pull
requests on [Polygott](https://github.com/replit/polygott) and
[Prybar](https://github.com/replit/prybar)!

P.S. Don't forget to check out [Emacs Lisp on
Repl.it](https://repl.it/l/elisp).
