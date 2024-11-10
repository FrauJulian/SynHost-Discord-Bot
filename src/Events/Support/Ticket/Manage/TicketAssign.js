const {
    Events,
    ModalBuilder,
    TextInputBuilder,
    ActionRowBuilder,
    TextInputStyle
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
                if (interaction.customId === "ticketAssign") {
                    let addedUserPopup = new ModalBuilder()
                        .setTitle("Ticket | Übergabe")
                        .setCustomId("ticketAssign-modalSubmit");

                    let userId = new TextInputBuilder()
                        .setCustomId("userId")
                        .setLabel("ID des Nutzers")
                        .setPlaceholder("860206216893693973")
                        .setStyle(TextInputStyle.Short)
                        .setRequired(true);

                    let userIdRow = new ActionRowBuilder().addComponents(userId);
                    addedUserPopup.addComponents(userIdRow);
                    await interaction.showModal(addedUserPopup);
                }
            }

            if (interaction.isModalSubmit()) {
                if (interaction.customId === "ticketAssign-modalSubmit") {
                    let assignedUserId = interaction.fields.getTextInputValue("userId");

                    let ticketData = await TicketData(interaction, interaction.channel.id);

                    let assignedUser = interaction.guild.members.cache.find(member => member.id === assignedUserId);
                    let ticketUser = interaction.guild.members.cache.find(user => user.id === ticketData[0].UserID)

                    UpdateTicket(interaction, "ClaimerID", assignedUser.user.id, interaction.channel.id);

                    let newChannelName = `【${SupportConfiguration.ticket_types[ticketData[0].Category].Emoji}】${ticketUser.user.username}-${assignedUser.user.username}`;
                    await interaction.channel.setName(newChannelName);

                    let embedMessage = await SupportEmbedBuilder(`## Das Ticket wurde an <@${assignedUser.user.id}> übergeben!`);
                    interaction.reply({embeds:[embedMessage]})
                }
            }
        } catch (err) {
            ERR(err, interaction);
        }
    },
};
