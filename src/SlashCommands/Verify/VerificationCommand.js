const {
    AttachmentBuilder,
    ActionRowBuilder,
} = require("discord.js");
const {SlashCommandBuilder} = require("@discordjs/builders");

const VerificationConfiguration = require("../../Configurations/Verification.json");
const ERR = require("../../Utils/Console/Error");
const RunSQL = require("../../Utils/Database/Core/RunSQL");
const CustomButtonBuilder = require("../../Utils/CustomBuilders/CustomButtonBuilder");
const SupportEmbedBuilder = require("../../Utils/CustomBuilders/EmbedBuilders/SupportEmbedBuilder");
const VerificationEmbedBuilder = require("../../Utils/CustomBuilders/EmbedBuilders/VerificationEmbedBuilder");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("verify")
        .setDescription("✅ | Mit diesen Befehl kannst du deinen Account verlinken!"),
    run: async (client, interaction) => {
        try {
            let userVerificationDataSQL = `SELECT * FROM \`Verify\` WHERE UserID = ${interaction.user.id};`;
            let userVerificationData = await RunSQL(userVerificationDataSQL, interaction);

            let verificationMessage;

            if (!userVerificationData[0]) {
                verificationMessage = await VerificationEmbedBuilder(`### Klicke auf Verify um den Verifizierungs-Prozess zu beginnen!`);

                let customerIdIMG = new AttachmentBuilder()
                    .setFile("./assets/CustomerIdIMG.png")

                let startVerificationButton = new ActionRowBuilder()
                    .addComponents(
                        await CustomButtonBuilder("startVerificationButton", "Verify", "✅", "Success")
                    )

                interaction.reply({
                    embeds: [verificationMessage],
                    files: [customerIdIMG],
                    components: [startVerificationButton],
                    ephemeral: true
                });
            } else {
                verificationMessage = userVerificationData[0].Status === "APPROVED" ? await SupportEmbedBuilder(`## Du bist bereits verifiziert!`) : await SupportEmbedBuilder(`## Dein Antrag wurde noch nicht bearbeitet!\n-# Melde dich gerne im Support bei Fragen!`);

                interaction.reply({embeds: [verificationMessage], ephemeral: true});
            }
        } catch (err) {
            ERR(err, interaction);
        }
    }
}