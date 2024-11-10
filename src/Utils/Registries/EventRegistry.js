const { readdirSync, statSync } = require("node:fs");
const { join } = require("path");

function RegisterEvents(client, directory) {
    readdirSync(directory).forEach(async (file) => {
        let fileObject = statSync(join(directory, file));

        if (fileObject.isDirectory()) {
            RegisterEvents(client, directory + "/" + file);
        } else {
            let event = await require("../../../" + directory + "/" + file);
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args));
            } else {
                client.on(event.name, (...args) => event.execute(...args));
            }
        }

        client.setMaxListeners(20)
    });
}

module.exports = RegisterEvents;