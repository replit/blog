---
title: "Solidity on Replit: Diving into Web3"
author: Tyler Angert, Søren Rood, Alex Kotliarskyi 
cover: https://blog.repl.it/images/solidity/cover.jpg
categories: product,design,eng
date: 2021-10-14T00:06:40.000Z
---

![Web3](images/solidity/cover.jpg)

Today, we're announcing our official Solidity development template. Solidity is the language used to create [smart contracts](https://ethereum.org/en/developers/docs/smart-contracts/), which are programs that run on the [Ethereum](https://ethereum.org/en/) blockchain. This is important for the [Web3](https://www.freecodecamp.org/news/what-is-web3/) commmunity because there's finally an accessible and collaborative way to learn Solidity, which will unlock thousands of new developers in the decentralized web.

You can try it out by [creating a new Repl](https://replit.com/new) and typing `solidity` in the search bar. Or, go directly to the [template page](https://replit.com/@replit/Solidity-starter-beta?v=1) to fork it or leave feedback. :)

<div class="video-container" style="text-align: center;margin: 30px 0;"><iframe width="560" height="315" src="https://www.youtube.com/embed/1mMez3bjf9k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

___

## Why this matters

Lowering barriers to entry is core to Replit. Everything we do is intended to make software creation easier, faster, and more fun. So when new infrastructure and communities (like Ethereum) gain momentum, it's our responsibility to help people create for that new technological universe. So, why not try to build the best blockchain development experience in the world?

Replit has a unique advantage here. Among other "web-based IDEs", Replit is a true general purpose computing environment. Every Repl you create is actually a Linux container, meaning everything we build *sits on top of a fully functioning operating system*. This gives us the flexibility to build basically anything we want. Almost any program or environment you can create locally, we can transform into a URL.

What this means is that we created a multiplayer smart contract development environment that instantly hosts your contracts in a ready-to-share app. In other words, **deploy a smart contract in 60 seconds with your friends**.

While building this environment, we talked with dozens of Web3 developers and companies. All of them shared that there's a flood of new people who want to learn to build, but the tools aren't great for teaching and prototyping. And after seeing thousands jump into game development with [Kaboom](https://kaboomjs.com/), we knew we had an opportunity to introduce Web3 development to artists, designers, and every kind of digital creative. It's ironic that one of the most complex and rapidly evolving sectors of computing is inspiring a new wave of curious programmers with extremely creative backgrounds. Probably nothing.

As impressive as some Web3 products are, like [Foundation](https://foundation.app/), [Zora](https://zora.co/), [Rainbow](https://rainbow.me/), and [Rabbithole](https://rabbithole.gg/), it's still very hard to create dApps (let alone regular apps!). The learning curve to even speak and think about Web3 fluently is also huge, from the confusing terminology to the shift in [mental models](https://j.mirror.xyz/k0yCgq0bjgn2X0AujhwjKIYk4SDBpdNayjU5_E8Wm4I) needed to be creative.

Part of our thesis is that simplifying software development is a fundamental part of creating new economies. This is especially true for the emerging world of Web3, where there's an enormous amount of capital flowing through a handful of popular apps but the development experience is fragmented and plagued by subpar editors, APIs, and user interfaces. We still have a lot to build, but for our beta release, we focused on simplifying deployment so that new developers can focus on learning Solidity itself and getting new things out into the world.

___ 
___

## Features

![Deployment UI](images/solidity/deployment-ui.png)

**The deployment UI** is the all-seeing dashboard. It is aware of your contracts, your connected MetaMask wallet, and can even get you on the Replit Testnet. The deployment UI is also where you can test out your smart contracts.

____ 

![Live editing](images/solidity/live-editing.gif)

**Live-editing**, aka hot-reloading, is built into the editing experience. `contract.sol` will recompile whenever it's edited and will be available for deployment in the UI as soon as it's ready. As a part of live-editing, we also show you complation, deployment, and function testing errors directly.

____ 

![Replit Testnet](images/solidity/testnet.gif)

We were running into limitations with other testnets, so we made our own. To add the **Replit testnet** to your wallet, just click the "switch to a test network" button in the deployment UI. To fund your wallet, click "Get 1 ETH for testing". No need to go to a faucet -- just request ETH straight from the UI.

____ 

![Hosted app](images/solidity/hosted-app.png)

**Your contracts are sharable** because the deployment UI is actually a hosted app. You automatically get a link for your contracts you can send to people.

You'll be able to build [your own bank](https://ethereum.org/en/defi/), [all kinds of NFTs](https://twitter.com/tylerangert/status/1442654340049739780), [your own social token](https://twitter.com/m1guelpf/status/1438327631943028736), voting contracts, and more. The only limit is your imagination and how many hours you want to spend googling.

___ 
___ 

## How do I create a Solidity Repl?
[Create a new Repl](https://replit.com/new) then type `solidity` in the search bar. :)

Or, go directly to the [template page](https://replit.com/@replit/Solidity-starter-beta) and fork it.

___ 
___

## 💧 Intermission: what do all these words mean?

This post isn't intended to be a self-contained glossary,  but let's clarify a few things to make sure we're on the same page.

When we say "`decentralized app`" (or `dApp` for short), we mean that *one* person or organization does not directly control the data and users on that app. Most services you use today are *centralized*, meaning they control everything that happens inside of their apps and all of your information. They store and manage your logins, permissions, and can ban your accounts (and everything associated with them) on a whim.

With decentralization, we can build more equitable organizations and services that are collectively owned by their users. This doesn't mean that a decentralized social network, for example, would be completely unmoderated. It means that instead of someone's account getting flagged by execs behind a curtain, the community could vote on it in a public, transparent, and programmatically enforced way.

**`Web3`** refers to the *general direction* the internet is headed in where services are decentralized and people own their digital lives without the oversight of huge companies-- from their social followings, to game items, art, access to communities, and more. You could imagine a decentralized Instagram that connects to *your* database of photos that *you* own. If they ever shut down, you still have access to everything.

The internet we are used to-- referred to as `Web2`, relies heavily on centralized servers (like Twitter hosting your tweets and Instagram hosting your pictures). People can post stuff to the internet but don't have real authority over it. Your digital identity is effectively managed by huge corporations.

`Web1` largely refers to the internet before social networks were popular, when you could read content but not post. Having a voice on the internet was reserved for the technical clergy who could figure out how to even get something online in the first place.

In short:
- `Web1`: read
- `Web2`: read-write
- `Web3`: read-write-own

Now, how do you build dApps? dApps are built on top of `blockchains`, which are networks of computers that work together to store and update data according to prespecified rules, which (in Ethereum's case) are written in `smart contracts`. Smart contracts are programs that run on general purpose blockchains, like Ethereum. 

dApps usually consist of "regular" frontends (websites or mobile apps) that connect to smart contracts behind the scenes. You can think of smart contracts as the backends of dApps.

Other popular blockchains include [Solana](https://solana.com/), [Polygon](https://polygon.technology/), and of course, [Bitcoin](https://bitcoin.org/en/) (which is largely non-programmable and mainly used as a store of value).

From a practical perspective, there are a few key benefits of web3 apps, both from the users' and the developers' side:

- **No usernames and passwords**: you use a *wallet* which has an address (or multiple) in it (like `0x5413eEBC80e4FC51Ec21e30E32F42Ab27A6C40ad`) that is essentially your ID that you use to login (or "connect") to dApps. This means you don't have to worry about password managers and creating different logins with everything you use. This also means developers don't have to worry about tricky authentication code and storing PII.

- **Your data travels with you**: Your wallet is essentially your inventory of digital assets that you own and that exist outside of the games and apps you are using. This implies things like cross-game items, cross-music service playlists, and total ownership over your data.

- **No servers to worry about**: in this case, the "server" is literally the entire blockchain. There is no single point of failure because there are thousands of nodes in the network, so you'd be hard pressed to find an outage like [what just happened to Facebook](https://engineering.fb.com/2021/10/05/networking-traffic/outage-details/).

- **Payments are built in**: this shouldn't come as a surprise, but you don't have to import Stripe to build a store on Ethereum. The whole point of smart contracts is that they're general purpose code for making transactions. Anything can be linked to payment and value that's on the network. 

___ 
___

## How we built this

### Timeline
This all took about a month. It started with [Soren's](https://twitter.com/roodsoren) tweet:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">My goal today is to add solidity support to <a href="https://twitter.com/Replit?ref_src=twsrc%5Etfw">@replit</a>.<br><br>I got the compiler working, just need to make deployments easy.<br><br>Multiplayer Web3 development incoming. 🤞🏼💰</p>&mdash; Søren Rood ⠕ (@roodsoren) <a href="https://twitter.com/roodsoren/status/1436744431118348293?ref_src=twsrc%5Etfw">September 11, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

We knew that getting the Solidity compiler to work directly on Replit was relatively trivial, but making a magical deployment experience is what would set us apart.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Solidity template for <a href="https://twitter.com/Replit?ref_src=twsrc%5Etfw">@replit</a> is shaping up very nicely! Sourcing some test Ξ 0x68a13209E2B02E8CE125027c0FDDCAA78F064634</p>&mdash; Alex Kotliarskyi ⠕ (@alex_frantic) <a href="https://twitter.com/alex_frantic/status/1440025954361831425?ref_src=twsrc%5Etfw">September 20, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

After two weeks of prototyping on the side, we got a functional deployment UI working and beta tested with about 20 people, many of whom gave really great feedback.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">alright folks<br>who wants to test out the replit beta solidity template<br>raise ur hands</p>&mdash; tyler🦕🍄💆‍♂️🥘 (@tylerangert) <a href="https://twitter.com/tylerangert/status/1441219995963252737?ref_src=twsrc%5Etfw">September 24, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

And since then, we've just been refining small bugs, edge cases, and working on performance.

### Engineering
The initial prototype was spearheaded by [Soren](https://twitter.com/roodsoren), who got a working MVP hacked together using [solc](https://github.com/ethereum/solc-js) and [infura](https://infura.io/). [Alex](https://twitter.com/alex_frantic) then took the lead on productionalizing Soren's MVP and getting it hooked up to a basic deployment UI. 

The template can roughly be broken down into three parts:

**1. The server**

This is an express + vite server that has hot reloading built in. Like we mentioned earlier, any time you change your contract files (or the UI!) it'll automatically reload without you needing to touch anything.

We store the ABIs (basically your contracts' metadata) in [ReplitDB](https://blog.replit.com/database), which means that anyone who is invited into your Repl will be able to interact with the same contracts. Eventually we'll query the chain directly to retrieve all of your relevant contracts.

Under the hood, we are using [Nix](https://blog.replit.com/nix) to run `solc` (the solidity compiler) and `nodejs`.


**2. The deployment UI**
This is a single file React app. It's relatively straightforward, and the main libraries we are using to talk to the Ethereum blockchain are [`ethers.js`](https://github.com/ethers-io/ethers.js) and [`evm-chains`](https://github.com/pedrouid/evm-chains).

[Matt](https://www.linkedin.com/in/miselin/) also helped us get our own Testnet setup, which lets you get test ether directly from the UI.

**3. The contract file**. All your contract code is simply written in `contract.sol`. You can create other solidity files, but the one that Replit uses for deployment is `contract.sol`.

### Design
[Tyler](https://twitter.com/tylerangert) led design on this and implemented the majority of the frontend for the deployment UI. 

Our main design goal, similar to how we approached our [Debugger](https://blog.replit.com/multiplayer-debugging), was to eliminate as much noise and fluff as possible. It's easy to just copy popular UIs like [etherscan](https://etherscan.io/), but we really tried to work from first principles.

Our figma file for this was a huge mess, but sometimes that's how this stuff gets done.

![Figma file](images/solidity/figma.png)


And here's our before / after of our MVP and our launch UI. Quite a long way!

![Figma file](images/solidity/before-after-ui.png)

Side note: we wanted to make this look like it was an actual part of the Replit UI, so we took a subset of our (in progress) design system and ported it directly into the app.


### Reflection

Overall, this was an incredibly satisfying project to work on because it all took place *inside* Replit. We didn't build anything custom. This was literally a template that anyone could have created-- and, in fact, if you use this template, you can go in and edit the UI and server directly if you want to.

___ 
___

## Future

Replit and Ethereum have a surprising amount in common. So much so, in fact, that this tweet could easily apply to both:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Imagine a global compute network with millions of users building on shared programmable primitives. Where anyone from any device can get an environment they can mold to work for them and their customers. Where building a new app is as easy as remixing or joining existing apps.</p>&mdash; Amjad Masad ⠕ (@amasad) <a href="https://twitter.com/amasad/status/1440394441269727236?ref_src=twsrc%5Etfw">September 21, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Luckily, this is only the start and we're excited to see how Replit and Ethereum will co-evolve. There's a lot we can do from here, but we wanted to make sure our initial launch was simple and fast.

Here are some initial ideas:

- More examples and templates
- Our own chain explorer
- LSP support for solidity
- Integration with hardhat for proper testing and logging
- An actual solidity REPL for quickly prototyping / testing functions or lines

Some funkier ideas:

- DSLs for easily creating specialized kinds of contracts, especially from within other languages
- A Replit [ERC20 token](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) for peer-to-peer transactions, sponsorships, and more

We are also looking into creating more specialized templates for building NFT marketplaces with protocols like [Zora](https://zora.co/) and creating interactive content with groups like [Vector DAO](https://vectordao.com/).  

If you have feedback on the template, please leave a comment [here](https://replit.com/@replit/Solidity-starter-beta?v=1). We will be actively developing it!

And of course, [we're hiring](https://replit.com/site/careers). If working on the future of computing and Web3 interests you, feel free to apply and email us with any questions at [web3@replit.com](mailto:web3@replit.com) !

If you made it all the way to the end of this post, just remember: `wagmi`

![Web3](images/solidity/cover-2.jpg)

___ 
___ 

## More resources and articles
This is an incomplete list, but some interesting reads that should help give context to a few of the things discussed here.


- [Ethereum Whitepaper](https://ethereum.org/en/whitepaper/)
- [Bitcoin Whitepaper](https://bitcoin.org/bitcoin.pdf)
- [Web2 vs Web3](https://ethereum.org/en/developers/docs/web2-vs-web3/)
- [What is Web3?](https://www.freecodecamp.org/news/what-is-web3/)
- [Why Decentralization Matters](https://onezero.medium.com/why-decentralization-matters-5e3f79f7638e)
- [Rainbow's Learning Guide](https://rainbow.me/learn)
- [Web3: in a nutshell](https://eshita.mirror.xyz/H5bNIXATsWUv_QbbEz6lckYcgAa2rhXEPDRkecOlCOI)
- [A Beginner’s Guide to Crypto: Getting Started with ETH
](https://i.mirror.xyz/UZ-7F6iVagvgBr9c9BdhmWFe5IUNQ0Zj5k0-iOI_w-w)
- [Gaby's Web3 Reading List](https://gabygoldberg.notion.site/f7050e62461143d49345e7b46eb5576b?v=c02511c4230c44ce9a1a03c9757da524)
- [web3 starter pack](https://docs.google.com/document/d/1SWJw_NTyUvgdB_asRzsnVyKjciW8dZbeqQeUeWsEiQc/edit#
)
- [The Myth of the Infrastructure Phase](https://www.usv.com/writing/2018/10/the-myth-of-the-infrastructure-phase/
)

<style>
.video-container {
position: relative;
padding-bottom: 56.25%;
padding-top: 30px; height: 0; overflow: hidden;
border-radius: 12px;
box-shadow: 0 0 12px 0 rgba(0,0,0,0.2);
}

.markdown img {
	border-radius: 8px;
	width: 100%;
}

.video-container iframe,
.video-container object,
.video-container embed {
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
}
</style>
