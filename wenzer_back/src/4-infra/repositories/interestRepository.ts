import { Interests } from "../../3-domain/entities/interests";
import { Orm } from "./orm";
import { IInterestRepository } from "../irepositories/IinterestRepository";
import { InterestUser } from "../../3-domain/entities/interestUser";
import { ProjectInterests } from "../../3-domain/entities/projectInterests";
import { MongoClient } from "mongodb";

const url: string = process.env.BASE_URL_DATABASE!;
const collection = "Interest";
const database = "WenzerDB";

export class InterestRepository extends Orm<Interests> implements IInterestRepository {

    async createLinkToUser(userInterests: any[]): Promise<void> {
        if (userInterests.length <= 0) throw new Error("Não possui interesse para criar relacionamento com usuário.");

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db?.db(database);
            dbo?.collection("InterestUser").insertMany(userInterests, function(err, res) {
                if (err) throw err;
                db?.close();
            });
        });
    }

    async deleteLinkToUser(userInterests: string[]): Promise<void> {
        if (userInterests.length <= 0) throw new Error("Não possui interesses para deletar.");

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db?.db(database);
            dbo?.collection("InterestUser").deleteMany({ _id: { $in: userInterests } }, function(err, res) {
                if (err) throw err;
                db?.close();
            });
        });
    }

    async createLinkToProject(projectInterests: any[]): Promise<void> {
        if (projectInterests.length <= 0) throw new Error("Não possui interesse para criar relacionamento com projeto.");

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db?.db(database);
            dbo?.collection("ProjectInterest").insertMany(projectInterests, function(err, res) {
                if (err) throw err;
                db?.close();
            });
        });
    }

    async deleteLinkToProject(projectInterests: string[]): Promise<void> {
        if (projectInterests.length <= 0) throw new Error("Não possui interesses para deletar.");

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db?.db(database);
            dbo?.collection("ProjectInterest").deleteMany({ _id: { $in: projectInterests } }, function(err, obj) {
                if (err) throw err;
                db?.close();
            });
        });
    }

    async findLinkUserToInterests(userId: string): Promise<InterestUser[]> {
        var _self = this;
        return new Promise(function(resolve, reject){ 
            MongoClient.connect(url).then(function(db){
                var dbo = db.db(database);
                dbo.collection('InterestUser').find({ idUser: userId }).toArray(function(err: any, results: any) {
                    let interestUser = _self.handleInterestUserArrayResult(results);
                    resolve(interestUser);
                    db.close();
                });
            });
        });
    }

    async findLinkProjectToInterests(projectId: string): Promise<ProjectInterests[]> {
        var _self = this;
        return new Promise(function(resolve, reject){ 
            MongoClient.connect(url).then(function(db){
                var dbo = db.db(database);
                dbo.collection('ProjectInterest').find({ idProject: projectId }).toArray(function(err: any, results: any) {
                    let projectInterest = _self.handleProjectInterestArrayResult(results);
                    resolve(projectInterest);
                    db.close();
                });
            });
        });
    }

    async getInterestsByUser(idUser: string): Promise<Interests[]> {
        return new Promise(function(resolve, reject){ 
            MongoClient.connect(url).then(function(db){
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
                ]).toArray(function(err: any, results: any) {
                    resolve(results);
                    db.close();
                });
            });
        });
    }

    async getInterestsByProject(idProject: string): Promise<Interests[]> {
        return new Promise(function(resolve, reject){ 
            MongoClient.connect(url).then(function(db){
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
                ]).toArray(function(err: any, results: any) {
                    resolve(results);
                    db.close();
                });
            });
        });
    }

    handleArrayResult(result: Interests[]) {
        if (result && result instanceof Array && result.length > 0) {
            let interests: any[] = [];
            result.forEach((value: Interests) => {
                let interest = new Interests(
                    value.name,
                    value._id,
                    value.created_at,
                    value.updated_at
                );
                interests.push(interest);
            });
            return interests;
        } 
        else {
            return [];
        }
    }

    handleResult(results: Interests): Interests | null {
        if(results && !(results instanceof Array)) {
            return new Interests(
                results.name,
                results._id,
                results.created_at,
                results.updated_at
            );
        }
        else {
            return null;
        }
    }

    handleInterestUserArrayResult(results: InterestUser[]) {
        if (results && results instanceof Array && results.length > 0) {
            let interestUsers: any[] = [];
            results.forEach((value: InterestUser) => {
                let interestUser = new InterestUser(
                    value.idInterest,
                    value.idUser,
                    value._id,
                    value.created_at,
                    value.updated_at
                );
                interestUsers.push(interestUser);
            });
            return interestUsers;
        } 
        else {
            return [];
        }
    }

    handleProjectInterestArrayResult(results: ProjectInterests[]) {
        if (results && results instanceof Array && results.length > 0) {
            let projectInterests: any[] = [];
            results.forEach((value: ProjectInterests) => {
                let projectInterest = new ProjectInterests(
                    value.idProject,
                    value.idInterests,
                    value._id,
                    value.created_at,
                    value.updated_at
                );
                projectInterests.push(projectInterest);
            });
            return projectInterests;
        } 
        else {
            return [];
        }
    }
    
}