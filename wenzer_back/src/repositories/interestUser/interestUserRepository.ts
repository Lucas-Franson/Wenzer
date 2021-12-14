import { InterestUser } from "../../domain/interestUser";
import { IOrm } from "../orm/iorm";
import { Orm } from "../orm/orm";
import { IInterestUserRepository } from "./IinterestUserRepository";

export class InterestUserRepository extends Orm<InterestUser> implements IInterestUserRepository, IOrm<InterestUser> {
    
    async validateObject(object: InterestUser):Promise<boolean> {
        let isValid = true;

        if (object.id == null) {
            isValid = false;
        }

        return isValid;
    }
}