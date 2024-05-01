const { EmbedBuilder, Client, CommandInteraction, ButtonBuilder, ActionRowBuilder, ButtonStyle, AttachmentBuilder, ChannelType, PermissionFlagsBits } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const config = require("../../../CONFIGS/config.json")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("setup")
	.setDescription("Mit diesen Befehl kannst du das Ticket System einstellen!")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
	.addChannelOption(option => option.setName("kanal").setDescription("Gebe einen Kanal an in diesen man Tickets erstellen soll!").setRequired(true))
    .addChannelOption(option => option.setName("kategorie").setDescription("Gebe einen Kanal an in diesen die Tickets erstellt werden sollen!").setRequired(true)),
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction
     * @param {String[]} args 
     */
    run: async (client, interaction, args) => {
        let embed_author_text = config.ticket_system.embeds_theme.embed_author_text;
        let embed_author_icon = config.ticket_system.embeds_theme.embed_author_icon;
        let embed_footer_text = config.ticket_system.embeds_theme.embed_footer_text;
        let embed_footer_icon = config.ticket_system.embeds_theme.embed_footer_icon;
        let embed_color = config.ticket_system.embeds_theme.embed_color;

        const data = interaction.options.getChannel("kanal");
        const data2 = interaction.options.getChannel("kategorie")
        const channel = interaction.guild.channels.cache.get(`${data.id}`);
        const category = interaction.guild.channels.cache.get(`${data2.id}`)

        const ChannelView = new EmbedBuilder()
        .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
        .setDescription("Der Bot hat zu wenig Rechte um diesen Kanal zu benutzen!")
        .setTimestamp()
        .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
        .setColor(embed_color)

        if (!channel.viewable) {
            return interaction.reply({
                embeds: [ChannelView],
                ephemeral: true
            })
        }

        const InvalidChannel = new EmbedBuilder()
        .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
        .setDescription("Die angegebene Kategorie ist ungültig!")
        .setTimestamp()
        .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
        .setColor(embed_color)

        if (category.type !== ChannelType.GuildCategory) {
            return interaction.reply({
                embeds: [InvalidChannel],
                ephemeral: true
            })
        }

        const CategoryView = new EmbedBuilder()
        .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
        .setDescription("Der Bot hat zu wenig Rechte um diese Kategorie zu benutzen!")
        .setTimestamp()
        .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
        .setColor(embed_color)

        if (!category.viewable) {
            return interaction.reply({
                embeds: [CategoryView],
                ephemeral: true
            })
        }

        const BotNoPerms = new EmbedBuilder()
        .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
        .setDescription("Der Bot hat zu wenig Rechte um ein Ticket zu erstellen!")
        .setTimestamp()
        .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
        .setColor(embed_color)

        if (!category.permissionsFor(client.user.id).has("ManageChannels")) {
            return interaction.reply({
                embeds: [BotNoPerms],
                ephemeral: true
            })
        }
 
        const CreateButton = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(`ticket-hbi-${interaction.guild.id}-${category.id}`)
                .setLabel("Hilfe bei Einrichtung")
                .setEmoji("🆘")
                .setStyle(ButtonStyle.Primary),
        )
        .addComponents(
            new ButtonBuilder()
                .setCustomId(`ticket-ab-${interaction.guild.id}-${category.id}`)
                .setLabel("Anfrage/Beratung")
                .setEmoji("🖥️")
                .setStyle(ButtonStyle.Primary),
        )
        .addComponents(
            new ButtonBuilder()
                .setCustomId(`ticket-stoerung-${interaction.guild.id}-${category.id}`)
                .setLabel("Störung")
                .setEmoji("❌")
                .setStyle(ButtonStyle.Primary),
        );

        const CreateButton0 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(`ticket-dba-${interaction.guild.id}-${category.id}`)
                .setLabel("Discord Bot Anfrage")
                .setEmoji("🤖")
                .setStyle(ButtonStyle.Secondary),
        )
        .addComponents(
            new ButtonBuilder()
                .setCustomId(`ticket-sonstiges-${interaction.guild.id}-${category.id}`)
                .setLabel("Sonstiges")
                .setEmoji("🎟️")
                .setStyle(ButtonStyle.Primary),
        );

        const CreateIMG = new AttachmentBuilder()
        .setFile("assets/create_ticket.png")

        const CustomerNrIMG = new AttachmentBuilder()
        .setFile("assets/customernr.png")

        const ProduktNrIMG = new AttachmentBuilder()
        .setFile("assets/produktnr.png")

        const ticketCreated = new EmbedBuilder()
        .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
        .setDescription(`Die Create-Ticket Nachricht wurde erfolgreich erstellt, siehe in ${channel}.`)
        .setTimestamp()
        .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
        .setColor(embed_color)

        await interaction.reply({
            embeds: [ticketCreated],
            ephemeral: true
        })

        channel.send({
            files: [CreateIMG],
            components: [CreateButton,CreateButton0],
        })

        setTimeout(async () => {
            await channel.send({
                content: "## Bei Störungen überprüfen Sie bitte unsere [Status Webseite](https://status.synhost.de/status/synhost)!\n## Partnerschaftsanfragen werden nur via [Web-Ticket](https://synhost.de/account/tickets) bearbeitet!"
            })
            await channel.send({
                content: "### Ihre Kunden Nr. finden Sie in Ihrer [Account Übersicht](https://synhost.de/account)! Im Bild Gelb markiert!",
                files: [CustomerNrIMG]
            })
            await channel.send({
                content: "### Ihre Produkt Nr. finden Sie in Ihrer [Produkt Übersicht](https://synhost.de/account/products)! Im Bild Gelb markiert!",
                files: [ProduktNrIMG]
            })
        }, 1000)

    }
}
