import { Post } from "../../3-domain/entities/post";
import { IPostRepository } from "../irepositories/IpostRepository";
import { UserPostGoodIdea } from "../../3-domain/entities/userPostGoodIdea";
import { PostComments } from "../../3-domain/entities/postComments";
import { v4 as uuid } from 'uuid';
import { Db, MongoClient } from "mongodb";
import { Orm } from "./orm";

const url: string = process.env.BASE_URL_DATABASE!;
const collection = "Post";
const database = "WenzerDB";

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
                                    }
                                },
                                {
                                    idUser
                                },
                                {
                                    userOne: {
                                        $elemMatch: {
                                            idFollower: idUser
                                        }
                                    }
                                },
                                {
                                    userTwo: {
                                        $elemMatch: {
                                            idUser
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

    async setComment(postComments: any): Promise<void> {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db?.db(database);
            postComments._id = uuid();
            postComments.created_at = new Date();
            postComments.updated_at = new Date();
            dbo?.collection('PostComment').insertOne(postComments, function(err, res) {
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
                dbo.collection('PostComment').find({ idPost: postId }).toArray(function(err: any, results: any) {
                    const result = _self.handlePostCommentsArrayResult(results);
                    resolve(result!);
                    db.close();
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

    async getNewPostToWebService(id: string, date: Date, dbo: Db): Promise<Post[]> {
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
                                }
                            },
                            {
                                userTwo: {
                                    $elemMatch: {
                                        idUser: id
                                    }
                                }
                            }
                        ],
                        $and: [
                            {
                                created_at: {
                                    $gt: new Date(date)
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

    // HANDLE METHODS
    handlePostCommentsArrayResult(result: PostComments[]) {
        if (result && result instanceof Array && result.length > 0) {
            let postComments: any[] = [];
            result.forEach((value: PostComments) => {
                let postComment = new PostComments(
                    value.idUser,
                    value.idPost,
                    value.text,
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

