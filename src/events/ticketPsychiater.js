const { EmbedBuilder } = require('discord.js');
const client = require("../../index");
const config = require("../../CONFIGS/config.json");
const moment = require("moment");
const mysql = require("mysql");

module.exports = {
    name: "ticketPsychiater"
};

client.on("interactionCreate", async (interaction) => {
    try {
        let embed_author_text = config.support.embeds_theme.embed_author_text;
        let embed_author_icon = config.support.embeds_theme.embed_author_icon;
        let embed_footer_text = config.support.embeds_theme.embed_footer_text;
        let embed_footer_icon = config.support.embeds_theme.embed_footer_icon;
        let embed_color = config.support.embeds_theme.embed_color;

        const DBconnection = mysql.createConnection({
            host: config.generell.db_host,
            port: config.generell.db_port,
            user: config.generell.db_user,
            password: config.generell.db_password,
            database: config.generell.db_name,
        });

        if(interaction.isButton()) {
            if (interaction.customId.startsWith("ticket-psychiater")) {
        
                const rmsg = config.support.psychiater_messages[Math.floor(Math.random() * config.support.psychiater_messages.length)];
                const TeamChat = interaction.guild.channels.cache.get(config.support.log_channel_id);

                const PsyUsed = new EmbedBuilder()
                .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                .setDescription("### <@" + interaction.member.id + "> hat den Psychiater in <#" + interaction.channel.id + "> benötigt!")
                .setTimestamp()
                .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                .setColor(embed_color)

                const PsychiaterEmbed = new EmbedBuilder()
                .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                .setDescription("### " + rmsg + "\nGeneriert von ChatGPT übrigens! :joy:")
                .setTimestamp()
                .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                .setColor(embed_color)

                TeamChat.send({ embeds: [PsyUsed] })
                interaction.reply({ embeds: [PsychiaterEmbed], ephemeral: true })
            }  
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
        interaction.reply({ embeds: [ErrEmbed], ephemeral: true})

        console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ERR:\n` + err);
    }
})