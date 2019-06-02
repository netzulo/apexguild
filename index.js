const Discord = require('discord.js');
const client = new Discord.Client();
const clientId = "583046940002877450";
const clientToken = "NTgzMDQ2OTQwMDAyODc3NDUw.XO8DGA.wv4BkGnBeoFSnQTJBDzu8i-2Clc";
const mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  port     : '3306',
  user     : 'root',
  password : 'exampleroot',
  database : 'apexguild'
});
const createTables = {
  "users": `create table if not exists users(
    id int primary key auto_increment,
    name varchar(255)not null,
    is_logged tinyint(1) not null default 0)`
}
var DB = {
  "users": []
}

const embed = {
  "title": "Apex Guild Bot",
  "description": "```\nUsers list```",
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
  console.log(`Connecting DB...`)
  connection.connect();
  console.log(`Connected DB!`)
  // console.log(`CREATE tables IF doesn't exists...`)
  // dbQuery(createTables.users)
  console.log(`------------ BOT ready -----------`)
});

// Create an event listener for messages
client.on('message', message => {
  // Ignore messages wrote by discord server
  if (message.author.username !== "apexguild") {
    console.log(`Chat by ${message.author.username}: ${message.content}`);
  }
  // If the message is "what is my avatar"
  if (message.content === '$avatar') {
    // Send the user's avatar URL
    message.reply(message.author.avatarURL);
  }
  if (message.content === '$list') {
    /* WIP
     1. transform user data to embed data
     2. generate new embed data
     3. delete all text in channel
     4. write new updated embed code
    */
    let usersQuery = 'SELECT id,name,is_logged from users';
      connection.query(usersQuery, function (error, results, fields) {
        if (error) {
          console.log(error.message);
          throw error;
        }
        results.forEach(user =>{
          embed.fields.push(
            {
              "name": user.name,
              "value": `ID=${user.id}, IS_LOGGED=${user.is_logged}`
            }
          );
        });
        // users
        message.reply(message.author.avatarURL, { embed });
    });
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

client.login(clientToken);