const { REST } = require('@discordjs/rest');
const { Routes } = require("discord-api-types/v9")
const { SlashCommandBuilder } = require("@discordjs/builders");
const { token } = require('../config');

module.exports = async(bot) => {
      
    const commands = [
        
        // Ping
        new SlashCommandBuilder()
        .setName("ping")
        .setDescription('Permet de connaitre la latence du bot'),

        // Prefix
        new SlashCommandBuilder()
        .setName("prefix")
        .setDescription('Permet de changer la préfixe du bot')
        .addStringOption(option => option.setName("prefix").setDescription("Le préfixe souhaité").setRequired(true)),
        
        // help
        new SlashCommandBuilder()
        .setName("help")
        .setDescription('Affiche la liste des commandes du serveur')
        .addStringOption(option => option.setName("spécifique").setDescription("Informations sur la commande").setRequired(false)),

        // setup
        new SlashCommandBuilder()
        .setName("setup")
        .setDescription('Affiche la liste des commandes de paramétrage du bot sur le serveur')
        .addStringOption(option => option.setName("spécifique").setDescription("Informations sur la commande").setRequired(false)),

        // ticket
        new SlashCommandBuilder()
        .setName("ticket")
        .setDescription('Met dans le salon le message pour la création des tickets'),

        // vote
        new SlashCommandBuilder()
        .setName("vote")
        .setDescription('Réalise un vote avec la possibilité de répondre par oui / neutre / non')
        .addStringOption(option => option.setName("titre").setDescription("Titre du vote").setRequired(true)),
        
        // Say
        new SlashCommandBuilder()
        .setName("say")
        .setDescription('Envoie votre message sous forme d\'embed.')
        .addStringOption(option => option.setName("message").setDescription("Message à afficher").setRequired(true)),

        // Sondage
        new SlashCommandBuilder()
        .setName("strawpool")
        .setDescription('Réalise un sondage avec les émojis définis.')
        .addStringOption(option => option.setName("message").setDescription("Message à afficher").setRequired(true))
        .addStringOption(option => option.setName("propositions").setDescription("Séparer par une virgule les propositions").setRequired(true)),

        // userinfo
        new SlashCommandBuilder()
        .setName("userinfo")
        .setDescription('informations sur vous ou un membre')
        .addMentionableOption(option => option.setName("membre").setDescription("Informations sur le membre mentionné").setRequired(false)),

        // serveurinfo
        new SlashCommandBuilder()
        .setName("serveurinfo")
        .setDescription('informations sur le serveur courant'),

        // clear
        new SlashCommandBuilder()
        .setName("clear")
        .setDescription('Supprime plusieurs messages')
        .addNumberOption(option => option.setName("nombre").setDescription("Nombre de message à supprimer").setRequired(true)),

        // reputation add
        new SlashCommandBuilder()
        .setName("reputation")
        .setDescription('Ajoute un point de réputation au membre')
        .addMentionableOption(option => option.setName("membre").setDescription("Membre receveur").setRequired(true)),

        // reputation set
        new SlashCommandBuilder()
        .setName("setreputation")
        .setDescription('Modifie la réputation d\'un membre')
        .addMentionableOption(option => option.setName("membre").setDescription("Membre sujet").setRequired(true))
        .addNumberOption(option => option.setName("points").setDescription("Nombre de points à assigner").setRequired(true)),

        // leaderboard
        new SlashCommandBuilder()
        .setName("leaderboard")
        .setDescription('Affiche les classements')
        .addStringOption(option => option.setName("classement").setDescription("Classement du système").addChoices(
            {
                name: "Réputation", 
                value:"reputation"
            },
            {
                name: "Niveaux", 
                value:"niveau"
            }).setRequired(false))
        .addNumberOption(option => option.setName("page").setDescription("Page du leaderboard").setRequired(false)),
        
        // reputation add
        new SlashCommandBuilder()
        .setName("rank")
        .setDescription('Affiche le niveau sur le serveur')
        .addMentionableOption(option => option.setName("membre").setDescription("Membre visé").setRequired(false)),

        // ban
        new SlashCommandBuilder()
        .setName("ban")
        .setDescription('Permet de bannir définitivement un membre du serveur')
        .addUserOption(option => option.setName("membre").setDescription("Membre à bannir").setRequired(true))
        .addStringOption(option => option.setName("raison").setDescription("Raison du bannisement").setRequired(false)),

        // kick
        new SlashCommandBuilder()
        .setName("kick")
        .setDescription('Permet d\'expulser un membre du serveur')
        .addUserOption(option => option.setName("membre").setDescription("Membre à expulser").setRequired(true))
        .addStringOption(option => option.setName("raison").setDescription("Raison de l'expulsion").setRequired(false)),

        // accueil
        new SlashCommandBuilder()
        .setName("accueil")
        .setDescription('Permet d\'activer / désactiver la carte d\'arrivé / de départ des membres'),

        // accueilchannel
        new SlashCommandBuilder()
        .setName("accueilchannel")
        .setDescription('Permet de définir le channel associé au messages d\'arrivés et de départs')
        .addChannelOption(option => option.setName("salon").setDescription("Salon à utiliser").setRequired(false)),

        // accueilrole
        new SlashCommandBuilder()
        .setName("accueilrole")
        .setDescription('Permet de paramétrer le rôle donné à un membre qui rejoint le serveur')
        .addRoleOption(option => option.setName("salon").setDescription("Salon à utiliser").setRequired(true)),
        
        // captcha
        new SlashCommandBuilder()
        .setName("captcha")
        .setDescription('Permet d\'activer / désactiver le système de captcha'),

        // captchachannel
        new SlashCommandBuilder()
        .setName("captchachannel")
        .setDescription('Permet de définir le channel associé aux captcha')
        .addChannelOption(option => option.setName("salon").setDescription("Salon à utiliser").setRequired(false)),

        // captcharole
        new SlashCommandBuilder()
        .setName("captcharole")
        .setDescription('Permet de définir le rôle donné à un membre qui réussi le captcha')
        .addRoleOption(option => option.setName("salon").setDescription("Salon à utiliser").setRequired(true)),

        // niveau
        new SlashCommandBuilder()
        .setName("niveau")
        .setDescription("Permet d'activer ou de désactiver le système de niveau sur le serveur"),

        // niveauexperience
        new SlashCommandBuilder()
        .setName("niveauexperience")
        .setDescription('Défini le nombre d\'experience gagné par message')
        .addNumberOption(option => option.setName("nombre").setDescription("Nombre d'experience par message").setRequired(true)),
        
        // niveauexperience
        new SlashCommandBuilder()
        .setName("niveaulevel")
        .setDescription('Défini le nombre d\'experience nécessaire pour level UP')
        .addNumberOption(option => option.setName("nombre").setDescription("Nombre d'experience pour level UP").setRequired(true)),
        
        // reputationsys
        new SlashCommandBuilder()
        .setName("reputationsys")
        .setDescription('Permet d\'activer ou de désactiver le système de réputation sur le serveur'),
        
        // reputationsys
        new SlashCommandBuilder()
        .setName("test")
        .setDescription('Permet de tester la commande de test')

    ]

    const rest = new REST({ version: '10' }).setToken(token);
      
    bot.guilds.cache.forEach(async guild => {
        await rest.put(Routes.applicationGuildCommands(bot.user.id, guild.id), { body: commands });

    })

    console.log("Les slash commandes ont étés crées avec succès")
 
}