import { IOrm } from "../irepositories/Iorm";
import DomainBase from "../../3-domain/entities/domainBase";
import { MongoClient } from "mongodb";
import { v4 as uuid } from 'uuid';

const url: string = process.env.BASE_URL_DATABASE!;
const database = "WenzerDB";

export class Orm<T extends DomainBase> implements IOrm<T> {
    async getByWhereClause(whereClause: any): Promise<T[]> {
        var _self = this;
        const tableName = this.constructor["name"].replace("Repository", "");
        return new Promise(function(resolve, reject){ 
            MongoClient.connect(url).then(function(db){
                var dbo = db.db(database);
                dbo.collection(tableName).find(whereClause).toArray(function(err: any, results: any) {
                    const result = _self.handleArrayResult(results);
                    resolve(result!);
                    db.close();
                });
            });
        });
    }
    async getById(id: string): Promise<T | null> {
        var _self = this;
        const tableName = this.constructor["name"].replace("Repository", "");
        return new Promise(function(resolve, reject){ 
            MongoClient.connect(url).then(function(db){
                var dbo = db.db(database);
                dbo.collection(tableName).findOne({ _id: id }, {}).then(function(results: any) {
                    const result = _self.handleResult(results);
                    resolve(result);
                    db.close();
                });
            });
        });
    }
    async insert(object: any): Promise<void> {
        const tableName = this.constructor["name"].replace("Repository", "");
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db?.db(database);
            object._id = uuid();
            object.created_at = new Date();
            object.updated_at = new Date();
            dbo?.collection(tableName).insertOne(object, function(err, res) {
                if (err) throw err;
                db?.close();
            });
        });
    }
    async update(object: T): Promise<void> {
        const tableName = this.constructor["name"].replace("Repository", "");
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db?.db(database);
            object.updated_at = new Date();
            dbo?.collection(tableName).updateOne({ _id: object._id }, { $set: object }, function(err, res) {
                if (err) throw err;
                db?.close();
            });
        });
    }
    async delete(id: string): Promise<void> {
        const tableName = this.constructor["name"].replace("Repository", "");
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db?.db(database);
            dbo?.collection(tableName).deleteOne({ _id: id }, function(err, res) {
                if (err) throw err;
                db?.close();
            });
        });
    }
    handleArrayResult(result: T[]): T[] {
        throw new Error("Method not implemented.");
    }
    handleResult(result: T): T | null {
        throw new Error("Method not implemented.");
    }
}