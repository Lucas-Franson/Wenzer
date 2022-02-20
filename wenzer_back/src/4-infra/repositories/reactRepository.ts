import { React } from "../../3-domain/entities/react";
import { IOrm } from "../irepositories/Iorm";
import { Orm } from "./orm";
import { IReactRepository } from "../irepositories/IreactRepository";

export class ReactRepository extends Orm<React> implements IReactRepository, IOrm<React> {
    
    async validateObject(object: React):Promise<boolean> {
        let isValid = true;

        if (object.id == null) {
            isValid = false;
        }

        if (object.type == null) {
            isValid = false;
        }

        return isValid;
    }
}