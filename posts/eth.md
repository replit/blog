---
title: How to send $ETH in 19 lines of Python
author: Soren Rood
date: 2021-05-05
cover: https://blog.replit.com/images/eth/replit-eth.png
categories: projects
---

With the emergence of blockchain technology, people can get paid from anywhere in the world. This type of transaction is revolutionary because we are able to send value from one person to another with no bank.

The day will come when it is cheaper and faster to send value (ETH, USDC, BTC, etc.) using blockchain than with the current payment system.

### This post

This is a start-to-finish Python tutorial on how to send ETH from one wallet to another on Replit. At the time of writing, ETH is at an all-time-high (ATH) of $3,335.

To do this, we are going to use [infura.io](https://infura.io). Infura is a service that allows users to easily interact with a live Ethereum node. A node is a computer that participates in the Ethereum network. Alternatively, you could spin up your [own node](https://mobycrypt.medium.com/setup-ethereum-development-environment-in-5-minutes-51336c013fdb).

 You can follow along with the code [here](https://replit.com/@SorenAtReplit/ETH-Wallet-Transaction#template.py).

### Setting up Infura

The first thing to do is make an infura account and create a new project.

<img src="https://blog.repl.it/images/eth/tutorial1.png" alt="tutorial-1" width="100%" style="width:100%"/>

### Dependencies

Create a new [Python repl](https://replit.com/new/python3) and name it whatever you'd like. In main.py, we only need to import two things:

1. `web3` - The Python Ethereum Library we use to talk to the Ethereum node
2. `os` - We use this to retrieve our secrets: `os.getenv('MY_SECRET')`

<img src="https://blog.repl.it/images/eth/import.png" alt="import" width="100%" style="width:100%"/>

### Connecting to Infura

Now that we've imported `web3`, we'll want to initialize a Web3 object. To initialize this object, we'll have to pass it one parameter.

If you've setup with Infura, all you have to do is go to the Infura Project Settings and copy the https endpoint. It looks something like: `https://mainnet.infura.io/v3/<project-id>`

Here's the code to initialize a Web3 object using Infura:

<img src="https://blog.repl.it/images/eth/initialize.png" alt="initialize" width="100%" style="width:100%"/>

You can use the following code snippet to test that your code is connected to the Infura node:

<img src="https://blog.repl.it/images/eth/connected.png" alt="connected" width="100%" style="width:100%"/>

### Setting up addresses:

Next we need to get the public wallet addresses of the sender and the recepient. If you don't have a crypto wallet, the easiest way to create one is to use [metamask](https://metamask.io). Once you've made your account, you'll want to copy your public wallet address. You can see your public wallet address if you open Metamask.

The `.toCheckSumAddress()` method is used to make sure there is no data corruption in the address string. It's an extra security measure. Read more about what a checksum address is [here](https://en.wikipedia.org/wiki/Checksum).

<img src="https://blog.repl.it/images/eth/addresses.png" alt="addresses" width="100%" style="width:100%"/>

<img src="https://blog.repl.it/images/eth/wallet-snip.png" alt="wallet-snip" width="100%" style="width:100%"/>

### Getting your private key:

WARNING: nobody should ever see your private key except you. Do not put your key in public code or share it with anyone. You'll want to store it in the secrets tab. Your private key is used to "sign" the transaction. Signing the transaction means that you authorize the money to go from wallet1 (your wallet) to wallet2 (someone elses wallet). To learn about how to retrieve your private key from Metamask, check out this [link](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key).

### Create the transaction

The next thing we'll do is get the [nonce](https://kb.myetherwallet.com/en/transactions/what-is-nonce/) and define the transaction.

<img src="https://blog.repl.it/images/eth/transaction.png" alt="transaction" width="100%" style="width:100%"/>

The most important key here is `value`. This is how much ETH we are going to send to address2. 

Similarly to how the US Dollar can be split into 100 pennies, one Ether can be split into 10^18 Wei. We use the `.toWei()` method to easily convert ETH to Wei. In this case, .001 ether is roughly equal to $3 USD (at time of writing). 

### What is "gas" in this context?

On the Ethereum blockchain network, we have to send "gas" whenever we make transactions. Gas is measured in [gwei](https://www.investopedia.com/terms/g/gwei-ethereum.asp). 1 ether = 10^9 gwei.

Gas prices range anywhere from 20 - 200 gwei. You can see the current gas prices [here](https://etherscan.io/gastracker). With future blockchain innovations, it's likely that the gas prices will significantly decrease. (Zero Knowledge Proofs + ZK Rollups)

### Sending the transaction:

Sending and signing the transaction is easy.

<img src="https://blog.repl.it/images/eth/sign-send.png" alt="sign-send" width="100%" style="width:100%"/>

The `.sendRawTransaction()` method initiates the transaction! Assuming there are no errors, you will be able to see your transaction on [etherscan](https://etherscan.io) by pasting your public wallet address. Example transaction between [Soren](https://twitter.com/roodsoren) and [Justin](https://twitter.com/notjustinshaw) at [this link](https://etherscan.io/tx/0x342e6915a9a885088f83604b5d0d4ee0242da73e993575f011647a58a74db0d1).

### Full template:

You can fork this template at https://replit.com/@SorenAtReplit/ETH-Wallet-Transaction#template.py

<img src="https://blog.repl.it/images/eth/full.png" alt="full" width="100%" style="width:100%"/>