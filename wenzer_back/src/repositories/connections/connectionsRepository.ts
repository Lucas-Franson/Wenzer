import { Connections } from "../../domain/conections";
import { IOrm } from "../orm/iorm";
import { Orm } from "../orm/orm";
import { IConnectionRepository } from "../connections/IconnectionsRepository";

export class ConnectionRepository extends Orm<Connections> implements IConnectionRepository, IOrm<Connections> {

    async validateObject(object: Connections):Promise<boolean> {
        let isValid = true;

        if (object.id == null) {
            isValid = false;
        }

        return isValid;
    }
}