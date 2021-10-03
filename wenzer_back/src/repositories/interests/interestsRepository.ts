import { Interests } from "../../domain/interests";
import { IOrm } from "../orm/iorm";
import { Orm } from "../orm/orm";
import { IInterestsRepository } from "./IinterestsRepository";

export class InterestsRepository extends Orm<Interests> implements IInterestsRepository, IOrm<Interests> {
    
    async validateObject(object: Interests):Promise<boolean> {
        let isValid = true;

        if (object.ID == null) {
            isValid = false;
        }

        if (object.Name == null) {
            isValid = false;
        }

        return isValid;
    }
}