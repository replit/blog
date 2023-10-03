---
title: Audio - Play sound in any language on the web
author: Wade Bourne
date: 2020-7-31T08:15:20.856Z
cover: https://repl.art/music-01.png
categories: product
---

Audio brings games and projects to life! Web developers have it easy, they can publish their apps on the web and play audio using the browser API no problem. However, what about those of us that are command-line and graphics apps in other languages? Repl.it is a special place on the web where you can publish any app in any language, but so far it’s been missing audio capabilities because code executes in a container on the backend. This summer, for my internship I set out to solve this problem and make it possible to play audio in any repl in any language. In this post I’ll show you how to play audio in your repl and then I will chronicle the journey that got us here. 

![music art](https://repl.art/music-01.png)
## How you play audio

Before we get to the technical parts, let's talk about how you can use audio in your app or game.

As of this writing we support two libraries: Python and JavaScript. The Python library is built right in so you shouldn't need to install it. However, the JavaScript library you'll have to install and you can do that by simple importing (`@replit/audio`).

You can learn more on our [docs for audio](https://docs.repl.it/repls/audio).

Let’s take a look at a quick demo before I tell how it all works:

<iframe height="400px" width="100%" src="https://repl.it/@turbio/audio-js-demo?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## How it works

It started out with an idea, I wanted to add audio to Repl.it because I wanted to use it and many users were asking for it, so it seemed like a good project to take on.  To be honest, I thought it was going to be a lot easier than it turned out to be. I thought I’d just throw in a Pulseaudio stream over TCP, play it in the browser, and be done with it. I was wrong. But who would’ve thought that real-time audio streaming from an isolated Docker container using fake audio devices without the use of an always-on daemon would be difficult? I sure didn’t.

At first, my goal was to get something simple that worked. My first attempt was to use a combination of portaudio and loopback devices native to the host machine but isolated to each container but that didn’t end up working because the infrastructure was far too complicated to be maintainable and we’d have to install C libraries for each language so they could play audio. Moving on.

My second attempt was to prototype something so I could see how I could build the client. I wanted to make sure that I had at least one part of the setup correct.  For this attempt, I just searched for files named “PlayMeAudio.wav (or .aiff)” which would be decoded and sent to the client in a buffer when the client opened the repl. Although this worked, it was only a prototype and we didn’t ship it.

For my third attempt, I figured I’d decode the audio and relay that to the client via a pipe file. Although this worked, it was using a ridiculous amount of CPU in Python and just simply not fast enough. I had concerns it might be an issue in other languages as well.

For my final and fourth attempt, I made a request based system. Instead of decoding the audio files in userland and putting a strain on resources, I’d have the user language tell me which files to play, and we’d do the heavy lifting in Go, which is the language that we write the container service in, which we call PID1.  Although the code was a mess, it worked and ended up being the first version of audio we released to explorers, despite its many shortcomings.

Although it worked, this attempt had three issues: 
All files had to be at a sample rate of `44,000` hertz
All files had to have a bit depth of `32`
Only `.aiff` and `.wav` files were supported.


The reason for the first issue was that I couldn't find a good polyphase filter (for sample rate conversion) and I needed a C library to cross compile. This proved to be challenging, as we needed to static link it and it had libm as a dependency, which means we’d have to static link all of libc -- more on that later.  I ended up having to dynamically build it. Including its source wasn't an option because it had very large generated files, so I had to build it before we built PID1, more on this later on.

For the second issue, I really didn’t have an excuse other than not really understanding bit depth, but once I did I was able to quickly fix it.

For the third one, it wasn't so much that those files were the only ones supported - it was more so that we didn’t support `.mp3` files- for this, I ended up needing to use C again. I used minimp3 library and its Go bindings.


I also had plans to include `.opus` file support, so I was going to need another C library… Well to clarify, I needed both opus and opusfile. Opusfile requires opus, which requires OpenSSL, so I had to build OpenSSL the build opus and opusfile, without root. Well needless to say, this was starting to get a bit ridiculous to do more than once. I made a [github repo](https://github.com/repl-it-discord/audio/) which would serve as a repo to house all the C libraries we needed along with the Go bindings, and I included a file I found from a source that would let me static link libm without all of libc. 

After all of this, we have the dependencies resolved, and everything sounds good - except for one thing: Changes in audio take `~.74` -  `~1.48` seconds to take effect. Why? Well we were sending audio in chunks, instead of streaming. Every `~.74` seconds, we prepare audio and send exactly `32,768` samples (`2^15`, no particular reason for this magic number other than the buffer rarely runs out and the latency isn't unbearable) but this wasn't enough.  

The client was designed to append audio samples at the end of what it had scheduled, so what I did was send audio initially and then immediately send it again, so we’d give the client  `65,536` samples at the start, and send an additional `32,768` samples every `~.74` seconds. Where did I get `.74` seconds from? As we are playing the audio at `44,100` hertz, we play `44,100` samples per second - so `32,768/44,100`. 

This setup was great for smooth audio, but I felt that the latency makes your repl experience feel rather shoddy. I mean, imagine you’re playing a game, you open the chest and go through a door. Once you go through the door, the sound from the chests plays because you as a user have that `.74` - `1.48` second buffer, which just makes using audio for games useless for anything other than background music.

So we had to rewrite this and unfortunately to solve the timing issue we had to complicate the solution. We made the server send overlapping buffers of samples and the client used a timing system along with a sample index the server sent to calculate and compensate for latency and try to make it “real-time” streaming.

Now I know this is hard to understand, in fact I was told it was also hard to code review, so I’ll do my best to illustrate it. 

Normally, this is how our makeshift stream would look:
```
Message 1: 1 2 3 4 5
Message 2:         5 6 7 8 9 
Message 3:                 9 10 11 12 13
...
```
This keeps us from audio cutting out due to (network) latency (to an extent), allowing us for smaller buffer sizes without as much (audio) latency

That alone isn't very special, what's really the star of the show is for the server to be able to send:
```
Message 1: 1 2 3 4 5  
Message 2:   2 3 4 5 6
Message 3:           6 7 8 9 10
```
The client is where the difficult processing for this takes place, when we receive new samples we immediately stop playing and start playing those samples… well… mostly. 

You see, there's still the one thing that we can’t control. Networking.  Maybe there's a `.1` second delay for one of the messages, well now look - we’re playing audio we already played!

So now the client has to calculate LATENCY too, which is even MORE difficult. At this point, we’re on multiple devices, and we need less than a `1/44,100` second difference in time in order to figure this out! That seemed too hard. Instead, what I did was give each message in the protocol the sample index of the first sample, i.e. the first message would have sample index `0`.  The client then determines how many samples the player has played in total and if that's greater than the sample index it will compensate for that by skipping samples. 

Now too get back to the request system I mentioned earlier -- how does one use that? As I mentioned, there’s two libraries above for Python and JavaScript, however this should work for any language, and you’re free to implement your own libraries.


## How do libraries work?

As mentioned above, users can determine what is played via requests to a named pipe which PID1 reads.  I opted for a simple approach for encoding - json. While making libraries is fun and all, I can’t update libraries for many languages every time I change the requests, so I figured I’d make the request system pretty simple.

The user’s script must only write json data to `/tmp/audio` (a named pipe) and the go script will then parse the data and fulfill the request.  However, this might error - for example the file isn't found or has invalid encoding. Since we’re sending requests through a named pipe, we can't get errors very easily.
This means that the library the client uses must determine when there’s an issue with a source being created - the setup I made for the libraries which I used would wait up to a set amount of time then if the source wasn’t created in time it times out - while this isn’t always perfect, it's better than nothing.

A typical request to play a tone might look like this:

```json
{
  "Paused": false,
  "Name": "My tone",
  "Type": "tone",
  "Volume": 1,
  "DoesLoop": false,
  "LoopCount": 0,
  "Args": {
    "Pitch": 400,
    "Seconds": 5,
    "Type": 1,
    "Path": ""
  }
}
```

A quick explanation of the above fields: 
+ `Paused` - Whether the source is paused or not - this can only be set when updating the source.
+ `Name` - the name of the source - this can be used to identify the source when it's being created - if it's not set the name will be set by pid1.
+ `Type` - the type of the source, supported types when I wrote this are:
    + `wav` - A `.wav` file
    + `aiff` - A `.aiff` file 
    + `mp3` - A `.mp3` file
    + `tone` - A generated tone.
+ `Volume` - The volume of the source as a floating point number - `1` would be `100`%
+ `DoesLoop` - Whether the source should loop or not - if true `LoopCount` should be set.
+ `LoopCount` - How many times the source should loop - if set to `1` the source will restart `1`x once its done playing, if set to a negative value it will loop forever. Will be ignored if `DoesLoop` is not true.
+ `Args` - Additional arguments that aren’t used by every source type. 
	+ `Path` (used by `aiff`, `wav`, and `mp3` types) - The path to the file. This can be relative or absolute. (relative to the workspace’s root*)
	+ `Pitch` (used for the `tone` type) - The frequency / pitch of the tone.
	+ `Type` (Used for the `tone` type) - The wave type of the generated tone - Valid values are:
		+ `0` - The sine wave type
		+ `1` - The triangle wave type
		+ `2` - The saw wave type
		+ `3` - The sqr wave type

We’re excited to *hear* what you make with audio!
