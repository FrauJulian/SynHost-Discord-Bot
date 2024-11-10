const RunSQL = require("../../Core/RunSQL");

function UpdateTicket(interaction, column, value, UserID) {
    let sql = `UPDATE \`Verify\` SET ${column} = '${value}' WHERE UserID = '${UserID}';`;
    RunSQL(sql, interaction);
}

module.exports = UpdateTicket;