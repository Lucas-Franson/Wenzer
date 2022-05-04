import { Participants } from "../../3-domain/entities/participants";
import { IParticipantRepository } from "../irepositories/IparticipantRepository";
import { Orm } from "./orm";
export declare class ParticipantRepository extends Orm<Participants> implements IParticipantRepository {
    handleArrayResult(result: Participants[]): any[];
    handleResult(results: Participants): Participants | null;
}
