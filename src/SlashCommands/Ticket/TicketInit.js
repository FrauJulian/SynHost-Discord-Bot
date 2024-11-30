const {
    EmbedBuilder,
    ActionRowBuilder,
    PermissionFlagsBits
} = require("discord.js");
const {SlashCommandBuilder} = require("@discordjs/builders");

const SupportConfiguration = require("../../Configurations/Support.json");
const ERR = require("../../Utils/Console/Error");
const CustomButtonBuilder = require("../../Utils/CustomBuilders/CustomButtonBuilders/CustomButtonBuilder");
const SupportEmbedBuilder = require("../../Utils/CustomBuilders/EmbedBuilders/SupportEmbedBuilder");
const RunSQL = require("../../Utils/Database/Core/RunSQL");
const TicketData = require("../../Utils/Database/Features/Ticket/TicketData");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ticket-init")
        .setDescription("❌ | Initialisiere ein neues Ticket!")
        .addUserOption(option => option.setName("nutzer").setDescription("Welchen Nutzer gehört dieses Ticket?").setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    run: async (client, interaction) => {
        try {
            let ticketData = await TicketData(interaction, interaction.channel.id);

            if (!ticketData[0]){
                let ticketInit = await SupportEmbedBuilder(`## Das Ticket wurde initialisiert!\n-# Vergiss nicht alles neu zu Konfigurieren! - z.B. Claimer, Category, usw.`);

                let ticketUser = interaction.options.getUser("nutzer");

                let initTicketSQL = `INSERT INTO \`Tickets\` (\`TicketID\`, \`Category\`, \`UserID\`, \`ExtraUsersID\`, \`ClaimerID\`, \`CustomerID\`, \`ProductID\`) VALUES ('${interaction.channel.id}',"NONE",'${ticketUser.id}',null,null,null,null);`;
                RunSQL(initTicketSQL, interaction);

                await interaction.reply({embeds:[ticketInit], ephemeral: true});
            } else {
                let ticketAlreadyInited = await SupportEmbedBuilder(`## Das Ticket ist bereits initialisiert!`);
                await interaction.reply({embeds:[ticketAlreadyInited], ephemeral: true});
            }
        } catch (err) {
            ERR(err, interaction);
        }
    }
}
