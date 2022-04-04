import { User } from "../../3-domain/entities/user";
import { IUserRepository } from "../irepositories/IuserRepository";
import { v4 as uuid } from 'uuid';
import { MongoClient } from "mongodb";
import { Orm } from "./orm";

const url: string = process.env.BASE_URL_DATABASE!;
const collection = "User";
const database = "WenzerDB";

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

    handleArrayResult(result: User[]) {
        if (result && result instanceof Array && result.length > 0) {
            let users: any[] = [];
            result.forEach((value: User) => {
                let user = new User(
                    value.name,
                    value.email,
                    value.password,
                    value.title,
                    value.photo,
                    value.bio,
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
                results.email,
                results.password,
                results.title,
                results.photo,
                results.bio,
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
