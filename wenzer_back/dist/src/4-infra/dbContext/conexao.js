"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = exports.queryPromise = void 0;
try {
    var mysql_npm = require('mysql');
}
catch (err) {
    console.log("Cannot find `mysql` module. Is it installed ? Try `npm install mysql` or `npm install`.");
}
const db_config = {
    host: 'wenzerdb.cbljsy0yxezl.us-east-1.rds.amazonaws.com',
    port: '3306',
    user: 'admin',
    password: 'Wenzer#2022!',
    database: 'wenzer'
};
let connection = mysql_npm.createPool(db_config);
exports.connection = connection;
connection.getConnection(function (err) {
    if (err) {
        console.log("\n\t *** Cannot establish a connection with the database. ***");
        exports.connection = connection = reconnect(connection);
    }
    else {
        console.log("\n\t *** New connection established with the database. ***");
    }
});
function reconnect(connection) {
    console.log("\n New connection tentative...");
    connection = mysql_npm.createPool(db_config);
    connection.getConnection(function (err) {
        if (err) {
            setTimeout(reconnect(connection), 2000);
        }
        else {
            console.log("\n\t *** New connection established with the database. ***");
            return connection;
        }
    });
}
connection.on('error', function (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
        console.log("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
        return reconnect(connection);
    }
    else if (err.code === "PROTOCOL_ENQUEUE_AFTER_QUIT") {
        console.log("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
        return reconnect(connection);
    }
    else if (err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR") {
        console.log("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
        return reconnect(connection);
    }
    else if (err.code === "PROTOCOL_ENQUEUE_HANDSHAKE_TWICE") {
        console.log("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
    }
    else {
        console.log("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
        return reconnect(connection);
    }
});
const queryPromise = (sql, object = null) => {
    return new Promise((resolve, reject) => {
        if (connection == null) {
            exports.connection = connection = reconnect(connection);
        }
        connection.query(sql, object, (error, results) => {
            if (error) {
                return reject(error);
            }
            return resolve(results);
        });
    });
};
exports.queryPromise = queryPromise;
//# sourceMappingURL=conexao.js.map