---
title: Replit²
author: Guillaume St-Pierre
date: 2021-08-06
categories: infra
---

Replit has _many_ use cases and features, but one that's less talked about is its ability to serve as a secure compute environment for specialized apps. What if you want to build some tool that will generate code, then execute it for your users? Or maybe you are building a specialized online IDE that injects code for users, then executes the bundle? With Replit, you can start building those kinds of applications quickly without having to focus on building a fast and secure backend. Build the frontend, we'll provide the compute power.

That's a great promise, but it's not one that is fully documented. Well, now that is a thing of the past! Let's explore how Replit can serve as your compute backend by building a **very** basic Replit clone.

**UPDATE 2021-08-16**: Please check the section [on Security](##about-security) at the end of this post, more details were added and the post was clarified thanks to the help of [@AmazingMech2418](https://replit.com/@AmazingMech2418).

## Building a compute node
A compute node is a single unit (usually a single server, VM, container, or application) of computing power than can execute work. In our case, a compute node will be a single Repl that can execute arbitrary code using an API. We'll be using the Koa.js framework and python in this post.

Let's start by creating a new Nix repl. Why Nix in particular? Nix allows us to install any package that can be found on the official [Nix package registry](https://search.nixos.org/packages). This give us the ability to install any language interpreter or binary we want, provided said language is able to execute arbitrary code. With minimal work, we'll be able to implement multiple languages in our compute backend and execute them through our API.

Here are the steps to create and configure the Nix Repl for our compute node.

1. Select the [Nix (beta)](https://replit.com/new/nix) language, give the Repl a relevant name, like `compute-node`, and open that Repl.
2. Once the Repl is created, open the `replit.nix` file and replace the `cowsay` package with `nodejs`. 
3. Open the `.replit` file and replace the run command with `npm start`. 
4. Press the run button to install the Nix packages in your environment. This should only take a few seconds.
5. When the packages are installed, go to the shell and type `npm init`. Follow the instructions on screen to get the `package.json` file ready, the default options should be enough to get started. 
6. Type `npm install koa koa-body @koa/router`. This will install the Koa.js packages for setting up the server, a router, and a way to parse the JSON body of requests. 
7. Replace the `scripts` configuration in the `package.json` file with this:

```json
  "scripts": {
    "start": "node server.js"
  },
```

We're now ready to get started, let's start by creating a `server.js` file at the root of the REPL. Copy the following code in this new file.

```js
// server.js
const Koa = require('koa');
const koaBody = require('koa-body');
const Router = require('@koa/router');

const app = new Koa();
const router = new Router();

router.get('/', async ctx => {
  ctx.body = 'Hello, World!';
});

app
  .use(koaBody())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000);
```

This sets-up a simple API that will print a `Hello, World!` message on the screen when the `/` route is accessed. The `koa-body` package will parse the raw body into JSON if `application/json` is given as a `Content-Type`. Try pressing the run button in the Repl, it should load, then display a `Hello, World!` message in the web preview window.

This compute node will run python scripts on demand using the API. To set this up, we have to write a small python script that will take the command as an argument and execute it in an isolated environment so critical errors should not cause our node to go down. Go to the `replit.nix` file and add the `python` package, it should look something like this:

```nix  
# replit.nix
{ pkgs }: {
	deps = [
		pkgs.nodejs
        pkgs.python
	];
}
```

Press play to update the Repl environment, create a `eval.py` file at the root of the Repl and copy the following code into it.

```py
# eval.py
import code
import sys

while True:
  line = sys.stdin.read()
  interpreter = code.InteractiveInterpreter()
  interpreter.runcode(line)
  break
```

This script creates a CLI tool that will wait on stdin for a command, which should contain the python expression. It will then create an interactive interpreter - a pretty obscure part of python which is used to provide the interactive REPL when you type `python` in a terminal - and run the code in that interpreter. You can test this by going into the shell and typing `python ./eval.py` followed by `print('hi')` and enter, it should print `hi` as the result of the interpretation. Why do we use stdin rather than an argument? This is to prevent potential shell script injections. We'll see very quickly why.

With this script in hand, let's go back to our node server and add a `PUT` route to process commands through this python interpreter.

```js  
// server.js
const Koa = require('koa');
const koaBody = require('koa-body');
const Router = require('@koa/router');
const childProcess = require('child_process');

const app = new Koa();
const router = new Router();

router.put('/', async ctx => {
  const body = ctx.request.body;

  if (!body.command) {
    ctx.status = 400;
    ctx.body = `400: Command must be defined`;
    return;
  }
  
  // Start a promise so we can easily await with the new ES6 syntax
  const { stdout, stderr } = await new Promise((resolve, reject) => {
    let result = '';
    // Spawn a child process, executed separately from the main process.
    const process = childProcess.spawn('python', ['eval.py']);
    // Feed the command we received through stdin
	process.stdin.end(body.command);

	// Listen to any output
    process.stdout.on('data', data => {
      result += data.toString(); 
    });

	// Wait for the process to close
    process.on('close', code => {
      resolve(code === 0 ? 
        { stdout: result, stderr: '' } 
        : { stdout: '', stderr: result }
      );
    });
    process.on('error', err => {
      reject({ stdout: '', stderr: err.toString() });
    });
  });

  ctx.status = 200;
  ctx.set('Content-Type', 'application/json');
  if (stderr) {
    ctx.body = {
      result: stderr,
    };
    return;
  }

  ctx.body = {
    result: stdout,
  };
});

app
  .use(koaBody())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000);
```

Why `PUT`? `PUT` requests are intended to be idempotent, meaning that a request will always result in the same output when given the same input. `POST` requests could have different outputs, which is not really what you'd expect from an interpreter. If I send `1+1`, I expect to always receive `2` as my output.

In the server code, we changed the code from the `Hello, World!` endpoint to instead process a python command. Using the `child_process` package from Node.js, we spawn an execution of our eval script using the python binary and give it our evaluation script once started. We await the result of the execution and process whatever is returned, depending on if the process returned an error or not. Press the run button again to update the server. 

Let's test this with CURL, open the shell in the REPL and run this command:  
  
```bash
curl --header "Content-Type: application/json" \
  --request PUT \
  --data '{"command":"print(\"hi\")"}' \
  <YourREPLName.repl.co>
```

This should return `{"result":"'hi'\n"}`!

You can also run more complex code, like this example:

```bash  
curl --header "Content-Type: application/json" \
  --request PUT \
  --data '{"command":"i = 1\nfor line in range(100):\n\ti += i * line\n\tprint(i)"}' \
  <YourREPLName.repl.co>
```

This should print a fancy pyramid of numbers. You can also try crashing the server by increasing the range to 1000, this will cause a buffer overflow on python's end (Due to the size of i) and trigger an error in the compute node. You will notice that this critical error will not crash our entire node, only the python process.

But why did we have to spawn and pass the command in stdin, couldn't we have executed python directly with the script? The issue with `child_process` is that it will execute the command given without any cleanup. this means that we could inject bash script in the command and have spurious code run on the server. Imagine a command like this:

```bash  
curl --header "Content-Type: application/json" \
  --request PUT \
  --data '{"command":"&& kill 1 && echo"}' \
  <YourREPLName.repl.co>
```

If we used something like `childProcess.exec('python', body.command)`, this would execute python, then bypass it and kill the current process. This is not great and opens up the server to a whole lot of injection attacks. Spawning and sending the command through stdin alleviates this a little. See [About Security](##on-security).

We now have a complete compute node ready to go! Feel free to test it out or try adding more languages before we move to the next part of this post.

## Node clustering
Having a single compute node is great, but this could start to break down when this service start receiving thousands of requests with slow scripts. The previous example can take a few seconds to process due to the nature of our compute node and having a thousand processes running this same script is likely to overflow our Repl. To fix that, let's implementing node clustering so we can distribute the load equally over multiple Repls.

First, let's fork the compute node Repl and remove python from `replit.nix`. Next, open the shell and type `npm install node-fetch` to install the fetch package for Node.js to be able to call our compute nodes' APIs. Finally, open the `server.js` and replace the `PUT` route with this code.

```js
// server.js
// All other imports go here
const fetch = require('node-fetch');

router.put('/', async ctx => {
  const body = ctx.request.body;

  if (!body.command) {
    ctx.status = 400;
    ctx.body = `400: Command must be defined`;
    return;
  }

  const escapeHTML = txt => txt.split("<").join("&lt;").split(">").join("&gt;");

  const result = await fetch('<compute node URL>', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      command: escapeHTML(body.command),
    }), 
  });
  
  if (result.status !== 200) {
    ctx.status = result.status;
    ctx.body = `Invalid command or malformed expression, please retry\n ${await result.text()}`;

    return;
  }

  const response = await result.json();

  ctx.body = response.result;
});
```

This code will send a fetch request to our single compute node and pass the command along, escaping any HTML code to prevent XSS attacks. Replace `<compute node URL>` in the fetch call with the URL of your compute node, then press play. This should start another server, which can be called with our CURL commands from the previous section by replacing the URL with this new Repl's URL. It should return the same result as when we called the node directly.

Now that we have a proxy, we can start thinking about how we want to process usage and distribute the load on all nodes. Clustering can be done in many different ways, but for the needs of this post, we'll be using the Replit database to store usage across all events on Node.js. We will be saving how many concurrent calls are being processed on every compute node and then choosing the node with the smallest amount of concurrent calls when sending a command. We'll also add a limit to block any further request on a node if that limit is hit to prevent overloading any single nodes.

Let's start by creating the code to store and retrieve the usage data from the Replit database. Go to the shell and type `npm install @replit/database`. Once that is installed, go back to the `server.js` file an let's add the following async function to the code.

```js
// server.js
// All other imports are here...
const Client = require("@replit/database");

db = new Client();

const nodesUrl = ['<YourREPLName.repl.co>'];
const usageThreshold = 100;

const callNodeFromCluster = async (command) => {
  // Get the usage for all our nodes
  let usage = await db.get("usage");
  
  const nodeUrl = nodesUrl[0];
  // Select the URL with the smallest usage
  nodesUrl.forEach(url => {
    if (usage[url] < usage[nodeUrl]) {
      nodeUrl = url;
    }
  });

  // Increase the usage of that node by 1 and save
  usage[nodeUrl] += 1;
  await db.set("usage", usage); 

  // If usage gets above our threshold, throw an error
  if (usage[nodeUrl] > usageThreshold) {
    throw new Error('No more nodes available in eval cluster');
  }

  // Fetch code from earlier
  const result = await fetch(nodeUrl, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      command,
    }), 
  });

  // Once complete, refetch the usage and decrease it by 1 (It might have changed since then)
  usage = await db.get("usage");
  usage[nodeUrl] -= 1;
  await db.set("usage", usage); 

  return result;
}

// Rest of the code goes here...
```

This async function will select between all the nodes we have available (We only have 1 right now). To add more nodes, we only have to fork the original compute node and add its URL to the `nodesUrl` array. Let's connect this function to the proxy endpoint above by replacing the content of the `PUT` route.

```js
// server.js
router.put('/', async ctx => {
  const body = ctx.request.body;

  if (!body.command) {
    ctx.status = 400;
    ctx.body = `400: Command must be defined`;
    return;
  }

  const escapeHTML = txt => txt.split("<").join("&lt;").split(">").join("&gt;");

  try {
    const result = await callNodeFromCluster(escapeHTML(body.command);

    if (result.status !== 200) {
      ctx.status = result.status;
      ctx.body = `Invalid command or malformed expression, please retry\n ${await result.text()}`;

      return;
    }

    const response = await result.json();

    ctx.body = response.result;
  } catch (err) {
    console.error(err);

    ctx.status = 500;
    ctx.body = `Could not process your request, please try again\n ${err.toString()}`;
  }
});
```

We wrapped the call in a `try/catch` block to account for the error we throw when the threshold is reached in `callNodeFromCluster`. Restart the server using the run button and try this with the CURL command from the previous section, it should still work as intended.

The next logical step would be to add some metrics to calculate the average load on each node and add alerts in our reporting service to let us know when we need to add more nodes. Adding a node is still a manual step, but it will be totally seamless for any consumer of this API.

## Creating an interface
Talking about consumers, our compute cluster only works when called with an API. We want our users to have some sort of interface where they can input their python expressions and get the result using our compute API. Let's build a [web component](https://developer.mozilla.org/en-US/docs/Web/Web_Components) that can do just that.

First, let's create a `client` directory in the compute cluster Repl and create a `index.js` file there.

```js
// ./client/index.js
class ReplEval extends HTMLElement {
  constructor() {
    super();

    this.loading = false;
    this.result = null;

    this.command = '';

    this.render();
  }

  eval(event) {
    event.preventDefault();

    this.result = null;
    this.loading = true;

    this.command = this.querySelector('#input').value;

    this.render();
    fetch(`/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        command: this.command,
      }), 
    }).then(result => result.text()).then(result => {
      this.result = result;
      this.loading = false;
      this.render();
    });
  }

  render() {
    this.innerHTML = `
      <div>
        <h1>Welcome to Replit, built on replit</h1>
        <form id="eval-form">
          <textarea name="input" id="input" type="text" placeholder="Enter your expression here" value="${this.command.replaceAll(/"/gi, '&quot;')}" ></textarea>
          <button type="submit">Eval</button>
        </form>
        ${this.loading ? `
          <div class="loading">
            Processing expression...
          </div>
        ` : ''}
        ${this.result ? `
          <pre class="eval-result">result: ${this.result}</pre>
        ` : ''}
      </div>
    `;

    this.querySelector('#eval-form').addEventListener('submit', this.eval.bind(this));
  }
}

customElements.define('repl-eval', ReplEval);
```

This web components has a few moving parts. In the `render` method, we render the small form as a child node of that component with a text area for writing the expression and a button to submit the form. If we are processing an expression, we'll show a small loading indicator and if we have received the result of an expression, we'll also show that result in a `pre` tag. Since we print the command as is in the value of the text area, it may cause issues if that command includes double quotes (Since HTML attributes are separated with double quotes). We escape these quotes by replacing them with the `&quot;` special HTML character.

At the end of the `render` method, we bind the `submit` event of our form to the `eval` method of our component. This method will first block the submit event from refreshing the page, then it will fetch the data from our form and send it to our cluster server using the `fetch` API. We make sure to rerender the view when we change the value of `loading` and `result` to make the interface a bit more dynamic.

Next, let's create a `index.html` file in the `client` directory to load the script we just wrote and add our web component to the page.

```html  
<!-- ./client/index.html -->
<!DOCTYPE html>
<html>
  <head>
    <title>Replit on Replit</title>
  </head>
  <body>
    <repl-eval></repl-eval>
    <script src="/client/index.js"></script>
  </body>
</html>
```

All we need now is to show this views as the base route of our API. Let's go back to the `server.js` file and add those two routes after our `PUT` route.

```js
// server.js
const { createReadStream } = require('fs');
// All other imports go here...

// PUT endpoint...

router.get('/', async ctx => {
  ctx.type = 'html';
  ctx.body = createReadStream('./client/index.html');
});

router.get('/client/index.js', async ctx => {
  ctx.type = 'js';
  ctx.body = createReadStream('./client/index.js');
});  
  
// Rest of the app code...
```

These two routes will serve our client files as streams to the browser when requested. Since the HTML file loads the JavaScript file as an external script, we also need a route to serve that file. Restart the server with the run button and you should see the component being loaded into the web preview window. We can now drop CURL and start typing the code directly into the text area (The `i * line` loop is especially fun to look at).

## About security
The initial version of this post had some mentions of this compute system being secure as it runs inside Replit's secure environment. This is not entirely true and could be misleading. Thanks to the code running in replit, there are no risks than any attack will hurt your infrastructure, we take care of this for you. This code is open to other vectors of attack however. Anyone gaining access to the eval script (for example, by managing to run some bash script on the server and replacing its content through `curl`) could change its content and send spurious result to your users. This is till possible if done through the python code itself, since the interpreter's access to the file system is not restricted. Some of these security issues were addressed, but this post is not intended as a tutorial on how to create a _completely secure_ compute environment, this is left to the discretion of the reader (or maybe a part 2).

If you intend to use this code for an app or product, make sure to check for potential vector of attacks and ask a professional. I would never dare call myself a security pro! If you notice any security issues with this post, please forward them to our contact email contact@repl.it and mention the title of this blog post, or comment directly on the example Repls. I will be happy to address any security issues that come up.

## Conclusion
We created a complete compute node cluster that can execute python code on multiple nodes with load balancing. We even added a basic interface over our cluster to make it easy to test out and start coding. Creating the same kind of application outside Replit would have taken far more lines of code (and a multipart blog post). While we could use some cloud VM for each node and execute python code directly in the VM through the same set-up, this would be even less secure than our own nodes as it would not be running in the secure container environment that Replit provides. We would have had to build that ourselves.

But now that we have built this compute cluster, what's next? First, we'll want to work on securing this whole system. It is potentially wide open for attacks and definitely shouldn't be deployed to production as-is. Then, we'll likely want to add some secret key authentication for communication between our compute nodes and the compute cluster. Nodes should not be called individually and only the cluster should have the ability to talk to the nodes. Next would be adding some health checks on the nodes before we decide if we can use it in the cluster: we don't want to send commands to dead nodes.

Finally, the obvious next step is to add more languages! Thanks to the power of Nix, we can install as many interpreters as we want. We could even set-up some logic to compile non-interpreted code before we try to execute it.

If you're interested in seeing more languages in action, this post was created from the proof of concept I built on Replit. We have the [compute node](https://replit.com/@replitguillaume/compute-node#eval.py) Repl and the [compute cluster](https://replit.com/@replitguillaume/compute-proxy#app.js) Repl, with some modification for testing purposes. Check them out!

