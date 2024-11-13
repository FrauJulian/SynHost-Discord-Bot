const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const ms = require("ms");

const GiveawayConfiguration = require("../../Configurations/Giveaway.json");
const ERR = require("../../Utils/Console/Error");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("giveaway")
        .setDescription("🎉 | Erstelle ein Giveaway für deine Community!")
        .addStringOption(option => option.setName("runtime").setDescription("Setzte die Laufzeit des Giveaways!").setRequired(true))
        .addIntegerOption(option => option.setName("winners").setDescription("Setzte die Anzahl der möglichen Gewinner!").setRequired(true))
        .addStringOption(option => option.setName("price").setDescription("Setze den Preis des Giveaways!").setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    run: async (client, interaction) => {
        try {
            let runtime = interaction.options.getString("runtime");
            let winnerCount = interaction.options.getInteger("winners");
            let price = interaction.options.getString("price");

            await client.giveawayManager.start(interaction.channel, {
                duration: ms(runtime),
                winnerCount: winnerCount,
                prize: price,
                messages: {
                    giveaway: "🎉 || <@everyone> || 🎉",
                    giveawayEnded: "🎉 || <@everyone> || 🎉",
                    title: "{this.prize}",
                    drawing: "> #### Endet in {timestamp}",
                    dropMessage: "## Sei der erste der mit 🎉 reagiert!",
                    inviteToParticipate: "## Reagiere mit 🎉 um teilzunehmen!",
                    winMessage: "## Herzlichen Glückwunsch, {winners}!\n> **Melde dich via Discord- oder Web-Ticket um deinen Gewinn einzulösen!**",
                    embedFooter: "*{this.winnerCount} Gewinner*",
                    noWinner: "# Giveaway wurde gestoppt!",
                    hostedBy: "### Giveaway wurde von {this.hostedBy} gestartet!",
                    winners: "Gewinner:",
                    endedAt: "GIVEAWAY GEENDET"
                },
                lastChance: {
                    enabled: true,
                    content: "# ⚠️ **LETZTE CHANCE** ⚠️",
                    threshold: 60000000000_000,
                    embedColor: "Yellow"
                }
            })

            await interaction.reply({content:"## TICKET WURDE GESTARTET", ephemeral: true});
        } catch (err) {
            ERR(err, interaction)
        }
    }
}
