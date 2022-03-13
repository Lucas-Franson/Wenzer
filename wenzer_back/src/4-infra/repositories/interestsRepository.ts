import { Interests } from "../../3-domain/entities/interests";
import { Orm } from "./orm";
import { IInterestsRepository } from "../irepositories/IinterestsRepository";
import { InterestUser } from "../../3-domain/entities/interestUser";
import { queryPromise } from "../dbContext/conexao";
import { ProjectInterests } from "../../3-domain/entities/projectInterests";

export class InterestsRepository extends Orm<Interests> implements IInterestsRepository {
    
    private TABLENAME: string = 'Interests';

    async createLinkToUser(userInterests: InterestUser[]): Promise<void> {
        if (userInterests.length <= 0) throw new Error("Não possui interesse para criar relacionamento com usuário.");
        
        let sqlInsertInto = "INSERT INTO InterestUser (id, idInterests, idUser, created_at, updated_at) VALUES ";
        let sqlValues = "";

        userInterests.forEach((interest: InterestUser) => {
            sqlValues += sqlValues !== "" ? "," : "";
            sqlValues += `(
                ${interest._id.toSql()}, 
                ${interest._idInterests.toSql()},
                ${interest._idUser.toSql()},
                now(),
                now()
            )`;
        });

        if (sqlValues) {
            sqlInsertInto += sqlValues + ";";
            await queryPromise(sqlInsertInto);
        }
    }

    async deleteLinkToUser(userInterests: InterestUser[]): Promise<void> {
        if (userInterests.length <= 0) throw new Error("Não possui interesses para deletar.");
        
        let sql = "DELETE FROM InterestUser WHERE ";
        let whereClause = "";

        userInterests.forEach((interest) => {
            whereClause += whereClause == "" ? "" : " OR ";
            whereClause += ` id = ${interest._id.toSql()} `;
        });

        sql += whereClause;
        await queryPromise(sql);
    }

    async createLinkToProject(projectInterests: ProjectInterests[]): Promise<void> {
        if (projectInterests.length <= 0) throw new Error("Não possui interesse para criar relacionamento com projeto.");
        
        let sqlInsertInto = "INSERT INTO ProjectInterests (id, idProject, idInterests, created_at, updated_at) VALUES ";
        let sqlValues = "";

        projectInterests.forEach((interest: ProjectInterests) => {
            sqlValues += sqlValues !== "" ? "," : "";
            sqlValues += `(
                ${interest._id.toSql()}, 
                ${interest._idProject.toSql()},
                ${interest._idInterests.toSql()},
                now(),
                now()
            )`;
        });

        if (sqlValues) {
            sqlInsertInto += sqlValues + ";";
            await queryPromise(sqlInsertInto);
        }
    }

    async deleteLinkToProject(projectInterests: ProjectInterests[]): Promise<void> {
        if (projectInterests.length <= 0) throw new Error("Não possui interesses para deletar.");
        
        let sql = "DELETE FROM ProjectInterests WHERE ";
        let whereClause = "";

        projectInterests.forEach((interest) => {
            whereClause += whereClause == "" ? "" : " OR ";
            whereClause += ` id = ${interest._id.toSql()} `;
        });

        sql += whereClause;
        await queryPromise(sql);
    }

    async findLinkUserToInterests(userId: string): Promise<InterestUser[]> {
        
        const sql = `SELECT * FROM InterestUser WHERE idUser = ${userId.toSql()}`;
        let result: any = await queryPromise(sql);
        let arrInterestUser: InterestUser[] = [];
        if (result.length > 0) {
            result.forEach((interestUser: InterestUser) => {
                const obj = this.convertToObjectUser(interestUser);
                if (obj) {
                    arrInterestUser.push(obj);
                }
            });
        }
        return arrInterestUser;
    }

    async findLinkProjectToInterests(projectId: string): Promise<ProjectInterests[]> {
        
        const sql = `SELECT * FROM ProjectInterests WHERE idProject = ${projectId.toSql()}`;
        let result: any = await queryPromise(sql);
        let arrProjectInterests: ProjectInterests[] = [];
        if (result.length > 0) {
            result.forEach((projectInterest: ProjectInterests) => {
                const obj = this.convertToObjectProject(projectInterest);
                if (obj) {
                    arrProjectInterests.push(obj);
                }
            });
        }
        return arrProjectInterests;
    }

    async getInterestsByUser(idUser: string): Promise<{id: string, name: string}[]> {
        const sql = `
            SELECT i.id, i.name FROM Interests i
                INNER JOIN InterestUser iu ON i.id = iu.idInterests
            WHERE	
                iu.idUser = ${idUser.toSql()}
            `;
        const result: any = await queryPromise(sql);
        return result;
    }

    convertToObjectProject(interest: any): ProjectInterests | null {
        if (!interest) return null;

        return new ProjectInterests(
            interest?.idProject,
            interest?.idInterests,
            interest?.id,
            interest?.created_at,
            interest?.updated_at
        );
    }

    convertToObjectUser(interest: any): InterestUser | null {
        if (!interest) return null;

        return new InterestUser(
            interest?.idInterests,
            interest?.idUser,
            interest?.id,
            interest?.created_at,
            interest?.updated_at
        );
    }
    
}