const SupportConfiguration = require("../../../Configurations/Support.json");
const {EmbedBuilder} = require("discord.js");

async function SupportEmbedBuilder(message) {
    const embed_author_text = SupportConfiguration.embed_theme.embed_author_text;
    const embed_author_icon = SupportConfiguration.embed_theme.embed_author_icon;
    const embed_footer_text = SupportConfiguration.embed_theme.embed_footer_text;
    const embed_footer_icon = SupportConfiguration.embed_theme.embed_footer_icon;
    const embed_color = SupportConfiguration.embed_theme.embed_color;

    let embedMessage = new EmbedBuilder()
    embedMessage.setAuthor({name: embed_author_text, iconURL: embed_author_icon})
    embedMessage.setDescription(SupportConfiguration.embed_theme.embed_description.replace("%message%", message));
    embedMessage.setTimestamp()
    embedMessage.setFooter({text: embed_footer_text, iconURL: embed_footer_icon})
    embedMessage.setColor(embed_color)

    return embedMessage;
}

module.exports = SupportEmbedBuilder;