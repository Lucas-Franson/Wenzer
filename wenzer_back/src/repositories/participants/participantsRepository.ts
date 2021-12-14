import { Participants } from "../../domain/participants";
import { IOrm } from "../orm/iorm";
import { Orm } from "../orm/orm";
import { IParticipantsRepository } from "./IparticipantsRepository";

export class ParticipantsRepository extends Orm<Participants> implements IParticipantsRepository, IOrm<Participants> {
    
    async validateObject(object: Participants):Promise<boolean> {
        let isValid = true;

        if (object.id == null) {
            isValid = false;
        }

        if (object.active == null) {
            isValid = false;
        }

        return isValid;
    }
}