const {
    Events,
    ModalBuilder,
    TextInputBuilder,
    ActionRowBuilder,
    TextInputStyle,
    ChannelType
} = require("discord.js");

const SupportConfiguration = require("../../../Configurations/Support.json");
const MainConfiguration = require("../../../Configurations/Main.json");
const ERR = require("../../../Utils/Console/Error");
const RunSQL = require("../../../Utils/Database/Core/RunSQL");
const SupportEmbedBuilder = require("../../../Utils/CustomBuilders/EmbedBuilders/SupportEmbedBuilder");

module.exports = {
    name: Events.InteractionCreate,
    once: false,
    execute: async (interaction) => {
        try {
            async function ShowCreateTicketModal(interaction, CustomID, Name, Emoji, userVerificationData) {
                let VerificationPopup = new ModalBuilder()
                    .setTitle("Ticket | " + Name + " " + Emoji)
                    .setCustomId(CustomID + finalTicketCreationCustomId);

                let reason = new TextInputBuilder()
                    .setCustomId("ticketReason")
                    .setLabel("genauer Grund")
                    .setPlaceholder("Ich habe meinen Server neuinstalliert. Nun komme ich nicht mehr via SSH auf den Server.")
                    .setStyle(TextInputStyle.Paragraph)
                    .setMinLength(25)
                    .setMaxLength(2000)
                    .setRequired(true);

                let customerId = new TextInputBuilder()
                    .setCustomId("customerId")
                    .setLabel("Kunden Nr.")
                    .setPlaceholder("#10000")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(false);

                let productId = new TextInputBuilder()
                    .setCustomId("productId")
                    .setLabel("Produkt Nr.")
                    .setPlaceholder("SYN-10000")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(false);

                let reasonInputRow = new ActionRowBuilder().addComponents(reason);
                let productIdInputRow = new ActionRowBuilder().addComponents(productId);

                if (userVerificationData[0]) {
                    VerificationPopup.addComponents(reasonInputRow, productIdInputRow);
                } else {
                    let customerIdInputRow = new ActionRowBuilder().addComponents(customerId);
                    VerificationPopup.addComponents(reasonInputRow, customerIdInputRow, productIdInputRow);
                }

                await interaction.showModal(VerificationPopup);
            }

            async function FinalTicketCreation(interaction, CustomID, Name, Emoji, userVerificationData) {
                let ticketReason = interaction.fields.getTextInputValue("ticketReason");
                let productId = interaction.fields.getTextInputValue("productId");
                if (!userVerificationData[0]) var customerId = interaction.fields.getTextInputValue("customerId");

                let insertTicketSQL;

                await interaction.guild.channels.create({
                    parent: interaction.guild.channels.cache.find(channel => channel.id === SupportConfiguration.ticket_categoryId),
                    name: `【${Emoji}】${interaction.user.username}`,
                    permissionOverwrites: [
                        {
                            id: interaction.user.id,
                            allow: ["SendMessages", "ViewChannel"],
                        },
                        {
                            id: interaction.guild.roles.everyone,
                            deny: ["SendMessages", "ViewChannel"],
                        },
                        {
                            id: MainConfiguration.bot_id,
                            allow: ["ManageChannels"]
                        },
                        {
                            id: interaction.guild.roles.cache.find(role => role.id === SupportConfiguration.team_roleId),
                            allow: ["SendMessages", "ViewChannel"]
                        }
                    ],
                    type: ChannelType.GuildText,
                }).then(async createdTicketChannel => {

                    let ticketWereCreated = await SupportEmbedBuilder(`### Dein Ticket wurde erfolgreich erstellt!\n-# <#${createdTicketChannel.id}>`);
                    let ticketMessage = await SupportEmbedBuilder(`Danke <@${interaction.user.id}>, das du unseren Support in Anspruch nimmst.\nEin Supporter wird sich schnellstmöglich um dich kümmern.\n\n-# Screenshots, Logs, genaue Problem-Beschreibung, Kunden/Produkt Nummer helfen um dein Anliegen schneller zu lösen!`);

                    if (userVerificationData[0]) {
                        ticketMessage.addFields
                        (
                            {name: "Kategorie", value: Name},
                            {name: "Grund", value: `${ticketReason}`},
                            {name: "Kunden Nr.", value: `\`${userVerificationData[0].CustomerID}\``},
                            {name: "Verifizierungsstatus Status", value: `\`${userVerificationData[0].Status}\``},
                            {name: "Produkt Nr.", value: `\`${productId || "Keine Angabe."}\``}
                        )

                        insertTicketSQL = `INSERT INTO Tickets (TicketID, Category, UserID, CustomerID, ProductID) VALUES ('${createdTicketChannel.id}', '${CustomID}', '${interaction.user.id}', '${userVerificationData[0].CustomerID}', '${productId || null}')`;
                    } else {
                        ticketMessage.addFields
                        (
                            {name: "Kategorie", value: Name},
                            {name: "Grund", value: `${ticketReason}`},
                            {name: "Customer Nr.", value: `\`${customerId || "Keine Angabe."}\``},
                            {name: "Produkt Nr.", value: `\`${productId || "Keine Angabe."}\``}
                        )

                        insertTicketSQL = `INSERT INTO \`Tickets\` (\`TicketID\`, \`Category\`, \`UserID\`, \`CustomerID\`, \`ProductID\`) VALUES ('${createdTicketChannel.id}', '${CustomID}', '${interaction.user.id}', '${customerId || null}', '${productId || null}')`;
                    }

                    RunSQL(insertTicketSQL, interaction);

                    interaction.reply({embeds: [ticketWereCreated], ephemeral: true});
                    createdTicketChannel.send({
                        content: `<@${interaction.user.id}> | <@&${SupportConfiguration.team_roleId}>`,
                        embeds: [ticketMessage]
                    })
                })
            }

            let userVerificationDataSQL = `SELECT * FROM \`Verify\` WHERE UserID = ${interaction.user.id};`;
            let userVerificationData = await RunSQL(userVerificationDataSQL, interaction);

            let showModalCustomId = "-showCreateTicketModal";
            let finalTicketCreationCustomId = "-finalCreationTicket";

            let ticketTypes = Object.entries(SupportConfiguration.ticket_types);

            if (interaction.isButton()) {
                for (let [key, {CustomID, Name, Emoji}] of ticketTypes) {
                    if (interaction.customId === CustomID + showModalCustomId) {
                        ShowCreateTicketModal(interaction, CustomID, Name, Emoji, userVerificationData);
                    }
                }
            }

            if (interaction.isModalSubmit()) {
                for (let [key, {CustomID, Name, Emoji}] of ticketTypes) {
                    if (interaction.customId === CustomID + finalTicketCreationCustomId) {
                        FinalTicketCreation(interaction, CustomID, Name, Emoji, userVerificationData);
                    }
                }
            }
        } catch (err) {
            ERR(err, interaction);
        }
    },
};
