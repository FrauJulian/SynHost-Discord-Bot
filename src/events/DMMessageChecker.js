const { EmbedBuilder, Events } = require("discord.js");
const config = require("../../CONFIGS/config.json");
const moment = require("moment");

module.exports = {
    name: Events.MessageCreate,
    once: false,
    execute: async (message) => {
        try {
            if (message.guild) {
                return;
            } else if (message.author.bot) {
                return;
            } else {
                console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] Der Bot hat eine DM von ` + message.author.username + ` erhalten mit Inhalt '` + message.content + `'!`);
            }
        } catch (err) {
            let embed_author_text = config.generell.err_embed.embed_author_text;
            let embed_author_icon = config.generell.err_embed.embed_author_icon;
            let embed_description = config.generell.err_embed.embed_description.replace("%err%", "" + err + "");
            let embed_footer_text = config.generell.err_embed.embed_footer_text;
            let embed_footer_icon = config.generell.err_embed.embed_footer_icon;
            let embed_color = config.generell.err_embed.embed_color;

            const ErrEmbed = new EmbedBuilder()
                .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                .setDescription(embed_description)
                .setTimestamp()
                .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                .setColor(embed_color)
            interaction.reply({ embeds: [ErrEmbed], ephemeral: true })

            console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ERR: \n` + err);
        }
    }
}
