"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryPromise = exports.conexao = void 0;
const mysql = require('mysql');
const conexao = mysql.createConnection({
    host: 'wenzerdb.cbljsy0yxezl.us-east-1.rds.amazonaws.com',
    port: '3306',
    user: 'admin',
    password: 'Wenzer#2021!',
    database: 'wenzer'
});
exports.conexao = conexao;
const queryPromise = (sql) => {
    return new Promise((resolve, reject) => {
        conexao.query(sql, (error, results) => {
            if (error) {
                return reject(error);
            }
            return resolve(results);
        });
    });
};
exports.queryPromise = queryPromise;
//# sourceMappingURL=conexao.js.map