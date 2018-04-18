const larger = require('../larger')

test('markdown example works', () => {
    const content = '?kick user "bad behaviour"'
    const prefix = '?'
    
    const { command, args } = larger(content, prefix)

    const userToKick = args[0]
    const reason = args[1]

    expect(command).toBe('kick')
    expect(userToKick).toBe('user')
    expect(reason).toBe('bad behaviour')
})


