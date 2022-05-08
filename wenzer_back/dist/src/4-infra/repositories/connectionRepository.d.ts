import { Connections } from "../../3-domain/entities/conections";
import { Orm } from "./orm";
import { IConnectionRepository } from "../irepositories/IconnectionRepository";
export declare class ConnectionRepository extends Orm<Connections> implements IConnectionRepository {
    getConnectionOfUser(idUser: string): Promise<any>;
    alreadyConnected(idUserServer: string, idUser: string): Promise<boolean>;
    handleArrayResult(result: Connections[]): any[];
    handleResult(results: Connections): Connections | null;
}
