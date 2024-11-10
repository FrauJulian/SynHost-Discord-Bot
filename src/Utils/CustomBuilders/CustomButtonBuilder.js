const { ButtonBuilder, ButtonStyle } = require("discord.js");

async function CustomButtonBuilder(customId, name, emoji, buttonStyle) {
    let specifiedButtonStyle;

    switch (buttonStyle) {
        case "Danger":
            specifiedButtonStyle = ButtonStyle.Danger;
            break;
        case "Primary":
            specifiedButtonStyle = ButtonStyle.Primary;
            break;
        case "Success":
            specifiedButtonStyle = ButtonStyle.Success;
            break;
        case "Secondary":
            specifiedButtonStyle = ButtonStyle.Secondary;
            break;
        default:
            specifiedButtonStyle = ButtonStyle.Primary;
            break;
    }

    return new ButtonBuilder()
        .setCustomId(customId)
        .setLabel(name)
        .setEmoji(emoji)
        .setStyle(specifiedButtonStyle)
}

module.exports = CustomButtonBuilder;