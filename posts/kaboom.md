---
title: Introducing Kaboom
author: Tiga Wu
date: 2021-04-06
categories: product
---

> Games are awesome, making games is even more awesome. I love making games, making games makes me happy, being happy makes me make better games, i hope everyone can be happy and enjoy making games!
-- me, today

![kaboom](https://blog.repl.it/images/kaboom/kaboom.png)

We at replit are thinking about ways to make programming more accissible, Kaboom is an effort to try make game making more accessible and fun for both beginners and intermediate programmers. I want to discuss some core designs of both the library and the editor here.

(it's strongly recommended first check out some examples on the kaboom website to get a quick taste of what kaboom looks like)

[Official website](https://kaboomjs.com/)

[Marketing page](https://replit.com/kaboom/)

<div style="text-align: center;">
<iframe width="560" height="315" src="https://www.youtube.com/embed/xF3--Ec_E-0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

## Flexible Component System

Kaboom draws some inspiration from ECS and used a composable component approach to describe game objects. You create a game object like this:

```js
const player = add([
	sprite("froggy"),
	pos(20, 20),
	body(),
	"killable",
	{
		health: 100,
		speed: 240,
	},
]);
```

each function in the list is an component, each component gives the game object soome behavior. For example, the `sprite()` comp tells the object what to draw, the `pos()` comp tells object where to draw, the `body()` comp tells the object that they should follow physics rules and fall by gravity. Raw objects are custom fields that gets directly assigned to the returned obj, raw strings like `"killable"` are tags which could be handy when defining group behaviors, we will talk about it later.

Each comp also provides the game object with certain methods and data, for example, `pos()` gives the object method `move()` to change position

```js
keyDown("left", () => {
	player.move(-player.speed, 0);
});
```

`sprite()` gives the object methods to play animation that's loaded with `loadSprite()` before

```js
player.play("jump");
```

`body()` gives the object a `jump()` function to jump

```js
keyPress("space", () => {
	if (player.grounded()) {
		player.jump();
	}
});
```

under the hood, components are really simple, they're just functions that return an object, a slight simplified `sprite()` looks like this:

```js
function sprite() {
	return {
		curAnim: null,
		frame: 0,
		add() {
			// add a default area() component on start
			this.use(area(/* calc  */));	
		},
		update() {
			// player anim (increase frame counter)
			if (this.curAnim) {
				this.frame += 1;
			}
		},
		draw() {
			// invokes the lower level draw function
			drawSprite(/* data */);
		},
		play(anim) {
			this.curAnim = anim;
		},
	};
}
```

there are special lifecycle functions like `add()`, `draw()` and `update()`, other functions and data are directly assigned to the game object itself.

## Describing Behaviors

![blocky](https://blog.repl.it/images/kaboom/blocky.png)

Kaboom provides a lot of primitives to describe behaviors, for example, the most function you'll be using might be

```js
const player = add([
	// ...
]);

player.action(() => {
	player.health -= 1;
});
```

`obj.action()` takes in a function and runs it everyframe as long as the object still exists in scene (not `destroy()`ed). 

Remember you can give object tags by directly passing strings as components? Tags are powerful tools when defining behaviors of certain type of objects, e.g.

```js
add([
	sprite("notmark"),
	"enemy",
]);

action("enemy", (e) => {
	const dir = e.pos.sub(player.pos).unit();
	e.pos = e.pos.add(dir.scale(ENEMY_SPEED));
	// i know no operation overloading sucks..
});

collides("enemy", "killable", (e, k) => {
	destroy(e);
	destroy(k);
});
```

when we're creating enemies, we can give it an `"enemy"` tag and define behaviors for all objects that have tag `"enemy"`, in this case we're making all enemies move toward the player every frame, and check collision between all `"enemy"` and `"killable"`s, and destroy them both when any 2 of them collides.

the input handlers are also written in a similar fashion, making the overall code look blocky and event driven

```js
keyPress("k", () => {
	// ...
});

mouseClick(() => {
	// ...
});
```


## Helpers

![level](https://blog.repl.it/images/kaboom/level.png)

Helping people is considered nice, and it's nice for a library to help out the developers! Kaboom provides some small helpers to build certain features easily, for example there's this `addLevel` function that let's you draw a level with ascii art and define what each symbol means, like

```js
addLevel([
	"        $    ",
	"      ====   ",
	"             ",
	"     ^^      ",
	"=============",
], {
	// defining grid size
	width: 12,
	height: 12,
	// defining what each symbol means
	"=": [
		sprite("ground"),
		solid(),
	],
	"$": [
		sprite("coin"),
		"coin",
	],
});
```

with the handy component system, we just define each symbole as a list of components.

## Integrated Environment

![editor](https://blog.repl.it/images/kaboom/editor.png)

Finally get to Kaboom on replit!

Inspired by the Fantasy Consoles, we're thinking building an environment dedicated for building games, with replit's powerful infra on code editing, sharing and collab, it could become an exciting game making scene. The Kaboom replit is an integrated environment where you can edit and manage all your code + assets, and run game in one place. There's the classic code editor and runner, and there're sprite managers, sprite editor, debugger, in the future even sound editor and music makers. The editor is still in early dev, expect exciting features and improvements to come!

![pedit](https://blog.repl.it/images/kaboom/pedit.png)

## Debug Tools

![debug](https://blog.repl.it/images/kaboom/debug.png)

Kaboom editor on replit also provides UI for kaboom's debug abilities, for example, you can enable

- "Show Area" to draw a bounding box on every object with an `area()` component
- "Hover Info" to enable hovering an object to inspect its states, 
- "Time Scale" to scale the time, enables you to run the game in slow / high motion
- "Pause" to pause the game at any moment
- "Step Frame" to proceed to next frame, handy when paused



Hope kaboom can help you guys make some cool stuff, happy game making!

![chill](https://blog.repl.it/images/kaboom/chill.png)