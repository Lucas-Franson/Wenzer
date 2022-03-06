import { Interests } from "../../3-domain/entities/interests";
import { Orm } from "./orm";
import { IInterestsRepository } from "../irepositories/IinterestsRepository";
import { InterestUser } from "../../3-domain/entities/interestUser";
import { queryPromise } from "../dbContext/conexao";

export class InterestsRepository extends Orm<Interests> implements IInterestsRepository {
    
    private TABLENAME: string = 'Interests';

    async createLinkToUser(userInterests: InterestUser[]): Promise<void> {
        
        let sqlInsertInto = "INSERT INTO InterestUser (id, idInterests, idUser, created_at, updated_at) VALUES ";
        let sqlValues = "";

        userInterests.forEach((interest: InterestUser) => {
            sqlValues += sqlValues !== "" ? "," : "";
            sqlValues += `(
                ${interest._id.toSql()}, 
                ${interest._idInterests.toSql()},
                ${interest._idUser.toSql()},
                ${interest._created_at.toSql()},
                ${interest._updated_at.toSql()}
            )`;
        });

        if (sqlValues) {
            sqlInsertInto += sqlValues + ";";
            await queryPromise(sqlInsertInto);
        }
    }

    async findLinkUserToInterests(userId: string): Promise<InterestUser[]> {
        
        const sql = `SELECT * FROM InterestUser WHERE idUser = ${userId}`;
        let result: any = await queryPromise(sql);
        let arrInterestUser: InterestUser[] = [];
        if (result) {
            result.array.forEach((interestUser: InterestUser) => {
                const obj = this.convertToObjectUser(interestUser);
                if (obj) {
                    arrInterestUser.push(obj);
                }
            });
        }
        return arrInterestUser;
    }

    convertToObjectUser(interest: InterestUser): InterestUser | null {
        
        if (!interest) return null;

        return new InterestUser(
            interest?._idInterests,
            interest?._idUser,
            interest?._id,
            interest?._created_at,
            interest?._updated_at
        );
    }
    
}