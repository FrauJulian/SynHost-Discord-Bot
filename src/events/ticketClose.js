const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const discordTranscripts = require('discord-html-transcripts');
const { exec } = require("child_process");
const moment = require("moment");
const mysql = require("mysql");
const fs = require("fs");

const client = require("../../index");
const config = require("../../CONFIGS/config.json");
const { fileURLToPath } = require('url');

module.exports = {
    name: "ticketClose"
};

client.on("interactionCreate", async (interaction) => {
    try {
        let embed_author_text = config.support.embeds_theme.embed_author_text;
        let embed_author_icon = config.support.embeds_theme.embed_author_icon;
        let embed_footer_text = config.support.embeds_theme.embed_footer_text;
        let embed_footer_icon = config.support.embeds_theme.embed_footer_icon;
        let embed_color = config.support.embeds_theme.embed_color;

        const DBconnection = mysql.createConnection({
            host: config.generell.db_host,
            port: config.generell.db_port,
            user: config.generell.db_user,
            password: config.generell.db_password,
            database: config.generell.db_name,
        });

        if (interaction.isButton()) {
            if (interaction.customId.startsWith("ticket-close")) {
                const channel = interaction.guild.channels.cache.get(interaction.channel.id);
                const channelLog = interaction.guild.channels.cache.find(ch => ch.id === config.support.log_channel_id);

                const LogString = await discordTranscripts.createTranscript(channel, {
                    limit: -1,
                    returnType: "string",
                    filename: "transcript-" + interaction.channel.id + ".html",
                    saveImages: true,
                    poweredBy: false
                });

                fs.writeFile("./transcripts/transcript-" + interaction.channel.id + ".html", LogString, function (err) {
                    if (err) {
                        let embed_author_text = config.generell.err_embed.embed_author_text;
                        let embed_author_icon = config.generell.err_embed.embed_author_icon;
                        let embed_description = config.generell.err_embed.embed_description.replace("%err%", "" + err + "");
                        let embed_footer_text = config.generell.err_embed.embed_footer_text;
                        let embed_footer_icon = config.generell.err_embed.embed_footer_icon;
                        let embed_color = config.generell.err_embed.embed_color;

                        const ErrEmbed = new EmbedBuilder()
                            .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                            .setDescription(embed_description)
                            .setTimestamp()
                            .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                            .setColor(embed_color)
                        interaction.reply({ embeds: [ErrEmbed], ephemeral: true })

                        console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ERR:\n` + err);
                    }
                });

                DBconnection.query("SELECT * from `" + channel.id + "`", async function (err, results, fields) {
                    if (err) {
                        let embed_author_text = config.generell.err_embed.embed_author_text;
                        let embed_author_icon = config.generell.err_embed.embed_author_icon;
                        let embed_description = config.generell.err_embed.embed_description.replace("%err%", "" + err + "");
                        let embed_footer_text = config.generell.err_embed.embed_footer_text;
                        let embed_footer_icon = config.generell.err_embed.embed_footer_icon;
                        let embed_color = config.generell.err_embed.embed_color;

                        const ErrEmbed = new EmbedBuilder()
                            .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                            .setDescription(embed_description)
                            .setTimestamp()
                            .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                            .setColor(embed_color)
                        interaction.reply({ embeds: [ErrEmbed], ephemeral: true })

                        console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ERR:\n` + err);
                    } else {
                        const RESPONSE = JSON.parse(JSON.stringify(results));

                        const user = interaction.guild.members.cache.get(RESPONSE[0].user);

                        setTimeout(async () => {
                            if (RESPONSE[0].claimer !== null) {
                                await channel.edit({
                                    permissionOverwrites: [
                                        {
                                            id: RESPONSE[0].user,
                                            deny: ['SendMessages'],
                                        },
                                        {
                                            id: RESPONSE[0].user,
                                            allow: ['ViewChannel'],
                                        },
                                        {
                                            id: config.support.supporter_role_id,
                                            deny: ['SendMessages']
                                        },
                                        {
                                            id: config.support.supporter_role_id,
                                            allow: ['ViewChannel']
                                        },
                                        {
                                            id: interaction.guild.roles.everyone,
                                            deny: ['SendMessages', 'ViewChannel'],
                                        },
                                        {
                                            id: config.generell.bot_id,
                                            allow: ['ManageChannels']
                                        },
                                    ],
                                })

                                const claimer = interaction.guild.members.cache.get(RESPONSE[0].claimer);

                                const LogFile = new AttachmentBuilder()
                                    .setFile("transcripts/transcript-" + interaction.channel.id + ".html")

                                const LogEmbed = new EmbedBuilder()
                                    .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                                    .setDescription("### Log des geschlossenen Tickets.\n> Das Ticket wurde von <@" + interaction.user.id + "> geschlossen!")
                                    .addFields(
                                        { name: "User ID", value: "`" + user.user.id + "`", inline: true },
                                        { name: "User Username", value: "`" + user.user.username + "`", inline: true },
                                        { name: "User Display Name", value: "`" + user.user.displayName + "`", inline: true },
                                        { name: "Claimer ID", value: "`" + claimer.id + "`", inline: true },
                                        { name: "Claimer Username", value: "`" + claimer.user.username + "`", inline: true },
                                        { name: "Claimer Display Name", value: "`" + claimer.user.displayName + "`", inline: true },
                                        { name: "Ticket ID", value: "`" + RESPONSE[0].channel + "`", inline: true },
                                        { name: "Ticket geschlossen von", value: "`" + interaction.user.username + "`", inline: true },
                                        { name: "Ticket Webview", value: "https://log.fraujulian.xyz/transcript-" + channel.id + ".html", inline: true },
                                    )
                                    .setTimestamp()
                                    .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                                    .setColor(embed_color)

                                const DeleteEmbed = new EmbedBuilder()
                                    .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                                    .setDescription("### Das Ticket wurde geschlossen!\n> Das Ticket wird in 2 Minuten gelöscht!")
                                    .setTimestamp()
                                    .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                                    .setColor(embed_color)

                                setTimeout(() => {
                                    exec("mv /var/lib/pufferpanel/servers/" + config.support.serverid_bot + "/transcripts/transcript-" + interaction.channel.id + ".html /var/lib/pufferpanel/servers/" + config.support.serverid_web + "", (err, stdout, stderr) => {
                                        if (err) {
                                            let embed_author_text = config.generell.err_embed.embed_author_text;
                                            let embed_author_icon = config.generell.err_embed.embed_author_icon;
                                            let embed_description = config.generell.err_embed.embed_description.replace("%err%", "" + err + "");
                                            let embed_footer_text = config.generell.err_embed.embed_footer_text;
                                            let embed_footer_icon = config.generell.err_embed.embed_footer_icon;
                                            let embed_color = config.generell.err_embed.embed_color;

                                            const ErrEmbed = new EmbedBuilder()
                                                .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                                                .setDescription(embed_description)
                                                .setTimestamp()
                                                .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                                                .setColor(embed_color)
                                            interaction.reply({ embeds: [ErrEmbed], ephemeral: true })

                                            console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ERR:\n` + err);
                                        }
                                    });
                                }, 10000);

                                user.send({ content: "|| <@" + user.user.id + "> || :heart:\n\nBewerten Sie uns gerne in <#1170807016567078945>, auf [Trustpilot](https://de.trustpilot.com/evaluate/synergy-solution.de) oder auf [Google](https://g.page/r/CTzKF9Xwbq8IEB0/review)." });
                                user.send({ embeds: [LogEmbed], files: [LogFile] });
                                channelLog.send({ embeds: [LogEmbed], files: [LogFile] });
                                channel.send({ embeds: [DeleteEmbed] });
                            } else {
                                const LogFile = new AttachmentBuilder()
                                    .setFile("transcripts/transcript-" + interaction.channel.id + ".html")

                                const LogEmbed = new EmbedBuilder()
                                    .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                                    .setDescription("### Log des geschlossenen Tickets.")
                                    .addFields(
                                        { name: "User ID", value: "`" + user.user.id + "`", inline: true },
                                        { name: "User Username", value: "`" + user.user.username + "`", inline: true },
                                        { name: "User Display Name", value: "`" + user.user.displayName + "`", inline: true },
                                        { name: "Ticket ID", value: "`" + RESPONSE[0].channel + "`", inline: true },
                                        { name: "Ticket geschlossen von", value: "`" + interaction.user.username + "`", inline: true },
                                        { name: "Ticket Webview", value: "https://log.fraujulian.xyz/transcript-" + channel.id + ".html", inline: true },
                                    )
                                    .setTimestamp()
                                    .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                                    .setColor(embed_color)

                                const DeleteEmbed = new EmbedBuilder()
                                    .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                                    .setDescription("### Das Ticket wurde geschlossen!\n> Das Ticket wird in 2 Minuten gelöscht!")
                                    .setTimestamp()
                                    .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                                    .setColor(embed_color)

                                setTimeout(() => {
                                    exec("mv /var/lib/pufferpanel/servers/" + config.support.serverid_bot + "/transcripts/transcript-" + interaction.channel.id + ".html /var/lib/pufferpanel/servers/" + config.support.serverid_web + "", (err, stdout, stderr) => {
                                        if (err) {
                                            let embed_author_text = config.generell.err_embed.embed_author_text;
                                            let embed_author_icon = config.generell.err_embed.embed_author_icon;
                                            let embed_description = config.generell.err_embed.embed_description.replace("%err%", "" + err + "");
                                            let embed_footer_text = config.generell.err_embed.embed_footer_text;
                                            let embed_footer_icon = config.generell.err_embed.embed_footer_icon;
                                            let embed_color = config.generell.err_embed.embed_color;

                                            const ErrEmbed = new EmbedBuilder()
                                                .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                                                .setDescription(embed_description)
                                                .setTimestamp()
                                                .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                                                .setColor(embed_color)
                                            interaction.reply({ embeds: [ErrEmbed], ephemeral: true })

                                            console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ERR:\n` + err);
                                        }
                                    });
                                }, 10000);

                                user.send({ content: "|| <@" + user.user.id + "> || :heart:\n\nBewerten Sie uns gerne in <#1170807016567078945>, auf [Trustpilot](https://de.trustpilot.com/evaluate/synergy-solution.de) oder auf [Google](https://g.page/r/CTzKF9Xwbq8IEB0/review)." });
                                user.send({ embeds: [LogEmbed], files: [LogFile] });
                                channelLog.send({ embeds: [LogEmbed], files: [LogFile] });
                                channel.send({ embeds: [DeleteEmbed] });
                            }

                            setTimeout(() => {
                                DBconnection.query("DROP TABLE `" + channel.id + "`", async function (err, results, fields) {
                                    if (err) {
                                        let embed_author_text = config.generell.err_embed.embed_author_text;
                                        let embed_author_icon = config.generell.err_embed.embed_author_icon;
                                        let embed_description = config.generell.err_embed.embed_description.replace("%err%", "" + err + "");
                                        let embed_footer_text = config.generell.err_embed.embed_footer_text;
                                        let embed_footer_icon = config.generell.err_embed.embed_footer_icon;
                                        let embed_color = config.generell.err_embed.embed_color;

                                        const ErrEmbed = new EmbedBuilder()
                                            .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                                            .setDescription(embed_description)
                                            .setTimestamp()
                                            .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                                            .setColor(embed_color)
                                        interaction.reply({ embeds: [ErrEmbed], ephemeral: true })

                                        console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ERR:\n` + err);
                                    } else {
                                        channel.delete();
                                    }
                                })
                            }, 120000);
                        }, 800);
                    }
                })
            }
        }
    } catch (err) {
        let embed_author_text = config.generell.err_embed.embed_author_text;
        let embed_author_icon = config.generell.err_embed.embed_author_icon;
        let embed_description = config.generell.err_embed.embed_description.replace("%err%", "" + err + "");
        let embed_footer_text = config.generell.err_embed.embed_footer_text;
        let embed_footer_icon = config.generell.err_embed.embed_footer_icon;
        let embed_color = config.generell.err_embed.embed_color;

        const ErrEmbed = new EmbedBuilder()
            .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
            .setDescription(embed_description)
            .setTimestamp()
            .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
            .setColor(embed_color)
        interaction.reply({ embeds: [ErrEmbed], ephemeral: true })

        console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ERR:\n` + err);
    }
})