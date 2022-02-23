module.exports = [
  {
    name: 'ping',
    description: 'Just a ping command',
    format: '.ping'
  },
  {
    name: 'leave',
    description: 'The bot leaves the voice channel',
    format: '.leave'
  },
  {
    name: 'play',
    description: 'Start to play a random voice clip',
    format: '.play'
  },
  {
    name: 'stop',
    description: 'Stops playing the voice clips',
    format: '.stop'
  },
  {
    name: 'list',
    description: 'Display a list of all the voice clips',
    format: '.list'
  },
  {
    name: 'remove',
    description: 'remove a specific voice clip of the list',
    format: '.remove <number>'
  },
  {
    name: 'add',
    description: 'Add a new voice clip',
    format: '.add <YT url>'
  },
];
