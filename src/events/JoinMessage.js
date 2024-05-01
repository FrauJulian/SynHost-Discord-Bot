const { EmbedBuilder, Events } = require("discord.js");
const config = require("../../CONFIGS/config.json");
const moment = require("moment");

module.exports = {
    name: Events.GuildMemberAdd,
    once: false,
    execute: async (member) => {
        let channel = member.guild.channels.cache.find(ch => ch.id === config.join_messages.join_messages_channel);
        if(!channel || channel.id === null) {
            console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] Etwas ist schief gelaufen!`)
            return;
        }

        let role = member.guild.roles.cache.find(rl=>rl.id === config.join_messages.join_role_id);
        if(!role || role.id === null) return;
        member.roles.add(role);
            
        var messages = [
            "willkommen in der Welt von SynHost. Dein Server wartet bereits auf dich!",
            "du hast es durch die Firewall geschafft. Wir sehen uns ONLINE!",
            "hat die Server von SynHost entdeckt!",
            "belegt gleich einen neuen Port im Netzwerkschrank!",
            "wir mussten feststellen, dein Server ist heißer als ein CPU-Kern im Turbo-Modus!",
            "du siehst aus, als könntest du ein neuer Kunde sein!",
            "dein Server hat VIP-Zugang zur Datenautobahn erhalten.",
            "010101010101, hoplla. Ich meinte Hallo!",
            "du bist absolut FAST LIKE A BOLT!",
            "dein Server ist bereit für High-Performance-Hosting-Action!",
            "willkommen bei SynHost. Wir sind dein Anbieter für hochqualitative Server und das auf 100% Prepaidbasis!",
            "ist auf dem Weg fast fast über das WLAN-KABEL gestolpert!",
            "dein Server ist da, um Hosting-Magie zu verbreiten!",
            "dein Server ist bereit für atemberaubende Hosting-Leistung!",
            "dein Server ist nun Teil der Hosting-Rockstars.",
            "kam mit 10-Gbit/s durchgeschossen auf den Discord!"
        ];

        const rmsg = messages[Math.floor(Math.random() * messages.length)];

        let embed_author_text = config.join_messages.embed_author_text;
        let embed_author_icon = config.join_messages.embed_author_icon;
        let embed_description = config.join_messages.embed_description.replace("%player%", "<@" + member.user + ">").replace("%message%", rmsg);
        let embed_thumpnail = config.join_messages.embed_thumpnail.replace("%avatar%", member.user.displayAvatarURL());
        let embed_footer_text = config.join_messages.embed_footer_text;
        let embed_footer_icon = config.join_messages.embed_footer_icon;
        let embed_color = config.join_messages.embed_color;

        const JoinEmbed = new EmbedBuilder()
        .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
        .setDescription(embed_description)
        .setThumbnail(embed_thumpnail)
        .setTimestamp()
        .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
        .setColor(embed_color)
        channel.send({ embeds: [JoinEmbed] });
    }
}
