const {
    Events, AttachmentBuilder,
} = require("discord.js");
const discordTranscripts = require('discord-html-transcripts');

const SupportConfiguration = require("../../../../Configurations/Support.json");
const ERR = require("../../../../Utils/Console/Error");
const SupportEmbedBuilder = require("../../../../Utils/CustomBuilders/EmbedBuilders/SupportEmbedBuilder");
const TicketData = require("../../../../Utils/Database/Features/Ticket/TicketData");
const {writeFile} = require("fs");
const RunSQL = require("../../../../Utils/Database/Core/RunSQL");

module.exports = {
    name: Events.InteractionCreate,
    once: false,
    execute: async (interaction) => {
        function MessageConfigurator(ticketClosedMessage, ticketUser, ticketData) {
            let ticketClaimer;

            ticketClosedMessage.addFields({ name: "User ID", value: `${ticketUser.user.id}`, inline: true })
            ticketClosedMessage.addFields({ name: "User Username", value: `${ticketUser.user.username}`, inline: true })
            ticketClosedMessage.addFields({ name: "User Mention", value: `<@${ticketUser.user.id}>`, inline: true })

            if (ticketData[0].ClaimerID) {
                ticketClaimer = interaction.guild.members.cache.find(user => user.id === ticketData[0].ClaimerID);

                ticketClosedMessage.addFields({ name: "Claimer ID", value: `${ticketClaimer.user.id}`, inline: true })
                ticketClosedMessage.addFields({ name: "Claimer Username", value: `${ticketClaimer.user.username}`, inline: true })
                ticketClosedMessage.addFields({ name: "Claimer Mention", value: `<@${ticketClaimer.user.id}>`, inline: true })
            }

            if (ticketData[0].ExtraUsersID) {
                let addedUsersList = ticketData[0].ExtraUsersID.split(",");

                addedUsersList.forEach((addedUserId, index) => {
                    index++;
                    let addedUser = interaction.guild.members.cache.find(user => user.id === addedUserId);

                    ticketClosedMessage.addFields({ name: `Added User ${index} ID`, value: `${addedUser.user.id}`, inline: true })
                    ticketClosedMessage.addFields({ name: `Added User ${index} Username`, value: `${addedUser.user.username}`, inline: true })
                    ticketClosedMessage.addFields({ name: `Added User ${index} Mention`, value: `<@${addedUser.user.id}>`, inline: true })
                })
            }

            ticketClosedMessage.addFields({ name: "Ticket ID", value: `${ticketData[0].TicketID}`, inline: true })
            ticketClosedMessage.addFields({ name: "geschlossen von", value: `<@${interaction.user.id}>`, inline: true })
            ticketClosedMessage.addFields({ name: "Webview", value: `${SupportConfiguration.ticket_webViewURL}${ticketData[0].TicketID}.html`, inline: true })
        }

        try {
            if (interaction.isButton()) {
                if (interaction.customId === "ticketClose") {
                    let ticketData = await TicketData(interaction, interaction.channel.id);

                    let ticketUser = interaction.guild.members.cache.find(user => user.id === ticketData[0].UserID);
                    let transcriptChannel = interaction.guild.channels.cache.find(channel => channel.id === SupportConfiguration.transcript_channelId);

                    await interaction.channel.permissionOverwrites.edit(SupportConfiguration.team_roleId, {
                        SendMessages: false,
                        ViewChannel: true
                    });

                    await interaction.channel.permissionOverwrites.edit(ticketData[0].UserID, {
                        SendMessages: false,
                        ViewChannel: true
                    });

                    let log = await discordTranscripts.createTranscript(interaction.channel, {
                        limit: -1,
                        returnType: "string",
                        filename: `${interaction.channel.id}.html`,
                        saveImages: true,
                        poweredBy: false
                    });

                    writeFile(`./transcripts/${interaction.channel.id}.html`, log, function (err) {
                        if (err) ERR(err);
                    });

                    let newChannelName = `【${SupportConfiguration.ticket_types[ticketData[0].Category].Emoji}】closed`;
                    await interaction.channel.setName(newChannelName);

                    let ticketClosedMessageUser = await SupportEmbedBuilder(`### Das Ticket wurde von <@${interaction.user.id}> geschlossen!\nBewerten Sie uns gerne in **<#${SupportConfiguration.feedbackChannelId}>**, auf **[Trustpilot](https://at.trustpilot.com/review/synhost.de)** oder auf **[Google](https://g.page/r/CTzKF9Xwbq8IEB0/review)**!`);
                    let ticketClosedMessageLog = await SupportEmbedBuilder(`### Das Ticket wurde von <@${interaction.user.id}> geschlossen!`);
                    MessageConfigurator(ticketClosedMessageUser, ticketUser, ticketData);
                    MessageConfigurator(ticketClosedMessageLog, ticketUser, ticketData);

                    let ticketLog = new AttachmentBuilder()
                        .setFile(`./transcripts/${interaction.channel.id}.html`);

                    let deleteTicketSQL = `DELETE FROM Tickets WHERE TicketID = ${ticketData[0].TicketID}`;
                    RunSQL(deleteTicketSQL, interaction);

                    ticketUser.send({embeds: [ticketClosedMessageUser], files: [ticketLog]});
                    transcriptChannel.send({embeds: [ticketClosedMessageLog], files: [ticketLog]});

                    setTimeout(() => {
                        interaction.channel.delete();
                    }, 30000);

                    interaction.deferUpdate();
                }
            }
        } catch (err) {
            ERR(err, interaction);
        }
    },
};
