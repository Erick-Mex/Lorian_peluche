module.exports = {
    name: 'ping',
    description: 'Just a ping command',
    execute(message, args, cmd, client, Discord) {
        message.channel.send("Pong!!");
    }
}