"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailMarketing = void 0;
const { v4: uuid } = require('uuid');
const { conexao, queryPromise } = require('./conexao');
const util = require('util');
class EmailMarketing {
    constructor() {
        this.id = '';
        this.email = '';
        this.emailValid = false;
        this.created_at = new Date();
        if (!this.id) {
            this.id = uuid();
        }
    }
    Adiciona() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `INSERT INTO EmailMarketing SET ?`;
            this.id = uuid();
            this.created_at = new Date();
            yield conexao.query(sql, this, (err) => {
                if (err)
                    console.error(err);
            });
        });
    }
    Buscar() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT * FROM EmailMarketing WHERE ${this.ConstruirWhere()} LIMIT 1`;
            try {
                const result = yield queryPromise(sql);
                if (result.length > 0) {
                    const userFound = result[0];
                    this.id = userFound.id;
                    this.created_at = userFound.created_at;
                    this.email = userFound.email;
                }
                else {
                    this.id = '';
                }
            }
            catch (err) {
                throw Error(err);
            }
        });
    }
    Update() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `UPDATE EmailMarketing
                     SET email = '${this.email}', emailValid = '${this.emailValid}'
                     WHERE ${this.ConstruirWhere()}`;
            conexao.query(sql, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        });
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
exports.EmailMarketing = EmailMarketing;
//# sourceMappingURL=emailMarketing.js.map