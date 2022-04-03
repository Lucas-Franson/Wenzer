import { Project } from "../../3-domain/entities/project";
import { Orm } from "./orm";
import { IProjectRepository } from "../irepositories/IprojectRepository";
import { queryPromise } from "../dbContext/conexao";
import { MongoClient } from "mongodb";

const url: string = process.env.BASE_URL_DATABASE!;
const collection = "Project";
const database = "WenzerDB";

export class ProjectRepository implements IProjectRepository {
    
    async getByWhereClause(whereClause: string): Promise<Project[]> {
        throw new Error("Method not implemented.");
    }

    async getById(id: string): Promise<Project | null> {
        throw new Error("Method not implemented.");
    }
    
    async insert(object: Project): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async update(object: Project): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    async delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async getProjectsByUser(userId: string): Promise<Project[]> {
        return new Promise(function(resolve, reject){ 
            MongoClient.connect(url).then(function(db){
                var dbo = db.db(database);
                dbo.collection(collection).findOne({ userId }, {}).then(function(results: any) {
                    resolve(results);
                    db.close();
                });
            });
        });
    }

    async getAllProjectsInHigh(): Promise<Project[]> {

        return new Promise(function(resolve, reject){ 
            MongoClient.connect(url).then(function(db){
                var dbo = db.db(database);
                dbo.collection(collection).aggregate([
                    {
                        $group: {
                            id: "$id",
                            name: "$name",
                            photo: "$photo",
                            countOfGoodIdea: {
                                $count: {
                                    from: 'UserProjectGoodIdea',
                                    localField: 'idProject',
                                    foreignField: 'id',
                                    as: 'countOfGoodIdea'
                                },
                            },
                            countOfActions: {
                                $count: {
                                    from: 'Follower',
                                    localField: 'idProject',
                                    foreignField: 'id',
                                    as: 'countOfActions'
                                }
                            }
                        } 
                    }
                ]).sort({ countOfGoodIdea: -1, countOfActions: -1 }).limit(9).toArray(function(results: any) {
                    resolve(results);
                    db.close();
                });
            });
        });
    }

    async getProjectsByInterests(interests: { id: string; name: string; }[]): Promise<Project[]> {
        return new Promise(function(resolve, reject){ 
            MongoClient.connect(url).then(function(db){
                var dbo = db.db(database);
                dbo.collection(collection).aggregate([
                    {
                        $lookup: {
                            from: 'ProjectInterest',
                            localField: 'idProject',
                            foreignField: 'id',
                            as: 'projectInterest'
                        }
                    },
                    {
                        $match: {
                            projectInterest: {
                                id: interests
                            }
                        }
                    }
                ]).limit(5).toArray(function(results: any) {
                    resolve(results);
                    db.close();
                });
            });
        });
    }

    async getProjectsMarketing(interests: { id: string; name: string; }[]): Promise<Project[]> {
        return new Promise(function(resolve, reject){ 
            MongoClient.connect(url).then(function(db){
                var dbo = db.db(database);
                dbo.collection(collection).aggregate([
                    {
                        $lookup: {
                            from: 'ProjectInterest',
                            localField: 'idProject',
                            foreignField: 'id',
                            as: 'projectInterest'
                        }
                    },
                    {
                        $match: {
                            projectInterest: {
                                id: interests
                            },
                            marketing: 1
                        }
                    }
                ]).limit(5).toArray(function(results: any) {
                    resolve(results);
                    db.close();
                });
            });
        });
    }

    async getCountProjectsByUser(idUser: string): Promise<{ count: number }> {
        return new Promise(function(resolve, reject){ 
            MongoClient.connect(url).then(function(db){
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
                ]).toArray(function(results: any) {
                    resolve(results);
                    db.close();
                });
            });
        });
    }

    async getCountParticipatingByUser(idUser: string): Promise<{ count: number }> {
        return new Promise(function(resolve, reject){ 
            MongoClient.connect(url).then(function(db){
                var dbo = db.db(database);
                dbo.collection(collection).aggregate([
                    {
                        $lookup: {
                            from: 'Participant',
                            localField: 'idProject',
                            foreignField: 'id',
                            as: 'participant'
                        }
                    },
                    {
                        $match: {
                            participant: {
                                userId: idUser
                            }
                        }
                    },
                    {
                        $count: "count"
                    }
                ]).toArray(function(results: any) {
                    resolve(results);
                    db.close();
                });
            });
        });
    }

}