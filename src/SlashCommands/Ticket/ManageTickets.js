const {
    EmbedBuilder,
    ActionRowBuilder,
    PermissionFlagsBits
} = require("discord.js");
const {SlashCommandBuilder} = require("@discordjs/builders");

const SupportConfiguration = require("../../Configurations/Support.json");
const ERR = require("../../Utils/Console/Error");
const CustomButtonBuilder = require("../../Utils/CustomBuilders/CustomButtonBuilder");
const SupportEmbedBuilder = require("../../Utils/CustomBuilders/EmbedBuilders/SupportEmbedBuilder");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("manage-ticket")
        .setDescription("❌ | Mit diesen Befehl kannst du das Ticket in dem du bist verwalten.!")
        .setDefaultMemberPermissions(PermissionFlagsBits.MoveMembers),
    run: async (client, interaction) => {
        try {
            if (interaction.channel.parentId === SupportConfiguration.ticket_categoryId) {
                let manageTicketEmbed = await SupportEmbedBuilder(`## Verwalte das Ticket, <#${interaction.channel.id}>!`);

                let claimerManageRow = new ActionRowBuilder();
                claimerManageRow.addComponents(
                    await CustomButtonBuilder("ticketClaim", "Claim", "🙋‍♂️", "Success"),
                    await CustomButtonBuilder("ticketAssign", "Übergeben", "🫵", "Success"),
                    await CustomButtonBuilder("ticketUnclaim", "Unclaim", "🤷‍♂️", "Secondary")
                );

                let userManageRow = new ActionRowBuilder();
                userManageRow.addComponents(
                    await CustomButtonBuilder("ticketAddUser", "Nutzer hinzufügen", "✔️", "Primary"),
                    await CustomButtonBuilder("ticketRemoveUser", "Nutzer entfernen", "✖️", "Primary")
                );

                let ticketManageRow = new ActionRowBuilder();
                ticketManageRow.addComponents(
                    await CustomButtonBuilder("ticketChangeCategory", "Kategorie ändern", "📜", "Primary"),
                    await CustomButtonBuilder("ticketClose", "Ticket schließen", "🛡️", "Danger"),
                    await CustomButtonBuilder("ticketPsychiater", "Psychiater", "❤️‍🔥", "Secondary")
                );

                await interaction.reply({
                    embeds: [manageTicketEmbed],
                    components: [claimerManageRow, userManageRow, ticketManageRow],
                    ephemeral: true
                })
            } else {
                let wrongCategoryEmbed = await SupportEmbedBuilder(`## Dies ist kein Ticket!`);
                await interaction.reply({
                    embeds: [wrongCategoryEmbed],
                    ephemeral: true
                })
            }
        } catch (err) {
            ERR(err, interaction);
        }
    }
}