import { Connections } from "../../3-domain/entities/conections";
import { IOrm } from "./Iorm";

export interface IConnectionRepository extends IOrm<Connections> {
    getConnectionOfUser(idUser: string): Promise<any>;
    alreadyConnected(idUserServer: string, idUser: string): Promise<boolean>;
}