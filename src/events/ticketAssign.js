const { ActionRowBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const client = require("../../index");
const config = require("../../CONFIGS/config.json");
const moment = require("moment");
const mysql = require("mysql");

module.exports = {
    name: "ticketAssign"
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
            if (interaction.customId === "ticket-assign") {
                const UserModal = new ModalBuilder()
                .setCustomId("ticket-assign-modal")
                .setTitle(`SynHost.de Support`);

               const AddUsername = new TextInputBuilder()
                    .setCustomId("ticket-assign-id")
                    .setLabel("User ID")
                    .setPlaceholder("Gib die User ID deines Kollegen an.")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true);

                const UserNameInput = new ActionRowBuilder().addComponents(AddUsername);
                UserModal.addComponents(UserNameInput);
                interaction.showModal(UserModal);
            }  
        }

        if(interaction.isModalSubmit()) {
            if (interaction.customId.startsWith("ticket-assign-modal")) {
                const channel = interaction.guild.channels.cache.get(interaction.channel.id);
                const userID = interaction.fields.getTextInputValue('ticket-assign-id');
                
                DBconnection.query("UPDATE `" + channel.id + "` SET claimer = " + userID + "", async function (err, results, fields) {
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

                                const claimer = interaction.guild.members.cache.get(userID);
                                const user = interaction.guild.members.cache.get(RESPONSE[0].user);

                                await channel.setName("u-" + user.user.username + "-c-" + claimer.user.username);

                                if (RESPONSE[0].user == null) {
                                    const Claimed = new EmbedBuilder()
                                    .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                                    .setDescription("### Es wird Ihnen nun von <@" + userID + "> geholfen!")
                                    .setTimestamp()
                                    .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                                    .setColor(embed_color)
                                    interaction.reply({ embeds: [Claimed] })
                                } else {
                                    const AlreadyClaimed = new EmbedBuilder()
                                    .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                                    .setDescription("### Das Ticket wurde an <@" + userID + "> übergeben!")
                                    .setTimestamp()
                                    .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                                    .setColor(embed_color)
                                    interaction.reply({ embeds: [AlreadyClaimed] })
                                }
                            }
                        })
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