const { v4: uuid } = require('uuid');
const { conexao, queryPromise } = require('./conexao');
const util = require('util');

module.exports = class EmailMarketing {

    id = '';
    email = '';
    created_at = '';

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }

    async Adiciona() {
        const sql = `INSERT INTO EmailMarketing SET ?`;

        this.id = uuid();
        this.created_at = new Date();

        await conexao.query(sql, this, (err) => {
            if (err) console.error(err);
        });
    }

    async Buscar() {
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

    ConstruirWhere() {
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

}