import { React } from "../../domain/react";
import { IOrm } from "../orm/iorm";
import { Orm } from "../orm/orm";
import { IReactRepository } from "./IreactRepository";

export class ReactRepository extends Orm<React> implements IReactRepository, IOrm<React> {
    
    async validateObject(object: React):Promise<boolean> {
        let isValid = true;

        if (object.ID == null) {
            isValid = false;
        }

        if (object.Type == null) {
            isValid = false;
        }

        return isValid;
    }
}