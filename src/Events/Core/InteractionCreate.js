const { Events, InteractionType, EmbedBuilder } = require("discord.js");
const ERR = require("../../Utils/Console/Error");

module.exports = {
  name: Events.InteractionCreate,

  execute: async (interaction) => {
    let client = interaction.client;
    if (interaction.type === InteractionType.ApplicationCommand) {
      if (interaction.user.bot) return;

      try {
        const command = client.SlashCommands.get(interaction.commandName)
        command.run(client, interaction)
      } catch (err) {
        ERR(err, interaction);
      }
    }
  }
}