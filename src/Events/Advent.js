const {
    Events,
} = require("discord.js");

const AdventConfiguration = require("../Configurations/Advent.json");
const ERR = require("../Utils/Console/Error");
const AdventEmbedBuilder = require("../Utils/CustomBuilders/EmbedBuilders/AdventEmbedBuilder");

module.exports = {
    name: Events.InteractionCreate,
    once: false,
    execute: async (interaction) => {
        try {
            if (interaction.isButton() &&
                interaction.customId.startsWith(`advent`)) {

                let splitCustomId = interaction.customId.split('-');

                let success = splitCustomId[1] === "1";
                let key = splitCustomId[2];

                let code = AdventConfiguration.calendar[key].code;
                let use = AdventConfiguration.calendar[key].use;

                let adventMessage;
                if (success) {
                    adventMessage = await AdventEmbedBuilder(`## Der Code für das ${key} Türchen ist \`${code}\`!\n Mit diesem Code bekommst du **${use}**!\n\n-# Dieser Code gilt nur am gleichen Tag von 00:00 bis 23:59 Uhr!`);
                } else {
                    adventMessage = await AdventEmbedBuilder(`## Falsches Türchen!`);
                }

                interaction.reply({embeds: [adventMessage], ephemeral: true});
            }
        } catch (err) {
            ERR(err, interaction);
        }
    },
};
