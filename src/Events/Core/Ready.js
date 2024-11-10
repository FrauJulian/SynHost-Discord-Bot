const { Events } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");

const ERR = require("../../Utils/Console/Error");
const ConsoleLog = require("../../Utils/Console/ConsoleLog");

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute: async (client) => {
    const rest = new REST({ version: "10" }).setToken(client.token);

    ConsoleLog(`Logged in as ${client.user.username}!`)

    try {
      await rest.put(Routes.applicationCommands(client.user.id), {
        body: client.SlashData,
      });
    } catch (err) {
      ERR(err);
    }
  },
};