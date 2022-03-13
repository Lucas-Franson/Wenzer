import { Connections } from "../../3-domain/entities/conections";
import { IOrm } from "./Iorm";

export interface IConnectionRepository extends IOrm<Connections> {
    convertToConnectionObject(connection: any): Connections | null;
    getConnectionOfUser(idUser: string): Promise<any>;
}