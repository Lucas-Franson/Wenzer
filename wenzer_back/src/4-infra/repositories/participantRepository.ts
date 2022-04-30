import { MongoClient } from "mongodb";
import { Participants } from "../../3-domain/entities/participants";
import { IParticipantRepository } from "../irepositories/IparticipantRepository";
import { Orm } from "./orm";

const url: string = process.env.BASE_URL_DATABASE!;
const collection = "Participant";
const database = process.env.BASE_NAME_DATABASE!;

export class ParticipantRepository extends Orm<Participants> implements IParticipantRepository {

    handleArrayResult(result: Participants[]) {
        if (result && result instanceof Array && result.length > 0) {
            let participants: any[] = [];
            result.forEach((value: Participants) => {
                let participant = new Participants(
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

    handleResult(results: Participants) {
        if(results && !(results instanceof Array)) {
            return new Participants(
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