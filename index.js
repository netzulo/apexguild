const Discord = require('discord.js');
const client = new Discord.Client();
const clientId = "583046940002877450";
const clientToken = "NTgzMDQ2OTQwMDAyODc3NDUw.XO7-bg.US7YhEbLP8LkzzyaNoLSEeRaf0U";

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Create an event listener for messages
client.on('message', message => {
  // Ignore messages wrote by discord server
  if (message.author.username !== "apexguild") {
    console.log(`Chat by ${message.author.username}: ${message.content}`);
  }
  // If the message is "what is my avatar"
  if (message.content === 'what is my avatar') {
    // Send the user's avatar URL
    message.reply(message.author.avatarURL);
  }
});


client.login(clientToken);