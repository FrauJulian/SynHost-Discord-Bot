const RunSQL = require("../../Core/RunSQL");

async function TicketData(interaction, UserID) {
    let ticketDataSQL = `SELECT * FROM \`Verify\` WHERE UserID = '${UserID}';`;
    return await RunSQL(ticketDataSQL, interaction);
}

module.exports = TicketData;