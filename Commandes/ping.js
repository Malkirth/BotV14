const Discord = require("discord.js");
const Command = require("../Structure/Command");

module.exports = new Command({

    name: "ping",
    description: "Permet de connaitre le ping du bot",
    utilisation: "",
    permission: "",
    category: "Information",
	cooldown: 5,

    async run(bot, message, args, db){

        const startTimeDB = Date.now()

        const endTimeDB = Date.now()

        const startTime = Date.now()

        await message.reply(`En cours...`).then(async msg => {
            const endTime = Date.now()
            
            try {
                await msg.edit(`\`Latence du bot\`: ${endTime - startTime}ms\n\`Latence de l'API de Discord\` : ${bot.ws.ping}ms \n\`Latence de la base de données\` : ${endTimeDB - startTimeDB}`)
            } catch (err) {
                await message.editReply(`\`Latence du bot\`: ${endTime - startTime}ms\n\`Latence de l'API de Discord\` : ${bot.ws.ping}ms \n\`Latence de la base de données\` : ${endTimeDB - startTimeDB}`)
            }
        })


    }
})