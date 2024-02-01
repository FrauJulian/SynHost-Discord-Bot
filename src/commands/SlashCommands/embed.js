const { EmbedBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder, PermissionFlagsBits, TextInputStyle } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const config = require("../../../CONFIGS/config.json");
const moment = require("moment");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("custom-embed")
    .setDescription("Mit diesen Command kannst du einen Custom Embed erstellen!")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    run: async (client, interaction) => {

      const CustomEmbedWindow = new ModalBuilder()
      .setTitle("Erstelle einen Custom Embed!")
      .setCustomId("CustomEmbed");

      const Titel = new TextInputBuilder()
          .setCustomId("Titel")
          .setLabel("Titel")
          .setStyle(TextInputStyle.Short)
          .setRequired(false);

      const Beschreibung = new TextInputBuilder()
          .setCustomId("Beschreibung")
          .setLabel("Beschreibung")
          .setStyle(TextInputStyle.Paragraph)
          .setRequired(true);

      const Thumbnail = new TextInputBuilder()
          .setCustomId("Thumbnail")
          .setLabel("Thumbnail")
          .setPlaceholder("https://i.imgur.com/...")
          .setStyle(TextInputStyle.Short)
          .setRequired(false);

      const TitelRow = new ActionRowBuilder().addComponents(Titel);
      const BeschreibungRow = new ActionRowBuilder().addComponents(Beschreibung);
      const ThumbnailRow = new ActionRowBuilder().addComponents(Thumbnail);

      CustomEmbedWindow.addComponents(TitelRow, BeschreibungRow, ThumbnailRow);

      await interaction.showModal(CustomEmbedWindow);

      await client.once("interactionCreate", async (interaction) => {
          if (!interaction.isModalSubmit()) return;

          const EmbedTitle = interaction.fields.getTextInputValue("Titel");
          const EmbedBeschreibung = interaction.fields.getTextInputValue("Beschreibung");
          const Thumbnail = interaction.fields.getTextInputValue("Thumbnail");

          let embed_author_text = config.custom_embeds.embed_author_text;
          let embed_author_icon = config.custom_embeds.embed_author_icon;
          let embed_footer_text = config.custom_embeds.embed_footer_text;
          let embed_footer_icon = config.custom_embeds.embed_footer_icon;
          let embed_color = config.custom_embeds.embed_color;

          const CustomEmbed = new EmbedBuilder()

          CustomEmbed.setAuthor({ name: embed_author_text, iconURL: embed_author_icon })

          if (EmbedTitle) {
            CustomEmbed.setTitle(EmbedTitle);
          }

          CustomEmbed.setDescription(EmbedBeschreibung);

          if (Thumbnail) {
              await CustomEmbed.setThumbnail(Thumbnail);
          }
          
          CustomEmbed.setTimestamp()
          CustomEmbed.setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
          CustomEmbed.setColor(embed_color)

          const DoneEmbed = new EmbedBuilder()
          .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
          .setDescription("## Der Custom Embed wurde erstellt!")
          .setTimestamp()
          .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
          .setColor(embed_color)

          interaction.reply({ embeds: [DoneEmbed], ephemeral: true })
          await interaction.channel.send({ embeds: [CustomEmbed] });
      });
    }
}