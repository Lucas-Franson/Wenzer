import { User } from "../../3-domain/entities/user";
import { IUserRepository } from "../irepositories/IuserRepository";
import { v4 as uuid } from 'uuid';
import { Db, MongoClient } from "mongodb";
import { Orm } from "./orm";
import { NotificationType } from "../../1-presentation/viewmodel/NotificationViewModel";
import { Connections } from "../../3-domain/entities/conections";

const url: string = process.env.BASE_URL_DATABASE!;
const collection = "User";
const database = process.env.BASE_NAME_DATABASE!;

export default class UserRepository extends Orm<User> implements IUserRepository {
    
    async setPostAsGoodIdea(postGoodIdea: any) {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db?.db(database);
            postGoodIdea._id = uuid();
            postGoodIdea.created_at = new Date();
            postGoodIdea.updated_at = new Date();
            dbo?.collection("UserPostGoodIdea").insertOne(postGoodIdea, function(err, res) {
                if (err) throw err;
                db?.close();
            });
        });
    }

    async removePostAsGoodIdea(idUser: string, idPost: string) {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db?.db(database);
            dbo?.collection("UserPostGoodIdea").deleteOne({ idUser, idPost }, function(err, res) {
                if (err) throw err;
                db?.close();
            });
        });
    }

    async getAllUsersByArrOfIds(idUserArr: string[]): Promise<User[]> {
        return new Promise(function(resolve, reject){ 
            MongoClient.connect(url).then(function(db){
                var dbo = db.db(database);
                dbo.collection(collection).find({ _id: { $in: idUserArr }}).toArray(function(err: any, results: any) {
                    resolve(results);
                    db.close();
                });
            });
        });
    }

    async getFriendRequest(userId: string): Promise<{ _id: string; created_at: Date; name: string; }[]> {
        return new Promise(function(resolve, reject){ 
            MongoClient.connect(url).then(function(db){
                var dbo = db.db(database);
                dbo.collection("Connection").aggregate([
                    {
                        $lookup: {
                            from: 'User',
                            localField: 'idFollower',
                            foreignField: '_id',
                            as: 'user'
                        }
                    },
                    {
                        $unwind: "$user"
                    },
                    {
                        $match: {
                            idUser: userId,
                            accepted: false
                        }
                    },
                    {
                        $project: {
                            _id: "$user._id",
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

    async getNotificationSeen(userId: string, type: NotificationType): Promise<{ idNotification: string }[]> {
        return new Promise(function(resolve, reject){ 
            MongoClient.connect(url).then(function(db){
                var dbo = db.db(database);
                dbo.collection("UserNotificationSeen").aggregate([
                    { 
                        $match: {
                            idUser: userId, 
                            type: type 
                        }
                    }, 
                    { 
                        $project: {
                            _id: 0,
                            idNotification: 1
                        }
                    }
                ]).toArray(function(err: any, results: any) {
                    resolve(results);
                    db.close();
                });
            });
        });
    }

    async insertUser(object: any): Promise<string> {
        return new Promise(function(resolve, reject){ 
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db?.db(database);
                object._id = uuid();
                object.created_at = new Date();
                object.updated_at = new Date();
                dbo?.collection("User").insertOne(object, function(err, res) {
                    if (err) throw err;
                    resolve(object._id);
                    db?.close();
                });
            });
        });
    }

    updateConnection(connection: Connections): void {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db?.db(database);
            connection.updated_at = new Date();
            dbo?.collection("Connection").updateOne({ _id: connection._id }, { $set: connection }, function(err, res) {
                if (err) throw err;
                db?.close();
            });
        });
    }

    setNotificationSeen(userId: string, type: NotificationType, idNotification: string): void {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db?.db(database);
            let data: any = { _id: uuid(), idUser: userId, type, idNotification };
            dbo?.collection("UserNotificationSeen").insertOne(data, function(err, res) {
                if (err) throw err;
                db?.close();
            });
        });
    }

    async search(userId: string, search: string): Promise<User[]> {
        return new Promise(function(resolve, reject){ 
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db?.db(database);
                dbo?.collection(collection).find({ 
                    $or: [ 
                        { 
                            name: new RegExp(["(", search.split(" ").join("|"), ")"].join(""), "i")
                        }, 
                        { 
                            lastName: new RegExp(["(", search.split(" ").join("|"), ")"].join(""), "i")
                        } 
                    ],
                    _id: { $ne: userId }
                }).project({ _id: 1, name: 1, lastName: 1, bio: 1, photo: 1 }).toArray(function(err: any, results: any) {
                    resolve(results);
                    db?.close();
                });
            });
        });
    }

    // WEB SERVICE
    getByIdWebService(userId: string, dbo: Db): Promise<User | null> {
        var _self = this;
        return new Promise(function(resolve, reject){ 
            dbo.collection(collection).findOne({ _id: userId }, {}).then(function(results: any) {
                const result = _self.handleResult(results);
                resolve(result);
            });
        });
    }

    getFriendRequestWebService(dbo: Db, idUser: string, idNotifications: string[]): Promise<number> {
        return new Promise(function(resolve, reject){ 
            dbo.collection("Connection").aggregate([
                {
                    $match: {
                        _id: {
                            $nin: idNotifications
                        },
                        accepted: false,
                        idUser: idUser
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

    async getNotificationSeenWebSocket(dbo: Db, userId: string, type: NotificationType): Promise<{ idNotification: string }[]> {
        return new Promise(function(resolve, reject){ 
            dbo.collection("UserNotificationSeen").aggregate([
                { 
                    $match: {
                        idUser: userId, 
                        type: type 
                    }
                },
                {
                    $project: {
                        _id: 0,
                        idNotification: 1
                    }
                }
            ]).toArray(function(err: any, results: any) {
                resolve(results);
            });
        });
    }

    // HANDLE METHODS
    handleArrayResult(result: User[]) {
        if (result && result instanceof Array && result.length > 0) {
            let users: any[] = [];
            result.forEach((value: User) => {
                let user = new User(
                    value.name,
                    value.lastName,
                    value.email,
                    value.password,
                    value.university,
                    value.title,
                    value.photo,
                    value.bio,
                    value.hasCompany,
                    value.emailValid,
                    value._id,
                    value.created_at,
                    value.updated_at
                );
                users.push(user);
            });
            return users;
        } 
        else {
            return [];
        }
    }

    handleResult(results: User): User | null {
        if(results && !(results instanceof Array)) {
            return new User(
                results.name,
                results.lastName,
                results.email,
                results.password,
                results.university,
                results.title,
                results.photo,
                results.bio,
                results.hasCompany,
                results.emailValid,
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
