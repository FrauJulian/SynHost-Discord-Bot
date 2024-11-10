const RunSQL = require("../../Core/RunSQL");

function UpdateTicket(interaction, column, value, TicketID) {
    let sql = `UPDATE \`Tickets\` SET ${column} = '${value}' WHERE TicketID = '${TicketID}';`;
    RunSQL(sql, interaction);
}

module.exports = UpdateTicket;