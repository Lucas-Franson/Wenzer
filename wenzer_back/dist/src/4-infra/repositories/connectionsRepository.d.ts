import { Connections } from "../../3-domain/entities/conections";
import { Orm } from "./orm";
import { IConnectionRepository } from "../irepositories/IconnectionsRepository";
export declare class ConnectionRepository extends Orm<Connections> implements IConnectionRepository {
    validateObject(object: Connections): Promise<boolean>;
}
