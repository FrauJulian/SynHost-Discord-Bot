const moment = require("moment");

function ConsoleLog(message) {
    console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss:ms")}] ${message}`);
}

module.exports = ConsoleLog;