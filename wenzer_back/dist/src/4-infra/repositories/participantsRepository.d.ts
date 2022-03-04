import { Participants } from "../../3-domain/entities/participants";
import { Orm } from "./orm";
import { IParticipantsRepository } from "../irepositories/IparticipantsRepository";
export declare class ParticipantsRepository extends Orm<Participants> implements IParticipantsRepository {
}
