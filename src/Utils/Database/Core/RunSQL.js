const ERR = require("../../Console/Error");
const mysql = require("mysql2");

const MainConfiguration = require("../../../Configurations/Main.json")

const DatabaseConnection = mysql.createConnection({
    host: MainConfiguration.database_data.host,
    port: MainConfiguration.database_data.port,
    user: MainConfiguration.database_data.user,
    password: MainConfiguration.database_data.password,
    database: MainConfiguration.database_data.database,

    waitForConnections: false,
    enableKeepAlive: true,
    connectionLimit: 10,
    queueLimit: 0
})

async function RunSQL(commandString, interaction = null) {
    return new Promise(async (resolve, reject) => {

        DatabaseConnection.query(commandString, async function (err, results, fields) {
            if (
                err &&
                interaction != null
            ) {
                ERR(err, interaction);
                reject(err);
                return;
            } else if (
                err &&
                interaction == null
            ) {
                ERR(err);
                reject(err);
                return;
            }

            resolve(results);
        });

        DatabaseConnection.on("error", (err) => {
            if (
                err &&
                interaction != null
            ) {
                ERR(err, interaction);
                reject(err);
            } else if (
                err &&
                interaction == null
            ) {
                ERR(err);
                reject(err);
            }
        })
    })
}

module.exports = RunSQL;