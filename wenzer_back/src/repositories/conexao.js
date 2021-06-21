const mysql = require('mysql');

const conexao = mysql.createConnection({
    host: 'wenzerdb.cbljsy0yxezl.us-east-1.rds.amazonaws.com',
    port: '3306',
    user: 'admin',
    password: 'Wenzer#2021!',
    database: 'wenzer'
});

const queryPromise = (sql) =>{
    return new Promise((resolve, reject)=>{
        conexao.query(sql,  (error, results)=>{
            if(error){
                return reject(error);
            }
            return resolve(results);
        });
    });
};

module.exports = { conexao, queryPromise };