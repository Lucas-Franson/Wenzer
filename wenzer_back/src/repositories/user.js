const { queryPromise } = require('./connection');
const { v4: uuid } = require('uuid');
const Crud = require('./crud.js');

module.exports = class User extends Crud {

    id = '';
    name = '';
    email = '';
    emailValid = '';
    password = '';
    created_at = '';
    updated_at = '';

    constructor() {
        super("User");
        if (!this.id) {
            this.id = uuid();
        }
    }

    async get() {
        const sql = `SELECT * FROM User WHERE ${this.buildWhereClause()} LIMIT 1`;
        let result = await queryPromise(sql);

        if (result.length > 0) {
            const userFound = result[0];

            this.id = userFound.id;
            this.created_at = userFound.created_at;
            this.email = userFound.email;
            this.emailValid = userFound.emailValid;
            this.name = userFound.name;
            this.password = userFound.password;
            this.updated_at = userFound.updated_at;
        } else {
            this.id = null;
        }
    }

    buildWhereClause() {
        let where = "";

        if (this.id) {
            where += ` id = '${this.id}' `;
        }

        if (this.email) {
            where += where === "" ? "" : " AND ";
            where += ` email = '${this.email}' `
        }

        return where;
    }

    validateData() {
        let isValid = true;

        if (this.name == null) {
            isValid = false;
        }

        if (this.email == null) {
            isValid = false;
        }

        if (this.password == null) {
            isValid = false;
        }

        if (!isValid) throw Error("Usuário não está válido."); 
    }


}