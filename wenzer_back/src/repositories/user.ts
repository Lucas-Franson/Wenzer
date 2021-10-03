import { conexao, queryPromise } from './conexao';
import { v4 as uuid } from 'uuid';
const util = require('util');

module.exports = class User {

    id = '';
    name = '';
    email = '';
    emailValid = '';
    password = '';
    created_at = '';
    updated_at = '';

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }

    async Adiciona() {
        if (!this.ValidarDados()) {
            return new Error("Usuário possui dados incorretos.");
        }

        const sql = `INSERT INTO User SET ?`;

        await conexao.query(sql, this, (err: any) => {
            if (err) console.error(err);
        });
    }

    

    async Buscar() {
        const sql = `SELECT * FROM User WHERE ${this.ConstruirWhere()} LIMIT 1`;
        let result:any = await queryPromise(sql);

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
            this.id = '';
        }
    }

    async Update() {
        if (!this.ValidarDados()) {
            return new Error("Usuário possui dados incorretos.");
        }

        const sql = `UPDATE User
                     SET email = '${this.email}', name = '${this.name}', password = '${this.password}', 
                     updated_at = '${this.updated_at}', emailValid = '${this.emailValid ? 1 : 0}'
                     WHERE ${this.ConstruirWhere()}`;
        
        conexao.query(sql, (err: any) => {
            if (err) {
                console.error(err);
            }
        })
    }

    ConstruirWhere() {
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

    ValidarDados() {
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

        return isValid;
    }

}