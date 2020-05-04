const mysql = require('mysql');
var DB = {
  "users": []
}

function database(db){
    // db = {"host":"", "port":"", "username":"", "password":""};
    function connection(){
        return mysql.createConnection(db);
    }
    function queries() {
        const createTables = {
            "users": `create table if not exists users(
                id int primary key auto_increment,
                name varchar(255)not null,
                aka varchar(255)not null,
                is_logged tinyint(1) not null default 0)`
        }
        return {createTables}
    }
    return {connection}
}


module.exports = database;


// TODO: client.on('ready') event must create some data tables+rows
//connection.query(createTables.users, function (error, results, fields) {
  //  if (error) {
  //    console.log(error.message);
  //    throw error;
  //  }
  //});
// TODO: migrate this commands functionality to database+commands files
  // if (message.content === '$list') {
  //   /* WIP
  //    1. transform user data to embed data
  //    2. generate new embed data
  //    3. delete all text in channel
  //    4. write new updated embed code
  //   */
  //   let usersQuery = 'SELECT id,name,aka,is_logged from users';
  //     connection.query(usersQuery, function (error, results, fields) {
  //       if (error) {
  //         console.log(error.message);
  //         throw error;
  //       }
  //       results.forEach(user =>{
  //         embed.fields.push(
  //           {
  //             "name": `${user.name} aka ${user.aka}`,
  //             "value": `ID=${user.id}, IS_LOGGED=${user.is_logged}`
  //           }
  //         );
  //       });
  //       // users
  //       message.reply(message.author.avatarURL, { embed });
  //   });
  // }
  // if (message.content === '$add') {
  //   let name = message.author.username;
  //   // TODO: this will fail if discord name it's not equals to player name
  //   let aka = message.author.username;
  //   let usersInsert = `INSERT INTO users (name,aka) VALUES ('${name}','${aka}')`
  //   connection.query(usersInsert, function (error, results, fields) {
  //     if (error) {
  //       console.log(error.message);
  //       throw error;
  //     }
  //     message.reply("User created!! ^.^");
  //   })
  //   // console.log("WIP code: don't use")
  // }