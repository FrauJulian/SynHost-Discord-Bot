const {ButtonBuilder, ButtonStyle} = require("discord.js");

async function AdventButtonBuilder(key) {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;

    if (month === 12) {
        if (key === day) {
            return new ButtonBuilder()
            .setCustomId(`advent-t-${key}`)
            .setLabel(key.toString())
            .setEmoji("🎄")
            .setStyle(ButtonStyle.Success)
        } else {
            return new ButtonBuilder()
            .setCustomId(`advent-f-${key}`)
            .setLabel(key.toString())
            .setStyle(ButtonStyle.Primary)
        }
    } else {
        return new ButtonBuilder()
            .setCustomId(`advent-f-${key}`)
            .setLabel(key.toString())
            .setStyle(ButtonStyle.Danger)
    }
}

module.exports = AdventButtonBuilder;
