---
title: Getting Started with the SpaceTraders API on Replit
author: Veronica Stork
date: 2021-12-17
cover: https://blog.replit.com/images/game_spacetraders.jpeg
categories: projects
---

[SpaceTraders](https://spacetraders.io) is an online multiplayer game where you buy a spaceship, explore space, and set up trades. But it’s not just any other space exploration game—this one you play by manipulating a [REST API](https://www.redhat.com/en/topics/api/what-is-a-rest-api). It’s a fun, interactive way for new programmers to learn and stretch their skills. 

But where should you build it?

[Replit](https://replit.com) is a collaborative, in-browser IDE that supports more than fifty programming languages and can be used on any device or OS. Replit supports GitHub integration, real-time collaboration, and the ability to create teams. It also has an active, global community of users you can collaborate with. 

This tutorial walks you through how to use Replit to play SpaceTraders. Let’s take your first steps toward the complete and total domination of galactic trade, as the [documentation](https://spacetraders.io/docs/guide) says.


## Okay—What’s SpaceTraders?

SpaceTraders.io is a unique, multiplayer game that’s played via a RESTful web API. You can play using the command line or a tool like [Postman](https://www.postman.com/), or you can use any programming language you want to automate your API calls or create your own frontend for the game. 

It’s great for learning how to use APIs, but it’s also just fun to play. The basic game mechanics are: players buy ships and travel through space to different planets, where they buy goods and sell them for profit.

This is achieved by hitting API endpoints using different HTTP methods. For example, to view a list of your ships, you send a `GET` request to `https://api.spacetraders.io/my/ships`. To buy a new ship, you send a `POST` request to the same URL along with parameters specifying the location and type of ship you want to purchase. 

## Getting Started with SpaceTraders

You can use [Replit’s browser-based IDE](https://replit.com/site/ide) to interact with the SpaceTraders API and play the game with a custom frontend client. 

If you’ve never played SpaceTraders before, you’ll need to set up an account and get an access token before you begin. 

### Setting Up SpaceTraders

When you first start playing SpaceTraders, it’s a good idea to follow their [Getting Started guide](https://spacetraders.io/docs/guide). They suggest installing the command-line HTTP client [HTTPie](https://httpie.io/docs#installation) and using that to interact with the game API. 

You can follow their instructions to generate an access token and claim a username. Continue following the guide and take out a loan, buy a ship, and buy and sell your first goods. This will help you get to know the game before you start building your client.

### Creating a SpaceTraders.io Client Using Replit

Now that you’ve set up your player account and have a basic understanding of the game, it’s time to use Replit to create a SpaceTraders client. 

For inspiration, you can check out some [SpaceTraders clients](https://github.com/SpaceTradersAPI/awesome-spacetraders) created by community members. You can build all of the functionality of the API into your client, but for the purpose of this tutorial, you will be focusing on displaying user and ship information.

First, create a new repl. You can code in almost any programming language you can imagine, but for this tutorial, you will be using [React](https://reactjs.org). 

Search for *React* in the template search bar and choose the React.js template. Give your repl a name, and hit **Create Repl**. This will bring up a new workspace.

![Repl creation modal with React.js template selected](https://i.imgur.com/WcLi1r1.png)

One way to organize your project is to create a components folder and within that, React components for each aspect of the game you would like to represent. For example, you could have a `Goods` component, a `Ships` component, a `User` component, and so on. 

![Components folder with React component files inside](https://i.imgur.com/vbHXNKd.png)

You can start to create some basic functionality by connecting to the SpaceTraders API to get player information. Start by sending a `fetch` request from the main App.jsx file to the `/account` endpoint, along with your access token as a parameter.

> This is not secure, but it’s quick and easy and will do for the purposes of this tutorial. 

In the example below, the `useEffect` hook performs the fetch request on page load, then the `useState` hook saves the object that is returned from the request. 

> Add an array as the second argument to the `useEffect` hook to make sure it doesn’t run repeatedly. 

```javascript
import React from 'react';
import '../styles.css';

function App() {
const [playerInfo, setPlayerInfo] = React.useState({});
const token = YOUR TOKEN HERE;

React.useEffect(() => {
  fetch(`https://api.spacetraders.io/my/account?token=${token}`)
    .then(response=> response.json())
    .then(data=> {
      setPlayerInfo(data);
    })
}, [])

  return (
    <div>
    </div>
  )
}

export default App;
```

Next, create a Player.jsx file in the components folder. You’ll import this file to App.jsx, which will then return the `Player` component. The following code represents the entirety of the Player.jsx file. It’s a functional component that takes in the user information object as a prop from App.jsx and displays data from that object on the frontend. 

```javascript
import React from 'react';
import '../styles.css';

const Player = (props) => {
  const user = props.info.user;
  return (
    <div className="dashboard-section"><h3>Player Info</h3>
    <ul>
    <li><strong>Username:</strong> {user.username}</li>
    <li><strong>Credits:</strong> {user.credits}</li>
    <li><strong>Ships:</strong> {user.shipCount}</li>
    <li><strong>Structures:</strong> {user.structureCount}</li>
    </ul>
    </div>
  )
}

export default Player;
```

Once you’ve finished making the `Player` component, alter your App.jsx file to import and display it. The following code only returns the `Player` component if a user exists, passing the player information to it as `info`. 

```javascript
// Add this to the beginning of App.jsx
import Player from '../components/Player';

// Add this to the return statement in App.jsx
{playerInfo.user && <Player info={playerInfo} />}
```

You should now be able to see your player information displayed on the right side of the Replit workspace. It will look something like this:

![User information displayed on frontend](https://i.imgur.com/WbF8F5z.png)

Now that you’ve fetched and displayed your user info, you can move on to displaying other information about the game. 

To display information about your ships, for instance, you will follow a very similar series of steps. 

To get a list of your ships, you can send a `GET` request to `https://api.spacetraders.io/my/ships?token=${token}` from within `useEffect` in App.jsx. `useEffect` will now contain two `GET` requests: one for the user information and one for a list of ships. 

Then you’ll use the `useState` hook to store the ship’s object in state, just like you did with the user object. 

Finally, pass the returned object to a `Ships` component as a prop. Your new App.jsx function will look like this:

```javascript
import React from 'react';
import '../styles.css';
import Player from '../components/Player';
import Ships from '../components/Ships';

function App() {
const [playerInfo, setPlayerInfo] = React.useState({});
const [myShips, setMyShips] = React.useState({});

React.useEffect(() => {
  
  // get player info
  fetch(`https://api.spacetraders.io/my/account?token=${token}`)
    .then(response=> response.json())
    .then(data=> {
      console.log(data);
      setPlayerInfo(data);
    })

// get player's ships
fetch(`https://api.spacetraders.io/my/ships?token=${token}`)
  .then(response => response.json())
  .then(data => {
    setMyShips(data);
  })

}, [])

  return (
    <div>
    {playerInfo.user && <Player info={playerInfo} /> }
<Ships myShips={myShips} />
    </div>
  )
}

export default App;
```

Your `Ships` component, which will be located in the components folder, will look similar to this:

```javascript
import React from 'react';
import '../styles.css';

const Ships = (props) => {

  const myShips = props.myShips.ships;

  return (
    <div className="dashboard-section">
    <h3>Your ships</h3>
    {myShips && myShips.map((ship) => 
      <div className="ship" key={ship.id}> 
      <strong>Class: </strong>{ship.class}<br/>
      <strong>Location: </strong>{ship.location}<br/>
    
      </div>
    )}
    </div>
  )
}

export default Ships;
```

> Note that the ships are returned in an array, so you can map over them and display details about each ship separately. Take a look at the SpaceTraders.io [API docs](https://api.spacetraders.io/) to see what each endpoint returns.

![List of ships with details about each](https://i.imgur.com/C2O0fPr.png)

You can follow a similar workflow to display other data such as your loans, information about locations, the leaderboard, and so on. 

Of course, there is more to SpaceTraders than just viewing your stats. You can set your client up to perform functions like purchasing ships, taking out loans, buying and selling goods, and more. 

For example, to purchase a ship, you can use `fetch` to send a `POST` request to `https://api.spacetraders.io/my/ships` along with the location and type of an available ship. Very similar processes can be used for purchasing goods, creating structures, and submitting flight plans.

## Conclusion

One of the wonderful things about Replit is its support for so many different programming languages, which means you don’t have to use React as we did in this tutorial. You can easily adapt this project for [Python](https://www.python.org), [vanilla JavaScript](http://vanilla-js.com), or any other language you would like. 

This article got you started with SpaceTraders, but there is so much more you can do and add to this project. You can add the ability to purchase ships and sell goods, create error handling, and make the UI look really slick. The fun part is customizing your own experience. 

