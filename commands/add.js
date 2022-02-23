const { voiceArray } = require("../global/variables");
const play = require("play-dl");

module.exports = {
  name: "add",
  description: "Add a new YT url to the list",
  async execute(message, args, cmd, client, Discord) {
    if (!args.length) return message.channel.send("You need to send a YT url");

    const url = await play.validate(args[0]);
    if (url !== "search") {
      voiceArray.push(args[0]);
      return message.channel.send("Added :ok_hand:");
    }
    return message.channel.send("You need to send a YT url");
  },
};
