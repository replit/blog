---
title: How I Created an NPM Package to Access Amtrak's Semi-Private API
author: Piero Maddaleni
date: 2021-09-15
cover: 
categories: projects
---

Recently, I took it upon myself to both learn TypeScript and reverse engineer Amtrak's train tracking API. The result of this was the [Amtrak NPM Package](https://www.npmjs.com/package/amtrak) and my own [Amtrak Train Tracking API](https://api.amtrak.piemadd.com/). I wanted to make it easier for others to use the API, as the data received from [Amtrak's endpoint](https://maps.amtrak.com/services/MapDataService/trains/getTrainsData) isn't useable without the use of decryption, and even then the resulting data is all in one massive JSON object.

How I built this library is towards the bottom of this post, if you're more into that sorta thing, but I also highly recommend learning the library's usage works first. More detailed docs about the API and this library will always be available [here](https://api.amtrak.piemadd.com/docs), so if you want to use this library in more depth, that is where you should go.

> Note: These two examples are available in [this repl](https://replit.com/@piemadd/Amtrak-5-Lines).

## The 5 Lines
The 5 line example I'm showing here is grabbing the list of trains passing through Chicago Union Station (CHI), logging the number of trains in the returned list, and then logging the list itself. 

```js
const amtrak = require('amtrak'); // Imports the library as `amtrak`

let stationCode = "CHI"; // Station code for Chicago Union Station

amtrak.fetchStation(stationCode).then((station) => { // Fetches the data relating to "CHI" (Chichago Union Station)
	console.log(`There are ${station.length} trains going in and out of ${stationCode} today.`); // Log the number of trains going in/out of the station
	console.log(station); // Logs the entire list
});
```

Feel free to modify the three letter code in the code example (list of stations and their codes can be found [here](https://en.wikipedia.org/wiki/List_of_Amtrak_stations)), for example this is what the code for ATL (Atlanta) would look like:

```js
const amtrak = require('amtrak'); // Imports the library as `amtrak`

let stationCode = "ATL"; // Station code for Atlanta Peachtree Station

amtrak.fetchStation(stationCode).then((station) => { // Fetches the data relating to "CHI" (Chichago Union Station)
	console.log(`There are ${station.length} trains going in and out of ${stationCode} today.`); // Log the number of trains going in/out of the station
	console.log(station); // Logs the entire list
});
```

## More Detailed Example
Chances are, your application isn't going to print out the raw JSON you get from the library, so I've made a much cleaner code sample, though it does take up a whopping 20 lines (so much bloat I know /s). This example does the same exact thing, but makes the train information pretty before logging it to the console. I'm also taking advantage of the `Date` objects returned by the library to print the dates/times in a pleasing fashion and using the library's built in `tzConv()` function to convert a three-letter timezone to a fully expanded one (EX: EST => America/New_York):

```js
const amtrak = require('amtrak');

let stationCode = "CHI"; // Station code for Chicago Union Station

amtrak.fetchStation(stationCode).then((station) => {
	console.log(`There are ${station.length} trains going in and out of ${stationCode} today.`)

	station.forEach((train) => {
		let optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: amtrak.tzConv(train.tz) };
		let optionsTime = { timeStyle: "short", timeZone: amtrak.tzConv(train.tz) };

		console.log(`Train Number: ${train.trainNum}`);
		if (train.schArr) {console.log(`Train scheduled to arrive on ${train.schArr.toLocaleString('en-US', optionsDate)} at ${train.schArr.toLocaleString('en-US', optionsTime)} ${train.tz}`)};

		if (train.schDep) {console.log(`Train scheduled to depart on ${train.schDep.toLocaleString('en-US', optionsDate)} at ${train.schDep.toLocaleString('en-US', optionsTime)} ${train.tz}`)};

		if (train.postArr) {console.log(`Train arrived on ${train.postArr.toLocaleString('en-US', optionsDate)} at ${train.postArr.toLocaleString('en-US', optionsTime)} ${train.tz}`)};

		if (train.postDep) {console.log(`Train departed on ${train.postDep.toLocaleString('en-US', optionsDate)} at ${train.postDep.toLocaleString('en-US', optionsTime)} ${train.tz}`)};
		console.log("");
	})
})
```

## How I Built The Library

Chances are you're also wondering how I built this library. [Amtrak's endpoint](https://maps.amtrak.com/services/MapDataService/trains/getTrainsData) returns a single, massive, encrypted JSON object. While the decryption is only a few lines long, understanding how to do it is what made my brain go numb. I ended up resorting to [this hackernews thread](https://news.ycombinator.com/item?id=17605290), in which one of the commenters uncovered how the encryption functioned. After a few hours and a head-shaped dent in my desk, I had these semi-cursed lines of code written: 
```js
const decrypt = (content: string, key: string) => {
	return crypto.AES.decrypt(
		crypto.lib.CipherParams.create({ ciphertext: crypto.enc.Base64.parse(content) }),
		crypto.PBKDF2(key, crypto.enc.Hex.parse(sValue), { keySize: 4, iterations: 1e3 }),
		{ iv: crypto.enc.Hex.parse(iValue) }
	).toString(crypto.enc.Utf8)
};

const data = await axios.get(dataUrl);
const mainContent = data.substring(0, data.length - masterSegment);
const encryptedPrivateKey = data.substr(data.length - masterSegment, data.length);
const privateKey = decrypt(encryptedPrivateKey, publicKey).split('|')[0]
const { features:parsed } = JSON.parse(decrypt(mainContent, privateKey));
```

Now that I had a massive, 900KB JSON object, I could start cleaning the data and making it easy to use. One of the first (and easiest) problems I had to tackle was the data types used in the object.


```js
{
    "coordinates": [
      -121.81821231083048,
      38.01807522955585
    ],
    "OBJECTID": 664932,
    "lon": null,
    "lat": null,
    "gx_id": "1021404",
    "ViewStn2": null, //train time WHEN IT ACTUALLY EXISTS
    "ViewStn1": null, //eastern WHEN IT ACTUALLY EXISTS
    "StatusMsg": "SERVICE DISRUPTION",
    "EventSchDp": null, //i forgor 💀
    "EventSchAr": null,
    "Heading": "E",
    "LastValTS": "8/25/2021 2:54:12 PM", //WHERE DA TRAIN IS
    "EventTZ": null,
    "EventT": null,
    "EventDT": null,
    "EventCode": "MTZ",
    "DestCode": "OKJ",
    "OrigCode": "BFD",
    "RouteName": "San Joaquins",
    "TrainState": "Active",
    "OriginTZ": "P",
    "OrigSchDep": "8/25/2021 8:12:00 AM", //ORGIN TIMEZONE BRUH
    "Aliases": null,
    "updated_at": "8/25/2021 6:22:51 PM", //EASTERN ALWAYS???
    "created_at": "8/25/2021 6:22:51 PM", //EASTERN ALWAYS???
    "CMSID": "1241245650084",
    "ID": 1021404,
    "TrainNum": "713",
    "Velocity": "0.915229976177216",
    "Stations": {}
}
```

It seems like the developers decided that storing certain variables as strings, seemingly at random, was the way to go. So, for example, you'll see the coordinates returned as floats, but the velocity is a string?

Additionally, the Dates are returned as strings, not even in a standardized format such as ISO-8061. Speaking of dates, this was my next problem. While I could create a new `Date` object and pass this string, I don't know which timezone each date is from, much less daylight or standard time. So I made a little function that figures out whether daylight or savings time is observed in the US to fix the daylight savings issue. 

In terms of timezones, it was much more complex. While I have the timezone where the train starts and know some times which are always in eastern time, there are a few times in an unknown timezone, that of the train's location. To get this timezone, I used the rough difference between the time the train sent data last (train time) and when the train's information was updated in Amtrak's database (eastern time). 

After all of the data is cleaned, I can return the data, also in a single massive object, but this time the data is easier to work with. However, I knew that downloading all of the data for every Amtrak train wasn't the cleanest solution. So I decided to use this library to create a REST API to host the data to fix this. Doing so allows developers from any language to interact with Amtrak's tracking data and reduce the amount of data needed to download. As I knew this functionality was handy, I implemented the endpoints back into the Amtrak library, meaning I bootstrapped my library with itself.

I hope you enjoyed my sorta-in-depth tutorial and explanation of Amtrak.js, have fun building!