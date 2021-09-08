const { v4: uuid } = require('uuid');
const { queryPromise } = require('./connection');
const Crud = require("./crud");

module.exports = class EmailMarketing extends Crud {

    id = '';
    email = '';
    created_at = '';

    constructor() {
        super("EmailMarketing");
        if (!this.id) {
            this.id = uuid();
        }
    }

    async get() {
        const sql = `SELECT * FROM EmailMarketing WHERE ${this.ConstruirWhere()} LIMIT 1`;

        try {
            const result = await queryPromise(sql);
    
            if (result.length > 0) {
                const userFound = result[0];
    
                this.id = userFound.id;
                this.created_at = userFound.created_at;
                this.email = userFound.email;
            } else {
                this.id = null;
            }
        } catch(err) {
            throw Error(err);
        }
    }

    buildWhereClause() {
        let where = "";

        if (this.id) {
            where += ` id = '${this.id}' `;
        }

        if (this.email) {
            where += where === "" ? "" : " AND ";
            where += ` email = '${this.email}' `;
        }

        return where;
    }

    validateData() {
        let isValid = true;

        if (!this.email) {
            isValid = false;
        } 

        if (!isValid) throw Error("Email não é válido."); 
    }

}