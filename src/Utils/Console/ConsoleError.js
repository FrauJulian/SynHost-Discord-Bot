const moment = require("moment");

function ConsoleError(message) {
    console.error(`[${moment().format("DD-MM-YYYY HH:mm:ss:ms")}] ${message}`);
}

module.exports = ConsoleError;