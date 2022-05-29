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
exports.PostRepository = void 0;
const post_1 = require("../../3-domain/entities/post");
const userPostGoodIdea_1 = require("../../3-domain/entities/userPostGoodIdea");
const postComments_1 = require("../../3-domain/entities/postComments");
const mongodb_1 = require("mongodb");
const orm_1 = require("./orm");
const url = process.env.BASE_URL_DATABASE;
const collection = "Post";
const database = process.env.BASE_NAME_DATABASE;
class PostRepository extends orm_1.Orm {
    getAllPostsOfUser(idUser, page, countPerPage) {
        return __awaiter(this, void 0, void 0, function* () {
            var _self = this;
            return new Promise(function (resolve, reject) {
                mongodb_1.MongoClient.connect(url).then(function (db) {
                    var dbo = db.db(database);
                    dbo.collection(collection).aggregate([
                        {
                            $lookup: {
                                from: 'Project',
                                localField: '_id',
                                foreignField: 'idProject',
                                pipeline: [
                                    {
                                        $lookup: {
                                            from: 'Follower',
                                            localField: '_id',
                                            foreignField: 'idProject',
                                            as: 'follower'
                                        }
                                    }
                                ],
                                as: 'project'
                            }
                        },
                        {
                            $lookup: {
                                from: 'Connection',
                                localField: 'idUser',
                                foreignField: 'idUser',
                                as: 'userOne'
                            }
                        },
                        {
                            $lookup: {
                                from: 'Connection',
                                localField: 'idUser',
                                foreignField: 'idFollower',
                                as: 'userTwo'
                            }
                        },
                        {
                            $lookup: {
                                from: 'Participant',
                                localField: 'idProject',
                                foreignField: 'idProject',
                                as: 'participants'
                            }
                        },
                        {
                            $match: {
                                $or: [
                                    {
                                        project: {
                                            $elemMatch: {
                                                follower: {
                                                    $elemMatch: {
                                                        follower: {
                                                            idUser
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        publicPost: true
                                    },
                                    {
                                        participants: {
                                            $elemMatch: {
                                                idUser,
                                                accepted: true
                                            }
                                        }
                                    },
                                    {
                                        idUser
                                    },
                                    {
                                        userOne: {
                                            $elemMatch: {
                                                idFollower: idUser,
                                                accepted: true
                                            }
                                        },
                                        publicPost: true
                                    },
                                    {
                                        userTwo: {
                                            $elemMatch: {
                                                idUser,
                                                accepted: true
                                            }
                                        },
                                        publicPost: true
                                    }
                                ]
                            }
                        },
                        {
                            $skip: ((page - 1) * countPerPage)
                        }
                    ]).sort({ created_at: -1 }).limit(countPerPage).toArray(function (err, results) {
                        const result = _self.handleArrayResult(results);
                        resolve(result);
                        db.close();
                    });
                });
            });
        });
    }
    getAllPostsByUserId(userId, page, countPerPage) {
        var _self = this;
        return new Promise(function (resolve, reject) {
            mongodb_1.MongoClient.connect(url).then(function (db) {
                var dbo = db.db(database);
                dbo.collection(collection).aggregate([
                    {
                        $lookup: {
                            from: 'Participant',
                            localField: 'idProject',
                            foreignField: 'idProject',
                            as: 'participants'
                        }
                    },
                    {
                        $match: {
                            $or: [
                                {
                                    idUser: userId,
                                    publicPost: true
                                },
                                {
                                    idUser: userId,
                                    participants: {
                                        $elemMatch: {
                                            idUser: userId,
                                            accepted: true
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $skip: ((page - 1) * countPerPage)
                    }
                ]).sort({ created_at: -1 }).limit(countPerPage).toArray(function (err, results) {
                    const result = _self.handleArrayResult(results);
                    resolve(result);
                    db.close();
                });
            });
        });
    }
    getUserPostGoodIdea(where) {
        return __awaiter(this, void 0, void 0, function* () {
            var _self = this;
            return new Promise(function (resolve, reject) {
                mongodb_1.MongoClient.connect(url).then(function (db) {
                    var dbo = db.db(database);
                    dbo.collection('UserPostGoodIdea').findOne(where, {}).then(function (results) {
                        const result = _self.handleUserPostGoodIdeaResult(results);
                        resolve(result);
                        db.close();
                    });
                });
            });
        });
    }
    getListUserPostGoodIdea(whereClause) {
        return __awaiter(this, void 0, void 0, function* () {
            var _self = this;
            return new Promise(function (resolve, reject) {
                mongodb_1.MongoClient.connect(url).then(function (db) {
                    var dbo = db.db(database);
                    dbo.collection('UserPostGoodIdea').find(whereClause).toArray(function (err, results) {
                        const result = _self.handleUserPostGoodIdeaArrayResult(results);
                        resolve(result);
                        db.close();
                    });
                });
            });
        });
    }
    getUserCommentGoodIdea(userId, idPostComment) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                mongodb_1.MongoClient.connect(url).then(function (db) {
                    var dbo = db.db(database);
                    dbo.collection('UserCommentGoodIdea').findOne({ idUser: userId, idPostComment }, function (err, results) {
                        resolve(results);
                        db.close();
                    });
                });
            });
        });
    }
    setComment(postComments) {
        return __awaiter(this, void 0, void 0, function* () {
            mongodb_1.MongoClient.connect(url, function (err, db) {
                if (err)
                    throw err;
                var dbo = db === null || db === void 0 ? void 0 : db.db(database);
                postComments.created_at = new Date();
                postComments.updated_at = new Date();
                dbo === null || dbo === void 0 ? void 0 : dbo.collection('PostComment').insertOne(postComments, function (err, res) {
                    if (err)
                        throw err;
                    db === null || db === void 0 ? void 0 : db.close();
                });
            });
        });
    }
    setSubComment(commentCommented) {
        return __awaiter(this, void 0, void 0, function* () {
            mongodb_1.MongoClient.connect(url, function (err, db) {
                if (err)
                    throw err;
                var dbo = db === null || db === void 0 ? void 0 : db.db(database);
                commentCommented.created_at = new Date();
                commentCommented.updated_at = new Date();
                dbo === null || dbo === void 0 ? void 0 : dbo.collection('CommentCommented').insertOne(commentCommented, function (err, res) {
                    if (err)
                        throw err;
                    db === null || db === void 0 ? void 0 : db.close();
                });
            });
        });
    }
    getCommentsByPostId(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _self = this;
            return new Promise(function (resolve, reject) {
                mongodb_1.MongoClient.connect(url).then(function (db) {
                    var dbo = db.db(database);
                    dbo.collection('PostComment').find({ idPost: postId }).sort({ countViews: -1, created_at: 1 }).toArray(function (err, results) {
                        const result = _self.handlePostCommentsArrayResult(results);
                        resolve(result);
                        db.close();
                    });
                });
            });
        });
    }
    getAllSubCommentsByPostCommentArrIds(idSubCommentArr) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                mongodb_1.MongoClient.connect(url).then(function (db) {
                    var dbo = db.db(database);
                    dbo.collection('CommentCommented').find({ idPostComment: { $in: idSubCommentArr } }).sort({ created_at: 1 }).toArray(function (err, results) {
                        resolve(results);
                        db.close();
                    });
                });
            });
        });
    }
    getCommentsByPost(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                mongodb_1.MongoClient.connect(url).then(function (db) {
                    var dbo = db.db(database);
                    dbo.collection('PostComment').aggregate([
                        {
                            $lookup: {
                                from: 'Post',
                                localField: 'idPost',
                                foreignField: '_id',
                                as: 'post',
                                pipeline: [
                                    {
                                        $match: {
                                            idUser: userId
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            $unwind: "$post"
                        },
                        {
                            $lookup: {
                                from: 'User',
                                localField: 'idUser',
                                foreignField: '_id',
                                as: 'user'
                            }
                        },
                        {
                            $unwind: "$user"
                        },
                        {
                            $match: {
                                idUser: {
                                    $not: { $eq: userId }
                                }
                            }
                        },
                        {
                            $project: {
                                _id: "$post._id",
                                name: { $concat: ["$user.name", " ", "$user.lastName"] },
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
    getCommentsCommentedByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                mongodb_1.MongoClient.connect(url).then(function (db) {
                    var dbo = db.db(database);
                    dbo.collection('CommentCommented').aggregate([
                        {
                            $lookup: {
                                from: 'PostComment',
                                localField: 'idPostComment',
                                foreignField: '_id',
                                as: 'postComment',
                                pipeline: [
                                    {
                                        $match: {
                                            idUser: userId
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            $unwind: "$postComment"
                        },
                        {
                            $lookup: {
                                from: 'User',
                                localField: 'idUser',
                                foreignField: '_id',
                                as: 'user'
                            }
                        },
                        {
                            $unwind: "$user"
                        },
                        {
                            $match: {
                                idUser: {
                                    $not: { $eq: userId }
                                }
                            }
                        },
                        {
                            $project: {
                                _id: "$idPostComment",
                                idPost: "$postComment.idPost",
                                name: { $concat: ["$user.name", " ", "$user.lastName"] },
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
    setPostAlreadySeen(postAlreadySeen) {
        mongodb_1.MongoClient.connect(url, function (err, db) {
            if (err)
                throw err;
            var dbo = db === null || db === void 0 ? void 0 : db.db(database);
            dbo === null || dbo === void 0 ? void 0 : dbo.collection('PostAlreadySeen').insertOne(postAlreadySeen, function (err, res) {
                if (err)
                    throw err;
                db === null || db === void 0 ? void 0 : db.close();
            });
        });
    }
    updatePostAlreadySeen(postAlreadySeen) {
        mongodb_1.MongoClient.connect(url, function (err, db) {
            if (err)
                throw err;
            var dbo = db === null || db === void 0 ? void 0 : db.db(database);
            dbo === null || dbo === void 0 ? void 0 : dbo.collection('PostAlreadySeen').updateOne({ idUser: postAlreadySeen.idUser }, { $set: postAlreadySeen }, function (err, res) {
                if (err)
                    throw err;
                db === null || db === void 0 ? void 0 : db.close();
            });
        });
    }
    getDateLastPostSeen(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                mongodb_1.MongoClient.connect(url, function (err, db) {
                    if (err)
                        throw err;
                    var dbo = db === null || db === void 0 ? void 0 : db.db(database);
                    dbo === null || dbo === void 0 ? void 0 : dbo.collection('PostAlreadySeen').findOne({ idUser: id }, function (err, results) {
                        resolve(results);
                        db === null || db === void 0 ? void 0 : db.close();
                    });
                });
            });
        });
    }
    getPostsByProject(idProject) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                mongodb_1.MongoClient.connect(url, function (err, db) {
                    if (err)
                        throw err;
                    var dbo = db === null || db === void 0 ? void 0 : db.db(database);
                    dbo === null || dbo === void 0 ? void 0 : dbo.collection(collection).find({ idProject }).toArray(function (err, results) {
                        resolve(results);
                        db === null || db === void 0 ? void 0 : db.close();
                    });
                });
            });
        });
    }
    deleteListPost(idsPost) {
        mongodb_1.MongoClient.connect(url, function (err, db) {
            if (err)
                throw err;
            var dbo = db === null || db === void 0 ? void 0 : db.db(database);
            dbo === null || dbo === void 0 ? void 0 : dbo.collection(collection).deleteMany({ _id: { $in: idsPost } }, function (err, res) {
                if (err)
                    throw err;
                db === null || db === void 0 ? void 0 : db.close();
            });
        });
    }
    getCommentById(idPostComment) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                mongodb_1.MongoClient.connect(url, function (err, db) {
                    if (err)
                        throw err;
                    var dbo = db === null || db === void 0 ? void 0 : db.db(database);
                    dbo === null || dbo === void 0 ? void 0 : dbo.collection('PostComment').findOne({ _id: idPostComment }, function (err, results) {
                        resolve(results);
                        db === null || db === void 0 ? void 0 : db.close();
                    });
                });
            });
        });
    }
    updateComment(comment) {
        mongodb_1.MongoClient.connect(url, function (err, db) {
            if (err)
                throw err;
            var dbo = db === null || db === void 0 ? void 0 : db.db(database);
            dbo === null || dbo === void 0 ? void 0 : dbo.collection('PostComment').updateOne({ _id: comment._id }, { $set: comment }, function (err, results) {
                db === null || db === void 0 ? void 0 : db.close();
            });
        });
    }
    removeCommentAsGoodIdea(userId, idPostComment) {
        mongodb_1.MongoClient.connect(url, function (err, db) {
            if (err)
                throw err;
            var dbo = db === null || db === void 0 ? void 0 : db.db(database);
            dbo === null || dbo === void 0 ? void 0 : dbo.collection('UserCommentGoodIdea').deleteOne({ idUser: userId, idPostComment }, function (err, results) {
                db === null || db === void 0 ? void 0 : db.close();
            });
        });
    }
    setCommentAsGoodIdea(commentGoodIdea) {
        mongodb_1.MongoClient.connect(url, function (err, db) {
            if (err)
                throw err;
            var dbo = db === null || db === void 0 ? void 0 : db.db(database);
            dbo === null || dbo === void 0 ? void 0 : dbo.collection('UserCommentGoodIdea').insertOne(commentGoodIdea, function (err, results) {
                db === null || db === void 0 ? void 0 : db.close();
            });
        });
    }
    getAllCommentGoodIdeaFromUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                mongodb_1.MongoClient.connect(url, function (err, db) {
                    if (err)
                        throw err;
                    var dbo = db === null || db === void 0 ? void 0 : db.db(database);
                    dbo === null || dbo === void 0 ? void 0 : dbo.collection('UserCommentGoodIdea').find({ idUser: userId }).toArray(function (err, results) {
                        resolve(results);
                        db === null || db === void 0 ? void 0 : db.close();
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
                    let filter = new RegExp(["(", search.split(" ").join("|"), ")"].join(""), "i");
                    dbo === null || dbo === void 0 ? void 0 : dbo.collection(collection).find({
                        title: filter,
                        idUser: { $ne: userId },
                        publicPost: true
                    }).project({ _id: 1, title: 1, description: 1, photo: 1 }).toArray(function (err, results) {
                        resolve(results);
                        db === null || db === void 0 ? void 0 : db.close();
                    });
                });
            });
        });
    }
    getCountOfGoodIdeaByProject(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                mongodb_1.MongoClient.connect(url, function (err, db) {
                    if (err)
                        throw err;
                    var dbo = db === null || db === void 0 ? void 0 : db.db(database);
                    dbo === null || dbo === void 0 ? void 0 : dbo.collection('UserPostGoodIdea').aggregate([
                        {
                            $match: {
                                idPost: _id
                            }
                        },
                        {
                            $count: "idPost"
                        }
                    ]).toArray(function (err, results) {
                        if (results && results.length > 0)
                            resolve(results);
                        else
                            resolve([{ idPost: 0 }]);
                        db === null || db === void 0 ? void 0 : db.close();
                    });
                });
            });
        });
    }
    // WEB SERVICE
    getListUserPostGoodIdeaWebService(whereClause, dbo) {
        return __awaiter(this, void 0, void 0, function* () {
            var _self = this;
            return new Promise(function (resolve, reject) {
                dbo.collection('UserPostGoodIdea').find(whereClause).toArray(function (err, results) {
                    const result = _self.handleUserPostGoodIdeaArrayResult(results);
                    resolve(result);
                });
            });
        });
    }
    getNewPostToWebService(id, alreadySeen, dbo) {
        return __awaiter(this, void 0, void 0, function* () {
            var _self = this;
            return new Promise(function (resolve, reject) {
                dbo.collection(collection).aggregate([
                    {
                        $lookup: {
                            from: 'Project',
                            localField: '_id',
                            foreignField: 'idProject',
                            pipeline: [
                                {
                                    $lookup: {
                                        from: 'Follower',
                                        localField: '_id',
                                        foreignField: 'idProject',
                                        as: 'follower'
                                    }
                                }
                            ],
                            as: 'project'
                        }
                    },
                    {
                        $lookup: {
                            from: 'Connections',
                            localField: 'idUser',
                            foreignField: 'idUser',
                            as: 'userOne'
                        }
                    },
                    {
                        $lookup: {
                            from: 'Connections',
                            localField: 'idUser',
                            foreignField: 'idFollower',
                            as: 'userTwo'
                        }
                    },
                    {
                        $lookup: {
                            from: 'Participant',
                            localField: 'idProject',
                            foreignField: 'idProject',
                            as: 'participants'
                        }
                    },
                    {
                        $match: {
                            $or: [
                                {
                                    project: {
                                        $elemMatch: {
                                            follower: {
                                                $elemMatch: {
                                                    follower: {
                                                        idUser: id
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    publicPost: true
                                },
                                {
                                    participants: {
                                        $elemMatch: {
                                            idUser: id,
                                            accepted: true
                                        }
                                    }
                                },
                                {
                                    idUser: id
                                },
                                {
                                    userOne: {
                                        $elemMatch: {
                                            idFollower: id
                                        }
                                    },
                                    publicPost: true
                                },
                                {
                                    userTwo: {
                                        $elemMatch: {
                                            idUser: id
                                        }
                                    },
                                    publicPost: true
                                }
                            ],
                            $and: [
                                {
                                    created_at: {
                                        $gt: new Date(alreadySeen.dateLastPost)
                                    }
                                }
                            ]
                        }
                    }
                ]).sort({ created_at: -1 }).toArray(function (err, results) {
                    const result = _self.handleArrayResult(results);
                    resolve(result);
                });
            });
        });
    }
    getCommentsByPostWebService(dbo, idUser, idNotifications) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                dbo.collection('PostComment').aggregate([
                    {
                        $lookup: {
                            from: 'Post',
                            localField: 'idPost',
                            foreignField: '_id',
                            as: 'post',
                            pipeline: [
                                {
                                    $match: {
                                        idUser
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $unwind: "$post"
                    },
                    {
                        $match: {
                            idPost: {
                                $nin: idNotifications
                            },
                            idUser: {
                                $not: { $eq: idUser }
                            }
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
        });
    }
    getCommentsCommentedByUserWebService(dbo, idUser, idNotifications) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                dbo.collection('CommentCommented').aggregate([
                    {
                        $lookup: {
                            from: 'PostComment',
                            localField: 'idPostComment',
                            foreignField: '_id',
                            as: 'postComment',
                            pipeline: [
                                {
                                    $match: {
                                        idUser: idUser
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $unwind: "$postComment"
                    },
                    {
                        $lookup: {
                            from: 'User',
                            localField: 'idUser',
                            foreignField: '_id',
                            as: 'user'
                        }
                    },
                    {
                        $unwind: "$user"
                    },
                    {
                        $match: {
                            idPostComment: {
                                $nin: idNotifications
                            },
                            idUser: {
                                $not: { $eq: idUser }
                            }
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
        });
    }
    getDateLastPostSeenWebService(id, dbo) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                dbo.collection('PostAlreadySeen').findOne({ idUser: id }, function (err, results) {
                    resolve(results);
                });
            });
        });
    }
    // HANDLE METHODS
    handlePostCommentsArrayResult(result) {
        if (result && result instanceof Array && result.length > 0) {
            let postComments = [];
            result.forEach((value) => {
                let postComment = new postComments_1.PostComments(value.idUser, value.idPost, value.text, value.countViews, value._id, value.created_at, value.updated_at);
                postComments.push(postComment);
            });
            return postComments;
        }
        else {
            return [];
        }
    }
    handleArrayResult(result) {
        if (result && result instanceof Array && result.length > 0) {
            let posts = [];
            result.forEach((value) => {
                let post = new post_1.Post(value.idUser, value.countViews, value.title, value.description, value.photo, value.idProject, value.publicPost, value._id, value.created_at, value.updated_at);
                posts.push(post);
            });
            return posts;
        }
        else {
            return [];
        }
    }
    handleResult(results) {
        if (results && !(results instanceof Array)) {
            return new post_1.Post(results.idUser, results.countViews, results.title, results.description, results.photo, results.idProject, results.publicPost, results._id, results.created_at, results.updated_at);
        }
        else {
            return null;
        }
    }
    handleUserPostGoodIdeaArrayResult(result) {
        if (result && result instanceof Array && result.length > 0) {
            let userPostGoodIdeas = [];
            result.forEach((value) => {
                let userPostGoodIdea = new userPostGoodIdea_1.UserPostGoodIdea(value.idUser, value.idPost, value._id, value.created_at, value.updated_at);
                userPostGoodIdeas.push(userPostGoodIdea);
            });
            return userPostGoodIdeas;
        }
        else {
            return [];
        }
    }
    handleUserPostGoodIdeaResult(results) {
        if (results && !(results instanceof Array)) {
            return new userPostGoodIdea_1.UserPostGoodIdea(results.idUser, results.idPost, results._id, results.created_at, results.updated_at);
        }
        else {
            return null;
        }
    }
}
exports.PostRepository = PostRepository;
//# sourceMappingURL=postRepository.js.map