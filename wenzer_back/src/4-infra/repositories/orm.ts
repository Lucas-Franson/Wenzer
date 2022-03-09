import { IOrm } from "../irepositories/Iorm";
import { conexao, queryPromise } from '../dbContext/conexao';
import DomainBase from "../../3-domain/entities/domainBase";

export class Orm<T extends DomainBase> implements IOrm<T> {
    async get(whereClause: string): Promise<T | null> {
        const tableName = this.constructor["name"].replace("Repository", "");
        const sql = `SELECT * FROM ${tableName} ${whereClause}`;
        let result: any = await queryPromise(sql);
        return result[0];
    }
    async getAll(whereClause: string): Promise<T[]> {
        const tableName = this.constructor["name"].replace("Repository", "");
        const sql = `SELECT * FROM ${tableName} ${whereClause}`;
        let result: any = await queryPromise(sql);
        return result;
    }
    async getById(id: string): Promise<T | null> {
        const tableName = this.constructor["name"].replace("Repository", "");
        const sql = `SELECT * FROM ${tableName} WHERE ID = '${id}' LIMIT 1`;
        let result: any = await queryPromise(sql);
        return result.length > 0 ? result[0] : null;
    }
    async insert(object: T): Promise<void> {
        const tableName = this.constructor["name"].replace("Repository", "");
        if (!object.validateObject()) throw new Error(`${this._capitalizeFirstLetter(tableName)} possui dados incorretos.`);
        const sql = `INSERT INTO ${tableName} SET ?`;
        await conexao.query(sql, object, (err: any) => {
            if (err) throw new Error(err);
        });
    }
    async update(object: T): Promise<void> {
        const tableName = this.constructor["name"].replace("Repository", "");
        if (!object.validateObject()) throw new Error(`${this._capitalizeFirstLetter(tableName)} possui dados incorretos.`);
        const sql = `UPDATE ${tableName}
                     SET ${this._createSetOfData(object)}
                     WHERE ID = "${object.getId()}"`;
        conexao.query(sql, (err: any) => {
            if (err) throw new Error(err);
        });
    }
    private _capitalizeFirstLetter(word: string): string {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
    private _createSetOfData(object: any): string {
        const arrPropertiesName = Object.getOwnPropertyNames(object);
        const arrNamesToIgnore = ['id', 'created_at'];
        let setClause = '';
        for (let name of arrPropertiesName.filter((el) =>  
                                                    el != "" && 
                                                    el.charAt(0) === "_" &&
                                                    !arrNamesToIgnore.includes(el))) {
            if (!name) continue;
            setClause += setClause !== '' ? ', ' : '';
            const propertieValue = object[name];
            setClause += `${name.replace('_', '')} = ${this._formatPropertyValueToSQL(propertieValue)}`;
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
        const tableName = this.constructor["name"].replace("Repository", "");
        const sql = `DELETE FROM ${tableName} WHERE ID = ${object.getId()}`;
        conexao.query(sql, (err: any) => {
            if (err) throw new Error(err);
        });
    }
}