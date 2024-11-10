const RunSQL = require("../../Core/RunSQL");

async function TicketData(interaction, TicketID) {
    let ticketDataSQL = `SELECT * FROM \`Tickets\` WHERE TicketID = '${TicketID}';`;
    return await RunSQL(ticketDataSQL, interaction);
}

module.exports = TicketData;