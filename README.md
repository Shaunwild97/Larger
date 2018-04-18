# Larger
The Lightweight Argument Parser for <a href="https://github.com/discordjs/discord.js/">discord.js</a>

## Installation

npm

```sh
npm install lw-arger
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
