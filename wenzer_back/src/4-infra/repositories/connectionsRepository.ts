import { Connections } from "../../3-domain/entities/conections";
import { IOrm } from "../irepositories/Iorm";
import { Orm } from "./orm";
import { IConnectionRepository } from "../irepositories/IconnectionsRepository";
import { queryPromise } from "../dbContext/conexao";

export class ConnectionsRepository extends Orm<Connections> implements IConnectionRepository {
    
    getConnectionOfUser(idUser: string): Promise<any> {
        const sql = `
        SELECT us.id, us.name, us.photo FROM User us
                INNER JOIN Connections cnn ON us.id = cnn.idUser
            WHERE cnn.idFollower = ${idUser.toSql()}
            ORDER BY cnn.created_at ASC
            LIMIT 3
        `;
        return queryPromise(sql)!;
    }
    
    convertToConnectionObject(connection: any): Connections | null {
        if (!connection) return null;

        return new Connections(
            connection?.idUser,
            connection?.idFollower,
            connection?.accepted,
            connection?.id,
            connection?.created_at,
            connection?.updated_at
        )
    }

    async validateObject(object: Connections):Promise<boolean> {
        let isValid = true;

        if (object._id == null) {
            isValid = false;
        }

        return isValid;
    }
}