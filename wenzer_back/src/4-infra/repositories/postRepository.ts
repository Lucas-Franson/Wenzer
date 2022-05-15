import { Post } from "../../3-domain/entities/post";
import { IPostRepository } from "../irepositories/IpostRepository";
import { UserPostGoodIdea } from "../../3-domain/entities/userPostGoodIdea";
import { PostComments } from "../../3-domain/entities/postComments";
import { v4 as uuid } from 'uuid';
import { Db, MongoClient } from "mongodb";
import { Orm } from "./orm";
import { PostAlreadySeen } from "../../3-domain/entities/postAlreadySeen";
import { CommentCommented } from "../../3-domain/entities/commentCommented";
import { UserCommentGoodIdea } from "../../3-domain/entities/userCommentGoodIdea";

const url: string = process.env.BASE_URL_DATABASE!;
const collection = "Post";
const database = process.env.BASE_NAME_DATABASE!;

export class PostRepository extends Orm<Post> implements IPostRepository {
    
    async getAllPostsOfUser(idUser: string, page: number, countPerPage: number): Promise<Post[]> {
        var _self = this;
        return new Promise(function(resolve, reject){ 
            MongoClient.connect(url).then(function(db){
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
                        $skip: ((page-1)*countPerPage)
                    }
                ]).sort({ created_at: -1 }).limit(countPerPage).toArray(function(err: any, results: any) {
                    const result = _self.handleArrayResult(results);
                    resolve(result!);
                    db.close();
                });
            });
        });
    }

    getAllPostsByUserId(userId: string, page: number, countPerPage: number): Promise<Post[]> {
        var _self = this;
        return new Promise(function(resolve, reject){ 
            MongoClient.connect(url).then(function(db){
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
                        $skip: ((page-1)*countPerPage)
                    }
                ]).sort({ created_at: -1 }).limit(countPerPage).toArray(function(err: any, results: any) {
                    const result = _self.handleArrayResult(results);
                    resolve(result!);
                    db.close();
                });
            });
        });
    }

    async getUserPostGoodIdea(where: any): Promise<UserPostGoodIdea | null> {
        var _self = this;
        return new Promise(function(resolve, reject){ 
            MongoClient.connect(url).then(function(db){
                var dbo = db.db(database);
                dbo.collection('UserPostGoodIdea').findOne(where, {}).then(function(results: any) {
                    const result = _self.handleUserPostGoodIdeaResult(results);
                    resolve(result);
                    db.close();
                });
            });
        });
    }

    async getListUserPostGoodIdea(whereClause: any): Promise<UserPostGoodIdea[]> {
        var _self = this;
        return new Promise(function(resolve, reject){ 
            MongoClient.connect(url).then(function(db){
                var dbo = db.db(database);
                dbo.collection('UserPostGoodIdea').find(whereClause).toArray(function(err: any, results: any) {
                    const result = _self.handleUserPostGoodIdeaArrayResult(results);
                    resolve(result!);
                    db.close();
                });
            });
        });
    }

    async getUserCommentGoodIdea(userId: string, idPostComment: string): Promise<UserCommentGoodIdea | null> {
        return new Promise(function(resolve, reject){ 
            MongoClient.connect(url).then(function(db){
                var dbo = db.db(database);
                dbo.collection('UserCommentGoodIdea').findOne({ idUser: userId, idPostComment }, function(err: any, results: any) {
                    resolve(results);
                    db.close();
                });
            });
        });
    }

    async setComment(postComments: any): Promise<void> {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db?.db(database);
            postComments.created_at = new Date();
            postComments.updated_at = new Date();
            dbo?.collection('PostComment').insertOne(postComments, function(err, res) {
                if (err) throw err;
                db?.close();
            });
        });
    }

    async setSubComment(commentCommented: any): Promise<void> {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db?.db(database);
            commentCommented.created_at = new Date();
            commentCommented.updated_at = new Date();
            dbo?.collection('CommentCommented').insertOne(commentCommented, function(err, res) {
                if (err) throw err;
                db?.close();
            });
        });
    }

    async getCommentsByPostId(postId: string): Promise<PostComments[]> {
        var _self = this;
        return new Promise(function(resolve, reject){ 
            MongoClient.connect(url).then(function(db){
                var dbo = db.db(database);
                dbo.collection('PostComment').find({ idPost: postId }).sort({ countViews: -1, created_at: 1 }).toArray(function(err: any, results: any) {
                    const result = _self.handlePostCommentsArrayResult(results);
                    resolve(result!);
                    db.close();
                });
            });
        });
    }

    async getAllSubCommentsByPostCommentArrIds(idSubCommentArr: string[]): Promise<CommentCommented[]> {
        return new Promise(function(resolve, reject){ 
            MongoClient.connect(url).then(function(db){
                var dbo = db.db(database);
                dbo.collection('CommentCommented').find({ idPostComment: { $in: idSubCommentArr } }).sort({ created_at: 1 }).toArray(function(err: any, results: any) {
                    resolve(results!);
                    db.close();
                });
            });
        });
    }

    async getCommentsByPost(userId: string): Promise<{ _id: string; created_at: Date; name: string; }[]> {
        return new Promise(function(resolve, reject){ 
            MongoClient.connect(url).then(function(db){
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
                            name: "$user.name",
                            created_at: 1
                        }
                    }
                ]).toArray(function(err: any, results: any) {
                    resolve(results);
                    db.close();
                });
            });
        });
    }

    async getCommentsCommentedByUser(userId: string): Promise<{ _id: string; created_at: Date; name: string; }[]> {
        return new Promise(function(resolve, reject){ 
            MongoClient.connect(url).then(function(db){
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
                            _id: "$postComment.idPost",
                            name: "$user.name",
                            created_at: 1
                        }
                    }
                ]).toArray(function(err: any, results: any) {
                    resolve(results);
                    db.close();
                });
            });
        });
    }

    setPostAlreadySeen(postAlreadySeen: any): void {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db?.db(database);
            dbo?.collection('PostAlreadySeen').insertOne(postAlreadySeen, function(err, res) {
                if (err) throw err;
                db?.close();
            });
        });
    }

    updatePostAlreadySeen(postAlreadySeen: PostAlreadySeen): void {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db?.db(database);
            dbo?.collection('PostAlreadySeen').updateOne({ idUser: postAlreadySeen.idUser }, { $set: postAlreadySeen }, function(err, res) {
                if (err) throw err;
                db?.close();
            });
        });
    }

    async getDateLastPostSeen(id: string): Promise<PostAlreadySeen> {
        return new Promise(function(resolve, reject){ 
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db?.db(database);
                dbo?.collection('PostAlreadySeen').findOne({ idUser: id }, function(err: any, results: any) {
                    resolve(results);
                    db?.close();
                });
            });
        });
    }

    async getPostsByProject(idProject: string): Promise<Post[]> {
        return new Promise(function(resolve, reject){ 
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db?.db(database);
                dbo?.collection(collection).find({ idProject }).toArray(function(err: any, results: any) {
                    resolve(results);
                    db?.close();
                });
            });
        });
    }

    deleteListPost(idsPost: string[]): void {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db?.db(database);
            dbo?.collection(collection).deleteMany({ _id: { $in: idsPost } }, function(err, res) {
                if (err) throw err;
                db?.close();
            });
        });
    }

    async getCommentById(idPostComment: string): Promise<PostComments> {
        return new Promise(function(resolve, reject){ 
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db?.db(database);
                dbo?.collection('PostComment').findOne({ _id: idPostComment }, function(err: any, results: any) {
                    resolve(results);
                    db?.close();
                });
            });
        });
    }

    updateComment(comment: PostComments): void {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db?.db(database);
            dbo?.collection('PostComment').updateOne({ _id: comment._id }, { $set: comment }, function(err: any, results: any) {
                db?.close();
            });
        });
    }

    removeCommentAsGoodIdea(userId: string, idPostComment: string): void {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db?.db(database);
            dbo?.collection('UserCommentGoodIdea').deleteOne({ idUser: userId, idPostComment }, function(err: any, results: any) {
                db?.close();
            });
        });
    }

    setCommentAsGoodIdea(commentGoodIdea: any): void {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db?.db(database);
            dbo?.collection('UserCommentGoodIdea').insertOne(commentGoodIdea, function(err: any, results: any) {
                db?.close();
            });
        });
    }

    async getAllCommentGoodIdeaFromUser(userId: string): Promise<UserCommentGoodIdea[]> {
        return new Promise(function(resolve, reject){ 
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db?.db(database);
                dbo?.collection('UserCommentGoodIdea').find({ idUser: userId }).toArray(function(err: any, results: any) {
                    resolve(results);
                    db?.close();
                });
            });
        });
    }

    async search(userId: string, search: string): Promise<Post[]> {
        return new Promise(function(resolve, reject){ 
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db?.db(database);
                let filter = new RegExp(["(", search.split(" ").join("|"), ")"].join(""), "i");
                dbo?.collection(collection).find({ 
                    title: filter,
                    idUser: { $ne: userId },
                    publicPost: true
                }).project({ _id: 1, title: 1, description: 1, photo: 1 }).toArray(function(err: any, results: any) {
                    resolve(results);
                    db?.close();
                });
            });
        });
    }
    
    async getCountOfGoodIdeaByProject(_id: string): Promise<{ idPost: number }[]> {
        return new Promise(function(resolve, reject){ 
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db?.db(database);
                dbo?.collection('UserPostGoodIdea').aggregate([
                    {
                        $match: {
                            idPost: _id
                        }
                    },
                    {
                        $count: "idPost"
                    }
                ]).toArray(function(err: any, results: any) {
                    if (results && results.length > 0) resolve(results);
                    else resolve([{ idPost: 0 }]);
                    db?.close();
                });
            });
        });
    }

    // WEB SERVICE
    async getListUserPostGoodIdeaWebService(whereClause: any, dbo: Db): Promise<UserPostGoodIdea[]> {
        var _self = this;
        return new Promise(function(resolve, reject){ 
            dbo.collection('UserPostGoodIdea').find(whereClause).toArray(function(err: any, results: any) {
                const result = _self.handleUserPostGoodIdeaArrayResult(results);
                resolve(result!);
            });
        });
    }

    async getNewPostToWebService(id: string, alreadySeen: PostAlreadySeen, dbo: Db): Promise<Post[]> {
        var _self = this;
        return new Promise(function(resolve, reject){ 
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
            ]).sort({ created_at: -1 }).toArray(function(err: any, results: any) {
                const result = _self.handleArrayResult(results);
                resolve(result!);
            });
        });
    }

    async getCommentsByPostWebService(dbo: Db, idUser: string, idNotifications: string[]): Promise<number> {
        return new Promise(function(resolve, reject){ 
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
            ]).toArray(function(err: any, results: any) {
                if (results && results.length > 0) resolve(results[0].count)
                else resolve(0);
            });
        });
    }

    async getCommentsCommentedByUserWebService(dbo: Db, idUser: string, idNotifications: string[]): Promise<number> {
        return new Promise(function(resolve, reject){ 
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
            ]).toArray(function(err: any, results: any) {
                if (results && results.length > 0) resolve(results[0].count)
                else resolve(0);
            });
        });
    }

    async getDateLastPostSeenWebService(id: string, dbo: Db): Promise<PostAlreadySeen> {
        return new Promise(function(resolve, reject){ 
            dbo.collection('PostAlreadySeen').findOne({ idUser: id }, function(err: any, results: any) {
                resolve(results);
            });
        });
    }

    // HANDLE METHODS
    handlePostCommentsArrayResult(result: PostComments[]) {
        if (result && result instanceof Array && result.length > 0) {
            let postComments: any[] = [];
            result.forEach((value: PostComments) => {
                let postComment = new PostComments(
                    value.idUser,
                    value.idPost,
                    value.text,
                    value.countViews,
                    value._id,
                    value.created_at,
                    value.updated_at
                );
                postComments.push(postComment);
            });
            return postComments;
        } 
        else {
            return [];
        }
    }

    handleArrayResult(result: Post[]) {
        if (result && result instanceof Array && result.length > 0) {
            let posts: any[] = [];
            result.forEach((value: Post) => {
                let post = new Post(
                    value.idUser,
                    value.countViews,
                    value.title,
                    value.description,
                    value.photo,
                    value.idProject,
                    value.publicPost,
                    value._id,
                    value.created_at,
                    value.updated_at
                );
                posts.push(post);
            });
            return posts;
        } 
        else {
            return [];
        }
    }

    handleResult(results: Post) {
        if(results && !(results instanceof Array)) {
            return new Post(
                results.idUser,
                results.countViews,
                results.title,
                results.description,
                results.photo,
                results.idProject,
                results.publicPost,
                results._id,
                results.created_at,
                results.updated_at
            );
        }
        else {
            return null;
        }
    }

    handleUserPostGoodIdeaArrayResult(result: UserPostGoodIdea[]) {
        if (result && result instanceof Array && result.length > 0) {
            let userPostGoodIdeas: any[] = [];
            result.forEach((value: UserPostGoodIdea) => {
                let userPostGoodIdea = new UserPostGoodIdea(
                    value.idUser,
                    value.idPost,
                    value._id,
                    value.created_at,
                    value.updated_at
                );
                userPostGoodIdeas.push(userPostGoodIdea);
            });
            return userPostGoodIdeas;
        } 
        else {
            return [];
        }
    }

    handleUserPostGoodIdeaResult(results: UserPostGoodIdea) {
        if(results && !(results instanceof Array)) {
            return new UserPostGoodIdea(
                results.idUser,
                results.idPost,
                results._id,
                results.created_at,
                results.updated_at
            );
        }
        else {
            return null;
        }
    }
    
}

