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
const mongodb_1 = require("mongodb");
const uuid_1 = require("uuid");
const url = process.env.BASE_URL_DATABASE;
const database = process.env.BASE_NAME_DATABASE;
class Orm {
    getByWhereClause(whereClause) {
        return __awaiter(this, void 0, void 0, function* () {
            var _self = this;
            const tableName = this.constructor["name"].replace("Repository", "");
            return new Promise(function (resolve, reject) {
                mongodb_1.MongoClient.connect(url).then(function (db) {
                    var dbo = db.db(database);
                    dbo.collection(tableName).find(whereClause).toArray(function (err, results) {
                        const result = _self.handleArrayResult(results);
                        resolve(result);
                        db.close();
                    });
                });
            });
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _self = this;
            const tableName = this.constructor["name"].replace("Repository", "");
            return new Promise(function (resolve, reject) {
                mongodb_1.MongoClient.connect(url).then(function (db) {
                    var dbo = db.db(database);
                    dbo.collection(tableName).findOne({ _id: id }, {}).then(function (results) {
                        const result = _self.handleResult(results);
                        resolve(result);
                        db.close();
                    });
                });
            });
        });
    }
    insert(object) {
        return __awaiter(this, void 0, void 0, function* () {
            const tableName = this.constructor["name"].replace("Repository", "");
            mongodb_1.MongoClient.connect(url, function (err, db) {
                if (err)
                    throw err;
                var dbo = db === null || db === void 0 ? void 0 : db.db(database);
                object._id = (0, uuid_1.v4)();
                object.created_at = new Date();
                object.updated_at = new Date();
                dbo === null || dbo === void 0 ? void 0 : dbo.collection(tableName).insertOne(object, function (err, res) {
                    if (err)
                        throw err;
                    db === null || db === void 0 ? void 0 : db.close();
                });
            });
        });
    }
    update(object) {
        return __awaiter(this, void 0, void 0, function* () {
            const tableName = this.constructor["name"].replace("Repository", "");
            mongodb_1.MongoClient.connect(url, function (err, db) {
                if (err)
                    throw err;
                var dbo = db === null || db === void 0 ? void 0 : db.db(database);
                object.updated_at = new Date();
                dbo === null || dbo === void 0 ? void 0 : dbo.collection(tableName).updateOne({ _id: object._id }, { $set: object }, function (err, res) {
                    if (err)
                        throw err;
                    db === null || db === void 0 ? void 0 : db.close();
                });
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const tableName = this.constructor["name"].replace("Repository", "");
            mongodb_1.MongoClient.connect(url, function (err, db) {
                if (err)
                    throw err;
                var dbo = db === null || db === void 0 ? void 0 : db.db(database);
                dbo === null || dbo === void 0 ? void 0 : dbo.collection(tableName).deleteOne({ _id: id }, function (err, res) {
                    if (err)
                        throw err;
                    db === null || db === void 0 ? void 0 : db.close();
                });
            });
        });
    }
    handleArrayResult(result) {
        throw new Error("Method not implemented.");
    }
    handleResult(result) {
        throw new Error("Method not implemented.");
    }
}
exports.Orm = Orm;
//# sourceMappingURL=orm.js.map