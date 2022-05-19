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
exports.ProjectRepository = void 0;
const project_1 = require("../../3-domain/entities/project");
const mongodb_1 = require("mongodb");
const orm_1 = require("./orm");
const url = process.env.BASE_URL_DATABASE;
const collection = "Project";
const database = process.env.BASE_NAME_DATABASE;
class ProjectRepository extends orm_1.Orm {
    insert(object) {
        return __awaiter(this, void 0, void 0, function* () {
            mongodb_1.MongoClient.connect(url, function (err, db) {
                if (err)
                    throw err;
                var dbo = db === null || db === void 0 ? void 0 : db.db(database);
                dbo === null || dbo === void 0 ? void 0 : dbo.collection(collection).insertOne(object, function (err, res) {
                    if (err)
                        throw err;
                    db === null || db === void 0 ? void 0 : db.close();
                });
            });
        });
    }
    getProjectsByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _self = this;
            return new Promise(function (resolve, reject) {
                mongodb_1.MongoClient.connect(url).then(function (db) {
                    var dbo = db.db(database);
                    dbo.collection(collection).aggregate([
                        {
                            $lookup: {
                                from: 'Participant',
                                localField: '_id',
                                foreignField: 'idProject',
                                as: 'participants'
                            }
                        },
                        {
                            $match: {
                                $or: [
                                    {
                                        participants: {
                                            $elemMatch: {
                                                idUser: userId,
                                                accepted: true
                                            }
                                        }
                                    },
                                    {
                                        userId
                                    }
                                ]
                            }
                        }
                    ]).toArray(function (err, results) {
                        const projects = _self.handleArrayResult(results);
                        resolve(projects);
                        db.close();
                    });
                });
            });
        });
    }
    getAllProjectsInHigh() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                mongodb_1.MongoClient.connect(url).then(function (db) {
                    var dbo = db.db(database);
                    dbo.collection(collection).aggregate([
                        {
                            $lookup: {
                                from: 'Follower',
                                localField: '_id',
                                foreignField: 'idProject',
                                as: 'follower'
                            }
                        },
                        {
                            $project: {
                                _id: 1,
                                name: 1,
                                photo: 1,
                                description: 1,
                                countGoodIdea: 1,
                                countFollowers: { $size: "$follower" }
                            }
                        }
                    ])
                        .sort({ userProjectGoodIdea: -1, follower: -1 })
                        .limit(9).toArray(function (err, results) {
                        resolve(results);
                        db.close();
                    });
                });
            });
        });
    }
    getProjectsByInterests(interests) {
        return __awaiter(this, void 0, void 0, function* () {
            var _self = this;
            return new Promise(function (resolve, reject) {
                mongodb_1.MongoClient.connect(url).then(function (db) {
                    var dbo = db.db(database);
                    dbo.collection(collection).aggregate([
                        {
                            $lookup: {
                                from: 'ProjectInterest',
                                localField: '_id',
                                foreignField: 'idProject',
                                as: 'projectInterest'
                            }
                        },
                        {
                            $match: {
                                projectInterest: {
                                    $elemMatch: {
                                        idInterests: {
                                            $in: interests
                                        }
                                    }
                                }
                            }
                        }
                    ]).limit(5).toArray(function (err, results) {
                        const projects = _self.handleArrayResult(results);
                        resolve(projects);
                        db.close();
                    });
                });
            });
        });
    }
    getProjectsMarketing(interests) {
        return __awaiter(this, void 0, void 0, function* () {
            var _self = this;
            return new Promise(function (resolve, reject) {
                mongodb_1.MongoClient.connect(url).then(function (db) {
                    var dbo = db.db(database);
                    dbo.collection(collection).aggregate([
                        {
                            $lookup: {
                                from: 'ProjectInterest',
                                localField: '_id',
                                foreignField: 'idProject',
                                as: 'projectInterest'
                            }
                        },
                        {
                            $match: {
                                projectInterest: {
                                    $elemMatch: {
                                        idInterests: {
                                            $in: interests
                                        }
                                    }
                                },
                                marketing: true
                            }
                        }
                    ]).limit(5).toArray(function (err, results) {
                        const projects = _self.handleArrayResult(results);
                        resolve(projects);
                        db.close();
                    });
                });
            });
        });
    }
    getCountProjectsByUser(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                mongodb_1.MongoClient.connect(url).then(function (db) {
                    var dbo = db.db(database);
                    dbo.collection(collection).aggregate([
                        {
                            $match: {
                                userId: idUser
                            }
                        },
                        {
                            $count: "count"
                        }
                    ]).toArray(function (err, results) {
                        if (results && results.length > 0) {
                            resolve(results[0]);
                        }
                        else {
                            resolve({ count: 0 });
                        }
                        db.close();
                    });
                });
            });
        });
    }
    getCountParticipatingByUser(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                mongodb_1.MongoClient.connect(url).then(function (db) {
                    var dbo = db.db(database);
                    dbo.collection(collection).aggregate([
                        {
                            $lookup: {
                                from: 'Participant',
                                localField: '_id',
                                foreignField: 'idProject',
                                as: 'participant'
                            }
                        },
                        {
                            $match: {
                                participant: {
                                    $elemMatch: {
                                        idUser
                                    }
                                },
                                userId: {
                                    $ne: idUser
                                }
                            }
                        },
                        {
                            $count: "count"
                        }
                    ]).toArray(function (err, results) {
                        if (results && results.length > 0) {
                            resolve(results[0]);
                        }
                        else {
                            resolve({ count: 0 });
                        }
                        db.close();
                    });
                });
            });
        });
    }
    verifyIfUserIsFollowingProject(idUser, idProject) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                mongodb_1.MongoClient.connect(url).then(function (db) {
                    var dbo = db.db(database);
                    dbo.collection("Follower").findOne({ idProject, idUser }, function (err, results) {
                        results ? resolve(true) : resolve(false);
                        db.close();
                    });
                });
            });
        });
    }
    findUserProjectGoodIdeaById(idUser, idProject) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                mongodb_1.MongoClient.connect(url).then(function (db) {
                    var dbo = db.db(database);
                    dbo.collection('UserProjectGoodIdea').findOne({ idUser, idProject }, function (err, results) {
                        resolve(results);
                        db.close();
                    });
                });
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
                        name: new RegExp(["(", search.split(" ").join("|"), ")"].join(""), "i"),
                        userId: { $ne: userId }
                    }).project({ _id: 1, name: 1, description: 1, photo: 1 }).toArray(function (err, results) {
                        resolve(results);
                        db === null || db === void 0 ? void 0 : db.close();
                    });
                });
            });
        });
    }
    deleteProjectGoodIdea(goodIdea) {
        mongodb_1.MongoClient.connect(url).then(function (db) {
            var dbo = db.db(database);
            dbo.collection("UserProjectGoodIdea").deleteOne({ idUser: goodIdea.idUser, idProject: goodIdea.idProject }, function (err, results) {
                if (!results)
                    throw new Error(err);
                db.close();
            });
        });
    }
    setProjectGoodIdea(userProjectGoodIdea) {
        mongodb_1.MongoClient.connect(url).then(function (db) {
            var dbo = db.db(database);
            dbo.collection("UserProjectGoodIdea").insertOne(userProjectGoodIdea, function (err, results) {
                if (!results)
                    throw new Error(err);
                db.close();
            });
        });
    }
    handleArrayResult(result) {
        if (result && result instanceof Array && result.length > 0) {
            let projects = [];
            result.forEach((value) => {
                let project = new project_1.Project(value.name, value.description, value.photo, value.active, value.publicProject, value.marketing, value.userId, value.countGoodIdea, value._id, value.created_at, value.updated_at);
                projects.push(project);
            });
            return projects;
        }
        else {
            return [];
        }
    }
    handleResult(results) {
        if (results && !(results instanceof Array)) {
            return new project_1.Project(results.name, results.description, results.photo, results.active, results.publicProject, results.marketing, results.userId, results.countGoodIdea, results._id, results.created_at, results.updated_at);
        }
        else {
            return null;
        }
    }
}
exports.ProjectRepository = ProjectRepository;
//# sourceMappingURL=projectRepository.js.map