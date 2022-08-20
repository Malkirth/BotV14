const Discord = require("discord.js");
const Command = require("../Structure/Command");

module.exports = new Command({

    name: "test",
    description: "Description de la commande",
    utilisation: "méthode d'utilisation",
    // Permission admin dans l'exemple
    permission: Discord.Permissions.FLAGS.ADMINISTRATOR,
    category: "Catégorie de la commande",
	cooldown: 5, 

    async run(bot, message, args, db){

        // db est directement lié à la base de donné ouvert dans \Structure/Database.js
        message.channel.send("test")

    }
})