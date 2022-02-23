const { voiceArray } = require("../global/variables");

module.exports = {
  name: "remove",
  aliases: ["r"],
  description: "Remove a voice clip of the array given an number",
  async execute(message, args, cmd, client, Discord) {
    if (!args.length) return message.channel.send("You need to send a number");

    if(args.length > 1) return message.channel.send('You just need to send one number');
    if(args[0] < 0 || args[0] > voiceArray.length) return message.channel.send(`You need to send a number between 1 and ${voiceArray.length}`);

    if(voiceArray.length === 0) return message.channel.send('The list is empty');

    let index = args[0] - 1;
    voiceArray.splice(index, 1);
    return message.channel.send('Done :smiling_imp::ok_hand:')
  },
};
