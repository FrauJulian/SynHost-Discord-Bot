const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

const ERR = require("../../Utils/Console/Error");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("giveaway-reroll")
        .setDescription("🎉 | Lose das Giveaway neu aus!")
        .addStringOption(option => option.setName("id").setDescription("Setzte die ID des Giveaways ein! - Message ID").setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    run: async (client, interaction) => {
        try {
            let giveawayId = interaction.options.getString("id");

            await client.giveawayManager.reroll(giveawayId, {
                messages: {
                    congrat: "## Herzlichen Glückwunsch, {winners}!\n> **Melde dich via Discord- oder Web-Ticket um deinen Gewinn einzulösen!**\n-# GIVEAWAY WURDE NEU AUSGELOST!",
                    error: "Nicht genug Teilnehmer!"
                }
            });

            await interaction.reply({content:"## TICKET WURDE NEU AUSGELOST", ephemeral: true});
        } catch (err) {
            ERR(err, interaction)
        }
    }
}
