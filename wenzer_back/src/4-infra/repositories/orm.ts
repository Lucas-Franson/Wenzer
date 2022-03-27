import { IOrm } from "../irepositories/Iorm";
import { queryPromise, connection } from '../dbContext/conexao';
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
        const fixedObj = object.toSql();
        fixedObj.updated_at = new Date();
        fixedObj.created_at = new Date();
        await queryPromise(sql, fixedObj);
    }
    async update(object: T): Promise<void> {
        const tableName = this.constructor["name"].replace("Repository", "");
        if (!object.validateObject()) throw new Error(`${this._capitalizeFirstLetter(tableName)} possui dados incorretos.`);
        const sql = `UPDATE ${tableName}
                     SET ?
                     WHERE ID = '${object.getId()}'`;
        const fixedObj = this._createSetOfData(object);
        fixedObj.updated_at = new Date();
        await queryPromise(sql, fixedObj);
    }
    private _capitalizeFirstLetter(word: string): string {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
    private _createSetOfData(object: any): any {
        const arrPropertiesName = Object.getOwnPropertyNames(object);
        const arrNamesToIgnore = ['id', 'created_at'];
        let newObj: any = {};
        for (let name of arrPropertiesName.filter((el) =>  
                                                    el != "" && 
                                                    el.charAt(0) === "_" &&
                                                    !arrNamesToIgnore.includes(el))) {
            if (!name) continue;
            const propertieValue = object[name];
            newObj[name.replace('_', '')] = propertieValue;
        }
        return newObj;
    }
    async delete(id: string): Promise<void> {
        const tableName = this.constructor["name"].replace("Repository", "");
        const sql = `DELETE FROM ${tableName} WHERE ID = ${id.toSql()}`;
        await queryPromise(sql);
    }
}