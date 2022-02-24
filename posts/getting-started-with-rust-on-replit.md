---
title: Getting Started with Rust on Replit
author: Menard Maranan
date: 2022-1-21
cover: https://blog.replit.com/images/rust_cover.png
categories: projects
---


[Rust](https://www.rust-lang.org/) keeps [topping the list](https://insights.stackoverflow.com/survey/2021#:~:text=Rust%20is%20the%20most%20loved%20language) as the most loved programming language by developers. Its focus on speed and safety makes it so ideal that it’s expected to be the [future of software development](https://scalac.io/blog/5-reasons-why-rust-is-the-future-rust-functional-programming/). If you haven’t gotten started with it yet, now’s a good time. 

You’re going to learn to use Rust while writing your code in Replit, which supports over fifty programming languages along with GitHub integration.

You’ll be building a classic project for learning programming languages, a guessing game. To see what this will look like, check the final version and source code of the project [in Replit](https://replit.com/@menard19/Rust-Guessing-Game).

## What Is Replit?

[Replit](https://replit.com) is an IDE that allows you to write code and build apps in your favorite browser. Since it’s web-based, you can use any device, and it handles configurations for you. It supports languages including Python, JavaScript, Rust, and Java, as well as frameworks and libraries including React.js and Django. Its collaborative features for team projects include real-time, multi-user editing and live chat. 

## Getting Started with Rust

[Create a free Replit account](https://replit.com/signup?from=landing) with GitHub.

- **Step 1: Create a repl** - In Replit, click the burger menu in the top left corner. Click the **Create Repl** button and a modal will appear. You can also click the PLUS '**+**' button under **Create**.

![Create a repl](https://i.imgur.com/wsXlsbP.png)

- **Step 2: Use the Rust Template** - In the template search bar, select Rust. You’ll create a starter Rust project with cargo (more on that later).

![Select Rust template](https://i.imgur.com/fQaS0Qf.png)

- **Step 3: Name and create your project** - Give your Rust project a title, like `My Rust Guessing Game`. Click **Create Repl**.

![Name Replit project and create repl](https://i.imgur.com/idPpM6U.png)

After setup, your project should look like this:

![Initial Rust project](https://i.imgur.com/PLOeYka.png)

### About the File Structure

In your Rust project, there’s a **src** folder with a single file inside named `main.rs`. You’ll write your code here. You’ll also see the Rust version of a `hello world` program, which you’ll run with Cargo later on. To see it now, click the green **Run** button at the top:

![`hello world` in Rust](https://i.imgur.com/5iBWfig.png)

The files `Cargo.toml` and `Cargo.lock` should be at the root of the directory. `Cargo.toml` is the manifest file of your project, and it contains metadata and dependencies. It’s the one you’ll mostly be working with, because in Rust, you manually edit `Cargo.toml` and specify needed dependencies, then pull them into your project. 

![Cargo.toml file](https://i.imgur.com/UcKzpUw.png)

You should also see the `target` directory, which will contain things like the build output of your project and the documentation.

## Build a Guessing Game

Next you’ll be building a guessing game in Rust. This game has several objectives:

1. Generate a secret number
2. Get user input
3. Check if the user got it right
4. If the guess is correct, the user wins, otherwise ask them again

### Add Cargo

You’ll need to use `cargo`, Rust’s package manager. Open `scr/main.rs`. This is where you’ll write your Rust code.

`cargo` comes with Rust at installation. You can use it to compile your code, manage dependencies, and generate documentation.

As you can see, there’s a `hello world` program already in place. To run it, compile your Rust code with `cargo build`. On your console or shell, on the right panel of Replit, enter:

```bash

$ cargo build

```

This will compile your Rust code into binary and save it under `target/debug/{your project name}`. You can run this binary directly by accessing it on your console or shell:

```bash

$ ./target/debug/my-project

```

Every time you change your code, you must compile it to see your changes. If you want to run and compile your code right away, instead of accessing the compiled code every time, you can use `cargo run` instead. The `cargo run` command runs the compiled code right after a successful build. In your shell or console, enter the command:

```bash

$ cargo run

```

If your build is successful, you should see the output `Hello, World!` in your console.

If you want to know if your code will compile without actually compiling or running it, use the command `cargo check`.

```bash

$ cargo check

```

### Generate a Secret Number

Start building the game by providing a secret number the user should guess. Use a hard-coded number to start and generate random numbers later with an external crate.

First create a variable to store the secret number. On your `src/main.rs`, write the following code:

```rust
// src/main.rs

fn main() {
    let secret_number: u8 = 3;
    println!("Secret number is: {}", secret_number);
}

```

Run this code using `cargo` to see the secret number printed to the console.

In the above code, the `main` function serves as the entry point and is automatically called by Rust. The core of your code must be written inside this function. You declare functions in Rust using the `fn` keyword, followed by the function name, then the parenthesis `()` for the arguments, and then the braces `{}` where the scope of this function is defined.

Within the `main` function, you declared the variable `secret_number` using the `let` keyword. In Rust, variables are immutable by default. You can’t change its value upon declaring the variable, unless you specify it to be mutable. It's also standard to name your variables (and functions) in `snake_case`. And you declared the type of your variable because Rust is statically typed. You declared the variable to be `u8` or `unsigned 8-bit integer`, since you only have the value `3` on your variable.

In Rust, you have scalar and compound data types. Scalars in Rust are of integer types, floating-point types, booleans, and character types. For the compound data type, you have tuples and arrays. You can learn more about the data types in the [Rust documentation](https://doc.rust-lang.org/book/ch03-02-data-types.html).

Notice that there’s a `;` after declaring the `secret_number` variable. In Rust, variable declarations are statements because they don’t return anything.

Expressions in Rust don’t have `;` because it means they return a certain value. Statements end with `;` and don’t return any value. Check the [documentation](https://doc.rust-lang.org/reference/statements-and-expressions.html) for more details.

You’ll print to the console the `secret_number` for now. There’s a `!` after the `println` because `println!` is a macro. Macros allow you to write code that can write other code, providing functionality without the runtime cost. Check the [documentation on macros](https://doc.rust-lang.org/reference/macros.html) for more on this topic. 

Note that you don’t directly print the `secret_number` variable in `println!` because the `println!` macro only accepts string literals.

### Get User Input

The next step to building your game is to get and store the user input. Add a `println!("What's your guess?");` to prompt the user to enter their guess. In order to get the user’s input, you’ll use the `i/o` (input/output) library from Rust’s standard library and save it inside a variable `user_guess`.

```rust
// src/main.rs

use std::io;

fn main() {
    let secret_number: u8 = 3;

    println!("What's your guess?");
    // I/O
    let mut user_guess: String = String::new();
    io::stdin().read_line(&mut user_guess).expect("Error encountered while getting the user input.");
}

```

Note that you removed the `println!("Secret number is: {}", secret_number);` so you don’t spoil the answer.

You added the line `use std::io;` to bring in the `io` library. Otherwise, you’ll have to specify the path every time you use the library: `std::io::stdin()`.

You added the variable `user_guess` to store the user’s input. Notice that it’s prefixed with the keyword `mut`. That makes the `user_guess` variable mutable, as variables in Rust are immutable by default. Then you inferred its type as `String`. In Rust, there are two string types: `str` and `String`. The `str` is at the core of Rust language and it’s saved in a stack, where the size is fixed. The `str` types can be specified with the double quotation marks `""`. The `String` type comes with the Rust standard library and was brought onto scope by default. Unlike `str`, `String` was saved in a `Heap`, and it can be grown or shrunk. You used `String` type because you need to mutate the initial value of the `user_guess` from an empty string to whatever the user enters. To create an empty string with the `String` type, you used the `new()` method.

To get the user input, you used `stdin()` from the `io` library, then saved the user input to the `user_guess` variable with the `read_line()` method, passing in the `user_guess` variable to specify you want to save the input here. Notice `&mut` before the argument. That’s because of the concept of ownership and borrowing, which is unique in Rust to handle memory safety. 

The `&mut` was passed along with the argument, because if you don’t, the `user_guess` variable will be moved to the `read_line()` method and get out of scope from your `main` function. Upon finishing the execution of `read_line()`, the variable `user_guess` will be dropped and your program won’t have access to it, meaning it won’t know what the user entered as their guess. Also, the `read_line()` method expects a mutable value, so your code won’t compile. You have `&` because you’re borrowing the value of the variable without taking ownership of it; thus, the variable remains in the scope of the `main` function. For more details, see the [Rust documentation about ownership and borrowing](https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html).

Finally, the `.expect("...")` is to prevent your game from crashing.

### Check If the User Guessed Right

Now that you’ve seen the user's guess, check if they got it right. The user’s guess was saved as `String`. You need to determine if the guess is less than, greater than, or equal to the secret number, so you need to convert it to an integer type. You’ll use `u8`:

```rust
// src/main.rs

use std::io;

fn main() {
    let secret_number: u8 = 3;

    loop {
        println!("What's your guess?");
        let mut user_guess: String = String::new();
        io::stdin().read_line(&mut user_guess).expect("Error encountered while getting the user input.");

        let user_number: u8 = match user_guess.trim().parse() {
            Ok(x) => x,
            Err(_) => {
                println!("Invalid. You must input positive integers within the range 1-10 only, inclusive.");
                continue
            }
        };
    }
}

```

First you scoped the process of asking the user for their guess so that you can ask them again if they get it wrong. You used a simple `loop` in Rust, which is an infinite loop.

The `user_number` variable was redeclared. In Rust, this is called `Shadowing`, where you shadow the initial variable and redeclare it with a new value. You used shadowing with `let`. If you just mutate the `user_guess` variable, the Rust compiler will complain because you declared that the `user_guess` variable is of `String` type.

You trimmed the `user_guess` for any whitespace in the beginning and end of the `String` and then parsed the value (saved as `u8`).

You’ll notice that there’s a `match` upon declaring the `user_number` variable. The `parse()` method returns an `enum`, which is the `Result` type. This enum has two variants that can be either `Ok` or `Err`. If the user entered an invalid type that can’t be parsed, you’ll ask them to enter another guess rather than crashing the program. That’s handled under the `Err` with continue, which will continue the loop to the next execution. The `Ok` will return the parsed value and save it to `user_guess`.

Now you need a way to check the user’s input. You can use a basic `if-else` control flow to encode your game's logic. Every time the user guesses wrong, they’ll be asked again until they get it right and `break` the loop:

```rust
// src/main.rs

use std::io;

fn main() {
    let secret_number: u8 = 3;

    loop {
        println!("What's your guess?");
        let mut user_guess: String = String::new();
        io::stdin().read_line(&mut user_guess).expect("Error encountered while getting the user input.");
        let user_number: u8 = match user_guess.trim().parse() {
            Ok(x) => x,
            Err(_) => {
                println!("Invalid. You must input positive integers within the range 1-10 only, inclusive.");
                continue
            }
        };

        // checking the user's guess
        if user_number > secret_number {
            println!("Too big!");
        } else if user_number < secret_number {
            println!("Too small!");
        } else {
            println!("You win!");
            break;
        }
    }
}

```

Note that in Rust, `if-else` only accepts boolean types for evaluating the logic.

### Auto-generate Random Secret Number

Now that the game is working, it’s time to polish it. First, replace the hard-coded secret number with an auto-generated random number. You’ll use an external crate `rand`.

To install an external crate, edit `Cargo.toml` and add `rand = "0.8.3"` under the `[dependencies]` header:

```toml
// Cargo.toml

[package]
name = "my-project"
version = "0.1.0"
authors = ["runner"]
edition = "2018"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[dependencies]
rand = "0.8.3"

```

Run `cargo build` on either `Console` or `Shell` on the right window and let it install:

```shell

$ cargo build

```

You should see something like this:

![Rust random crate build](https://i.imgur.com/iJbMTtt.png)

Back to `main.rs`, bring the `io` library from the `rand` crate to scope. Edit the `secret_number` variable to make it generate random numbers.

```rust
use std::io;
use rand::Rng;

fn main() {
    // generates a random positive integer from 1-10, inclusive
    let secret_number: u8 = rand::thread_rng().gen_range(1..11);

    loop {
        println!("What's your guess?");
        let mut user_guess: String = String::new();
        io::stdin().read_line(&mut user_guess).expect("Error encountered while getting the user input.");
        let user_number: u8 = match user_guess.trim().parse() {
            Ok(x) => x,
            Err(_) => {
                println!("Invalid. You must input positive integers within the range 1-10 only, inclusive.");
                continue
            }
        };

        if user_number > secret_number {
            println!("Too big!");
        } else if user_number < secret_number {
            println!("Too small!");
        } else {
            println!("You win!");
            break;
        }
    }
}

```

### Add Rules 

Now add rules to the game and some directions. The user needs to guess the secret number between 1 and 10 inclusive, and they only have three chances to guess right.

Welcome your user when they open the app. Print the directions to the console and add a mutable variable `lives` to store and keep track of the user’s lives. Every time the user guesses wrong, deduct a life. If it’s `0`, the game is over. Tell them the secret number and quit the game.

```rust
use std::io;
use rand::Rng;

fn main() {
    // Welcome the users to the game w/ the directions
    println!("\n\nWelcome to the guessing game!\n\n");
    println!("Directions: Guess the number I'm thinking between 1 and 10 inclusive.\nYou have 3 lives to guess it.\nGoodluck!\n\n");

    let secret_number: u8 = Rng::thread_rng().gen_range(1..11);

    // keeps track of the user's lives
    let mut lives: u8 = 3;

    loop {
        // check if the user can still play
        if lives == 0 {
            println!("Game Over! Number is {}", secret_number);
            break;
        }

        println!("What's your guess?");
        let mut user_guess: String = String::new();
        io::stdin().read_line(&mut user_guess).expect("Error encountered while getting the user input.");
        let user_number: u8 = match user_guess.trim().parse() {
            Ok(x) => x,
            Err(_) => {
                println!("Invalid. You must input positive integers within the range 1-10 only, inclusive.");
                continue
            }
        }

        // lives will be deducted every wrong guess
        if user_guess > secret_number {
            lives -= 1;
            println!("\nToo Big!\nLives: {}\n", lives);
        } else if user_guess < secret_number {
            lives -= 1;
            println!("\nToo Small!\nLives: {}\n", lives);
        } else {
            println!("\nYou win!\n");
            break;
        }
    }
}
```

## Conclusion

You should now have a basic understanding of Rust, as well as Rust components like ‘cargo,’ variables, data types, statements and expressions, the `io` library, and ownership and borrowing. The latter concept, unique to Rust, is how it provides memory safety and better performance.

You also learned how to set up a project in [Replit](https://replit.com), a powerful IDE that you can use for a variety of applications.  

To keep learning about Rust, check the materials [on its site](https://www.rust-lang.org/learn) or join the Rust [community](https://www.rust-lang.org/community).
