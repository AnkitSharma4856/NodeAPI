const config = require('./config/config');
const mysql = require('mysql');
const { connect } = require('./routes');
const pool = mysql.createPool({
    connectionLimit: 10,
    host: config.database.host,
    user: config.database.username,
    password: config.database.password,
    port: 3306,
    database: config.database.database
});

module.exports = {
    connection: pool
}
