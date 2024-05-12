const { EmbedBuilder, Client, CommandInteraction, ButtonBuilder, ActionRowBuilder, ButtonStyle, AttachmentBuilder, PermissionFlagsBits } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const config = require("../../../CONFIGS/config.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setup")
        .setDescription("Installiere das Ticket System!")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction
     * @param {String[]} args 
     */
    run: async (client, interaction) => {
        let embed_author_text = config.support.embeds_theme.embed_author_text;
        let embed_author_icon = config.support.embeds_theme.embed_author_icon;
        let embed_footer_text = config.support.embeds_theme.embed_footer_text;
        let embed_footer_icon = config.support.embeds_theme.embed_footer_icon;
        let embed_color = config.support.embeds_theme.embed_color;

        const ButtonRow0 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(config.support.category_1_customid)
                    .setLabel(config.support.category_1_name)
                    .setEmoji(config.support.category_1_emoji)
                    .setStyle(ButtonStyle.Primary),
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(config.support.category_2_customid)
                    .setLabel(config.support.category_2_name)
                    .setEmoji(config.support.category_2_emoji)
                    .setStyle(ButtonStyle.Primary),
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(config.support.category_3_customid)
                    .setLabel(config.support.category_3_name)
                    .setEmoji(config.support.category_3_emoji)
                    .setStyle(ButtonStyle.Danger),
            );

        const ButtonRow1 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(config.support.category_4_customid)
                    .setLabel(config.support.category_4_name)
                    .setEmoji(config.support.category_4_emoji)
                    .setStyle(ButtonStyle.Secondary),
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(config.support.category_5_customid)
                    .setLabel(config.support.category_5_name)
                    .setEmoji(config.support.category_5_emoji)
                    .setStyle(ButtonStyle.Primary),
            );

        const CreateIMG = new AttachmentBuilder()
            .setFile("assets/create_ticket.png")

        const CustomerNrIMG = new AttachmentBuilder()
            .setFile("assets/customernr.png")

        const ProduktNrIMG = new AttachmentBuilder()
            .setFile("assets/produktnr.png")

        const Created = new EmbedBuilder()
            .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
            .setDescription("### Die Create-Ticket Nachricht wurde erfolgreich erstellt!")
            .setTimestamp()
            .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
            .setColor(embed_color)

        await interaction.channel.send({
            files: [CreateIMG],
            components: [ButtonRow0, ButtonRow1],
        })
        await interaction.channel.send({
            content: "## Bei Störungen überprüfen Sie bitte unsere [Status Webseite](https://status.synhost.de/status/synhost)!\n## Partnerschaftsanfragen werden nur via [Web-Ticket](https://synhost.de/account/tickets) bearbeitet!"
        })
        await interaction.channel.send({
            content: "### Ihre Kunden Nr. finden Sie in Ihrer [Account Übersicht](https://synhost.de/account)! Im Bild Gelb markiert!",
            files: [CustomerNrIMG]
        })
        await interaction.channel.send({
            content: "### Ihre Produkt Nr. finden Sie in Ihrer [Produkt Übersicht](https://synhost.de/account/products)! Im Bild Gelb markiert!",
            files: [ProduktNrIMG]
        })

        await interaction.reply({
            embeds: [Created],
            ephemeral: true
        })

    }
}
