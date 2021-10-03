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
const conexao_1 = require("./conexao");
const uuid_1 = require("uuid");
const util = require('util');
module.exports = class User {
    constructor() {
        this.id = '';
        this.name = '';
        this.email = '';
        this.emailValid = '';
        this.password = '';
        this.created_at = '';
        this.updated_at = '';
        if (!this.id) {
            this.id = (0, uuid_1.v4)();
        }
    }
    Adiciona() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.ValidarDados()) {
                return new Error("Usuário possui dados incorretos.");
            }
            const sql = `INSERT INTO User SET ?`;
            yield conexao_1.conexao.query(sql, this, (err) => {
                if (err)
                    console.error(err);
            });
        });
    }
    Buscar() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT * FROM User WHERE ${this.ConstruirWhere()} LIMIT 1`;
            let result = yield (0, conexao_1.queryPromise)(sql);
            if (result.length > 0) {
                const userFound = result[0];
                this.id = userFound.id;
                this.created_at = userFound.created_at;
                this.email = userFound.email;
                this.emailValid = userFound.emailValid;
                this.name = userFound.name;
                this.password = userFound.password;
                this.updated_at = userFound.updated_at;
            }
            else {
                this.id = '';
            }
        });
    }
    Update() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.ValidarDados()) {
                return new Error("Usuário possui dados incorretos.");
            }
            const sql = `UPDATE User
                     SET email = '${this.email}', name = '${this.name}', password = '${this.password}', 
                     updated_at = '${this.updated_at}', emailValid = '${this.emailValid ? 1 : 0}'
                     WHERE ${this.ConstruirWhere()}`;
            conexao_1.conexao.query(sql, (err) => {
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
};
//# sourceMappingURL=user.js.map