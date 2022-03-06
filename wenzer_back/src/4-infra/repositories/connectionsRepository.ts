import { Connections } from "../../3-domain/entities/conections";
import { IOrm } from "../irepositories/Iorm";
import { Orm } from "./orm";
import { IConnectionRepository } from "../irepositories/IconnectionsRepository";

export class ConnectionRepository extends Orm<Connections> implements IConnectionRepository {

    async validateObject(object: Connections):Promise<boolean> {
        let isValid = true;

        if (object._id == null) {
            isValid = false;
        }

        return isValid;
    }
}