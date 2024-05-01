const { EmbedBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder, PermissionFlagsBits, TextInputStyle } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const config = require("../../../CONFIGS/config.json");
const moment = require("moment");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("verify")
    .setDescription("Verifiziere dich um den Kunden Rang zu erlangen!"),
    run: async (client, interaction) => {

    const VerifyModal = new ModalBuilder()
    .setTitle("Verify")
    .setCustomId(`verify-${interaction.user.id}`);

    const CustomerID = new TextInputBuilder()
    .setCustomId("customernr")
    .setLabel("Kunden Nr.")
    .setStyle(TextInputStyle.Short)
    .setRequired(true);

    const CustomerIDRow = new ActionRowBuilder().addComponents(CustomerID);
    VerifyModal.addComponents(CustomerIDRow);
    await interaction.showModal(VerifyModal);

    await client.once("interactionCreate", async (interaction) => {
        if (!interaction.isModalSubmit()) return;

        let embed_author_text = config.ticket_system.embeds_theme.embed_author_text;
        let embed_author_icon = config.ticket_system.embeds_theme.embed_author_icon;
        let embed_footer_text = config.ticket_system.embeds_theme.embed_footer_text;
        let embed_footer_icon = config.ticket_system.embeds_theme.embed_footer_icon;
        let embed_color = config.ticket_system.embeds_theme.embed_color;

        const CustomerID = interaction.fields.getTextInputValue("customernr");

        const SendEmbed = new EmbedBuilder()
        .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
        .setDescription("### Deine Verifizierung läuft!")
        .setTimestamp()
        .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
        .setColor(embed_color)
      
        const TeamEmebd = new EmbedBuilder()
        .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
        .setDescription("## Der Nutzer <@" + interaction.user.id + "> möchte sich verifizieren.\n\n**Kunden Nr.** " + CustomerID)
        .setTimestamp()
        .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
        .setColor(embed_color)
      
        const Log = interaction.guild.channels.cache.get(config.ticket_system.transcripts);
      
        interaction.reply({ embeds: [SendEmbed], ephemeral: true })
        Log.send({ content: "<@" + config.ticket_system.admin_role + ">", embeds: [TeamEmebd] });
      });
    }
}