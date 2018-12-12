const Discord = require('discord.js');
const client = new Discord.Client();

var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'sql7.freemysqlhosting.net',
    port: 3306,
    user: 'sql7269449',
    password: 'pdm9WDSyBw',
    database: 'sql7269449',
    connectionLimit: 15,
    queueLimit: 30,
    acquireTimeout: 1000000
  });
  
  con.connect(function(err) {
    if (err){
        console.log("Error when connecting to database!");
        throw err;
    } 
    console.log("Connected to DB!");
  });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) { // Prevent bot from responding to its own messages
        return;
    }
    
    if (receivedMessage.content.startsWith(".")) {
        processCommand(receivedMessage);
    }
})

function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1); // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" "); // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0]; // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1); // All other words are arguments/parameters/options for the command

    console.log("Command received: " + primaryCommand);
    if(arguments.length > 0){
    console.log("Arguments: " + arguments); // There may not be any arguments
    }

    switch (primaryCommand) {
        case "help": helpCommand(arguments, receivedMessage);
            break;

        case "random": randomCommand(arguments, receivedMessage);
            break;

        case "multiply": multiplyCommand(arguments, receivedMessage);
            break;

        case "rust": rustCommand(arguments, receivedMessage);
            break;

        case "hours": hoursCommand(arguments, receivedMessage);
            break;


        case "coin": coinCommand(arguments, receivedMessage);
            break;

        case "daily": dailyCommand(arguments, receivedMessage);
            break;
    
        default: receivedMessage.channel.send("I don't understand the command. Try `.help` or `.multiply`");
            break;
    }
}

// ****************************
//        HELP command
// ****************************
function helpCommand(arguments, receivedMessage) {
    if (arguments.length == 1) {
        switch (arguments[0]) {
            case "random": receivedMessage.channel.send("This command will generate random number from 2 defined numbers. Syntax `random [from] [to]`");
                break;
        
            case "multiply": receivedMessage.channel.send("This command will multiply defined numbers, you can add more numbers - space between each of them. Syntax `.multiply [value1] [value2] (value3)`");
                break;

            default: receivedMessage.channel.send("I don't recognize this command, try `help`");
                break;
        }
    } else {
        //show all commands
        receivedMessage.channel.send(
        "`.help` -> show all commands"+
        "\n`.help [command]` -> explain command"+
        "\n`.random [from] [to]` -> pick random number from range of 2 defined numbers"+
        "\n`.multiply [value1] [value2] (value n)` -> multiply numbers"+
        "\n`.rust [sulfur] (gun powder)` -> calculate number of explosive ammo + requirements"+
        "\n`.hours [minutes]` -> calculate hours from minutes"+
        "\n`.coin` -> throw a coin, will it be tail or head? No one knows"+
        "\nIf you want to know more about command, try `.help [command]`");
    }
}

// ****************************
//        RANDOM command
// ****************************
function randomCommand(arguments, receivedMessage) {
    if (arguments.length != 2) {
        receivedMessage.channel.send("Not valid number of parameters. Syntax :`.random [from] [to]`");
        return
    }
    let product = 1 ;

    min = parseInt(arguments[0]);
    max = parseInt(arguments[1]);
    product = Math.floor(Math.random() * (max - min + 1)) + min;
    receivedMessage.channel.send("Random number from range " + arguments + " is: " + product.toString());
}

// ****************************
//        MULTIPLY command
// ****************************

function multiplyCommand(arguments, receivedMessage) {
    if (arguments.length < 2) {
        receivedMessage.channel.send("Not enough values to multiply. Try `.multiply 2 4 10` or `.multiply 5.2 7`");
        return
    }
    let product = 1 ;
    arguments.forEach((value) => {
        product = product * parseFloat(value);
    })
    receivedMessage.channel.send("The product of " + arguments + " multiplied together is: " + product.toString());
}

// ****************************
//        RUST command
// ****************************
function rustCommand(arguments, receivedMessage) {
    if (arguments.length > 2 || arguments.length < 1) {
        receivedMessage.channel.send("Not valid number of parameters. Syntax :`rust [sulfur] (gun powder)`");
        return
    }

    sulfur_i = parseFloat(arguments[0]);
    if(arguments.length == 2){
       crafted_gun_powder = parseFloat(arguments[1]);
    }else{
       crafted_gun_powder = 0;
    }

    //sulfur = crafted_gun_powder*20 + sulfur_i;
    //charcoal = -crafted_gun_powder*3;

    exp_ammo = sulfur_i/50;
    metal_frag = exp_ammo*10;
    charcoal = exp_ammo*60;
    gun_powder = exp_ammo*20 - crafted_gun_powder;
    exp_ammo = exp_ammo*2;

    console.log("Sulfur: " + sulfur_i + " GP: " + crafted_gun_powder + " ammo: " +exp_ammo);

    receivedMessage.channel.send("Inserted number of sulfur: `"+sulfur_i+"`"+
    "\nYou will get `"+exp_ammo+"` explosive bullets"+
    "\nYou will need `"+charcoal+"` charcoal, `"+metal_frag+"` metal fragments."+
    "\nYou will have to craft `"+gun_powder+"` gunpowder.");
}

// ****************************
//        HOURS command
// ****************************
function hoursCommand(arguments, receivedMessage) {
    if (arguments.length != 1) {
        receivedMessage.channel.send("Not valid number of parameters. Syntax :`.hours [minutes]`");
        return
    }
    minutes_i = parseInt(arguments[0]);

    hours = Math.floor(minutes_i/60);
    minutes = minutes_i%60;

    console.log("minutes_i "+minutes_i+" hours "+hours+" minutes "+minutes+"");
    receivedMessage.channel.send(minutes_i + " minutes is: " + hours + " hours and "+minutes+" minutes");
}

// ****************************
//        COIN command
// ****************************
function coinCommand(arguments, receivedMessage) {
    if (arguments.length != 0) {
        receivedMessage.channel.send("Not valid number of parameters. Syntax :`.coin`");
        return
    }

    coin = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
    if(coin == 1){
        coin = "head";
    }else{
        coin = "tail";
    }
    receivedMessage.channel.send("It's `" +coin+"`!!!");
}

// ****************************
//        DAILY command
// ****************************
function dailyCommand(arguments, receivedMessage) {
    if (arguments.length != 0) {
        receivedMessage.channel.send("Not valid number of parameters. Syntax :`.daily`");
        return
    }
    var user = client.user.toString();
    var userID = user.replace(/[<@!>]/g, '');
    //con.connect();

    var json = {
    "user": [{
            "user_id": "123456789",
            "money": 0},
        {
            "user_id": "123456789",
            "money": 0}]
};

var users = json["user"];
for(var i=0; i < users.length; ++i) {
    var users_i = users[i];
    if(users_i["user_id"] == '+userID+') {
        user_money = users_i["user_id"];
        user_money = user_money["money"];
    break;
    }
    //if (user_money is empty then create new log for him in JSON file)
}
  console.log("Rows: "+JSON.stringify(rows, null, 4));  //console -> object variables
  if(rows == ''){

    con.query("INSERT INTO users (user_id, money) VALUES ("+userID+", 100);", function (err, insert_result) {
    if (err){
        console.log("Error when creating user profile in the database!");
        throw err;
    } 
    console.log("Result: " + insert_result);
  });

  }else{
    //adding money to user

    user_money = rows.money;
    user_money_new = user_money + 100;

    con.query("UPDATE users SET money = '"+user_money_new+"', last_check = now() WHERE user_id = '"+userID+"';", function(err) {
        if (err){
            console.log("Error when writing money to the database!");
            throw err;
        }
        console.log("User: " + userID+ " Old money: "+user_money+" New money: "+user_money_new);

    });
  }


  console.log("Done user: "+userID);
});

//con.end();

    //receivedMessage.channel.send("hmmm: " + rows.toString());
}

client.login("NTIwNjQ0NTgzODA2NDY4MDk2.Duw80A.XGSHFizckziBDbmyhqotoB6WfeA");
