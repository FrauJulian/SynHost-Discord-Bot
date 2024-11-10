const {
    Events,
    ModalBuilder,
    TextInputBuilder,
    ActionRowBuilder,
    TextInputStyle
} = require("discord.js");

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
                if (interaction.customId === "ticketAddUser") {
                    let addedUserPopup = new ModalBuilder()
                        .setTitle("Ticket | Nutzer hinzufügen")
                        .setCustomId("ticketAddUser-modalSubmit");

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
                if (interaction.customId === "ticketAddUser-modalSubmit") {
                    let addedUserId = interaction.fields.getTextInputValue("userId");
                    let addedUser = interaction.guild.members.cache.find(member => member.id === addedUserId);

                    let ticketData = await TicketData(interaction, interaction.channel.id);

                    if (ticketData[0].ExtraUsersID === null || !ticketData[0].ExtraUsersID.includes(addedUser.user.id)) {
                        await interaction.channel.permissionOverwrites.edit(addedUser, {
                            SendMessages: true,
                            ViewChannel: true
                        });

                        let addedUserSQLData = ticketData[0].ExtraUsersID ? ticketData[0].ExtraUsersID + "," + addedUser.user.id : addedUser.user.id;
                        UpdateTicket(interaction, "ExtraUsersID", addedUserSQLData, interaction.channel.id);

                        let embedMessage = await SupportEmbedBuilder(`## <@${addedUser.user.id}> wurde zum Ticket hinzugefügt!`);
                        interaction.reply({content: `<@${addedUser.user.id}>`, embeds: [embedMessage]});
                    } else {
                        let embedMessage = await SupportEmbedBuilder(`## <@${addedUser.user.id}> wurde bereits hinzugefügt!`);
                        interaction.reply({embeds: [embedMessage], ephemeral: true});
                    }
                }
            }
        } catch (err) {
            ERR(err, interaction);
        }
    },
};
