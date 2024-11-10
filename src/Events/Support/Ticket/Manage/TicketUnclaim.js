const {
    Events,
} = require("discord.js");

const SupportConfiguration = require("../../../../Configurations/Support.json");
const ERR = require("../../../../Utils/Console/Error");
const SupportEmbedBuilder = require("../../../../Utils/CustomBuilders/EmbedBuilders/SupportEmbedBuilder");
const TicketData = require("../../../../Utils/Database/Features/Ticket/TicketData");
const UpdateTicket = require("../../../../Utils/Database/Features/Ticket/UpdateTicket");

module.exports = {
    name: Events.InteractionCreate,
    once: false,
    execute: async (interaction) => {
        try {
            if (interaction.isButton()) {
                if (interaction.customId === "ticketUnclaim") {
                    let ticketData = await TicketData(interaction, interaction.channel.id);

                    let ticketUser = interaction.guild.members.cache.find(user => user.id === ticketData[0].UserID)

                    UpdateTicket(interaction, "ClaimerID", null, interaction.channel.id);

                    let newChannelName = `【${SupportConfiguration.ticket_types[ticketData[0].Category].Emoji}】${ticketUser.user.username}`;
                    await interaction.channel.setName(newChannelName);

                    let embedMessage = await SupportEmbedBuilder(`## Das Ticket wurde freigegeben!`);
                    interaction.reply({embeds: [embedMessage]});
                }
            }
        } catch (err) {
            ERR(err, interaction);
        }
    },
};
