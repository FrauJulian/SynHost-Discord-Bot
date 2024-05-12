const { EmbedBuilder } = require('discord.js');
const client = require("../../index");
const config = require("../../CONFIGS/config.json");
const moment = require("moment");
const mysql = require("mysql");

module.exports = {
    name: "ticketUnclaim"
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

        if(interaction.isButton()) {
            if(interaction.customId.startsWith("ticket-unclaim")) {
                const channel = interaction.guild.channels.cache.get(interaction.channel.id);

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
                        return;
                    } else {
                        const RESPONSE = JSON.parse(JSON.stringify(results));
    
                        const user = interaction.guild.members.cache.get(RESPONSE[0].user);
    
                        if (RESPONSE[0].claimer == null) {
                            const AlreadyUnClaimed = new EmbedBuilder()
                            .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                            .setDescription("### Das Ticket wurde noch nicht geclaimed!")
                            .setTimestamp()
                            .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                            .setColor(embed_color)
                            interaction.reply({ embeds: [AlreadyUnClaimed], ephemeral: true })
                        } else {
                            DBconnection.query("UPDATE `" + channel.id + "` SET claimer = null", async function (err, results, fields) {
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
                                    return;
                                } else {
                                    await channel.setName("ticket-" + user.user.username);
            
                                    const UnClaimed = new EmbedBuilder()
                                    .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                                    .setDescription("### Das Ticket wurde unclaimed!")
                                    .setTimestamp()
                                    .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                                    .setColor(embed_color)
                                    interaction.reply({ embeds: [UnClaimed] })
                                }
                            })
                        }
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
        interaction.reply({ embeds: [ErrEmbed], ephemeral: true})

        console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ERR:\n` + err);
    }
})