import { IOrm } from "./iorm";
import { conexao, queryPromise } from '../conexao';

export class Orm<T extends { ID: string, validateObject: Function }> implements IOrm<T> {
    async get(whereClause: string): Promise<T[]> {
        const tableName = this.constructor["name"];
        const sql = `SELECT * FROM ${tableName} ${whereClause}`;
        let result: any = await queryPromise(sql);
        return result;
    }
    async getById(id: string): Promise<T> {
        const tableName = this.constructor["name"];
        const sql = `SELECT * FROM ${tableName} WHERE ID = '${id}' LIMIT 1`;
        let result: any = await queryPromise(sql);
        return result.length > 0 ? result[0] : null;
    }
    async insert(object: T): Promise<void> {
        const tableName = object.constructor["name"];
        if (!object.validateObject()) throw new Error(`${this._capitalizeFirstLetter(tableName)} possui dados incorretos.`);
        const sql = `INSERT INTO ${tableName} SET ?`;
        await conexao.query(sql, object, (err: any) => {
            if (err) throw new Error(err);
        });
    }
    async update(object: T): Promise<void> {
        const tableName = object.constructor["name"];
        if (!object.validateObject()) throw new Error(`${this._capitalizeFirstLetter(tableName)} possui dados incorretos.`);
        const sql = `UPDATE ${tableName}
                     SET ${this._createSetOfData(object)}
                     WHERE ID = ${object.ID}`;
        conexao.query(sql, (err: any) => {
            if (err) throw new Error(err);
        });
    }
    private _capitalizeFirstLetter(word: string): string {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
    private _createSetOfData(object: any): string {
        const arrPropertiesName = Object.getOwnPropertyNames(object);
        const arrNamesToIgnore = ['ID', 'Created_at'];
        let setClause = '';
        for (let name of arrPropertiesName.filter((el) => !arrNamesToIgnore.includes(el))) {
            if (!name) continue;
            setClause += setClause !== '' ? ', ' : '';
            const propertieValue = object[name];
            setClause += `${name} = ${this._formatPropertyValueToSQL(propertieValue)}`;
        }
        return setClause;
    }
    private _formatPropertyValueToSQL(property: any): string {
        if(typeof property === 'boolean') {
            return property ? '1' : '0';
        } else {
            return `'${property}'`;
        }
    }
    async delete(object: T): Promise<void> {
        const tableName = object.constructor["name"];
        const sql = `DELETE FROM ${tableName} WHERE ID = ${object.ID}`;
        conexao.query(sql, (err: any) => {
            if (err) throw new Error(err);
        });
    }
}