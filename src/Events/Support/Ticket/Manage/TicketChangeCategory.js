const {
    Events,
    ActionRowBuilder
} = require("discord.js");

const SupportConfiguration = require("../../../../Configurations/Support.json");
const ERR = require("../../../../Utils/Console/Error");
const CustomButtonBuilder = require("../../../../Utils/CustomBuilders/CustomButtonBuilder");
const SupportEmbedBuilder = require("../../../../Utils/CustomBuilders/EmbedBuilders/SupportEmbedBuilder");
const TicketData = require("../../../../Utils/Database/Features/Ticket/TicketData");
const UpdateTicket = require("../../../../Utils/Database/Features/Ticket/UpdateTicket");

module.exports = {
    name: Events.InteractionCreate,
    once: false,
    execute: async (interaction) => {
        try {
            async function FinalChangeCategory(interaction, customID) {
                let ticketData = await TicketData(interaction, interaction.channel.id);

                let ticketUser = interaction.guild.members.cache.find(user => user.id === ticketData[0].UserID)

                UpdateTicket(interaction, "Category", customID, interaction.channel.id);

                let newChannelName;

                if (ticketData[0].ClaimerID) {
                    let claimerUser = interaction.guild.members.cache.find(user => user.id === ticketData[0].ClaimerID);
                    newChannelName = `【${SupportConfiguration.ticket_types[customID].Emoji}】${ticketUser.user.username}-${claimerUser.user.username}`;
                } else {
                    newChannelName = `【${SupportConfiguration.ticket_types[customID].Emoji}】${ticketUser.user.username}`;
                }

                await interaction.channel.setName(newChannelName);

                let categoryChanged = await SupportEmbedBuilder(`## Die Category wurde zu ${SupportConfiguration.ticket_types[customID].Name} geändert!`)
                interaction.reply({embeds:[categoryChanged]});
            }

            if (interaction.isButton()) {
                let ticketTypes = Object.entries(SupportConfiguration.ticket_types);

                if (interaction.customId === "ticketChangeCategory") {
                    let whichCategory = await SupportEmbedBuilder("## Welche Kategorie möchtest du setzten?");

                    let ticketTypesButtonRow = new ActionRowBuilder();

                    for (let [key, {CustomID, Name, Emoji, ButtonStyle}] of ticketTypes) {
                        let ticketButton = await CustomButtonBuilder("ticketChangeCategory-" + CustomID, Name, Emoji, ButtonStyle);
                        ticketTypesButtonRow.addComponents(ticketButton);
                    }

                    interaction.reply({ embeds: [whichCategory], components: [ticketTypesButtonRow], ephemeral: true });
                }

                for (let [key, {CustomID}] of ticketTypes) {
                    if (interaction.customId === "ticketChangeCategory-" + CustomID) {
                        FinalChangeCategory(interaction, CustomID);
                    }
                }
            }
        } catch (err) {
            ERR(err, interaction);
        }
    },
};
