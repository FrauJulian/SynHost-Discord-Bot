const { EmbedBuilder, Events } = require("discord.js");

const JoinConfig = require("../Configurations/Join.json");
const ERR = require("../Utils/Console/Error");

module.exports = {
    name: Events.GuildMemberAdd,
    once: false,
    execute: async (member) => {
        try {
            let channel = member.guild.channels.cache.find(channel => channel.id === JoinConfig.welcome_channel_id);
            let role = member.guild.roles.cache.find(role => role.id === JoinConfig.welcome_role_id);

            let welcomeMessages = JoinConfig.join_messages.length;
            let randomWelcomeMessage = JoinConfig.join_messages[Math.floor(Math.random() * welcomeMessages)];

            let embed_author_text = JoinConfig.embed_theme.embed_author_text;
            let embed_author_icon = JoinConfig.embed_theme.embed_author_icon;
            let embed_description = JoinConfig.embed_theme.embed_description.replace("%player%", "<@" + member.user + ">").replace("%message%", randomWelcomeMessage);
            let embed_thumbnail = JoinConfig.embed_theme.embed_thumbnail.replace("%avatar%", member.user.displayAvatarURL());
            let embed_footer_text = JoinConfig.embed_theme.embed_footer_text;
            let embed_footer_icon = JoinConfig.embed_theme.embed_footer_icon;
            let embed_color = JoinConfig.embed_theme.embed_color;

            let JoinEmbed = new EmbedBuilder()
                .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                .setDescription(embed_description)
                .setThumbnail(embed_thumbnail)
                .setTimestamp()
                .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                .setColor(embed_color)

            channel.send({ embeds: [JoinEmbed] });
            member.roles.add(role);
        } catch (err) {
            ERR(err);
        }
    }
}
