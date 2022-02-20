import { InterestUser } from "../../3-domain/entities/interestUser";
import { IOrm } from "../irepositories/Iorm";
import { Orm } from "./orm";
import { IInterestUserRepository } from "../irepositories/IinterestUserRepository";

export class InterestUserRepository extends Orm<InterestUser> implements IInterestUserRepository, IOrm<InterestUser> {
    
    async validateObject(object: InterestUser):Promise<boolean> {
        let isValid = true;

        if (object.id == null) {
            isValid = false;
        }

        return isValid;
    }
}