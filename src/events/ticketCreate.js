const { ActionRowBuilder, ChannelType, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const mysql = require("mysql");
const moment = require("moment");

const client = require("../../index");
const config = require("../../CONFIGS/config.json");

module.exports = {
    name: "ticketCreate"
};

client.on("interactionCreate", async (interaction) => {

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
        try {
            if (interaction.customId.startsWith(config.support.category_1_customid)) {
    
                const Modal = new ModalBuilder()
                .setCustomId(config.support.category_1_customid + "-modal")
                .setTitle(`SynHost.de Support`);
    
                const TicketGrund  = new TextInputBuilder()
                .setCustomId(`ticket-reason`)
                .setLabel("Grund - Frage/Problem")
                .setPlaceholder("Geben Sie die genaue Frage/Problem an!")
                .setStyle(TextInputStyle.Paragraph)
                .setRequired(true);
    
                const KundenNr  = new TextInputBuilder()
                .setCustomId(`ticket-customer`)
                .setLabel("Kunden Nr.")
                .setPlaceholder("Geben Sie Ihre Kunden Nr. an! ")
                .setStyle(TextInputStyle.Short)
                .setRequired(false);
    
                const ProduktNr  = new TextInputBuilder()
                .setCustomId(`ticket-product`)
                .setLabel("Produkt Nr.")
                .setPlaceholder("Geben Sie die Produkt Nr. an! ")
                .setStyle(TextInputStyle.Short)
                .setRequired(false);
    
                const Action = new ActionRowBuilder().addComponents(TicketGrund);
                const Action0 = new ActionRowBuilder().addComponents(KundenNr);
                const Action1 = new ActionRowBuilder().addComponents(ProduktNr);
                Modal.addComponents(Action);
                Modal.addComponents(Action0);
                Modal.addComponents(Action1);
                await interaction.showModal(Modal);
            }
            if (interaction.customId.startsWith(config.support.category_2_customid)) {
    
                const Modal = new ModalBuilder()
                .setCustomId(config.support.category_2_customid + "-modal")
                .setTitle(`SynHost.de Support`);
    
                const TicketGrund  = new TextInputBuilder()
                .setCustomId(`ticket-reason`)
                .setLabel("Grund - Frage/Problem")
                .setPlaceholder("Geben Sie die genaue Frage/Problem an!")
                .setStyle(TextInputStyle.Paragraph)
                .setRequired(true);
    
                const KundenNr  = new TextInputBuilder()
                .setCustomId(`ticket-customer`)
                .setLabel("Kunden Nr.")
                .setPlaceholder("Geben Sie Ihre Kunden Nr. an!")
                .setStyle(TextInputStyle.Short)
                .setRequired(false);
    
                const ProduktNr  = new TextInputBuilder()
                .setCustomId(`ticket-product`)
                .setLabel("Produkt Nr.")
                .setPlaceholder("Geben Sie die Produkt Nr. an!")
                .setStyle(TextInputStyle.Short)
                .setRequired(false);
    
                const Action = new ActionRowBuilder().addComponents(TicketGrund);
                const Action0 = new ActionRowBuilder().addComponents(KundenNr);
                const Action1 = new ActionRowBuilder().addComponents(ProduktNr);
                Modal.addComponents(Action);
                Modal.addComponents(Action0);
                Modal.addComponents(Action1);
                await interaction.showModal(Modal);
            }
            if (interaction.customId.startsWith(config.support.category_3_customid)) {
    
                const Modal = new ModalBuilder()
                .setCustomId(config.support.category_3_customid + "-modal")
                .setTitle(`SynHost.de Support`);
    
                const TicketGrund  = new TextInputBuilder()
                .setCustomId(`ticket-reason`)
                .setLabel("Grund - Frage/Problem")
                .setPlaceholder("Geben Sie die genaue Frage/Problem an!")
                .setStyle(TextInputStyle.Paragraph)
                .setRequired(true);
    
                const KundenNr  = new TextInputBuilder()
                .setCustomId(`ticket-customer`)
                .setLabel("Kunden Nr.")
                .setPlaceholder("Geben Sie Ihre Kunden Nr. an! ")
                .setStyle(TextInputStyle.Short)
                .setRequired(false);
    
                const ProduktNr  = new TextInputBuilder()
                .setCustomId(`ticket-product`)
                .setLabel("Produkt Nr.")
                .setPlaceholder("Geben Sie die Produkt Nr. an! ")
                .setStyle(TextInputStyle.Short)
                .setRequired(false);
    
                const Action = new ActionRowBuilder().addComponents(TicketGrund);
                const Action0 = new ActionRowBuilder().addComponents(KundenNr);
                const Action1 = new ActionRowBuilder().addComponents(ProduktNr);
                Modal.addComponents(Action);
                Modal.addComponents(Action0);
                Modal.addComponents(Action1);
                await interaction.showModal(Modal);
            }
            if (interaction.customId.startsWith(config.support.category_4_customid)) {
    
                const Modal = new ModalBuilder()
                .setCustomId(config.support.category_4_customid + "-modal")
                .setTitle(`SynHost.de Support`);
    
                const TicketGrund  = new TextInputBuilder()
                .setCustomId(`ticket-reason`)
                .setLabel("Grund - Frage/Problem")
                .setPlaceholder("Geben Sie die genaue Frage/Problem an!")
                .setStyle(TextInputStyle.Paragraph)
                .setRequired(true);
    
                const KundenNr  = new TextInputBuilder()
                .setCustomId(`ticket-customer`)
                .setLabel("Kunden Nr.")
                .setPlaceholder("Geben Sie Ihre Kunden Nr. an! ")
                .setStyle(TextInputStyle.Short)
                .setRequired(false);
    
                const ProduktNr  = new TextInputBuilder()
                .setCustomId(`ticket-product`)
                .setLabel("Produkt Nr.")
                .setPlaceholder("Geben Sie die Produkt Nr. an! ")
                .setStyle(TextInputStyle.Short)
                .setRequired(false);
    
                const Action = new ActionRowBuilder().addComponents(TicketGrund);
                const Action0 = new ActionRowBuilder().addComponents(KundenNr);
                const Action1 = new ActionRowBuilder().addComponents(ProduktNr);
                Modal.addComponents(Action);
                Modal.addComponents(Action0);
                Modal.addComponents(Action1);
                await interaction.showModal(Modal);
            }
            if (interaction.customId.startsWith(config.support.category_5_customid)) {
    
                const Modal = new ModalBuilder()
                .setCustomId(config.support.category_5_customid + "-modal")
                .setTitle(`SynHost.de Support`);
    
                const TicketGrund  = new TextInputBuilder()
                .setCustomId(`ticket-reason`)
                .setLabel("Grund - Frage/Problem")
                .setPlaceholder("Geben Sie die genaue Frage/Problem an!")
                .setStyle(TextInputStyle.Paragraph)
                .setRequired(true);
    
                const KundenNr  = new TextInputBuilder()
                .setCustomId(`ticket-customer`)
                .setLabel("Kunden Nr.")
                .setPlaceholder("Geben Sie Ihre Kunden Nr. an! ")
                .setStyle(TextInputStyle.Short)
                .setRequired(false);
    
                const ProduktNr  = new TextInputBuilder()
                .setCustomId(`ticket-product`)
                .setLabel("Produkt Nr.")
                .setPlaceholder("Geben Sie die Produkt Nr. an! ")
                .setStyle(TextInputStyle.Short)
                .setRequired(false);
    
                const Action = new ActionRowBuilder().addComponents(TicketGrund);
                const Action0 = new ActionRowBuilder().addComponents(KundenNr);
                const Action1 = new ActionRowBuilder().addComponents(ProduktNr);
                Modal.addComponents(Action);
                Modal.addComponents(Action0);
                Modal.addComponents(Action1);
                await interaction.showModal(Modal);
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
            return;
        }
    }

    if (interaction.isModalSubmit()) {
        try {
            if (interaction.customId.startsWith(config.support.category_1_customid + "-modal")) {
    
                const reason = interaction.fields.getTextInputValue('ticket-reason');
                const cnr = interaction.fields.getTextInputValue('ticket-customer');
                const pnr = interaction.fields.getTextInputValue('ticket-product');
    
                await interaction.guild.channels.create({
                    parent: config.support.ticket_categorie,
                    name: "ticket-" + interaction.user.username,
                    permissionOverwrites: [
                        {
                            id: interaction.user.id,
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
                        }
                    ],
                    type: ChannelType.GuildText,
                }).then(async channel => {

                    const ticketCreated = new EmbedBuilder()
                    .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                    .setDescription(`### Das Ticket wurde erfolgreich erstellt! Siehe in <#${channel.id}>!`)
                    .setTimestamp()
                    .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                    .setColor(embed_color)
    
                    const TicketMessage = new EmbedBuilder()
                    .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                    .setDescription(`**` + interaction.user.username + `**, Danke, dass Sie unseren Support in Anspruch nehmen.\nEin Supporter wird sich schnellstmöglich um Sie kümmern.`)
                    .setTimestamp()
                    .addFields(
                        { name: "Kategorie", value: config.support.category_1_name },
                        { name: "Grund", value: `${reason}` },
                        { name: "Customer Nr.", value: `${cnr || "Keine Angabe."}` },
                        { name: "Produkt Nr.", value: `${pnr || "Keine Angabe."}` }
                    )
                    .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                    .setColor(embed_color)
                
                    DBconnection.query("CREATE TABLE `" + channel.id + "` ( `channel` VARCHAR(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL , `user` VARCHAR(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL , `claimer` VARCHAR(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL ) ENGINE = InnoDB;", function (err, results, fields) {
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
                            DBconnection.query("INSERT INTO `" + channel.id + "` (channel, user) VALUES (" + channel.id + ", " + interaction.user.id + ")", function (err, results, fields) {
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
                                    channel.send({ content: `<@` + interaction.user.id + `> | <@&${``+ config.support.supporter_role_id +``}>`, embeds: [TicketMessage] })
                                    interaction.reply({ embeds: [ticketCreated], ephemeral: true }); 
                                }
                            })
                        }
                    })
                })
            }
            if (interaction.customId.startsWith(config.support.category_2_customid + "-modal")) {
    
                const reason = interaction.fields.getTextInputValue('ticket-reason');
                const cnr = interaction.fields.getTextInputValue('ticket-customer');
                const pnr = interaction.fields.getTextInputValue('ticket-product');
    
                await interaction.guild.channels.create({
                    parent: config.support.ticket_categorie,
                    name: "ticket-" + interaction.user.username,
                    permissionOverwrites: [
                        {
                            id: interaction.user.id,
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
                        }
                    ],
                    type: ChannelType.GuildText,
                }).then(async channel => {

                    const ticketCreated = new EmbedBuilder()
                    .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                    .setDescription(`### Das Ticket wurde erfolgreich erstellt! Siehe in <#${channel.id}>!`)
                    .setTimestamp()
                    .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                    .setColor(embed_color)
    
                    const TicketMessage = new EmbedBuilder()
                    .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                    .setDescription(`**` + interaction.user.username + `**, Danke, dass Sie unseren Support in Anspruch nehmen.\nEin Supporter wird sich schnellstmöglich um Sie kümmern.`)
                    .setTimestamp()
                    .addFields(
                        { name: "Kategorie", value: config.support.category_2_name },
                        { name: "Grund", value: `${reason}` },
                        { name: "Customer Nr.", value: `${cnr || "Keine Angabe."}` },
                        { name: "Produkt Nr.", value: `${pnr || "Keine Angabe."}` }
                    )
                    .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                    .setColor(embed_color)
                
                    DBconnection.query("CREATE TABLE `" + channel.id + "` ( `channel` VARCHAR(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL , `user` VARCHAR(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL , `claimer` VARCHAR(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL ) ENGINE = InnoDB;", function (err, results, fields) {
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
                            DBconnection.query("INSERT INTO `" + channel.id + "` (channel, user) VALUES (" + channel.id + ", " + interaction.user.id + ")", function (err, results, fields) {
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
                                    channel.send({ content: `<@` + interaction.user.id + `> | <@&${``+ config.support.supporter_role_id +``}>`, embeds: [TicketMessage] })
                                    interaction.reply({ embeds: [ticketCreated], ephemeral: true }); 
                                }
                            })
                        }
                    })
                })
            }
            if (interaction.customId.startsWith(config.support.category_3_customid + "-modal")) {
    
                const reason = interaction.fields.getTextInputValue('ticket-reason');
                const cnr = interaction.fields.getTextInputValue('ticket-customer');
                const pnr = interaction.fields.getTextInputValue('ticket-product');
    
                await interaction.guild.channels.create({
                    parent: config.support.ticket_categorie,
                    name: "ticket-" + interaction.user.username,
                    permissionOverwrites: [
                        {
                            id: interaction.user.id,
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
                        }
                    ],
                    type: ChannelType.GuildText,
                }).then(async channel => {

                    const ticketCreated = new EmbedBuilder()
                    .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                    .setDescription(`### Das Ticket wurde erfolgreich erstellt! Siehe in <#${channel.id}>!`)
                    .setTimestamp()
                    .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                    .setColor(embed_color)
    
                    const TicketMessage = new EmbedBuilder()
                    .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                    .setDescription(`**` + interaction.user.username + `**, Danke, dass Sie unseren Support in Anspruch nehmen.\nEin Supporter wird sich schnellstmöglich um Sie kümmern.`)
                    .setTimestamp()
                    .addFields(
                        { name: "Kategorie", value: config.support.category_3_name },
                        { name: "Grund", value: `${reason}` },
                        { name: "Customer Nr.", value: `${cnr || "Keine Angabe."}` },
                        { name: "Produkt Nr.", value: `${pnr || "Keine Angabe."}` }
                    )
                    .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                    .setColor(embed_color)
                
                    DBconnection.query("CREATE TABLE `" + channel.id + "` ( `channel` VARCHAR(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL , `user` VARCHAR(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL , `claimer` VARCHAR(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL ) ENGINE = InnoDB;", function (err, results, fields) {
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
                            DBconnection.query("INSERT INTO `" + channel.id + "` (channel, user) VALUES (" + channel.id + ", " + interaction.user.id + ")", function (err, results, fields) {
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
                                    channel.send({ content: `<@` + interaction.user.id + `> | <@&${``+ config.support.supporter_role_id +``}>`, embeds: [TicketMessage] })
                                    interaction.reply({ embeds: [ticketCreated], ephemeral: true }); 
                                }
                            })
                        }
                    })
                })
            }
            if (interaction.customId.startsWith(config.support.category_4_customid + "-modal")) {
    
                const reason = interaction.fields.getTextInputValue('ticket-reason');
                const cnr = interaction.fields.getTextInputValue('ticket-customer');
                const pnr = interaction.fields.getTextInputValue('ticket-product');
    
                await interaction.guild.channels.create({
                    parent: config.support.ticket_categorie,
                    name: "ticket-" + interaction.user.username,
                    permissionOverwrites: [
                        {
                            id: interaction.user.id,
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
                        }
                    ],
                    type: ChannelType.GuildText,
                }).then(async channel => {

                    const ticketCreated = new EmbedBuilder()
                    .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                    .setDescription(`### Das Ticket wurde erfolgreich erstellt! Siehe in <#${channel.id}>!`)
                    .setTimestamp()
                    .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                    .setColor(embed_color)
    
                    const TicketMessage = new EmbedBuilder()
                    .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                    .setDescription(`**` + interaction.user.username + `**, Danke, dass Sie unseren Support in Anspruch nehmen.\nEin Supporter wird sich schnellstmöglich um Sie kümmern.`)
                    .setTimestamp()
                    .addFields(
                        { name: "Kategorie", value: config.support.category_4_name },
                        { name: "Grund", value: `${reason}` },
                        { name: "Customer Nr.", value: `${cnr || "Keine Angabe."}` },
                        { name: "Produkt Nr.", value: `${pnr || "Keine Angabe."}` }
                    )
                    .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                    .setColor(embed_color)
                
                    DBconnection.query("CREATE TABLE `" + channel.id + "` ( `channel` VARCHAR(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL , `user` VARCHAR(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL , `claimer` VARCHAR(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL ) ENGINE = InnoDB;", function (err, results, fields) {
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
                            DBconnection.query("INSERT INTO `" + channel.id + "` (channel, user) VALUES (" + channel.id + ", " + interaction.user.id + ")", function (err, results, fields) {
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
                                    channel.send({ content: `<@` + interaction.user.id + `> | <@&${``+ config.support.supporter_role_id +``}>`, embeds: [TicketMessage] })
                                    interaction.reply({ embeds: [ticketCreated], ephemeral: true }); 
                                }
                            })
                        }
                    })
                })
            }
            if (interaction.customId.startsWith(config.support.category_5_customid + "-modal")) {
    
                const reason = interaction.fields.getTextInputValue('ticket-reason');
                const cnr = interaction.fields.getTextInputValue('ticket-customer');
                const pnr = interaction.fields.getTextInputValue('ticket-product');
    
                await interaction.guild.channels.create({
                    parent: config.support.ticket_categorie,
                    name: "ticket-" + interaction.user.username,
                    permissionOverwrites: [
                        {
                            id: interaction.user.id,
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
                        }
                    ],
                    type: ChannelType.GuildText,
                }).then(async channel => {

                    const ticketCreated = new EmbedBuilder()
                    .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                    .setDescription(`### Das Ticket wurde erfolgreich erstellt! Siehe in <#${channel.id}>!`)
                    .setTimestamp()
                    .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                    .setColor(embed_color)
    
                    const TicketMessage = new EmbedBuilder()
                    .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                    .setDescription(`**` + interaction.user.username + `**, Danke, dass Sie unseren Support in Anspruch nehmen.\nEin Supporter wird sich schnellstmöglich um Sie kümmern.`)
                    .setTimestamp()
                    .addFields(
                        { name: "Kategorie", value: config.support.category_5_name },
                        { name: "Grund", value: `${reason}` },
                        { name: "Customer Nr.", value: `${cnr || "Keine Angabe."}` },
                        { name: "Produkt Nr.", value: `${pnr || "Keine Angabe."}` }
                    )
                    .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                    .setColor(embed_color)
                
                    DBconnection.query("CREATE TABLE `" + channel.id + "` ( `channel` VARCHAR(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL , `user` VARCHAR(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL , `claimer` VARCHAR(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL ) ENGINE = InnoDB;", function (err, results, fields) {
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
                            DBconnection.query("INSERT INTO `" + channel.id + "` (channel, user) VALUES (" + channel.id + ", " + interaction.user.id + ")", function (err, results, fields) {
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
                                    channel.send({ content: `<@` + interaction.user.id + `> | <@&${``+ config.support.supporter_role_id +``}>`, embeds: [TicketMessage] })
                                    interaction.reply({ embeds: [ticketCreated], ephemeral: true }); 
                                }
                            })
                        }
                    })
                })
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
            return;
        }
    }
})
