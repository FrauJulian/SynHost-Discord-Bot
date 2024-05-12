const { ActionRowBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const client = require("../../index");
const config = require("../../CONFIGS/config.json");
const moment = require("moment");
const mysql = require("mysql");

module.exports = {
    name: "ticketAddUser"
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
            if (interaction.customId === "ticket-adduser") {
                const UserModal = new ModalBuilder()
                .setCustomId("ticket-adduser-modal")
                .setTitle(`SynHost.de Support`);

               const AddUsername = new TextInputBuilder()
                    .setCustomId("ticket-adduser-id")
                    .setLabel("User ID")
                    .setPlaceholder("Gib die User ID des Users an.")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true);

                const UserNameInput = new ActionRowBuilder().addComponents(AddUsername);
                UserModal.addComponents(UserNameInput);
                interaction.showModal(UserModal);
            }  
        }

        if(interaction.isModalSubmit()) {
            if (interaction.customId.startsWith("ticket-adduser-modal")) {
                const channel = interaction.guild.channels.cache.get(interaction.channel.id);
                const AddUserID = interaction.fields.getTextInputValue('ticket-adduser-id');

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
                        interaction.reply({ embeds: [ErrEmbed], ephemeral: true})
                
                        console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ERR:\n` + err);
                    } else {
                        const RESPONSE = JSON.parse(JSON.stringify(results));

                        channel.edit({
                            permissionOverwrites: [
                                {
                                    id: RESPONSE[0].user,
                                    allow: ['SendMessages', 'ViewChannel'],
                                },
                                {
                                    id: interaction.guild.roles.everyone,
                                    deny: ['SendMessages', 'ViewChannel'],
                                },
                                {
                                    id: config.generell.bot_id,
                                    allow: ['ManageChannels']
                                },
                                {
                                    id: config.support.supporter_role_id,
                                    allow: ['SendMessages', 'ViewChannel']
                                },
                                {
                                    id: AddUserID,
                                    allow: ['SendMessages', 'ViewChannel']
                                }
                            ],
                        })

                        const UserAdded = new EmbedBuilder()
                        .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                        .setDescription("### Der Nutzer <@" + AddUserID + "> wurde hinzugefügt!")
                        .setTimestamp()
                        .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                        .setColor(embed_color)
                        interaction.reply({ embeds: [UserAdded] })
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