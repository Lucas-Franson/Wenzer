import { Participants } from "../../3-domain/entities/participants";
import { IOrm } from "../irepositories/Iorm";
import { Orm } from "./orm";
import { IParticipantsRepository } from "../irepositories/IparticipantsRepository";

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