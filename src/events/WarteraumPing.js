const { Events, EmbedBuilder } = require("discord.js");
const config = require("../../CONFIGS/config.json");

module.exports = {
  name: Events.VoiceStateUpdate,
  once: false,
  execute: async (oldState, newState) => {
    if (newState.channelId == config.support.support_warteraum) {
      const TeamChat = newState.guild.channels.cache.get(config.support.log_channel_id);

      let embed_author_text = config.support.embeds_theme.embed_author_text;
      let embed_author_icon = config.support.embeds_theme.embed_author_icon;
      let embed_footer_text = config.support.embeds_theme.embed_footer_text;
      let embed_footer_icon = config.support.embeds_theme.embed_footer_icon;
      let embed_color = config.support.embeds_theme.embed_color;

      const MemberJoined = new EmbedBuilder()
      .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
      .setDescription(`### <@` + newState.id + `> benötigt Hilfe im Sprach Support!`)
      .setTimestamp()
      .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
      .setColor(embed_color)
      TeamChat.send({ content: `<@&${``+ config.support.supporter_role_id +``}>`, embeds: [MemberJoined] });
    }
  }
}
