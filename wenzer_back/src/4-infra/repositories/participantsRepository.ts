import { Participants } from "../../3-domain/entities/participants";
import { IOrm } from "../irepositories/Iorm";
import { Orm } from "./orm";
import { IParticipantsRepository } from "../irepositories/IparticipantsRepository";

export class ParticipantsRepository extends Orm<Participants> implements IParticipantsRepository {
    
}