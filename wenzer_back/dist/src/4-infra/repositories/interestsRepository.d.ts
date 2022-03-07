import { Interests } from "../../3-domain/entities/interests";
import { Orm } from "./orm";
import { IInterestsRepository } from "../irepositories/IinterestsRepository";
import { InterestUser } from "../../3-domain/entities/interestUser";
export declare class InterestsRepository extends Orm<Interests> implements IInterestsRepository {
    private TABLENAME;
    createLinkToUser(userInterests: InterestUser[]): Promise<void>;
    findLinkUserToInterests(userId: string): Promise<InterestUser[]>;
    convertToObjectUser(interest: any): InterestUser | null;
}
