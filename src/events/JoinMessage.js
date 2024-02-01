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
            "Ich hoffe, du bist auf dem Weg nicht über das WLAN-KABEL gestolpert!",
            "Hat es durch die Sicherheitskontrolle geschafft!",
            "Hat die Server von SynHost entdeckt!",
            "Belegt gleich einen neuen Port im Netzwerkschrank!",
            "Willkommen! Dein Server ist heißer als ein CPU-Kern im Turbo-Modus.",
            "Hallo da! Dein Server ist nun online - bereit für digitale Abenteuer.",
            "Grüß Gott! Dein Server hat VIP-Zugang zur Datenautobahn erhalten.",
            "Aloha! Dein Server ist nun da, um die Bits zu rocken.",
            "Hi! Dein Server ist jetzt live - lass die Datenparty beginnen!",
            "Guten Tag! Dein Server ist bereit für High-Performance-Hosting-Action.",
            "Ciao! Dein Server ist nun Teil der Hosting-Elite.",
            "Hola! Dein Server ist jetzt online, bereit für digitale Großtaten.",
            "Bonjour! Dein Server ist da, um Hosting-Magie zu verbreiten.",
            "Servus! Dein Server ist bereit für atemberaubende Hosting-Leistung.",
            "Salut! Dein Server ist nun Teil der Hosting-Rockstars.",
            "Privet! Dein Server ist jetzt aktiviert, um Hosting-Grenzen zu sprengen."
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
