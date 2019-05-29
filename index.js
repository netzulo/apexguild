const Discord = require('discord.js');
const client = new Discord.Client();
const clientId = "583046940002877450";
const clientToken = "";

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

// Emitted when the client's WebSocket disconnects and will no longer attempt to reconnect
client.on("disconnect", function(event){
  console.log(`The WebSocket has closed and will no longer attempt to reconnect`);
});

// Emitted whenever the client's WebSocket encounters a connection error.
client.on("error", function(error){
  console.error(`client's WebSocket encountered a connection error: ${error}`);
});

client.login(clientToken);