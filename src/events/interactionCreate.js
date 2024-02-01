const { Events, InteractionType } = require("discord.js");

module.exports = {
 name: Events.InteractionCreate,

 execute: async(interaction) => {
    let client = interaction.client;
    if (interaction.type == InteractionType.ApplicationCommand) {
      if (interaction.user.bot) return;
    
      try {
        const command = client.slashcommands.get(interaction.commandName)
        command.run(client, interaction)
      } catch (err) {
        let embed_author_text = config.err_message.embed_author_text;
        let embed_author_icon = config.err_message.embed_author_icon;
        let embed_description = config.err_message.embed_description.replace("%err%", "" + err + "");
        let embed_footer_text = config.err_message.embed_footer_text;
        let embed_footer_icon = config.err_message.embed_footer_icon;
        let embed_color = config.err_message.embed_color;

        const ErrEmbed = new EmbedBuilder()
        .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
        .setDescription(embed_description)
        .setTimestamp()
        .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
        .setColor(embed_color)
        console.error(err)
        interaction.reply({ embeds: [ErrEmbed], ephemeral: true})
      }
    }
  }
}