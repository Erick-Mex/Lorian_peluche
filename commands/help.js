const listCommands = require('../helpCommands')


module.exports = {
  name: "help",
  aliases: ["h"],
  description: "Display all the commands available",
  async execute(message, args, cmd, client, Discord) {
    let stringCommands = "";
    listCommands.map(command => {
        stringCommands += `**${command.name}** :: ${command.description} \`\`\`${command.format}\`\`\`\n`;
    })

    const embedMessage = {
        color: "PURPLE",
        title: "HELP MENU",
        description: stringCommands,
        footer: {
            text: `Requested by ${message.member.displayName || message.member.username}`,
            icon_url: message.author.displayAvatarURL()
        },
        thumbnail: {
            url: client.user.displayAvatarURL()
        }
    }
    
    return message.channel.send({ embeds: [embedMessage] });
  },
};