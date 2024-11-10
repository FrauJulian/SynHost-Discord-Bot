const RunSQL = require("./RunSQL");

function TableCheck() {
    VerifiedUsers();
    Tickets();
}

function VerifiedUsers() {
    let VerifiedTableSQL = `
        CREATE TABLE IF NOT EXISTS Verify (
            UserID varchar(255) NOT NULL,
            CustomerID varchar(255) NOT NULL,
            Contact varchar(255) NOT NULL,
            Status varchar(255) NOT NULL
        ) ENGINE = InnoDB;
    `;

    RunSQL(VerifiedTableSQL);
}


function Tickets() {
    let ticketTableSQL = `
        CREATE TABLE IF NOT EXISTS Tickets (
            TicketID varchar(255) NOT NULL,
            Category varchar(255) NOT NULL,
            UserID varchar(255) NOT NULL,
            ExtraUsersID varchar(255) NULL,
            ClaimerID varchar(255) NULL,
            CustomerID varchar(255) NULL,
            ProductID varchar(255) NULL
        ) ENGINE = InnoDB;
    `;

    RunSQL(ticketTableSQL);
}

module.exports = TableCheck;