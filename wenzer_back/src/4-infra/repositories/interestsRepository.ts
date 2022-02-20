import { Interests } from "../../3-domain/entities/interests";
import { IOrm } from "../irepositories/Iorm";
import { Orm } from "./orm";
import { IInterestsRepository } from "../irepositories/IinterestsRepository";

export class InterestsRepository extends Orm<Interests> implements IInterestsRepository, IOrm<Interests> {
    
    async validateObject(object: Interests):Promise<boolean> {
        let isValid = true;

        if (object.id == null) {
            isValid = false;
        }

        if (object.name == null) {
            isValid = false;
        }

        return isValid;
    }
}