import { Participant } from "../../3-domain/entities/participant";
import { User } from "../../3-domain/entities/user";
import { IParticipantRepository } from "../irepositories/IparticipantRepository";
import { Orm } from "./orm";
export declare class ParticipantRepository extends Orm<Participant> implements IParticipantRepository {
    getParticipants(_id: string): Promise<User[]>;
    getByProjectAndUser(idProject: string, idUserRequest: string): Promise<Participant>;
    updateParticipant(participantRequest: any): Promise<void>;
    removeParticipant(participantRequest: any): Promise<void>;
    requestParticipant(participant: any): Promise<void>;
    handleArrayResult(result: Participant[]): any[];
    handleResult(results: Participant): Participant | null;
}
