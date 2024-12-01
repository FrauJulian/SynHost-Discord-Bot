const {ButtonBuilder, ButtonStyle} = require("discord.js");

async function AdventButtonBuilder(key) {
    let date = new Date();
    let day = new Date(date.toLocaleString("en-US", { timeZone: "Europe/Berlin" })).getDate();
    let month = new Date(date.toLocaleString("en-US", { timeZone: "Europe/Berlin" })).getMonth() + 1;

    if (month === 12 &&
        key === day.toString()) {
        return new ButtonBuilder()
            .setCustomId(`advent-1-${key}`)
            .setLabel(key)
            .setEmoji("🎄")
            .setStyle(ButtonStyle.Success);
    } else {
        return new ButtonBuilder()
            .setCustomId(`advent-0-${key}`)
            .setLabel(key)
            .setStyle(ButtonStyle.Primary);
    }
}

module.exports = AdventButtonBuilder;
