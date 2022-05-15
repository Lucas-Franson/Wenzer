import { MongoClient } from "mongodb";
import { Participant } from "../../3-domain/entities/participant";
import { User } from "../../3-domain/entities/user";
import { IParticipantRepository } from "../irepositories/IparticipantRepository";
import { Orm } from "./orm";

const url: string = process.env.BASE_URL_DATABASE!;
const collection = "Participant";
const database = process.env.BASE_NAME_DATABASE!;

export class ParticipantRepository extends Orm<Participant> implements IParticipantRepository {
    
    getParticipants(_id: string): Promise<User[]> {
        var _self = this;
        return new Promise(function(resolve, reject){ 
            MongoClient.connect(url).then(function(db){
                var dbo = db.db(database);
                dbo.collection(collection).aggregate([
                    // Escrever a estrutura de filtro
                ]).toArray(function(err: any, results: any) {
                    let interestUser = _self.handleArrayResult(results);
                    resolve(interestUser);
                    db.close();
                });
            });
        });
    }

    async getByProjectAndUser(idProject: string, idUserRequest: string): Promise<Participant> {
        var _self = this;
        return new Promise(function(resolve, reject){ 
            MongoClient.connect(url).then(function(db){
                var dbo = db.db(database);
                dbo.collection(collection).findOne({ idProject, idUser: idUserRequest }, function(err: any, results: any) {
                    let interestUser = _self.handleResult(results);
                    resolve(interestUser!);
                    db.close();
                });
            });
        });
    }

    async updateParticipant(participantRequest: any): Promise<void> {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db?.db(database);
            dbo?.collection(collection).updateOne({ idProject: participantRequest.idProject, idUser: participantRequest.idUser }, { $set: participantRequest }, function(err, res) {
                if (err) throw err;
                db?.close();
            });
        });
    }

    async removeParticipant(participantRequest: any): Promise<void> {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db?.db(database);
            dbo?.collection(collection).deleteOne({ idProject: participantRequest.idProject, idUser: participantRequest.idUser }, function(err: any, results: any) {
                db?.close();
            });
        });
    }

    async requestParticipant(participant: any): Promise<void> {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db?.db(database);
            dbo?.collection(collection).insertOne(participant, function(err: any, results: any) {
                db?.close();
            });
        });
    }

    handleArrayResult(result: Participant[]) {
        if (result && result instanceof Array && result.length > 0) {
            let participants: any[] = [];
            result.forEach((value: Participant) => {
                let participant = new Participant(
                    value.idProject,
                    value.idUser,
                    value.accepted,
                    value.role,
                    value._id,
                    value.created_at,
                    value.updated_at
                );
                participants.push(participant);
            });
            return participants;
        } 
        else {
            return [];
        }
    }

    handleResult(results: Participant) {
        if(results && !(results instanceof Array)) {
            return new Participant(
                results.idProject,
                results.idUser,
                results.accepted,
                results.role,
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