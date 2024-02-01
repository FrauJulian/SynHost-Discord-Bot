const { EmbedBuilder, Client, CommandInteraction, ButtonBuilder, ActionRowBuilder, ButtonStyle, AttachmentBuilder, ChannelType, PermissionFlagsBits, Embed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const config = require("../../../CONFIGS/config.json")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("giveaway")
	.setDescription("Erstelle mithilfe diesen Befehl ein Giveaway.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
	.addStringOption(option => option.setName("zeit").setDescription("Gebe an wie lange das Giveaway laufen soll.").setRequired(true))
    .addChannelOption(option => option.setName("kanal").setDescription("Gebe einen Kanal an in dem das Giveaway erstellt werden soll.").setRequired(true))
    .addStringOption(option => option.setName("price").setDescription("Gebe dem Preis des Giveaways an!").setRequired(true)),
    run: async (client, interaction) => {
      let started_time_duration  = "";

      let embed_author_text = config.giveaway_system.embeds_theme.embed_author_text;
      let embed_author_icon = config.giveaway_system.embeds_theme.embed_author_icon;
      let embed_footer_text = config.giveaway_system.embeds_theme.embed_footer_text;
      let embed_footer_icon = config.giveaway_system.embeds_theme.embed_footer_icon;
      let embed_color = config.giveaway_system.embeds_theme.embed_color;

      const prize = interaction.options.getString("price");
      let channel = interaction.options.getChannel("kanal").id;
      const started_time_duration_start = interaction.options.getString("zeit");

      if (started_time_duration_start.toLowerCase().includes("h")) {
        started_time_duration = started_time_duration_start.split("h")[0]
        time_duration = started_time_duration * 3600000
        if (time_duration == 3600000) {
          time_length = "hour"
        }
        if (time_duration > 7200000) {
          time_length = "hours"
        }
      }

      if (started_time_duration_start.toLowerCase().includes("m")) {
        started_time_duration = started_time_duration_start.split("m")[0]
        time_duration = started_time_duration * 60000
        if (time_duration < 3600000) {
          time_length = "minutes"
        }
        if (time_duration == 60000) {
          time_length = "minute"
        }
      }
      if (isNaN(started_time_duration)) return interaction.reply({ content: "**Die Zeit Angabe konnte nicht erfolgreich ausgewertet werden! (Zeit Angaben Beispiel: `1h`)**", ephemeral: true });
      if (started_time_duration < 1) return interaction.reply({ content: "**Die Zeit Angabe konnte nicht erfolgreich ausgewertet werden! (Zeit Angaben Beispiel: `1h`)**", ephemeral: true });

      const GiveawayEmbed = new EmbedBuilder()
      .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
      .setTitle(`${prize}`)
      .setDescription(`Reagiere mit 🎉 um beim Gewinnspiel teilzunehmen!\n\n ` + " **Endet •** <t:" + (Math.round((new Date()).getTime() / 1000) + parseInt(Math.floor(time_duration) / 1000)) + ":R>\n")
      .setTimestamp()
      .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
      .setColor(embed_color)
      let msg = await client.channels.cache.get(channel).send({ content: "🎉 ||@everyone|| **GIVEAWAY** ||@everyone|| 🎉",  embeds: [GiveawayEmbed] })
      
      await msg.react("🎉")
      
      setTimeout(() => {

        msg.reactions.cache.get("🎉").users.remove(client.user.id)
        
        setTimeout(() => {
          let gewinner = msg.reactions.cache.get("🎉").users.cache.random();

          if (msg.reactions.cache.get("🎉").users.cache.size < 1) {
            let NoGewinnerEmbedDescription = "```Es gibt keinen Gewinner daher niemand teilgenommen hat!```\n\n**GEENDET •** <t:" + Math.round((new Date()).getTime() / 1000) + ":R>\n"
            const NoGewinnerEmbed = new EmbedBuilder()
            .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
            .setTitle(`${prize}`)
            .setDescription(NoGewinnerEmbedDescription)
            .setTimestamp()
            .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
            .setColor(embed_color)
            msg.edit({ content: "🎉 ||@everyone|| **GIVEAWAY IST GEENDET** ||@everyone|| 🎉", embeds: [NoGewinnerEmbed] });
          }

          if (!msg.reactions.cache.get("🎉").users.cache.size < 1) {
            let GewinnerEmbedDescription = "```Der Gewinner des Gewinnspieles wurde ausgewählt!```\n**`Gewinner:`** <@" + gewinner + ">\n**Öffne ein Ticket um deinen Gewinn abzuholen!**\n\n**GEENDET •** <t:" + Math.round((new Date()).getTime() / 1000) + ":R>\n"
            const GewinnerEmbed = new EmbedBuilder()
            .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
            .setTitle(`${prize}`)
            .setDescription(GewinnerEmbedDescription)
            .setTimestamp()
            .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
            .setColor(embed_color)
            msg.edit({ content: "🎉 ||@everyone|| **GIVEAWAY IST GEENDET** ||@everyone|| 🎉", embeds: [GewinnerEmbed] });
            client.channels.cache.get(channel).send({ content: "👆 🎉 <@" + gewinner + "> **hat beim Gewinnspiel gewonnen!** 🎉 👆"})
          }

        }, 1000);
    }, time_duration);

    const DoneEmbed = new EmbedBuilder()
    .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
    .setDescription("## Das Giveaway wurde erstellt!")
    .setTimestamp()
    .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
    .setColor(embed_color)

    interaction.reply({ embeds: [DoneEmbed], ephemeral: true })
}}