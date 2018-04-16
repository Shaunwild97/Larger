# Larger
The Lightweight Argument Parser for <a href="https://github.com/discordjs/discord.js/">discord.js</a>

## Usage

Simplest example:

```js
const larger = require('larger')

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
