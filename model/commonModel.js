const db = require('../database');
module.exports = {
    getAllList: function (table, condition) {
        return new Promise((resolve) => {
            db.connection.getConnection(function (err, connection) {
                if (err) {
                    return resolve([err, null]);
                }
                connection.query("select * from " + table + " where " + Object.keys(condition).join('= ? and ') + "= ? order by id desc", Object.values(condition), function (err, response) {
                    connection.release();
                    console.log("pssssssssssssssss",this.sql)
                    resolve([err, response]);
                });

            });
        })
    },
    getRow: function (table, condition) {
        return new Promise((resolve) => {
            db.connection.getConnection(function (err, connection) {
                if (err) {
                    return resolve([err, null]);
                }
                connection.query("select * from " + table + " where " + Object.keys(condition).join('=? and ') + "=? order by id desc", Object.values(condition), function (err, response) {
                    connection.release();
                    console.log(this.sql)
                    if (err) {
                        return resolve([err, null]);
                    }
                    resolve([err, response[0]]);
                });

            });
            
        })
    },
    insert: function (query, values) {
        return new Promise((resolve) => {
            db.connection.getConnection(function (err, connection) {
                if (err) { throw err; }
                connection.beginTransaction(function (err) {
                    if (err) { throw err; }
                    /* Begin transaction */
                    connection.query(query, values, function (err, response) {
                        if (err) { connection.rollback(() => { throw err }) }
                        connection.commit(function (err) {
                            if (err) { connection.rollback(() => { throw err; }); }
                            resolve([err, response]);
                            connection.release();
                        });
                    });
                    /* End transaction */
                });

            });
        })
    },
}