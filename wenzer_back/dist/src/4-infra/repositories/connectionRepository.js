"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionRepository = void 0;
const conections_1 = require("../../3-domain/entities/conections");
const orm_1 = require("./orm");
const mongodb_1 = require("mongodb");
const url = process.env.BASE_URL_DATABASE;
const collection = "Connection";
const database = process.env.BASE_NAME_DATABASE;
class ConnectionRepository extends orm_1.Orm {
    getConnectionOfUser(idUser) {
        return new Promise(function (resolve, reject) {
            mongodb_1.MongoClient.connect(url).then(function (db) {
                var dbo = db.db(database);
                dbo.collection('Connection').aggregate([
                    {
                        $lookup: {
                            from: 'User',
                            localField: 'idUser',
                            foreignField: '_id',
                            as: 'userOne'
                        }
                    },
                    {
                        $unwind: "$userOne"
                    },
                    {
                        $lookup: {
                            from: 'User',
                            localField: 'idFollower',
                            foreignField: '_id',
                            as: 'userTwo'
                        }
                    },
                    {
                        $unwind: "$userTwo"
                    },
                    {
                        $match: {
                            $or: [
                                {
                                    idFollower: idUser
                                },
                                {
                                    idUser
                                }
                            ]
                        }
                    },
                    {
                        $project: {
                            _id: {
                                $cond: {
                                    if: { $eq: [idUser, "$userOne._id"] },
                                    then: "$userTwo._id",
                                    else: "$userOne._id"
                                }
                            },
                            name: {
                                $cond: {
                                    if: { $eq: [idUser, "$userOne._id"] },
                                    then: "$userTwo.name",
                                    else: "$userOne.name"
                                }
                            },
                            photo: {
                                $cond: {
                                    if: { $eq: [idUser, "$userOne._id"] },
                                    then: "$userTwo.photo",
                                    else: "$userOne.photo"
                                }
                            },
                        }
                    }
                ])
                    .sort({ created_at: 1 })
                    .limit(3).toArray(function (err, results) {
                    resolve(results);
                    db.close();
                });
            });
        });
    }
    alreadyConnected(idUserServer, idUser) {
        return new Promise(function (resolve, reject) {
            mongodb_1.MongoClient.connect(url).then(function (db) {
                var dbo = db.db(database);
                dbo.collection('Connection').find({
                    $and: [
                        { $or: [
                                { idUser: idUser },
                                { idFollower: idUser }
                            ] },
                        { $or: [
                                { idUser: idUserServer },
                                { idFollower: idUserServer }
                            ]
                        }
                    ]
                }).toArray(function (err, results) {
                    if (results && results.length > 0) {
                        resolve(true);
                    }
                    else {
                        resolve(false);
                    }
                    db.close();
                });
            });
        });
    }
    handleArrayResult(result) {
        if (result && result instanceof Array && result.length > 0) {
            let connections = [];
            result.forEach((value) => {
                let connection = new conections_1.Connections(value.idUser, value.idFollower, value.accepted, value._id, value.created_at, value.updated_at);
                connections.push(connection);
            });
            return connections;
        }
        else {
            return [];
        }
    }
    handleResult(results) {
        if (results && !(results instanceof Array)) {
            return new conections_1.Connections(results.idUser, results.idFollower, results.accepted, results._id, results.created_at, results.updated_at);
        }
        else {
            return null;
        }
    }
}
exports.ConnectionRepository = ConnectionRepository;
//# sourceMappingURL=connectionRepository.js.map