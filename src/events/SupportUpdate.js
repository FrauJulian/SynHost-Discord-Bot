const { Events } = require("discord.js");
const moment = require("moment");
const config = require("../../CONFIGS/config.json");

module.exports = {
  name: Events.VoiceStateUpdate,
  once: false,
  execute: async (oldState, newState) => {
    let support_role_1 = newState.member.guild.roles.cache.find(rl=>rl.id === config.ticket_system.support_role_1);
    let support_role_2 = newState.member.guild.roles.cache.find(rl=>rl.id === config.ticket_system.support_role_2);

    if (newState.channelId !== config.ticket_system.support_channel_1 || config.ticket_system.support_channel_2) {
      if(newState.member.roles.cache.has(config.ticket_system.support_role_1)) {
        newState.member.roles.remove(support_role_1)
      }
      if(newState.member.roles.cache.has(config.ticket_system.support_role_2)) {
        newState.member.roles.remove(support_role_2)
      }
    }
    if (newState.channelId === config.ticket_system.support_channel_1) {
      newState.member.roles.add(support_role_1)
    }
    if (newState.channelId === config.ticket_system.support_channel_2) {
        newState.member.roles.add(support_role_2)
    }
  }
}
