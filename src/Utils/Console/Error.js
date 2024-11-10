const { EmbedBuilder } = require("discord.js")

const MainConfiguration = require("../../Configurations/Main.json")
const ConsoleError = require("./ConsoleError");

function ERR(err, interaction) {
    ConsoleError(" ")
    ConsoleError("  ______ _____  _____   ____  _____  ");
    ConsoleError(" |  ____|  __ \\|  __ \\ / __ \\|  __ \\ ");
    ConsoleError(" | |__  | |__) | |__) | |  | | |__) |");
    ConsoleError(" |  __| |  _  /|  _  /| |  | |  _  / ");
    ConsoleError(" | |____| | \\ \\| | \\ \\| |__| | | \\ \\ ");
    ConsoleError(" |______|_|  \\_\\_|  \\_\\\\____/|_|  \\_\\");
    ConsoleError(" ")

    if (err != null) {
        ConsoleError(err)
    } else {
        ConsoleError("An unhandled error has occurred!")
    }

    if (interaction != null) {
        let embed_author_text = MainConfiguration.error_embed_theme.embed_author_text;
        let embed_author_icon = MainConfiguration.error_embed_theme.embed_author_icon;
        let embed_description = MainConfiguration.error_embed_theme.embed_description.replace("%error%", "" + err + "");
        let embed_footer_text = MainConfiguration.error_embed_theme.embed_footer_text;
        let embed_footer_icon = MainConfiguration.error_embed_theme.embed_footer_icon;
        let embed_color = MainConfiguration.error_embed_theme.embed_color;

        const ErrEmbed = new EmbedBuilder()
            .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
            .setDescription(embed_description)
            .setTimestamp()
            .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
            .setColor(embed_color)
        interaction.reply({ embeds: [ErrEmbed], ephemeral: true })
    }
}

module.exports = ERR;