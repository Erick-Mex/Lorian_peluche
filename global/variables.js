const play = require("play-dl");

let timeoutID;

//Import a list of link of YT or SC
const voiceArray = [
  "https://youtu.be/5C8yvJUVB-0",
  "https://youtu.be/1tk1pqwrOys",
  "https://youtu.be/h7MYJghRWt0",
  "https://youtu.be/wVh40xOFoAc",
  "https://youtu.be/ulfY8WQE_HE",
  "https://youtu.be/yvzKKZp3usE",
];

/**
 *
 * @param {string[]} arrayVoice
 *
 * @returns A string of all titles in the array
 */
const extractVideoInfo = async (arrayVoice) => {
  let stringTitle = "";
  for (var i = 0; i < arrayVoice.length; i++) {
    let video = await play.video_basic_info(arrayVoice[i]);
    let title = video.video_details.title;
    stringTitle += `${i + 1}. **[${title}](${arrayVoice[i]})**\n`;
  }

  return stringTitle;
};

module.exports = {
  timeoutID,
  voiceArray,
  extractVideoInfo,
};
