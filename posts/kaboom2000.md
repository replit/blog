---
title: New Kaboom Workspace
author: Tiga Wu
date: 2021-09-09
categories: product
---

![kaboom2000](https://blog.repl.it/images/kaboom2000/kaboom2000.png)

We made a better kaboom workspace on replit.

![workspace](https://blog.repl.it/images/kaboom2000/workspace.png)

![create](https://blog.repl.it/images/kaboom2000/create.png)

(choose "Kaboom" under Templates here instead of "Kaboom (beta)")

- **No weird delay when run after editing.** Just press Cmd + S to refresh webview and quickly iterate!
- **Helpful error reporting.** No need to go into browser console every time. The kaboom console displays your errors nicely.
- **Support NPM packages and typescript by default.** Kaboom dev server builds your code with esbuild on the fly.
- **Replit DB and Auth integration.** Make a score board even multiplayer with DB and Auth!
- **In editor tutorial.** The template comes with a nice intro tutorial which you can learn and code along.
- **Autocomplete.** Updated kaboom lib comes with detailed jsdoc for every function. No need to pull your hair out to figure out how certain functions work!
- **HTML template.** Easily customize the html for your game.
- **Total control over which version of Kaboom you use.** it's managed by NPM.
- **Assets Library** Grab some quick assets to test out a game idea.
- **Transparent dev server.** The dev server scripts are just in the repl, customize them or toss them out if you want to. Or turn it into a multiplayer game server!
- **New library version** The template comes with kaboom2000 (beta), with bunch of [new stuff and improvements](https://github.com/replit/kaboom/blob/master/CHANGELOG.md)

## Migration Guide

- One big difference is now kaboom is not generating everything for you. While it's nice to have, it makes things very uncustomizable with no escape hatch. Now you'll be doing the full kaboom experience including initialization and assets loading, starting by calling the `kaboom()` function

```js
import kaboom from "kaboom";

// initialize context
kaboom();

// load assets
loadSprite("bean", "sprites/bean.png");
loadSound("coin", "sounds/coin.mp3");

// start making the game
const player = add([
	sprite("bean"),
	area(),
]);
```

For easier assets loading, use the "Insert load code" option in the asset entry option menu.

- The template by default is running `kaboom@next`, which is currently the beta version of kaboom2000. It contains breaking changes, all listed in [CHANGELOG.md](https://github.com/replit/kaboom/blob/master/CHANGELOG.md). If you don't feel like migrating now, you can always `npm install kaboom@5.1`

Check out yk's [video tutorial](https://www.youtube.com/watch?v=hgReGsh5xVU) on how to make a flappy bird game, with the new template!

**Create a kaboom repl with the new template [right now](https://replit.com/@replit/Kaboom)**