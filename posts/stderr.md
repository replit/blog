---
title: "Colorizing Stderr: racing pipes, and libc monkey-patching"
author: Rob Blanckaert
date: 2018-11-02T07:00:00.000Z
categories: product
---

_Errors are red,_<br/>
_Outputs are white,_<br/>
_File descriptor injection is bold,_<br/>
_Let me tell you about_ `LD_PRELOAD`.<br/>

Red errors are important; they make it easy to discern exceptions from standard
output. Surprisingly, colorizing stderr is not as straightforward as it sounds
and this is the story of racing pipes, file descriptor hacking, and `libc`
monkey-patching.

The way it worked on Repl.it for a long time was when you start up a repl you
get a container and inside your container, we drop in a _runner_ program that
talks our REPL protocol and executes code in the respective language. So say the
language the user is running is Python then the runner that’s responding to
`eval` messages would be written in Python.

This made colorizing errors easy: we can wrap stdout/stderr with our JSON
adapter and wrap the eval call with try/catch and mux everything through stdout
and our own custom protocol.

```python

io = sys.stdout
sys.stdout = JSONStreamAdapter(“stdout”, io)
sys.stderr = JSONStreamAdapter(“stderr”, io)

try:
    result = eval(code)
    send(io, “result”, result)
except Exception:
    send(io, “error”, sys.exc_info())
```

To better understand it, here is a diagram of how a typical Python program is
setup:

![diagram showing a typical python program setup](/public/images/blog/typical.png)

Now with our adapter here’s how it would look like (notice how both
stdout/stderr are going through FD1, which is typically stdout):

![diagram with json stream adapters](/public/images/blog/adapter.png)

This worked reasonably well: we could tell stdout from stderr at the protocol
level but it also introduced a few problems -- specifically:

* Other things that wrote to stdout messed up the JSON transport stream, such as
  `os.system()` and libraries for terminal manipulation.
* Our injected code would sometime confuse the module loading system and
  built-in names -- such as `__name__` in Python -- so it didn’t scale beyond
  single file repls.
* It’s a maintenance overhead: every language we add -- and we want to
  eventually support all of them -- we have to write and maintain a runner.

Our next attempt at this was to delegate the running of the code directly to the
language interpreter, in interactive mode (i.e. `python -i`). The launching
program would allocate a PTY for it, and apply the JSON wrapping.

![diagram with pty wrapping](/public/images/blog/wrap.png)

This worked well, but now that both stdout and stderr were going through the PTY
before could inspect them, we couldn’t colorize our errors red. To differentiate
error from the text, we’d need to wedge something in between the process and the
PTY.  Meet red.c, a little program that injects itself into FD2 (the file
descriptor that typically represents stderr), spawns the target program with the
correctly arranged file descriptors, and sits in the middle acting as a proxy
and colorizing errors.

```c
#define _GNU_SOURCE
#include <stdlib.h>
#include <fcntl.h>
#include <limits.h>
#include <unistd.h>
#include <string.h>

int errpipe[2];

int ok(int err) {
	if ( err != 0 ) perror("red");
}


int main(int argc, char **argv) {
	char **cmd = argv + 1;
	char *buf = malloc(PIPE_BUF + 10);
	memcpy(buf, "\033[31m", 5);
	pid_t child;
	int status;

	ok(pipe2(errpipe, 0));
	if ( child = fork() ) {
		ok(close(errpipe[1]));
		while ( 1 ) {
			ssize_t n = read(errpipe[0], buf+5, PIPE_BUF);
			memcpy(buf + 5 + n, "\033[00m", 5);
			if ( n == 0 ) break;
			write(2, buf, n+10);
		}
		waitpid(child, &status, 0);
		return WEXITSTATUS(status);
	} else {
		ok(close(errpipe[0]));
		ok(close(2));
		ok(-1 == dup(errpipe[1]));
		ok(execvp(*cmd, cmd));
	}
}
```

Here is what the diagram looks like now:

![diagram with red.c proxy](/public/images/blog/red_c.png)

This seemed to work well at first but it had a surprising problem: in some
cases, output and errors of order.

The program will deliver data to FD1 and the pipe, but there is a race for red.c
to read the data out of the pipe and get it to the PTY before the program writes
more data FD1. There’s another failure mode where data gets backed-up at the
pipe and it all comes out at the same time. Ultimately, we were at the whims of
the kernel scheduler making it all indeterministic.

While for the most part, everything was fast enough that it worked out when the
race occurred we’d get wonky behavior like the REPL prompt showing up in the
middle of an error.

In fact, in any situation where the file descriptors referenced by sys.stdout
and sys.stderr don’t point to the same underlying character device, there’s no
good way to maintain the programs intended ordering. The question becomes: how
do we inject ourselves between sys.stderr and the PTY while keeping the file
descriptors intact, and without mucking around with the Python environment. Some
sort of dark and forbidden magic.


Enter [`LD_PRELOAD`](http://www.goldsborough.me/c/low-level/kernel/2016/08/29/16-48-53-the_-ld_preload-_trick/):
a dynamic linker functionality that makes it possible to load a library and bind
its symbols (function and variable names etc) before loading any other library. If
you code in dynamic languages you probably know about monkey patching, and in
effect, `LD_PRELOAD` can be exploited to do that for C.


Say you want to monkey patch a C program so that it never reads from the
outside. You want it to always return the same thing: “never gonna give you up.”

Here’s our library to be injected:
```c
// inject.c
#include <string.h>

size_t read(int fd, void *data, size_t size) {
  strcpy(data, "never gonna give you up\n");
  return 24;
}
```

Now if we compile a simple C program that uses `read` to read from stdin and
then run it with `LD_PRELOAD` it will never actually try to read anything --
it will simply return the constant string.

<iframe height="400px" width="100%" src="https://repl.it/@amasad/monkey-patching?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

Now, for monkey patching to actually work you need to access to the original
shadowed symbol -- `read` in this case. This is done using a technique known as
Symbol Fishing. Luckily this has been done for us by the
[stderred](https://github.com/sickill/stderred) open-source project.

Stderred uses `LD_PRELOAD` to monkey-patch `write` and colorize -- by including
the terminal ansi codes for the color red -- anything that's
being written to FD2 (stderr):

![diagram with ld_preload](/public/images/blog/ld_preload.png)

With this, we achieved all our goals: red errors, all the data going to the same
character device, and all the modification happening in the same process in the
right order.

Monkey patching always feels dirty, but also supremely valuable. The downside is
your program is running around with a modified standard library. But that’s a
small sacrifice to get that sweet <span style="color:red">red</span> in my terminal.
