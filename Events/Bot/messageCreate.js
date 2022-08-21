const Discord = require("discord.js");
const Event = require("../../Structure/Event")

module.exports = new Event("messageCreate", async (bot, message) => {
    

    if(message.author.bot) return;

    const db = bot.db;

    let prefix = "!"

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
    
    let commandFile = bot.commands.get(command.slice(prefix.length))

    if(!message.content.startsWith(prefix)) return;
    if(!commandFile) return message.reply(`Cette commande n'exite pas`);
    
    if(!bot.cooldown.has(commandFile.name)) {
        bot.cooldown.set(commandFile.name, new Discord.Collection())
    }

    // Cooldown

    const time = Date.now();
    const cooldown = bot.cooldown.get(commandFile.name);
    const timeCooldown = (commandFile.cooldown || 5) * 1000;

    if(cooldown.has(message.author.id)) {

        const timeRestant = cooldown.get(message.author.id) + timeCooldown;

        if(time < timeRestant) {

            const timeLeft = (timeRestant - time);

            return message.reply(`Vous devez attendre ` + `\`${(Math.round(timeLeft / (1000 * 60 * 60 * 24) % 30))}\`` + ` jour(s) ` + `\`${(Math.round(timeLeft / (1000 * 60 * 60)))}\`` + ` heure(s) ` + `\`${(Math.round(timeLeft / (1000 * 60) % 60))}\`` + ` minute(s) ` + `\`${(Math.round(timeLeft / 1000 % 60))}\`` + ` seconde(s) pour exécuter cette commande !`)
        }
    }

    cooldown.set(message.author.id, time);
    setTimeout(() => cooldown.delete(message.author.id), timeCooldown);

    // Permissions

    if (!message.member.permissions.has(new Discord.PermissionsBitField(commandFile.permission))) return message.reply("Vous n'avez pas les permissions requises pour executer cette commande")

    // Execution de la commande 

    commandFile.run(bot, message, args, db)

    
})