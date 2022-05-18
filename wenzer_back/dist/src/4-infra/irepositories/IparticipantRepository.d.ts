import { Participant } from "../../3-domain/entities/participant";
import { User } from "../../3-domain/entities/user";
import { IOrm } from "./Iorm";
export interface IParticipantRepository extends IOrm<Participant> {
    getParticipants(_id: string): Promise<User[]>;
    getByProjectAndUser(idProject: string, idUserRequest: string): Promise<Participant>;
    updateParticipant(participantRequest: any): Promise<void>;
    removeParticipant(participantRequest: any): Promise<void>;
    requestParticipant(participant: any): Promise<void>;
}
