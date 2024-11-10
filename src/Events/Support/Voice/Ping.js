const { Events } = require("discord.js");
const SupportConfiguration = require("../../../Configurations/Support.json");
const SupportEmbedBuilder = require("../../../Utils/CustomBuilders/EmbedBuilders/SupportEmbedBuilder");

module.exports = {
    name: Events.VoiceStateUpdate,
    once: false,
    execute: async (oldState, newState) => {
        if (newState.channelId === SupportConfiguration.support_waitingRoomId) {
            let teamChat = newState.guild.channels.cache.get(SupportConfiguration.team_channelId);
            let needHelpMessage = await SupportEmbedBuilder(`### <@` + newState.id + `> benötigt Hilfe im Sprach Support!`);
            teamChat.send({ content: `<@&${SupportConfiguration.team_roleId}>`, embeds: [needHelpMessage] });
        }
    }
}