---
title: Dynamic version for Nix derivations
author: Guillaume St-Pierre
date: 2021-06-25
categories: infra
---

**UPDATE - 05/07/2021** Thanks to [Travis Cardwell](https://www.extrema.is/) for letting us know that Nix _requires_ the [version part of the derivation name to start with a digit](https://nixos.org/manual/nixpkgs/stable/#sec-package-naming). The post has been upated from its original version to include this requirement. 

When you open a repl, we link it to a Docker container in the cloud. As we've started supporting more and more languages over the years, the size of that Docker image has exploded in size. It can take us up to a week to safely deploy! Any update, no matter the size, to our tooling can't be shipped to our users as fast as we'd like. This is where our [migration to Nix](https://blog.replit.com/nix) comes in. We are now building these tools in our CI pipelines as Nix packages. We can reduce the size of our image to its minimum and provide all our tools and languages through Nix, on demand. One drawback of Nix for us is the need to specify the version in the derivation code (Like you would do in the `package.json` in NPM for example), rather than rely on image tagging. Before we could move forward, we had to solve one of the harder problems in computer science: versioning.

We settled on using the commit short sha (first 7 characters of a commit's ID) as the version for our tools. However, we needed to go edit the `default.nix` file manually in the tool's repository every time we needed to publish a version. This wasn't providing us with the speed and flexibility we wanted, and we wondered if it was possible to generate the version automatically. After all, Nix is a fully fledged programming language, so that should be doable?

It is, but it was not as easy as we thought.

## Starting with a Nix package
One great thing about Nix is that its entire library of standard packages is available in a very easy to parse GitHub repository. A quick search led me to [this package in particular](https://github.com/NixOS/nixpkgs/blob/master/pkgs/build-support/fetchgitlocal/default.nix). That code does almost the same thing we're hoping to do: call a `runCommand` function and execute `git rev-parse --short` there. With this in hand, I trimmed the code and wrote a quick function to get the short sha.

```nix
{ pkgs ? import <nixpkgs>{} } :
let
    inherit(pkgs)
    	stdenv
        git
        runCommand;
in stdenv.mkDerivation {
    pname = "some-name"; # name is automatically generated with `${pname}-${version}`. Setting name instead would remove the version from it.
    src = ./.;

    version = runCommand "get-rev" {
        nativeBuildInputs = [ git ];
    } "git rev-parse --short HEAD > $out";
} 
```

I set the version to the result of a `runCommand` invocation where I run `git rev-parse`. Nix provides the special `$out` variable in `runCommand` to pipe or output the result to. When doing so, whatever we set `$out` to will be put in the variable `version`. I typed `nix-build` in my terminal thinking it would work perfectly and... An error saying the directory in the nix store where `runCommand` happens is not a git directory.

I had assumed that setting `src = ./.` would copy all the files to the store before `runCommand` would run, so it would have access to the `.git` directory, but that's not how Nix does things. Instead, Nix will "eagerly" execute my `runCommand` function to configure the `version` key in the set before executing the derivation, meaning it will not have fetched the files yet. To add to this complexity, the Nix store runs all builds in a separate drive that cannot access any directories on the main drive. That makes a lot of sense considering how Nix wants all your builds to be totally separated and reproducible. It would defeat the point if it was allowed to play with the host file system. We'll need to find a way to work around that.

You can test this limitation using the code above, replace `git rev-parse --short HEAD > $out` with `ls ${toString ./.}` and run `nix-build` again. Ls will complain that the given path is not a file or directory, it's not available in the environment where nix is executed.

## Copy the file over
Looking back at the code I used for inspiration, there were two very short lines I overlooked which gave an idea on how to potentially solve this: `srcStr = toString src;` on line 4 and `cd ${srcStr}` on line 12. This told me I had to get the path to the source, copy the `.git` directory in the Nix store, and run `git rev-parse` after having `cd`ed into that directory. Reading the Nix builtins docs, I founds that it was possible to use the `fetchGit` function to get files from a local git repository. Since `./.` is a link to the current working directory, I tried using that to fetch the files in the store. Let's see this in action.

```nix
{ pkgs ? import <nixpkgs>{} } :
let
    inherit(pkgs)
    	stdenv
        git
        runCommand
        copyPathToStore;
	
	gitSrc = builtins.fetchGit { url: toString ./.; }; # Yes, I use url with an absolute file path
in stdenv.mkDerivation {
    pname = "some-name";
    src = ./.;

    version = runCommand "get-rev" {
        nativeBuildInputs = [ git ];
    } "cd ${gitSrc} && git rev-parse --short HEAD > $out";
} 
```

Let's try `nix-build`. The `cd` command works, but `git` still complains the directory is not a `git` directory. That happens when the `.git` folder is missing in a directory or any of its parents, but that should not be the case right? I copied all the files over with `fetchGit`.

Turns out, `fetchGit` does not copy the `.git` folder when it gets the files. We can test that by running `ls -a` with the directory given in the error message (Should look something like `722wzj4cz72v21gybky6qhw0qj4bvkc7-some-name`) as the first argument. The `.git` directory will be missing in the output. Going back to the docs, I found the `filterSource` and `copyPathToStore` functions could help me solve this issue. Both copy files, but the former takes a filter function to remove any unwanted files from the copy and the later is a implementation of `filterSource` using a filter function that doesn't filter out any files. Let's try using `copyPathToStore` in the code.

```nix
{ pkgs ? import <nixpkgs>{} } :
let
    inherit(pkgs)
    	stdenv
        git
        runCommand
        copyPathToStore;
	
	src = copyPathToStore ./.;
in stdenv.mkDerivation {
    pname = "some-name";
    src = inherit src;

    version = runCommand "get-rev" {
        nativeBuildInputs = [ git ];
    } "cd ${src} && git rev-parse --short HEAD > $out";
} 
```

`copyPathToStore` copies to the entire code plus the `.git` folder and assigns the path to those file to a vatiable called `src`, no questions asked. Anything that uses the path to the `src` variable will be able to access that code. I inherit the `src` variable as the value of the `src` key in the derivation to save a few operations. If I assigned `src = ./.`, it would copy all the files _twice_, which is not optimal. This makes sure that `src` is equal to whatever path the files where copied to, so the version comes from the same files the derivation will be built with.

## Reading from `runCommand`
Running `nix-build`, this will still trigger an error from nix. Turns out `runCommand` outputs a file, not a string. This is for caching purposes. Nothing a `builtins.readFile` can't fix, however. After some more tinkering, I noticed I also needed to clean the result of `rev-parse` a little since it outputs with a `\n` at the end and Nix really doesn't like that. Finally, I wanted to remove the `cd` and make this one single command. Here is the final code.

```nix
{ pkgs ? import <nixpkgs>{} } :
let
    inherit(pkgs)
    	stdenv
        git
        runCommand
        copyPathToStore;
	
	src = copyPathToStore ./.;
	revision = runCommand "get-rev" {
        nativeBuildInputs = [ git ];
    } "GIT_DIR=${src}/.git git rev-parse --short HEAD | tr -d '\n' > $out";
in stdenv.mkDerivation {
    pname = "some-name";
    # Added a digit as the first character of the version to make sure to follow Nix's
    # guidelines on the format of the version part of a derivation name.
    version = "0" + builtins.readFile revision;

    inherit src;
} 
```

Typing `nix-build` will successfully package and build the code and we can confirm it worked by looking at the path of the package in the Nix store, which is outputted at the end of the build process. Nix generates that path by adding the name (remember, the name is equal to `${pname}-${version}`) as a suffix to the path. Here is mine when I ran the successful build: `/nix/store/722wzj4cz72v21gybky6qhw0qj4bvkc7-some-name-7e18f8a`. As we can see, the end of that path includes the `pname` of the package and a dynamically generated `version`!

This was quite the journey, but thankfully this code works great and is not too bulky. Next steps: getting this into the official Nix packages?

## Takeaways
The Nix language is definitely different from what I would expect coming from a functional programming background. The code I settled on is far from perfect and I'm sure it could be greatly improved, but I learned a great deal from my time with it. I will leave you with a few takeaways I could have used when I first started with Nix.

- Nix functions build on top of each other. The same way `copyPathToStore` uses `filterSource`, many other functions use other packages to do their tasks. This makes the standard library of packages very easy to read and to use as inspiration when trying to do anything in Nix. Whatever you are doing, chances are there already is some function somewhere that does something similar.
- Derivations are attribute sets, not functions. Doing something like `version = "something"` means you are creating the key `version` in the set, not creating a variable. Variables can only be created in a `let .. in` statement. This means it is not possible to run a `runCommand` function without assigning to something, Nix will throw an error. They meant it when they said it was a pure language.
- Nix is incredibly lazy. It will not interpret any functions or commands it doesn't feel the need to. You can try that at home by trying to execute a `runCommand` that prints something to the screen without assigning the result to any variable in the derivation. Nothing will happen. Same thing if you try to read the result with `builtins.readFile`. Only when assigning it to something like `pname` or `version` will it finally execute the code. I expected these kinds of "side-effect-y" functions to run regardless of what the interpreter wants. On the other hand, if it did execute everything, one could imagine how installing one nix package would install all nix packages!

This small journey into the world of dynamic versions was not an easy one, but as we learn more about Nix and how it can power the future of Replit, I am sure it will help us grow and improve. Happy hacking and, hopefully, I will see you again soon for another Nix post.