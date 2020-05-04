const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config');
const database = require("./database");
const connection = database(config.db)
const api = require('./api.js')(config.apiKey)


const embed = {
  "title": "Apex Legends Stats",
  "description": "```replace_me```",
  "url": "https://github.com/netzulo/apexguild",
  "color": 9492814,
  "timestamp": "2019-06-02T24:00:00.872Z",
  "footer": {
    "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png",
    "text": "You can support us on https://github.com/netzulo/apexguild"
  },
  "thumbnail": {
    "url": "https://cdn.discordapp.com/embed/avatars/0.png"
  },
  "image": {
    "url": "https://cdn.discordapp.com/embed/avatars/0.png"
  },
  "author": {
    "name": "ApexGuildBot",
    "url": "https://github.com/netzulo/apexguild",
    "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
  },
  "fields": []
};

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`------------ BOT ready -----------`)
});

// Create an event listener for messages
client.on('message', message => {
  // Ignore messages wrote by discord server
  if (message.author.username !== "apexguild") {
    console.log(`Chat by ${message.author.username}: ${message.content}`);
  }
  //If the message it's for API "stats"
  if (message.content === '$stats') {
    // Search Apex profile based on nickname of user
    let member = message.guild.members.get(message.member.id);
    let name = member.nickname || member.user.username
    api.getDetailedPlayer(name, "PC").then((response)=>{
      //Prepare embed message
      rankImage = response.metadata.rankImage;
      avatarImage = response.metadata.avatarUrl
      // replace
      embed.thumbnail.url = rankImage;
      embed.author.name = name;
      embed.author.url = avatarImage;
      embed.author.icon_url = rankImage;
      embed.description = `\`\`\`${response.metadata.rankName}\`\`\``;
      embed.image.url = response.metadata.avatarUrl;
      embed.footer.icon_url = avatarImage;
      // fill up stats
      response.children.forEach(apexLegend => {
        let name = apexLegend.metadata.legend_name;
        let kills = "Not found";
        let ratio = "Not found";
        let damage = "Not found";
        apexLegend.stats.forEach(stat => {
          if (stat.metadata.key === "Kills"){
            kills = stat.value;
            return;
          }
        });
        apexLegend.stats.forEach(stat => {
          if (stat.metadata.key === "KillsPerMatch"){
            ratio = stat.value;
            return;
          }
        });
        apexLegend.stats.forEach(stat => {
          if (stat.metadata.key === "DamagePerMatch"){
            damage = stat.value;
            return;
          }
        });
        let field = {
          "name": name,
          "value": `Kills: ${kills}, Ratio: ${ratio}, Damage: ${damage}`
        };
        embed.fields.push(field);
      });
      message.reply(message.author.username, { embed });
      // message.reply(player);
    })
    .catch((err)=>{
      message.reply("Error at find player");
    })
  }
});


// Emitted when the client's WebSocket disconnects and will no longer attempt to reconnect
client.on("disconnect", function(event){
  console.log(`The WebSocket has closed and will no longer attempt to reconnect`);
  connection.end();
});

// Emitted whenever the client's WebSocket encounters a connection error.
client.on("error", function(error){
  console.error(`client's WebSocket encountered a connection error: ${error}`);
  connection.end();
});

client.login(config.clientToken);