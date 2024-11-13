const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const ms = require("ms");

const GiveawayConfiguration = require("../Configurations/Giveaway.json");
const ERR = require("../../Utils/Console/Error");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("giveaway-reroll")
        .setDescription("🎉 | Lose das Giveaway neu aus!")
        .addIntegerOption(option => option.setName("id").setDescription("Setzte die ID des Giveaways ein! - Message ID").setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    run: async (client, interaction) => {
        try {
            let giveawayId = interaction.options.getString("id");

            await client.giveawayManager.reroll(giveawayId, {
                messages: {
                    congrat: "## Herzlichen Glückwunsch, {winners}!\n> **Melde dich via Discord- oder Web-Ticket um deinen Gewinn einzulösen!**",
                    error: "Nicht genug Teilnehmer!"
                }
            });

            await interaction.deferUpdate();
        } catch (err) {
            ERR(err, interaction)
        }
    }
}
