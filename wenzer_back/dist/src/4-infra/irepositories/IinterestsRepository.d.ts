import { Interests } from "../../3-domain/entities/interests";
import { InterestUser } from "../../3-domain/entities/interestUser";
import { IOrm } from "./Iorm";
export interface IInterestsRepository extends IOrm<Interests> {
    createLinkToUser(userInterests: InterestUser[]): Promise<void>;
    findLinkUserToInterests(userId: string): Promise<InterestUser[]>;
}
