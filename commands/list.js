const play = require("play-dl");
const { voiceArray, extractVideoInfo } = require("../global/variables");

module.exports = {
  name: "list",
  aliases: ["li"],
  description: "List of all YT urls",
  async execute(message, args, cmd, client, Discord) {
    let urlTitle = await extractVideoInfo(voiceArray);

    const embedMessage = {
      color: "GREEN",
      title: "LIST",
      description: urlTitle,
      footer: {
        text: `Requested by ${
          message.member.displayName || message.member.username
        }`,
        icon_url: message.author.displayAvatarURL(),
      },
      thumbnail: {
        url: client.user.displayAvatarURL(),
      },
    };

    return message.channel.send({ embeds: [embedMessage] });
  },
};
