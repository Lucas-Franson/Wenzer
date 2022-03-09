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
exports.Orm = void 0;
const conexao_1 = require("../dbContext/conexao");
class Orm {
    get(whereClause) {
        return __awaiter(this, void 0, void 0, function* () {
            const tableName = this.constructor["name"].replace("Repository", "");
            const sql = `SELECT * FROM ${tableName} ${whereClause}`;
            let result = yield (0, conexao_1.queryPromise)(sql);
            return result[0];
        });
    }
    getAll(whereClause) {
        return __awaiter(this, void 0, void 0, function* () {
            const tableName = this.constructor["name"].replace("Repository", "");
            const sql = `SELECT * FROM ${tableName} ${whereClause}`;
            let result = yield (0, conexao_1.queryPromise)(sql);
            return result;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const tableName = this.constructor["name"].replace("Repository", "");
            const sql = `SELECT * FROM ${tableName} WHERE ID = '${id}' LIMIT 1`;
            let result = yield (0, conexao_1.queryPromise)(sql);
            return result.length > 0 ? result[0] : null;
        });
    }
    insert(object) {
        return __awaiter(this, void 0, void 0, function* () {
            const tableName = this.constructor["name"].replace("Repository", "");
            if (!object.validateObject())
                throw new Error(`${this._capitalizeFirstLetter(tableName)} possui dados incorretos.`);
            const sql = `INSERT INTO ${tableName} SET ?`;
            yield conexao_1.conexao.query(sql, object, (err) => {
                if (err)
                    throw new Error(err);
            });
        });
    }
    update(object) {
        return __awaiter(this, void 0, void 0, function* () {
            const tableName = this.constructor["name"].replace("Repository", "");
            if (!object.validateObject())
                throw new Error(`${this._capitalizeFirstLetter(tableName)} possui dados incorretos.`);
            const sql = `UPDATE ${tableName}
                     SET ${this._createSetOfData(object)}
                     WHERE ID = "${object.getId()}"`;
            conexao_1.conexao.query(sql, (err) => {
                if (err)
                    throw new Error(err);
            });
        });
    }
    _capitalizeFirstLetter(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
    _createSetOfData(object) {
        const arrPropertiesName = Object.getOwnPropertyNames(object);
        const arrNamesToIgnore = ['id', 'created_at'];
        let setClause = '';
        for (let name of arrPropertiesName.filter((el) => el != "" &&
            el.charAt(0) === "_" &&
            !arrNamesToIgnore.includes(el))) {
            if (!name)
                continue;
            setClause += setClause !== '' ? ', ' : '';
            const propertieValue = object[name];
            setClause += `${name.replace('_', '')} = ${this._formatPropertyValueToSQL(propertieValue)}`;
        }
        return setClause;
    }
    _formatPropertyValueToSQL(property) {
        if (typeof property === 'boolean') {
            return property ? '1' : '0';
        }
        else {
            return `'${property}'`;
        }
    }
    delete(object) {
        return __awaiter(this, void 0, void 0, function* () {
            const tableName = this.constructor["name"].replace("Repository", "");
            const sql = `DELETE FROM ${tableName} WHERE ID = ${object.getId()}`;
            conexao_1.conexao.query(sql, (err) => {
                if (err)
                    throw new Error(err);
            });
        });
    }
}
exports.Orm = Orm;
//# sourceMappingURL=orm.js.map