const {
    Events,
    ModalBuilder,
    TextInputBuilder,
    ActionRowBuilder,
    TextInputStyle
} = require("discord.js");

const ERR = require("../../../../Utils/Console/Error");
const TicketData = require("../../../../Utils/Database/Features/Ticket/TicketData");
const UpdateTicket = require("../../../../Utils/Database/Features/Ticket/UpdateTicket");
const SupportEmbedBuilder = require("../../../../Utils/CustomBuilders/EmbedBuilders/SupportEmbedBuilder");

module.exports = {
    name: Events.InteractionCreate,
    once: false,
    execute: async (interaction) => {
        try {
            if (interaction.isButton()) {
                if (interaction.customId === "ticketRemoveUser") {
                    let removeUserPopup = new ModalBuilder()
                        .setTitle("Ticket | Nutzer entfernen")
                        .setCustomId("ticketRemoveUser-modalSubmit");

                    let userId = new TextInputBuilder()
                        .setCustomId("userId")
                        .setLabel("ID des Nutzers")
                        .setPlaceholder("860206216893693973")
                        .setStyle(TextInputStyle.Short)
                        .setRequired(true);

                    let userIdRow = new ActionRowBuilder().addComponents(userId);
                    removeUserPopup.addComponents(userIdRow);
                    await interaction.showModal(removeUserPopup);
                }
            }

            if (interaction.isModalSubmit()) {
                if (interaction.customId === "ticketRemoveUser-modalSubmit") {
                    let removedUserId = interaction.fields.getTextInputValue("userId");
                    let removedUser = interaction.guild.members.cache.find(member => member.id === removedUserId);

                    let ticketData = await TicketData(interaction, interaction.channel.id);

                    if (!ticketData[0].ExtraUsersID === null ||
                        ticketData[0].ExtraUsersID.includes(removedUser.user.id)) {
                        await interaction.channel.permissionOverwrites.edit(removedUser, {
                            SendMessages: false,
                            ViewChannel: false
                        });

                        let removedUserSQLData = ticketData[0].ExtraUsersID.split(",").filter(id => id !== removedUser.user.id).join(",");
                        if (removedUserSQLData === "") removedUserSQLData = null;
                        UpdateTicket(interaction, "ExtraUsersID", removedUserSQLData, interaction.channel.id);

                        let embedMessage = await SupportEmbedBuilder(`## <@${removedUser.user.id}> wurde aus dem Ticket entfernt!`);

                        interaction.reply({
                            content: `<@${removedUser.user.id}>`,
                            embeds: [embedMessage]
                        });
                    } else {
                        let embedMessage = await SupportEmbedBuilder(`## <@${removedUser.user.id}> ist nicht in diesem Ticket!`);
                        interaction.reply({embeds: [embedMessage], ephemeral: true});
                    }
                }
            }
        } catch (err) {
            ERR(err, interaction);
        }
    },
};
