const {Events} = require("discord.js");
const SupportConfiguration = require("../../../Configurations/Support.json");

module.exports = {
    name: Events.VoiceStateUpdate,
    once: false,
    execute: async (oldState, newState) => {
        let support_role_1 = newState.member.guild.roles.cache.find(role => role.id === SupportConfiguration.support1_roleId);
        let support_role_2 = newState.member.guild.roles.cache.find(role => role.id === SupportConfiguration.support2_roleId);

        switch (newState.channelId) {

            case SupportConfiguration.support1_channelId:
                newState.member.roles.add(support_role_1);
                break;

            case SupportConfiguration.support2_channelId:
                newState.member.roles.add(support_role_2);
                break;

            default:
                newState.member.roles.remove(support_role_1);
                newState.member.roles.remove(support_role_2);
                break;

        }
    }
}
