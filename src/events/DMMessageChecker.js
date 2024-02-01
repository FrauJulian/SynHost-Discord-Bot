const { EmbedBuilder, Events } = require("discord.js");
const config = require("../../CONFIGS/config.json");
const moment = require("moment");

module.exports = {
    name: Events.MessageCreate,
    once: false,
    execute: async (message) => {
        if (message.guild) return;
        console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] Der Bot hat eine DM von ` + message.author.displayName + ` erhalten mit Inhalt '` + message.content + `'!`);
    }
}
