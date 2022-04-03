import { User } from "../../3-domain/entities/user";
import { IUserRepository } from "../irepositories/IuserRepository";
import { v4 as uuid } from 'uuid';
import { MongoClient } from "mongodb";

const url: string = process.env.BASE_URL_DATABASE!;
const collection = "User";
const database = "WenzerDB";

export default class UserRepository implements IUserRepository {

    async getByWhereClause(where: any): Promise<User[]> {
        return new Promise(function(resolve, reject){ 
            MongoClient.connect(url).then(function(db){
                var dbo = db.db(database);
                dbo.collection(collection).findOne(where, {}).then(function(results: any) {
                    resolve(results);
                    db.close();
                });
            });
        });
    }

    async getById(id: string): Promise<User | null> {
        return new Promise(function(resolve, reject){ 
            MongoClient.connect(url).then(function(db){
                var dbo = db.db(database);
                dbo.collection(collection).findOne({ id }, {}).then(function(results: any) {
                    resolve(results);
                    db.close();
                });
            });
        });
    }

    async insert(user: any) {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db?.db(database);
            dbo?.collection(collection).insertOne(user, function(err, res) {
                if (err) throw err;
                db?.close();
            });
        });
    }

    async update(user: any) {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db?.db(database);
            dbo?.collection(collection).updateOne({ id: user.id }, user, function(err, res) {
                if (err) throw err;
                db?.close();
            });
        });
    }

    async delete(user: any) {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db?.db(database);
            dbo?.collection(collection).deleteOne({ id: user.id }, function(err, res) {
                if (err) throw err;
                db?.close();
            });
        });
    }

    async setPostAsGoodIdea(idUser: string, idPost: string) {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db?.db(database);
            let data = { id: uuid(), idUser, idPost, created_at: new Date(), updated_at: new Date() };
            dbo?.collection("UserPostGoodIdea").insertOne(data, function(err, res) {
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

    async getAllUsersByArrOfIds(idUserArr: { id: string }[]): Promise<User[]> {
        return new Promise(function(resolve, reject){ 
            MongoClient.connect(url).then(function(db){
                var dbo = db.db(database);
                dbo.collection(collection).findOne(idUserArr, {}).then(function(results: any) {
                    resolve(results);
                    db.close();
                });
            });
        });
    }

}
