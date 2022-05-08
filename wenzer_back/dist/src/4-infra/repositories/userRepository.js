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
const user_1 = require("../../3-domain/entities/user");
const uuid_1 = require("uuid");
const mongodb_1 = require("mongodb");
const orm_1 = require("./orm");
const url = process.env.BASE_URL_DATABASE;
const collection = "User";
const database = process.env.BASE_NAME_DATABASE;
class UserRepository extends orm_1.Orm {
    setPostAsGoodIdea(postGoodIdea) {
        return __awaiter(this, void 0, void 0, function* () {
            mongodb_1.MongoClient.connect(url, function (err, db) {
                if (err)
                    throw err;
                var dbo = db === null || db === void 0 ? void 0 : db.db(database);
                postGoodIdea._id = (0, uuid_1.v4)();
                postGoodIdea.created_at = new Date();
                postGoodIdea.updated_at = new Date();
                dbo === null || dbo === void 0 ? void 0 : dbo.collection("UserPostGoodIdea").insertOne(postGoodIdea, function (err, res) {
                    if (err)
                        throw err;
                    db === null || db === void 0 ? void 0 : db.close();
                });
            });
        });
    }
    removePostAsGoodIdea(idUser, idPost) {
        return __awaiter(this, void 0, void 0, function* () {
            mongodb_1.MongoClient.connect(url, function (err, db) {
                if (err)
                    throw err;
                var dbo = db === null || db === void 0 ? void 0 : db.db(database);
                dbo === null || dbo === void 0 ? void 0 : dbo.collection("UserPostGoodIdea").deleteOne({ idUser, idPost }, function (err, res) {
                    if (err)
                        throw err;
                    db === null || db === void 0 ? void 0 : db.close();
                });
            });
        });
    }
    getAllUsersByArrOfIds(idUserArr) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                mongodb_1.MongoClient.connect(url).then(function (db) {
                    var dbo = db.db(database);
                    dbo.collection(collection).find({ _id: { $in: idUserArr } }).toArray(function (err, results) {
                        resolve(results);
                        db.close();
                    });
                });
            });
        });
    }
    getFriendRequest(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                mongodb_1.MongoClient.connect(url).then(function (db) {
                    var dbo = db.db(database);
                    dbo.collection("Connection").aggregate([
                        {
                            $lookup: {
                                from: 'User',
                                localField: 'idFollower',
                                foreignField: '_id',
                                as: 'user'
                            }
                        },
                        {
                            $unwind: "$user"
                        },
                        {
                            $match: {
                                idUser: userId,
                                accepted: false
                            }
                        },
                        {
                            $project: {
                                _id: "$user._id",
                                name: "$user.name",
                                created_at: 1
                            }
                        }
                    ]).toArray(function (err, results) {
                        resolve(results);
                        db.close();
                    });
                });
            });
        });
    }
    getNotificationSeen(userId, type) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                mongodb_1.MongoClient.connect(url).then(function (db) {
                    var dbo = db.db(database);
                    dbo.collection("UserNotificationSeen").aggregate([
                        {
                            $match: {
                                idUser: userId,
                                type: type
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                idNotification: 1
                            }
                        }
                    ]).toArray(function (err, results) {
                        resolve(results);
                        db.close();
                    });
                });
            });
        });
    }
    insertUser(object) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                mongodb_1.MongoClient.connect(url, function (err, db) {
                    if (err)
                        throw err;
                    var dbo = db === null || db === void 0 ? void 0 : db.db(database);
                    object._id = (0, uuid_1.v4)();
                    object.created_at = new Date();
                    object.updated_at = new Date();
                    dbo === null || dbo === void 0 ? void 0 : dbo.collection("User").insertOne(object, function (err, res) {
                        if (err)
                            throw err;
                        resolve(object._id);
                        db === null || db === void 0 ? void 0 : db.close();
                    });
                });
            });
        });
    }
    updateConnection(connection) {
        mongodb_1.MongoClient.connect(url, function (err, db) {
            if (err)
                throw err;
            var dbo = db === null || db === void 0 ? void 0 : db.db(database);
            connection.updated_at = new Date();
            dbo === null || dbo === void 0 ? void 0 : dbo.collection("Connection").updateOne({ _id: connection._id }, { $set: connection }, function (err, res) {
                if (err)
                    throw err;
                db === null || db === void 0 ? void 0 : db.close();
            });
        });
    }
    setNotificationSeen(userId, type, idNotification) {
        mongodb_1.MongoClient.connect(url, function (err, db) {
            if (err)
                throw err;
            var dbo = db === null || db === void 0 ? void 0 : db.db(database);
            let data = { _id: (0, uuid_1.v4)(), idUser: userId, type, idNotification };
            dbo === null || dbo === void 0 ? void 0 : dbo.collection("UserNotificationSeen").insertOne(data, function (err, res) {
                if (err)
                    throw err;
                db === null || db === void 0 ? void 0 : db.close();
            });
        });
    }
    search(userId, search) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                mongodb_1.MongoClient.connect(url, function (err, db) {
                    if (err)
                        throw err;
                    var dbo = db === null || db === void 0 ? void 0 : db.db(database);
                    dbo === null || dbo === void 0 ? void 0 : dbo.collection(collection).find({
                        $or: [
                            {
                                name: new RegExp(["(", search.split(" ").join("|"), ")"].join(""), "i")
                            },
                            {
                                lastName: new RegExp(["(", search.split(" ").join("|"), ")"].join(""), "i")
                            }
                        ],
                        _id: { $ne: userId }
                    }).project({ _id: 1, name: 1, lastName: 1, bio: 1, photo: 1 }).toArray(function (err, results) {
                        resolve(results);
                        db === null || db === void 0 ? void 0 : db.close();
                    });
                });
            });
        });
    }
    // WEB SERVICE
    getByIdWebService(userId, dbo) {
        var _self = this;
        return new Promise(function (resolve, reject) {
            dbo.collection(collection).findOne({ _id: userId }, {}).then(function (results) {
                const result = _self.handleResult(results);
                resolve(result);
            });
        });
    }
    getFriendRequestWebService(dbo, idUser, idNotifications) {
        return new Promise(function (resolve, reject) {
            dbo.collection("Connection").aggregate([
                {
                    $match: {
                        _id: {
                            $nin: idNotifications
                        },
                        accepted: false,
                        idUser: idUser
                    }
                },
                {
                    $count: "count"
                }
            ]).toArray(function (err, results) {
                if (results && results.length > 0)
                    resolve(results[0].count);
                else
                    resolve(0);
            });
        });
    }
    getNotificationSeenWebSocket(dbo, userId, type) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                dbo.collection("UserNotificationSeen").aggregate([
                    {
                        $match: {
                            idUser: userId,
                            type: type
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            idNotification: 1
                        }
                    }
                ]).toArray(function (err, results) {
                    resolve(results);
                });
            });
        });
    }
    // HANDLE METHODS
    handleArrayResult(result) {
        if (result && result instanceof Array && result.length > 0) {
            let users = [];
            result.forEach((value) => {
                let user = new user_1.User(value.name, value.lastName, value.email, value.password, value.university, value.title, value.photo, value.bio, value.hasCompany, value.emailValid, value._id, value.created_at, value.updated_at);
                users.push(user);
            });
            return users;
        }
        else {
            return [];
        }
    }
    handleResult(results) {
        if (results && !(results instanceof Array)) {
            return new user_1.User(results.name, results.lastName, results.email, results.password, results.university, results.title, results.photo, results.bio, results.hasCompany, results.emailValid, results._id, results.created_at, results.updated_at);
        }
        else {
            return null;
        }
    }
}
exports.default = UserRepository;
//# sourceMappingURL=userRepository.js.map