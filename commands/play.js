const play = require("play-dl");

let previousIndex = -1;
let timer = 0;

const { timeoutID, voiceArray } = require("../global/variables.js");

const {
  AudioPlayer,
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
  AudioPlayerStatus,
  getVoiceConnection,
} = require("@discordjs/voice");

module.exports = {
  name: "play",
  aliases: ["p", "stop"],
  description: "starts to play a random voice clip",
  async execute(message, args, cmd, client, Discord) {
    const voice_channel = message.member.voice.channel;

    //If the user is not in a voice channel then send a message
    if (!voice_channel)
      return message.channel.send("You need to be in a voice channel");

    const permissions = voice_channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK"))
      //If the user don't have the connect and speak permission then send a message
      return message.channel.send("You need the right permissions");

    //if the command is play or p then play a random voice clip
    if (cmd === "play" || cmd === "p") {
      const connection = joinVoiceChannel({
        channelId: voice_channel.id,
        guildId: message.guildId,
        adapterCreator: message.guild.voiceAdapterCreator,
      });
      const player = createAudioPlayer();
      playVoiceClip(connection, player);
    }
    if (cmd === "stop") {
      clearTimeout(timeoutID);
      stopVoiceClips();
    }
  },
};

/**
 *
 * @param {number} nMin A minimum number limit
 *
 * @param {number} nMax A maximum number limit
 * @returns
 */
const getRandomInt = (nMin, nMax) => {
  let rand = Math.floor(Math.random() * (nMax - nMin) + nMin);
  return rand;
};

/**
 *
 * @param {VoiceConnection} connection
 * @param {AudioPlayer} player
 */
const playVoiceClip = async (connection, player) => {
  let randIndex = getRandomInt(0, voiceArray.length);

  while (randIndex === previousIndex)
    randIndex = getRandomInt(0, voiceArray.length);
  console.info(`The random index is: ${randIndex}`);

  let voiceClip = voiceArray[randIndex];
  let stream = await play.stream(voiceClip);

  const resource = createAudioResource(stream.stream, {
    inputType: stream.type,
  });

  player.play(resource);
  connection.subscribe(player);

  player.on(AudioPlayerStatus.Idle, () => {
    timer = getRandomInt(1, 2) * 1000 * 60;
    console.log(`Current Timer: ${timer}`);
    previousIndex = randIndex;
    timeoutID = setTimeout(playVoiceClip.bind(null, connection, player), timer);
  });
};

const stopVoiceClips = () => {
  const pvc = getVoiceConnection(message.guid.id);
  const voiceChannel = message.member.voice.channel;

  if (!voiceChannel)
    return message.channel.send("You need to be in a voice channel");
  if (!pvc)
    return message.channel.send("The bot is not connected to a voice channel");
  if (voiceChannel != pvc.joinConfig.channelId)
    return message.channel.send(
      "You need to be in the same voice channel with the bot"
    );

  const player = pvc.state.subscription.player;

  player.stop();
  player.on(AudioPlayerStatus.Idle, () => {
    console.log('Status: Stop');
    message.channel.send('I will stop playing the voice clips, master');
  });
};
