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
exports.InterestRepository = void 0;
const interests_1 = require("../../3-domain/entities/interests");
const orm_1 = require("./orm");
const interestUser_1 = require("../../3-domain/entities/interestUser");
const projectInterests_1 = require("../../3-domain/entities/projectInterests");
const mongodb_1 = require("mongodb");
const url = process.env.BASE_URL_DATABASE;
const collection = "Interest";
const database = process.env.BASE_NAME_DATABASE;
class InterestRepository extends orm_1.Orm {
    createLinkToUser(userInterests) {
        return __awaiter(this, void 0, void 0, function* () {
            if (userInterests.length <= 0)
                throw new Error("Não possui interesse para criar relacionamento com usuário.");
            mongodb_1.MongoClient.connect(url, function (err, db) {
                if (err)
                    throw err;
                var dbo = db === null || db === void 0 ? void 0 : db.db(database);
                dbo === null || dbo === void 0 ? void 0 : dbo.collection("InterestUser").insertMany(userInterests, function (err, res) {
                    if (err)
                        throw err;
                    db === null || db === void 0 ? void 0 : db.close();
                });
            });
        });
    }
    deleteLinkToUser(userInterests) {
        return __awaiter(this, void 0, void 0, function* () {
            if (userInterests.length <= 0)
                throw new Error("Não possui interesses para deletar.");
            mongodb_1.MongoClient.connect(url, function (err, db) {
                if (err)
                    throw err;
                var dbo = db === null || db === void 0 ? void 0 : db.db(database);
                dbo === null || dbo === void 0 ? void 0 : dbo.collection("InterestUser").deleteMany({ _id: { $in: userInterests } }, function (err, res) {
                    if (err)
                        throw err;
                    db === null || db === void 0 ? void 0 : db.close();
                });
            });
        });
    }
    createLinkToProject(projectInterests) {
        return __awaiter(this, void 0, void 0, function* () {
            if (projectInterests.length <= 0)
                throw new Error("Não possui interesse para criar relacionamento com projeto.");
            mongodb_1.MongoClient.connect(url, function (err, db) {
                if (err)
                    throw err;
                var dbo = db === null || db === void 0 ? void 0 : db.db(database);
                dbo === null || dbo === void 0 ? void 0 : dbo.collection("ProjectInterest").insertMany(projectInterests, function (err, res) {
                    if (err)
                        throw err;
                    db === null || db === void 0 ? void 0 : db.close();
                });
            });
        });
    }
    deleteLinkToProject(projectInterests) {
        return __awaiter(this, void 0, void 0, function* () {
            if (projectInterests.length <= 0)
                throw new Error("Não possui interesses para deletar.");
            mongodb_1.MongoClient.connect(url, function (err, db) {
                if (err)
                    throw err;
                var dbo = db === null || db === void 0 ? void 0 : db.db(database);
                dbo === null || dbo === void 0 ? void 0 : dbo.collection("ProjectInterest").deleteMany({ _id: { $in: projectInterests } }, function (err, obj) {
                    if (err)
                        throw err;
                    db === null || db === void 0 ? void 0 : db.close();
                });
            });
        });
    }
    findLinkUserToInterests(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _self = this;
            return new Promise(function (resolve, reject) {
                mongodb_1.MongoClient.connect(url).then(function (db) {
                    var dbo = db.db(database);
                    dbo.collection('InterestUser').find({ idUser: userId }).toArray(function (err, results) {
                        let interestUser = _self.handleInterestUserArrayResult(results);
                        resolve(interestUser);
                        db.close();
                    });
                });
            });
        });
    }
    findLinkProjectToInterests(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _self = this;
            return new Promise(function (resolve, reject) {
                mongodb_1.MongoClient.connect(url).then(function (db) {
                    var dbo = db.db(database);
                    dbo.collection('ProjectInterest').find({ idProject: projectId }).toArray(function (err, results) {
                        let projectInterest = _self.handleProjectInterestArrayResult(results);
                        resolve(projectInterest);
                        db.close();
                    });
                });
            });
        });
    }
    getInterestsByUser(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                mongodb_1.MongoClient.connect(url).then(function (db) {
                    var dbo = db.db(database);
                    dbo.collection(collection).aggregate([
                        {
                            $lookup: {
                                from: 'InterestUser',
                                localField: '_id',
                                foreignField: 'idInterest',
                                as: 'interestUser'
                            }
                        },
                        {
                            $match: {
                                interestUser: {
                                    $elemMatch: {
                                        idUser
                                    }
                                }
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
    getInterestsByProject(idProject) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                mongodb_1.MongoClient.connect(url).then(function (db) {
                    var dbo = db.db(database);
                    dbo.collection(collection).aggregate([
                        {
                            $lookup: {
                                from: 'ProjectInterest',
                                localField: '_id',
                                foreignField: 'idInterests',
                                as: 'interestProject'
                            }
                        },
                        {
                            $match: {
                                interestProject: {
                                    $elemMatch: {
                                        idProject
                                    }
                                }
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
    handleArrayResult(result) {
        if (result && result instanceof Array && result.length > 0) {
            let interests = [];
            result.forEach((value) => {
                let interest = new interests_1.Interests(value.name, value._id, value.created_at, value.updated_at);
                interests.push(interest);
            });
            return interests;
        }
        else {
            return [];
        }
    }
    handleResult(results) {
        if (results && !(results instanceof Array)) {
            return new interests_1.Interests(results.name, results._id, results.created_at, results.updated_at);
        }
        else {
            return null;
        }
    }
    handleInterestUserArrayResult(results) {
        if (results && results instanceof Array && results.length > 0) {
            let interestUsers = [];
            results.forEach((value) => {
                let interestUser = new interestUser_1.InterestUser(value.idInterest, value.idUser, value._id, value.created_at, value.updated_at);
                interestUsers.push(interestUser);
            });
            return interestUsers;
        }
        else {
            return [];
        }
    }
    handleProjectInterestArrayResult(results) {
        if (results && results instanceof Array && results.length > 0) {
            let projectInterests = [];
            results.forEach((value) => {
                let projectInterest = new projectInterests_1.ProjectInterests(value.idProject, value.idInterests, value._id, value.created_at, value.updated_at);
                projectInterests.push(projectInterest);
            });
            return projectInterests;
        }
        else {
            return [];
        }
    }
}
exports.InterestRepository = InterestRepository;
//# sourceMappingURL=interestRepository.js.map