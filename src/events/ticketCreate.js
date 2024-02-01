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

        if (interaction.customId.startsWith(`ticket-setup`)) {
            const id = interaction.customId.split('-')[3]

            const modal = new ModalBuilder()
            .setCustomId(`modal-${interaction.guild.id}-${id}`)
            .setTitle(`SynHost.de Support`);

            const TicketGrund  = new TextInputBuilder()
            .setCustomId(`ticket-reason`)
            .setLabel("Frage bzw. das Problem")
            .setPlaceholder("Gebe Bitte die genaue Frage bzw. das Problem an Wieso du das Ticket geöffnet hast!")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true)
            .setMinLength(30)
            .setMaxLength(2000);

            const firstActionRow = new ActionRowBuilder().addComponents(TicketGrund);
            modal.addComponents(firstActionRow);
            await interaction.showModal(modal);
        }
    }

    if (interaction.isModalSubmit()) {
        if (interaction.customId.startsWith(`modal-${interaction.guild.id}`)) {

            const id = interaction.customId.split('-')[2]

            const reason = interaction.fields.getTextInputValue('ticket-reason');
            const category = interaction.guild.channels.cache.get(`${id}`)

            await interaction.guild.channels.create({
                parent: category.id,
                name: `${interaction.user.username}`,
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
                        id: client.user.id,
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
                    { name: "Der Grund der Ticket eröffnung lautet", value: `${reason}` }
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
