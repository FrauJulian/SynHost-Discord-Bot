const {
    ActionRowBuilder,
} = require("discord.js");
const {SlashCommandBuilder} = require("@discordjs/builders");

const AdventConfiguration = require("../Configurations/Advent.json");
const ERR = require("../Utils/Console/Error");
const AdventButtonBuilder = require("../Utils/CustomBuilders/CustomButtonBuilders/AdventButtonBuilder");
const AdventEmbedBuilder = require("../Utils/CustomBuilders/EmbedBuilders/AdventEmbedBuilder");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("advent")
        .setDescription("🎄 | Advent, Advent, ein Lichtlein brennt!"),
    run: async (client, interaction) => {
        try {
            let adventEmbed = await AdventEmbedBuilder(`## Advent, Advent, ein Lichtlein brennt!`);

            let adventDoorButtonRow1 = new ActionRowBuilder();
            let adventDoorButtonRow2 = new ActionRowBuilder();
            let adventDoorButtonRow3 = new ActionRowBuilder();
            let adventDoorButtonRow4 = new ActionRowBuilder();
            let adventDoorButtonRow5 = new ActionRowBuilder();

            let ticketTypes = Object.entries(AdventConfiguration.calendar);
            let adventDoorButton;

            for (let i = 0; i < ticketTypes.length; i++) {
                let [key] = ticketTypes[i];
                let rowIndex = Math.floor(i / 5);

                switch (rowIndex) {
                    case 0:
                        adventDoorButton = await AdventButtonBuilder(key);
                        adventDoorButtonRow1.addComponents(adventDoorButton);
                        break;
                    case 1:
                        adventDoorButton = await AdventButtonBuilder(key);
                        adventDoorButtonRow2.addComponents(adventDoorButton);
                        break;
                    case 2:
                        adventDoorButton = await AdventButtonBuilder(key);
                        adventDoorButtonRow3.addComponents(adventDoorButton);
                        break;
                    case 3:
                        adventDoorButton = await AdventButtonBuilder(key);
                        adventDoorButtonRow4.addComponents(adventDoorButton);
                        break;
                    case 4:
                        adventDoorButton = await AdventButtonBuilder(key);
                        adventDoorButtonRow5.addComponents(adventDoorButton);
                        break;
                }
            }

            await interaction.reply({
                embeds: [adventEmbed],
                components: [
                    adventDoorButtonRow1,
                    adventDoorButtonRow2,
                    adventDoorButtonRow3,
                    adventDoorButtonRow4,
                    adventDoorButtonRow5
                ],
                ephemeral: true
            });

        } catch (err) {
            ERR(err, interaction);
        }
    }
}
