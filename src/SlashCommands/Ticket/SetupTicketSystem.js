const {
    EmbedBuilder,
    AttachmentBuilder,
    ActionRowBuilder,
    PermissionFlagsBits
} = require("discord.js");
const {SlashCommandBuilder} = require("@discordjs/builders");


const SupportConfiguration = require("../../Configurations/Support.json");
const ERR = require("../../Utils/Console/Error");
const CustomButtonBuilder = require("../../Utils/CustomBuilders/CustomButtonBuilder");
const SupportEmbedBuilder = require("../../Utils/CustomBuilders/EmbedBuilders/SupportEmbedBuilder");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setup-tickets")
        .setDescription("❌ | Mit diesen Befehl gibt du den Usern im aktuellen Kanal die Möglichkeit Tickets zu erstellen!")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    run: async (client, interaction) => {
        try {
            let successSetupEmbed = await SupportEmbedBuilder(`## Du hast ein Anliegen? - Erstelle hier ein Ticket!\n\n-# Screenshots, Logs, genaue Problem-Beschreibung, Kunden/Produkt Nummer helfen um dein Anliegen schneller zu lösen!`);

            let ticketTypesButtonRow = new ActionRowBuilder();
            let ticketTypes = Object.entries(SupportConfiguration.ticket_types);

            for (let [key, {CustomID, Name, Emoji, ButtonStyle}] of ticketTypes) {
                let ticketButton = await CustomButtonBuilder(CustomID + "-showCreateTicketModal", Name, Emoji, ButtonStyle);
                ticketTypesButtonRow.addComponents(ticketButton);
            }

            const CustomerIdIMG = new AttachmentBuilder()
                .setFile("assets/CustomerIdIMG.png");

            const ProductIdIMG = new AttachmentBuilder()
                .setFile("assets/ProductIdIMG.png");

            await interaction.channel.send({
                embeds: [successSetupEmbed],
                components: [ticketTypesButtonRow],
            })
            await interaction.channel.send({
                content: "## Überprüfe bei Störungen bitte vorerst unsere [Status Webseite](https://status.synhost.de/)!\n## Anfragen bezüglich einer Partnerschaft werden nur via [Web-Ticket](https://synhost.de/account/tickets) bearbeitet!"
            })

            await interaction.channel.send({
                content: "### Ihre Kunden Nr. finden Sie in Ihrer [Account Übersicht](https://synhost.de/account)! Im Screenshot Gelb markiert!",
                files: [CustomerIdIMG]
            })

            await interaction.channel.send({
                content: "### Ihre Produkt Nr. finden Sie in Ihrer [Produkt Übersicht](https://synhost.de/account/products)! Im Screenshot Gelb markiert!",
                files: [ProductIdIMG]
            })
        } catch (err) {
            ERR(err, interaction);
        }
    }
}
