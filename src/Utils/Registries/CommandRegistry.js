const { readdirSync, statSync } = require("node:fs");
const { join } = require("path");

function RegisterCommands(client, directory) {
    readdirSync(directory).forEach(async (file) => {
        let fileObject = statSync(join(directory, file));

        if (fileObject.isDirectory()) {
            RegisterCommands(client, directory + "/" + file);
        } else {
            let command = await require("../../../" + directory + "/" + file);
            client.SlashData.push(command.data.toJSON());
            client.SlashCommands.set(command.data.name, command);
        }
    });
}

module.exports = RegisterCommands;