const { EmbedBuilder, AttachmentBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

const VerificationConfiguration = require("../../Configurations/Verification.json");
const ERR = require("../../Utils/Console/Error");
const RunSQL = require("../../Utils/Database/Core/RunSQL");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("check-verification")
        .setDescription("✅ | Mit diesen Befehl kannst du deinen Account verlinken!")
        .addUserOption(option =>
            option
                .setName("nutzer")
                .setDescription("✅ | Wähle den Nutzer aus diesen du inspezieren willst!")
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.MoveMembers),
    run: async (client, interaction) => {
        try {
            let embed_author_text = VerificationConfiguration.embed_theme.embed_author_text;
            let embed_author_icon = VerificationConfiguration.embed_theme.embed_author_icon;
            let embed_footer_text = VerificationConfiguration.embed_theme.embed_footer_text;
            let embed_footer_icon = VerificationConfiguration.embed_theme.embed_footer_icon;
            let embed_color = VerificationConfiguration.embed_theme.embed_color;

            let targetedUser = interaction.options.getMember("nutzer");

            let detailSQL = `SELECT * FROM \`Verify\` WHERE UserID = ${targetedUser.user.id};`;
            let data = await RunSQL(detailSQL);

            const CheckVerificationEmbed = new EmbedBuilder()
            CheckVerificationEmbed.setAuthor({ name: embed_author_text, iconURL: embed_author_icon })

            if (!targetedUser.roles.cache.has(VerificationConfiguration.linked_roleId)) {
                CheckVerificationEmbed.setDescription("### Dieser Nutzer ist nicht verifiziert!");

            } else {
                CheckVerificationEmbed.setDescription(`Hier die Details für den Nutzer, <@${targetedUser.user.id}>!`);
                CheckVerificationEmbed.addFields(
                    { name: "Kunden Nr.", value: `\`${data[0].CustomerID}\``, inline: true },
                    { name: "Kontakt", value: `\`${data[0].Contact}\``, inline: true },
                    { name: "Status", value: `\`${data[0].Status}\``, inline: true }
                )
            }

            CheckVerificationEmbed.setTimestamp()
            CheckVerificationEmbed.setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
            CheckVerificationEmbed.setColor(embed_color)

            interaction.reply({ embeds: [CheckVerificationEmbed], ephemeral: true });

        } catch (err) {
            ERR(err, interaction);
        }
    }
}