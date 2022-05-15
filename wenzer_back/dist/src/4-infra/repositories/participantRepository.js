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
exports.ParticipantRepository = void 0;
const mongodb_1 = require("mongodb");
const participant_1 = require("../../3-domain/entities/participant");
const orm_1 = require("./orm");
const url = process.env.BASE_URL_DATABASE;
const collection = "Participant";
const database = process.env.BASE_NAME_DATABASE;
class ParticipantRepository extends orm_1.Orm {
    getParticipants(_id) {
        return new Promise(function (resolve, reject) {
            mongodb_1.MongoClient.connect(url).then(function (db) {
                var dbo = db.db(database);
                dbo.collection(collection).aggregate([
                    {
                        $lookup: {
                            from: 'User',
                            localField: 'idUser',
                            foreignField: '_id',
                            as: 'user',
                        }
                    },
                    {
                        $unwind: "$user"
                    },
                    {
                        $match: {
                            idProject: _id
                        }
                    },
                    {
                        $project: {
                            _id: "$idUser",
                            name: { $concat: ["$user.name", " ", "$user.lastName"] },
                            photo: "$user.photo",
                            accepted: 1,
                            role: 1,
                            created_at: 1
                        }
                    }
                ]).sort({ created_at: 1 }).toArray(function (err, results) {
                    if (results)
                        resolve(results);
                    else
                        resolve([]);
                    db.close();
                });
            });
        });
    }
    getByProjectAndUser(idProject, idUserRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            var _self = this;
            return new Promise(function (resolve, reject) {
                mongodb_1.MongoClient.connect(url).then(function (db) {
                    var dbo = db.db(database);
                    dbo.collection(collection).findOne({ idProject, idUser: idUserRequest }, function (err, results) {
                        let interestUser = _self.handleResult(results);
                        resolve(interestUser);
                        db.close();
                    });
                });
            });
        });
    }
    updateParticipant(participantRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            mongodb_1.MongoClient.connect(url, function (err, db) {
                if (err)
                    throw err;
                var dbo = db === null || db === void 0 ? void 0 : db.db(database);
                dbo === null || dbo === void 0 ? void 0 : dbo.collection(collection).updateOne({ idProject: participantRequest.idProject, idUser: participantRequest.idUser }, { $set: participantRequest }, function (err, res) {
                    if (err)
                        throw err;
                    db === null || db === void 0 ? void 0 : db.close();
                });
            });
        });
    }
    removeParticipant(participantRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            mongodb_1.MongoClient.connect(url, function (err, db) {
                if (err)
                    throw err;
                var dbo = db === null || db === void 0 ? void 0 : db.db(database);
                dbo === null || dbo === void 0 ? void 0 : dbo.collection(collection).deleteOne({ idProject: participantRequest.idProject, idUser: participantRequest.idUser }, function (err, results) {
                    db === null || db === void 0 ? void 0 : db.close();
                });
            });
        });
    }
    requestParticipant(participant) {
        return __awaiter(this, void 0, void 0, function* () {
            mongodb_1.MongoClient.connect(url, function (err, db) {
                if (err)
                    throw err;
                var dbo = db === null || db === void 0 ? void 0 : db.db(database);
                dbo === null || dbo === void 0 ? void 0 : dbo.collection(collection).insertOne(participant, function (err, results) {
                    db === null || db === void 0 ? void 0 : db.close();
                });
            });
        });
    }
    handleArrayResult(result) {
        if (result && result instanceof Array && result.length > 0) {
            let participants = [];
            result.forEach((value) => {
                let participant = new participant_1.Participant(value.idProject, value.idUser, value.accepted, value.role, value._id, value.created_at, value.updated_at);
                participants.push(participant);
            });
            return participants;
        }
        else {
            return [];
        }
    }
    handleResult(results) {
        if (results && !(results instanceof Array)) {
            return new participant_1.Participant(results.idProject, results.idUser, results.accepted, results.role, results._id, results.created_at, results.updated_at);
        }
        else {
            return null;
        }
    }
}
exports.ParticipantRepository = ParticipantRepository;
//# sourceMappingURL=participantRepository.js.map