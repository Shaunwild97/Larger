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
