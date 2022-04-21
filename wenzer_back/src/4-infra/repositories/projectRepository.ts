import { Project } from "../../3-domain/entities/project";
import { IProjectRepository } from "../irepositories/IprojectRepository";
import { MongoClient } from "mongodb";
import { Orm } from "./orm";
import { Interests } from "../../3-domain/entities/interests";

const url: string = process.env.BASE_URL_DATABASE!;
const collection = "Project";
const database = "WenzerDB";

export class ProjectRepository extends Orm<Project> implements IProjectRepository {

    async getProjectsByUser(userId: string): Promise<Project[]> {
        var _self = this;
        return new Promise(function(resolve, reject){ 
            MongoClient.connect(url).then(function(db){
                var dbo = db.db(database);
                dbo.collection(collection).find({ userId }).toArray(function(err: any, results: any) {
                    const projects = _self.handleArrayResult(results);
                    resolve(projects);
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
                        $lookup: {
                            from: 'UserProjectGoodIdea',
                            localField: '_id',
                            foreignField: 'idProject',
                            as: 'userProjectGoodIdea'
                        }
                    },
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
                            countGoodIdea: { $size: "$userProjectGoodIdea" },
                            countFollowers: { $size: "$follower" }
                        }
                    }
                ])
                .sort({ userProjectGoodIdea: -1, follower: -1 })
                .limit(9).toArray(function(err: any, results: any) {
                    resolve(results);
                    db.close();
                });
            });
        });
    }

    async getProjectsByInterests(interests: string[]): Promise<Project[]> {
        var _self = this;
        return new Promise(function(resolve, reject){ 
            MongoClient.connect(url).then(function(db){
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
                ]).limit(5).toArray(function(err: any, results: any) {
                    const projects = _self.handleArrayResult(results);
                    resolve(projects);
                    db.close();
                });
            });
        });
    }

    async getProjectsMarketing(interests: string[]): Promise<Project[]> {
        var _self = this;
        return new Promise(function(resolve, reject){ 
            MongoClient.connect(url).then(function(db){
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
                ]).limit(5).toArray(function(err: any, results: any) {
                    const projects = _self.handleArrayResult(results);
                    resolve(projects);
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
                ]).toArray(function(err: any, results: any) {
                    if (results && results.length > 0) {
                        resolve(results[0]);
                    } else {
                        resolve({ count: 0 });
                    }
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
                            }
                        }
                    },
                    {
                        $count: "count"
                    }
                ]).toArray(function(err: any, results: any) {
                    if (results && results.length > 0) {
                        resolve(results[0]);
                    } else {
                        resolve({ count: 0 });
                    }
                    db.close();
                });
            });
        });
    }

    handleArrayResult(result: Project[]) {
        if (result && result instanceof Array && result.length > 0) {
            let projects: any[] = [];
            result.forEach((value: Project) => {
                let project = new Project(
                    value.name,
                    value.description,
                    value.photo,
                    value.active,
                    value.publicProject,
                    value.marketing,
                    value.userId,
                    value._id,
                    value.created_at,
                    value.updated_at
                );
                projects.push(project);
            });
            return projects;
        } 
        else {
            return [];
        }
    }

    handleResult(results: Project) {
        if(results && !(results instanceof Array)) {
            return new Project(
                results.name,
                results.description,
                results.photo,
                results.active,
                results.publicProject,
                results.marketing,
                results.userId,
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