const { getVoiceConnection } = require('@discordjs/voice')

module.exports = {
  name: "leave",
  description: "The bot will leave the voice channel",
  async execute(message, args, cmd, client, Discord) {
    const pvc = getVoiceConnection(message.guild.id);
    const voiceChannel = message.member.voice.channel;

    if(!pvc) return message.channel.send('The bot is not connected to a voice channel');
    if (!voiceChannel) return message.channel.send('You need to be in a voice channel');
    if(voiceChannel != pvc.joinConfig.channelId) return message.channel.send('You need to be in the same voice channel with the bot');

    pvc.destroy();
  },
};
