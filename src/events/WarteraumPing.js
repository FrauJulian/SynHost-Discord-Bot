const { Events, EmbedBuilder } = require("discord.js");
const moment = require("moment");
const config = require("../../CONFIGS/config.json");

module.exports = {
  name: Events.VoiceStateUpdate,
  once: false,
  execute: async (oldState, newState) => {
    if (newState.channelId == config.ticket_system.support_warteraum) {
      const TeamChat = newState.guild.channels.cache.get(config.ticket_system.transcripts);
      const UserID = newState.id;

      let embed_author_text = config.ticket_system.embeds_theme.embed_author_text;
      let embed_author_icon = config.ticket_system.embeds_theme.embed_author_icon;
      let embed_footer_text = config.ticket_system.embeds_theme.embed_footer_text;
      let embed_footer_icon = config.ticket_system.embeds_theme.embed_footer_icon;
      let embed_color = config.ticket_system.embeds_theme.embed_color;

      const MemberJoined = new EmbedBuilder()
      .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
      .setDescription(`## <@` + UserID + `> benötigt Hilfe im Sprach Support!`)
      .setTimestamp()
      .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
      .setColor(embed_color)
      TeamChat.send({ content: `<@&${``+ config.ticket_system.support_role +``}>`, embeds: [MemberJoined] });
    }
  }
}
