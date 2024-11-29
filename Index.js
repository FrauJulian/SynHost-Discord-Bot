const {
  Client,
  Collection,
  GatewayIntentBits,
  Partials
} = require("discord.js")
const { GiveawaysManager } = require('discord-giveaways');

const ERR = require("./src/Utils/Console/Error");
const CheckTables = require("./src/Utils/Database/Core/TableCheck");

const MainConfiguration = require("./src/Configurations/Main.json")
const RegisterCommands = require("./src/Utils/Registries/CommandRegistry");
const RegisterEvents = require("./src/Utils/Registries/EventRegistry");

const client = new Client({
  intents: [
    GatewayIntentBits.AutoModerationConfiguration,
    GatewayIntentBits.AutoModerationExecution,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
  ],
  partials: [
    Partials.Channel,
    Partials.GuildMember,
    Partials.GuildScheduledEvent,
    Partials.Message,
    Partials.Reaction,
    Partials.ThreadMember,
    Partials.User,
  ],
  shards: "auto",
})

CheckTables();

const giveawayManager = new GiveawaysManager(client, {
  storage: "./src/Configurations/Data/Giveaways.json",
  default: {
    botsCanWin: false,
    embedColor: "Green",
    embedColorEnd: "Red",
    reaction: "🎉"
  }
});

client.giveawayManager = giveawayManager;

client.SlashCommands = new Collection();
client.SlashData = [];

RegisterCommands(client, "./src/SlashCommands");
RegisterEvents(client, "./src/Events");

process.on("unhandledRejection", (err) => {
  ERR(err);
});

process.on("uncaughtException", (err) => {
  ERR(err);
});

process.on("uncaughtExceptionMonitor", (err) => {
  ERR(err);
});

module.exports = client;
client.login(MainConfiguration.bot_token);
