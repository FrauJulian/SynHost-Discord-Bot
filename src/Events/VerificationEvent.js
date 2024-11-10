const {
    EmbedBuilder,
    Events,
    ModalBuilder,
    TextInputBuilder,
    ActionRowBuilder,
    TextInputStyle,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

const VerificationConfiguration = require("../Configurations/Verification.json");
const ERR = require("../Utils/Console/Error");
const RunSQL = require("../Utils/Database/Core/RunSQL");
const VerificationEmbedBuilder = require("../Utils/CustomBuilders/EmbedBuilders/VerificationEmbedBuilder");

module.exports = {
    name: Events.InteractionCreate,
    once: false,
    execute: async (interaction) => {
        try {
            if (interaction.isButton() &&
                interaction.customId == "startVerificationButton") {
                let VerificationPopup = new ModalBuilder()
                    .setTitle("Verknüpfe deinen Account mit Discord!")
                    .setCustomId("linkAccount");

                let CustomerID = new TextInputBuilder()
                    .setCustomId("customerId")
                    .setLabel("Kunden Nr.")
                    .setPlaceholder("#10000")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true);

                let Contact = new TextInputBuilder()
                    .setCustomId("contactMethod")
                    .setLabel("Kontaktmöglichkeit")
                    .setPlaceholder("support@synhost.de & +49 (0)30 81456-5290")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true);

                let CustomerIdRow = new ActionRowBuilder().addComponents(CustomerID);
                let ContactIdRow = new ActionRowBuilder().addComponents(Contact);
                VerificationPopup.addComponents(CustomerIdRow, ContactIdRow);

                await interaction.showModal(VerificationPopup);
            }

            if (interaction.isModalSubmit() &&
                interaction.customId === "linkAccount") {
                let customerId = interaction.fields.getTextInputValue("customerId");
                let contactMethod = interaction.fields.getTextInputValue("contactMethod");

                let channel = interaction.guild.channels.cache.get(VerificationConfiguration.request_channelId);

                let request = await VerificationEmbedBuilder(`## Dein Antrag wurde eingereicht!`);
                let requestSend = await VerificationEmbedBuilder(`Der Nutzer, <@${interaction.user.id}>, mit der Kunden Nr. \`${customerId}\` und der Kontaktmöglichkeit \`${contactMethod}\` hat einen Verify Antrag eingereicht!`);

                let denyApproveRequestButtons = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`approveVerificationRequest-${interaction.user.id}`)
                            .setLabel("Approve")
                            .setEmoji("✅")
                            .setStyle(ButtonStyle.Success),
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`denyVerificationRequest-${interaction.user.id}`)
                            .setLabel("Deny/Delete")
                            .setEmoji("❌")
                            .setStyle(ButtonStyle.Danger),
                    );

                let insertRequestSQL = `INSERT INTO Verify (UserID, CustomerID, Contact, Status) VALUES ('${interaction.user.id}', '${customerId}', '${contactMethod}', 'WAITING');`;
                RunSQL(insertRequestSQL, interaction);

                channel.send({
                    content: `<@&${VerificationConfiguration.admin_roleId}>`,
                    embeds: [requestSend],
                    components: [denyApproveRequestButtons],
                })
                interaction.reply({embeds: [request], ephemeral: true})
            }

            if (interaction.isButton() &&
                interaction.customId.startsWith(`approveVerificationRequest`)) {
                let requestSenderId = interaction.customId.split('-');
                let requestSender = interaction.guild.members.cache.get(requestSenderId[1]);

                let verifiedRole = interaction.guild.roles.cache.find(role => role.id === VerificationConfiguration.linked_roleId);

                let replyMessage = await VerificationEmbedBuilder(`### Antrag von <@${requestSender.user.id}> wurde von <@${interaction.user.id}> akzeptiert!`);
                let requestSenderMessage = await VerificationEmbedBuilder(`### Dein Antrag für die Account Verknüpfung wurde von <@${interaction.user.id}> akzeptiert!`);

                let updateRequestSQL = `UPDATE Verify SET Status = 'APPROVED' WHERE UserID = ${requestSenderId[1]};`;
                RunSQL(updateRequestSQL, interaction);

                interaction.reply({embeds: [replyMessage]});
                try {
                    requestSender.user.send({embeds: [requestSenderMessage]});
                } catch (err) {
                    return;
                }
                requestSender.roles.add(verifiedRole);
            }

            if (interaction.isButton() &&
                interaction.customId.startsWith(`denyVerificationRequest`)) {
                let requestSenderId = interaction.customId.split('-');
                let requestSender = interaction.guild.members.cache.get(requestSenderId[1]);

                let verifiedRole = interaction.guild.roles.cache.find(role => role.id === VerificationConfiguration.linked_roleId);

                let replyMessage = await VerificationEmbedBuilder(`### Antrag von <@${requestSender.user.id}> wurde abgelehnt!`);
                let requestSenderMessage = await VerificationEmbedBuilder(`### Dein Antrag für die Account Verknüpfung wurde von <@${interaction.user.id}> abgelehnt!\n-# Überprüfe deine Angaben und reiche gerne einen neuen Antrag ein!`);

                let deleteRequestSQL = `DELETE FROM Verify WHERE UserID = ${requestSenderId[1]};`;
                RunSQL(deleteRequestSQL, interaction);

                interaction.reply({embeds: [replyMessage], ephemeral: true});
                try {
                    requestSender.user.send({embeds: [requestSenderMessage]});
                } catch (err) {
                    return;
                }

                if (requestSender.roles.cache.has(VerificationConfiguration.linked_roleId)) {
                    requestSender.roles.remove(verifiedRole);
                }

                interaction.message.delete();
            }
        } catch (err) {
            ERR(err, interaction);
        }
    },
};
