import { Participants } from "../../3-domain/entities/participants";
import { IOrm } from "./Iorm";
export interface IParticipantRepository extends IOrm<Participants> {
}
