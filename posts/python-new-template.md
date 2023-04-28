---
title: Making new Python repls 100x faster to start up
author: Luis Héctor Chávez
date: 2022-02-04T19:45:00.000Z
categories: infra, eng, product
cover: https://art.replit.com/images/UPMreplit-UPM-final-01.png
---

Python is currently the world's (and Replit's) [most popular programming language](https://www.tiobe.com/tiobe-index/). We've improved the Python experience during last year, with a [Python package cache](https://blog.replit.com/python-package-cache) to make installs faster, and an  [integrated, multiplayer debugger](https://blog.replit.com/multiplayer-debugging) to increase the understanding of what programs do. But there are still a few problems with Python. Packages are often very space-consuming, so they are installed into an ephemeral 2 GiB scratch disk to avoid filling up repl directories. Unfortunately this means that every time a Python repl starts, a lengthy package installation process must happen. This makes some Python repls take _forever_ to start! Some other packages that have a large number of dependencies (like [TensorFlow](https://www.tensorflow.org/) and [Torch](https://pytorch.org/)) were completely unusable because they don't even fit on the scratch directory.

We decided to address these shortcomings and make Python a bit faster on top of that! Today, we're releasing a brand new Python template that has a lot of neat things. Newly created Python repls will now be based on [nix](https://blog.replit.com/nix) so that additional programs and libraries can be installed, have a standard [virtual environment](https://docs.python.org/3/tutorial/venv.html) stored inside the repl, _and_ a brand new caching mechanism so that packages are installed even faster and they don't take up too much space.

<figure>
  <image src="./images/python-new-template/tfpls.png">
  <figcaption>I had the wildest dream, that I was able to run the TensorFlow 2 quickstart on replit without running out of disk space or memory</figcaption>
</figure>

## How does it work?

We had a few goals in mind when we started designing this:

- should play well with the rest of the Python ecosystem. This meant that using the python packages that are installed in nix didn't make the cut, since they _sometimes_ don't play well with packages that are installed directly from the more standard [PyPI](https://pypi.org), and are not updated as often as upstream PyPI.
- shouldn't increase the repl size _too much_. This  meant that just creating a virtual environment wasn't really an option, because a lot of Python packages are pretty large when installed and won't fit on a Repl!
- build upon the primitives that we have already built. This means that we still want to lean on nix, [Poetry and UPM](https://blog.replit.com/upm), and extend what was done for the original [Python package cache](https://blog.replit.com/python-package-cache).
- not introduce huge security vulnerabilities. Notably, prevent cross-repl cache attacks (pollution, poisoning, etc.).

The addition of the virtual environment helps greatly with the first and third point, but goes directly against the second one! So in order to have our cake and eat it too, we reached out for one of our favorite tools, the trusty [Content-Addressable cache](https://blog.replit.com/python-package-cache#cacache). This time the cache will be for individual files of a Python package, in addition to the packages themselves!

This new cache contains a pool of all the files that are listed in all of the [wheel's `RECORD` file](https://www.python.org/dev/peps/pep-0491/#the-dist-info-directory) of all the Python packages that have been installed in a repl, where the name of each file is derived from the SHA-256 hash of the file. This makes the files have the content-addressable property. Since the `RECORD` files already contain the expected SHA-256 hashes of all the files, and PyPI also reports the hashes of the wheels themselves, this allows us to have a high level of confidence that the files have not been tampered with.

Now that we have a pool of files available, instead of extracting them from the wheel file, we can create a [symbolic link](https://en.wikipedia.org/wiki/Symbolic_link) for each of the files that are already in the pool when installing the package. Symbolic links take very little disk space, since they just need to store the path of the file they are pointing to, so even large packages with lots of dependencies (like TensorFlow) can fit comfortably on a repl. Of course this means that if a particular package version has not yet been cached, a few straggler files will be copied to the repl instead of symlinked. We will be updating the cache very frequently, so this will fix itself at some point.

One neat side-effect of this process is that since all the files needed to start a repl are "just there": starting a hosted repl written in Python is going to be a lot faster! And we have a plan to make that even faster, so stay tuned!

Going forward we are going to give [`*.pyc` files](https://www.python.org/dev/peps/pep-3147/) and [npm modules](https://www.npmjs.com/) the same treatment, so that JavaScript / TypeScript repls that use a lot of dependencies don't run out of disk space.

Does making changes to programming runtime environments at scale to improve the developer experience for [the next billion creators](https://blog.replit.com/b) sound like your kind of thing? We would love to talk with you! We're [hiring for a lot of engineering roles](https://replit.com/site/careers), so make sure to check that out!