const { ActionRowBuilder, ButtonBuilder, ChannelType, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ButtonStyle } = require('discord.js');
const discordTranscripts = require('discord-html-transcripts');
const client = require("../../index");
const config = require("../../CONFIGS/config.json");
const { json } = require('express');

module.exports = {
    name: "ticketCreate"
};

client.on("interactionCreate", async (interaction) => {
    
    let embed_author_text = config.ticket_system.embeds_theme.embed_author_text;
    let embed_author_icon = config.ticket_system.embeds_theme.embed_author_icon;
    let embed_footer_text = config.ticket_system.embeds_theme.embed_footer_text;
    let embed_footer_icon = config.ticket_system.embeds_theme.embed_footer_icon;
    let embed_color = config.ticket_system.embeds_theme.embed_color;

    if (interaction.isButton()) {
        //Hilfe bei Einrichtung Modal
        if (interaction.customId.startsWith(`ticket-hbi`)) {
            const id = interaction.customId.split('-')[3]

            const Modal = new ModalBuilder()
            .setCustomId(`hbi-${interaction.guild.id}-${id}`)
            .setTitle(`SynHost.de Support`);

            const TicketGrund  = new TextInputBuilder()
            .setCustomId(`ticket-reason`)
            .setLabel("Frage/Problem")
            .setPlaceholder("Geben Sie die genaue Frage/Problem an!")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true);

            const KundenNr  = new TextInputBuilder()
            .setCustomId(`ticket-customer`)
            .setLabel("Kunden Nr.")
            .setPlaceholder("Geben Sie Ihre Kunden Nr. an! (falls vorhanden)")
            .setStyle(TextInputStyle.Short)
            .setRequired(false);

            const ProduktNr  = new TextInputBuilder()
            .setCustomId(`ticket-product`)
            .setLabel("Produkt Nr.")
            .setPlaceholder("Geben Sie die Produkt Nr. an! (falls vorhanden)")
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
        //Anfrage/Beratung Modal
        if (interaction.customId.startsWith(`ticket-ab`)) {
            const id = interaction.customId.split('-')[3]

            const Modal = new ModalBuilder()
            .setCustomId(`ab-${interaction.guild.id}-${id}`)
            .setTitle(`SynHost.de Support`);

            const TicketGrund  = new TextInputBuilder()
            .setCustomId(`ticket-reason`)
            .setLabel("Frage/Problem")
            .setPlaceholder("Geben Sie Ihr vorhaben an!")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true);

            const KundenNr  = new TextInputBuilder()
            .setCustomId(`ticket-customer`)
            .setLabel("Kunden Nr.")
            .setPlaceholder("Gebe Ihre Kunden Nr. an! (falls vorhanden)")
            .setStyle(TextInputStyle.Short)
            .setRequired(false);

            const Action = new ActionRowBuilder().addComponents(TicketGrund);
            const Action0 = new ActionRowBuilder().addComponents(KundenNr);
            Modal.addComponents(Action);
            Modal.addComponents(Action0);
            await interaction.showModal(Modal);
        }
        //Störung Modal
        if (interaction.customId.startsWith(`ticket-stoerung`)) {
            const id = interaction.customId.split('-')[3]

            const Modal = new ModalBuilder()
            .setCustomId(`stoerung-${interaction.guild.id}-${id}`)
            .setTitle(`SynHost.de Support`);

            const TicketGrund  = new TextInputBuilder()
            .setCustomId(`ticket-reason`)
            .setLabel("Frage/Problem")
            .setPlaceholder("Geben Sie Ihr vorhaben an!")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true);

            const KundenNr  = new TextInputBuilder()
            .setCustomId(`ticket-customer`)
            .setLabel("Kunden Nr.")
            .setPlaceholder("Gebe Ihre Kunden Nr. an! (falls vorhanden)")
            .setStyle(TextInputStyle.Short)
            .setRequired(false);

            const ProduktNr  = new TextInputBuilder()
            .setCustomId(`ticket-product`)
            .setLabel("Produkt Nr.")
            .setPlaceholder("Gebe Ihre Produkt Nr. an! (falls vorhanden)")
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
        //Discord Bot Anfrage Modal
        if (interaction.customId.startsWith(`ticket-dba`)) {
            const id = interaction.customId.split('-')[3]

            const Modal = new ModalBuilder()
            .setCustomId(`dba-${interaction.guild.id}-${id}`)
            .setTitle(`SynHost.de Support`);

            const TicketGrund  = new TextInputBuilder()
            .setCustomId(`ticket-reason`)
            .setLabel("Features")
            .setPlaceholder("Geben Sie an welche Features der Bot haben soll!")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true);

            const KundenNr  = new TextInputBuilder()
            .setCustomId(`ticket-customer`)
            .setLabel("Kunden Nr.")
            .setPlaceholder("Gebe Ihre Kunden Nr. an! (falls vorhanden)")
            .setStyle(TextInputStyle.Short)
            .setRequired(false);

            const Action = new ActionRowBuilder().addComponents(TicketGrund);
            const Action0 = new ActionRowBuilder().addComponents(KundenNr);
            Modal.addComponents(Action);
            Modal.addComponents(Action0);
            await interaction.showModal(Modal);
        }
        //Sonstiges Modal
        if (interaction.customId.startsWith(`ticket-sonstiges`)) {
            const id = interaction.customId.split('-')[3]

            const Modal = new ModalBuilder()
            .setCustomId(`sonstiges-${interaction.guild.id}-${id}`)
            .setTitle(`SynHost.de Support`);

            const TicketGrund  = new TextInputBuilder()
            .setCustomId(`ticket-reason`)
            .setLabel("Frage/Problem")
            .setPlaceholder("Geben Sie den genauen Grund der Ticket erstellung an!")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true);

            const KundenNr  = new TextInputBuilder()
            .setCustomId(`ticket-customer`)
            .setLabel("Kunden Nr.")
            .setPlaceholder("Gebe Ihre Kunden Nr. an! (falls vorhanden)")
            .setStyle(TextInputStyle.Short)
            .setRequired(false);

            const Action = new ActionRowBuilder().addComponents(TicketGrund);
            const Action0 = new ActionRowBuilder().addComponents(KundenNr);
            Modal.addComponents(Action);
            Modal.addComponents(Action0);
            await interaction.showModal(Modal);
        }
    }

    if (interaction.isModalSubmit()) {
        if (interaction.customId.startsWith(`hbi-${interaction.guild.id}`)) {
            const id = interaction.customId.split('-')[2]

            const reason = interaction.fields.getTextInputValue('ticket-reason');
            const cnr = interaction.fields.getTextInputValue('ticket-customer');
            const pnr = interaction.fields.getTextInputValue('ticket-product');
            const category = interaction.guild.channels.cache.get(`${id}`)

            await interaction.guild.channels.create({
                parent: category.id,
                name: `open-ticket`,
                permissionOverwrites: [
                    {
                        id: interaction.user.id,
                        allow: ['SendMessages', 'ViewChannel'],
                    },
                    {
                        id: interaction.guild.roles.everyone,
                        deny: ['ViewChannel'],
                    },
                    {
                        id: config.generell.bot_id,
                        allow: ['ManageChannels']
                    },
                    {
                        id: config.ticket_system.support_role,
                        allow: ['SendMessages', 'ViewChannel']
                    }
                ],
                type: ChannelType.GuildText,
            }).then(async c => {
                const ticketCreated = new EmbedBuilder()
                .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                .setDescription(`Das Ticket wurde erfolgreich erstellt, siehe in <#${c.id}>.`)
                .setTimestamp()
                .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                .setColor(embed_color)
                interaction.reply({
                    embeds: [ticketCreated],
                    ephemeral: true
                }); 

                const TicketMessage = new EmbedBuilder()
                .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                .setDescription(`**` + interaction.user.username + `**, Danke, dass Sie unseren Support in Anspruch nehmen.\nEin Supporter wird sich schnellstmöglich um Sie kümmern.`)
                .setTimestamp()
                .addFields(
                    { name: "Kategorie", value: `Hilfe bei Einrichtung` },
                    { name: "Grund", value: `${reason}` },
                    { name: "Customer Nr.", value: `${cnr || "Keine Angabe."}` },
                    { name: "Produkt Nr.", value: `${pnr || "Keine Angabe."}` }
                )
                .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                .setColor(embed_color)

                c.send({
                    content: `<@` + interaction.user.id + `> | <@&${``+ config.ticket_system.support_role +``}>`,
                    embeds: [TicketMessage]
                })
            })
        }
        if (interaction.customId.startsWith(`ab-${interaction.guild.id}`)) {
            const id = interaction.customId.split('-')[2]

            const reason = interaction.fields.getTextInputValue('ticket-reason');
            const cnr = interaction.fields.getTextInputValue('ticket-customer');
            const category = interaction.guild.channels.cache.get(`${id}`)

            await interaction.guild.channels.create({
                parent: category.id,
                name: `open-ticket`,
                permissionOverwrites: [
                    {
                        id: interaction.user.id,
                        allow: ['SendMessages', 'ViewChannel'],
                    },
                    {
                        id: interaction.guild.roles.everyone,
                        deny: ['ViewChannel'],
                    },
                    {
                        id: config.generell.bot_id,
                        allow: ['ManageChannels']
                    },
                    {
                        id: config.ticket_system.support_role,
                        allow: ['SendMessages', 'ViewChannel']
                    }
                ],
                type: ChannelType.GuildText,
            }).then(async c => {
                const ticketCreated = new EmbedBuilder()
                .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                .setDescription(`Das Ticket wurde erfolgreich erstellt, siehe in <#${c.id}>.`)
                .setTimestamp()
                .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                .setColor(embed_color)
                interaction.reply({
                    embeds: [ticketCreated],
                    ephemeral: true
                }); 

                const TicketMessage = new EmbedBuilder()
                .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                .setDescription(`**` + interaction.user.username + `**, Danke, dass Sie unseren Support in Anspruch nehmen.\nEin Supporter wird sich schnellstmöglich um Sie kümmern.`)
                .setTimestamp()
                .addFields(
                    { name: "Kategorie", value: `Anfrage/Beratung` },
                    { name: "Grund", value: `${reason}` },
                    { name: "Customer Nr.", value: `${cnr || "Keine Angabe."}` },
                )
                .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                .setColor(embed_color)

                c.send({
                    content: `<@` + interaction.user.id + `> | <@&${``+ config.ticket_system.support_role +``}>`,
                    embeds: [TicketMessage]
                })
            })
        }
        if (interaction.customId.startsWith(`stoerung-${interaction.guild.id}`)) {
            const id = interaction.customId.split('-')[2]

            const reason = interaction.fields.getTextInputValue('ticket-reason');
            const cnr = interaction.fields.getTextInputValue('ticket-customer');
            const pnr = interaction.fields.getTextInputValue('ticket-product');
            const category = interaction.guild.channels.cache.get(`${id}`)

            await interaction.guild.channels.create({
                parent: category.id,
                name: `open-ticket`,
                permissionOverwrites: [
                    {
                        id: interaction.user.id,
                        allow: ['SendMessages', 'ViewChannel'],
                    },
                    {
                        id: interaction.guild.roles.everyone,
                        deny: ['ViewChannel'],
                    },
                    {
                        id: config.generell.bot_id,
                        allow: ['ManageChannels']
                    },
                    {
                        id: config.ticket_system.support_role,
                        allow: ['SendMessages', 'ViewChannel']
                    }
                ],
                type: ChannelType.GuildText,
            }).then(async c => {
                const ticketCreated = new EmbedBuilder()
                .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                .setDescription(`Das Ticket wurde erfolgreich erstellt, siehe in <#${c.id}>.`)
                .setTimestamp()
                .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                .setColor(embed_color)
                interaction.reply({
                    embeds: [ticketCreated],
                    ephemeral: true
                }); 

                const TicketMessage = new EmbedBuilder()
                .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                .setDescription(`**` + interaction.user.username + `**, Danke, dass Sie unseren Support in Anspruch nehmen.\nEin Supporter wird sich schnellstmöglich um Sie kümmern.`)
                .setTimestamp()
                .addFields(
                    { name: "Kategorie", value: `Störung` },
                    { name: "Grund", value: `${reason}` },
                    { name: "Customer Nr.", value: `${cnr || "Keine Angabe."}` },
                    { name: "Produkt Nr.", value: `${pnr || "Keine Angabe."}` }
                )
                .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                .setColor(embed_color)

                c.send({
                    content: `<@` + interaction.user.id + `> | <@&${``+ config.ticket_system.support_role +``}>`,
                    embeds: [TicketMessage]
                })
            })
        }
        if (interaction.customId.startsWith(`dba-${interaction.guild.id}`)) {
            const id = interaction.customId.split('-')[2]

            const reason = interaction.fields.getTextInputValue('ticket-reason');
            const cnr = interaction.fields.getTextInputValue('ticket-customer');
            const category = interaction.guild.channels.cache.get(`${id}`)

            await interaction.guild.channels.create({
                parent: category.id,
                name: `open-ticket`,
                permissionOverwrites: [
                    {
                        id: interaction.user.id,
                        allow: ['SendMessages', 'ViewChannel'],
                    },
                    {
                        id: interaction.guild.roles.everyone,
                        deny: ['ViewChannel'],
                    },
                    {
                        id: config.generell.bot_id,
                        allow: ['ManageChannels']
                    },
                    {
                        id: config.ticket_system.admin_role,
                        allow: ['SendMessages', 'ViewChannel']
                    }
                ],
                type: ChannelType.GuildText,
            }).then(async c => {
                const ticketCreated = new EmbedBuilder()
                .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                .setDescription(`Das Ticket wurde erfolgreich erstellt, siehe in <#${c.id}>.`)
                .setTimestamp()
                .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                .setColor(embed_color)
                interaction.reply({
                    embeds: [ticketCreated],
                    ephemeral: true
                }); 

                const TicketMessage = new EmbedBuilder()
                .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                .setDescription(`**` + interaction.user.username + `**, Danke, dass Sie unseren Support in Anspruch nehmen.\nEin Supporter wird sich schnellstmöglich um Sie kümmern.`)
                .setTimestamp()
                .addFields(
                    { name: "Kategorie", value: `Discord Bot Anfrage` },
                    { name: "Grund", value: `${reason}` },
                    { name: "Customer Nr.", value: `${cnr || "Keine Angabe."}` },
                )
                .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                .setColor(embed_color)

                c.send({
                    content: `<@` + interaction.user.id + `> | <@&${``+ config.ticket_system.support_role +``}>`,
                    embeds: [TicketMessage]
                })
            })
        }
        if (interaction.customId.startsWith(`sonstiges-${interaction.guild.id}`)) {
            const id = interaction.customId.split('-')[2]

            const reason = interaction.fields.getTextInputValue('ticket-reason');
            const cnr = interaction.fields.getTextInputValue('ticket-customer');
            const category = interaction.guild.channels.cache.get(`${id}`)

            await interaction.guild.channels.create({
                parent: category.id,
                name: `open-ticket`,
                permissionOverwrites: [
                    {
                        id: interaction.user.id,
                        allow: ['SendMessages', 'ViewChannel'],
                    },
                    {
                        id: interaction.guild.roles.everyone,
                        deny: ['ViewChannel'],
                    },
                    {
                        id: config.generell.bot_id,
                        allow: ['ManageChannels']
                    },
                    {
                        id: config.ticket_system.support_role,
                        allow: ['SendMessages', 'ViewChannel']
                    }
                ],
                type: ChannelType.GuildText,
            }).then(async c => {
                const ticketCreated = new EmbedBuilder()
                .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                .setDescription(`Das Ticket wurde erfolgreich erstellt, siehe in <#${c.id}>.`)
                .setTimestamp()
                .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                .setColor(embed_color)
                interaction.reply({
                    embeds: [ticketCreated],
                    ephemeral: true
                }); 

                const TicketMessage = new EmbedBuilder()
                .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                .setDescription(`**` + interaction.user.username + `**, Danke, dass Sie unseren Support in Anspruch nehmen.\nEin Supporter wird sich schnellstmöglich um Sie kümmern.`)
                .setTimestamp()
                .addFields(
                    { name: "Kategorie", value: `Sonstiges` },
                    { name: "Grund", value: `${reason}` },
                    { name: "Customer Nr.", value: `${cnr || "Keine Angabe."}` },
                )
                .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                .setColor(embed_color)

                c.send({
                    content: `<@` + interaction.user.id + `> | <@&${``+ config.ticket_system.support_role +``}>`,
                    embeds: [TicketMessage]
                })
            })
        }
    }
})
