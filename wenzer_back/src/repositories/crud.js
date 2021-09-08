const MethodNotImplementedYet = require('../errors/methodNotImplementedYet');
const { v4: uuid } = require('uuid');
const { connection } = require('./connection');

module.exports = class Crud {
    
    constructor(tableName = "") {
        this.tableName = tableName;
    }

    validateData() {
        throw MethodNotImplementedYet("Método não implementado.");
    }

    buildWhereClause() {
        throw MethodNotImplementedYet("Método não implementado.");
    }

    async add(object) {
        this.validateData();

        const sql = `INSERT INTO ${this.tableName} SET ?`;

        if (!object) throw Error("Objeto para adicionar não pode ser vazio."); 
        
        object.id = uuid();
        object.created_at = new Date();

        await connection.query(sql, object, (err) => {
            if (err) console.error(err);
        });
    }

    async update(object) {
        this.validateData();

        const sql = `UPDATE ${this.tableName}
                     SET ?
                     WHERE ${this.buildWhereClause()}`;

        if (!object) throw Error("Objeto para atualizar não pode ser vazio.");
        
        connection.query(sql, object, (err) => {
            if (err) {
                console.error(err);
            }
        })
    }

}