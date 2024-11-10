const {
    Events
} = require("discord.js");

const SupportConfiguration = require("../../../../Configurations/Support.json");
const ERR = require("../../../../Utils/Console/Error");
const SupportEmbedBuilder = require("../../../../Utils/CustomBuilders/EmbedBuilders/SupportEmbedBuilder");

module.exports = {
    name: Events.InteractionCreate,
    once: false,
    execute: async (interaction) => {
        try {
            if (interaction.isButton()) {
                if (interaction.customId === "ticketPsychiater") {
                    let randomPsychiaterMessage = SupportConfiguration.psychiater_messages[Math.floor(Math.random() * SupportConfiguration.psychiater_messages.length)];
                    let teamChat = interaction.guild.channels.cache.get(SupportConfiguration.team_channelId);

                    let getHelpMessage = await SupportEmbedBuilder(`## <@${interaction.user.id}> hat den Psychiater in <#${interaction.channel.id}>!\n-# Übernehme das Ticket für <@${interaction.user.id}>!`);
                    let ChatGPTHelpMessage = await SupportEmbedBuilder(`## ${randomPsychiaterMessage}\n-# Mit ChatGPT generiert! 😂`);

                    teamChat.send({content: `<@&${SupportConfiguration.team_roleId}>`, embeds: [getHelpMessage] })
                    interaction.reply({ embeds: [ChatGPTHelpMessage], ephemeral: true });
                }
            }
        } catch (err) {
            ERR(err, interaction);
        }
    },
};
