const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const config = require("../../../CONFIGS/config.json");
const ms = require("ms");
let manager = require("../../../index");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("giveaway")
    .setDescription("Erstelle ein Giveaway für deine Community!")
    .addStringOption(option => option.setName("duration").setDescription("Setzte die Zeit!"))
    .addIntegerOption(option => option.setName("winners").setDescription("Setzte die Anzahl der Gewinner!"))
    .addStringOption(option => option.setName("prize").setDescription("Setze den Preis"))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  run: async (client, interaction) => {
    try {
      let embed_author_text = config.giveaway.embeds_theme.embed_author_text;
      let embed_author_icon = config.giveaway.embeds_theme.embed_author_icon;
      let embed_footer_text = config.giveaway.embeds_theme.embed_footer_text;
      let embed_footer_icon = config.giveaway.embeds_theme.embed_footer_icon;
      let embed_color = config.giveaway.embeds_theme.embed_color;

      const duration = interaction.options.getString("duration");
      const winnerCount = interaction.options.getInteger("winners");
      const prize = interaction.options.getString("prize");

      await manager.start(interaction.channel, {
        duration: ms(duration),
        winnerCount: winnerCount,
        prize: prize,
        messages: {
          giveaway: "🎉 **GEWINNSPIEL** || <@"+ interaction.guild.roles.everyone +"> || **GIVEAWAY** 🎉",
          giveawayEnded: "🎉 || <@"+ interaction.guild.roles.everyone +"> || 🎉",
          title: "{this.prize}",
          drawing: "Endet in {timestamp}",
          dropMessage: "Sei der erste der mit 🎉 reagiert!",
          inviteToParticipate: "Reagiere mit 🎉 um teilzunehmen!",
          winMessage: "### Herzlichen Glückwunsch, {winners}!\n\n",
          embedFooter: "{this.winnerCount} Gewinner",
          noWinner: "Giveaway wurde aufgrund zu geringer teilnehmer gestoppt!",
          hostedBy: "Giveaway wurde von {this.hostedBy} gestartet!",
          winners: "Gewinner:",
          endedAt: "Endet in"
        },
        lastChance: {
          enabled: true,
          content: "⚠️ **LETZTE CHANCE** ⚠️",
          threshold: 60000000000_000,
          embedColor: "Red"
        }
      })

      const Started = new EmbedBuilder()
      .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
      .setDescription("### Das Giveaway wurde gestartet!")
      .setTimestamp()
      .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
      .setColor(embed_color)

      interaction.reply({ embeds: [Started], ephemeral: true })

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
      console.error(err)
      interaction.reply({ embeds: [ErrEmbed], ephemeral: true })
    }
  }
}