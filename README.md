# Larger
The Lightweight Argument Parser for <a href="https://github.com/discordjs/discord.js/">discord.js</a> (pronounced Lager)

<p>
    <a href="https://www.npmjs.com/package/lw-arger "><img src="https://img.shields.io/npm/dw/lw-arger.svg" /></a>
    <a href="https://www.npmjs.com/package/lw-arger "><img src="https://img.shields.io/npm/v/lw-arger.svg" /></a>
</p>

## Installation

npm

```sh
npm i lw-arger
```

yarn

```sh
yarn add lw-arger
```

## Usage

Examples given are as "library agnostic" as possible.

Simplest example:

```js
const larger = require('lw-arger')

const content = '?kick user "bad behaviour"'
const prefix = '?'

const {command, args} = larger(content, prefix)

switch(command) {
    case 'kick':
        const userToKick = args[0]
        const reason = args[1]

        kickUser(userToKick, reason) //Implementation varies
        break;
}
```

## Handler

It's possible to run Larger with a handler, which can handle commands in a functional way.

```js
const larger = require('lw-arger')

const prefix = '?'

larger.handler({
    kick: (user, reason) => {
        console.log(`kicking ${user} for reason: ${reason}`)
    }
})

function messageReceived(content) {
    larger(content, prefix)
}
```

### Passthroughs

You can also pass through objects from your library that may be needed (discord.js example)

```js
const larger = require('lw-arger')

const prefix = '?'

larger.handler({
    kick: (message, user, reason) => {
        message.reply(`${user} was kicked`)
        //kick user
    }
})

//Called from discord.js message event
function messageReceived(message) {
    larger(message, message.content, prefix)
}
```

### Fallbacks

The handler also has support for fallback methods, which will be called if the command doesn't exist.

```js
const larger = require('lw-arger')

const prefix = '?'
const content = '?kick user reason'

larger.handler({
    fallback: () => {
        console.log('command not found...')
    }
})

const {command, args} = larger(content, prefix)
```

### Arg Joining
If there is only parameter on a handler then all of the arguments will be concatenated together which removes the need for quotes.

```js
const larger = require('lw-arger')

const prefix = '?'
const content = '?say hello this is a long message'

larger.handler({
    say: (message) => {
        //message will be 'hello this is a long message'
    }
})

const {command, args} = larger(content, prefix)
```
