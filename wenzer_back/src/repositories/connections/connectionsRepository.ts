import { Connections } from "../../domain/conections";
import { IOrm } from "../orm/iorm";
import { Orm } from "../orm/orm";
import { IconnectionRepository } from "../connections/IconnectionsRepository";

export class ConnectionRepository extends Orm<Connections> implements IconnectionRepository, IOrm<Connections> {

    async validateObject(object: Connections):Promise<boolean> {
        let isValid = true;

        if (object.ID == null) {
            isValid = false;
        }

        return isValid;
    }
}