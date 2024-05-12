const { EmbedBuilder, Events } = require("discord.js");
const config = require("../../CONFIGS/config.json");
const moment = require("moment");

module.exports = {
    name: Events.GuildMemberAdd,
    once: false,
    execute: async (member) => {
        try {
            let channel = member.guild.channels.cache.find(ch => ch.id === config.join.channel_id);
            let role = member.guild.roles.cache.find(rl => rl.id === config.join.role_id);
            if (!role || role.id === null) return;
            member.roles.add(role);

            const rmsg = config.join.join_messages[Math.floor(Math.random() * config.join.join_messages.length)];

            let embed_author_text = config.join.embeds_theme.embed_author_text;
            let embed_author_icon = config.join.embeds_theme.embed_author_icon;
            let embed_description = config.join.embeds_theme.embed_description.replace("%player%", "<@" + member.user + ">").replace("%message%", rmsg);
            let embed_thumpnail = config.join.embeds_theme.embed_thumpnail.replace("%avatar%", member.user.displayAvatarURL());
            let embed_footer_text = config.join.embeds_theme.embed_footer_text;
            let embed_footer_icon = config.join.embeds_theme.embed_footer_icon;
            let embed_color = config.join.embeds_theme.embed_color;

            const JoinEmbed = new EmbedBuilder()
                .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                .setDescription(embed_description)
                .setThumbnail(embed_thumpnail)
                .setTimestamp()
                .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                .setColor(embed_color)
            channel.send({ embeds: [JoinEmbed] });
        } catch (err) {
            console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ERR: \n` + err);
        }
    }
}
