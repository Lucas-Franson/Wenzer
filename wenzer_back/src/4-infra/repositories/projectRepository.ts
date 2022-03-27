import { Project } from "../../3-domain/entities/project";
import { Orm } from "./orm";
import { IProjectRepository } from "../irepositories/IprojectRepository";
import { queryPromise } from "../dbContext/conexao";

export class ProjectRepository extends Orm<Project> implements IProjectRepository {

    async getProjectsByUser(userId: string) {
        const sql = `
            SELECT * FROM Project
            WHERE userId = ${userId.toSql()}
        `;
        const result:any = await queryPromise(sql);
        return result;
    }

    async getAllProjectsInHigh() {
        const sql = `
            SELECT pj.*, COUNT(fl.id) as CountOfActions FROM Project pj
                LEFT OUTER JOIN Followers fl ON pj.id = fl.idProject
            WHERE 
                fl.created_at BETWEEN 
                    DATE_ADD(NOW(), INTERVAL -24 HOUR) AND NOW()
            GROUP BY pj.id
            ORDER BY CountOfActions DESC
            LIMIT 10
            `;
        const result: any = await queryPromise(sql);
        let projects: Project[] = [];
        if (result.length > 0) {
            result.forEach((project: any) => {
                if (project)
                    projects.push(this.convertToProjectObject(project)!);
            });
        }
        return projects;
    }

    async getProjectsByInterests(interests: { id: string; name: string; }[]): Promise<Project[]> {
        let where = '';

        interests.forEach((interest) => {
            where += where === '' ? '' : ', ';
            where += interest.id.toSql();
        });

        const sql = `
            SELECT pr.* FROM Project pr
                INNER JOIN ProjectInterests ip ON pr.id = ip.idProject
            WHERE
                ip.idInterests in (${where})
            LIMIT 5
        `;

        if (where != '') {
            var result:any = await queryPromise(sql);
            return result;
        }

        return [];
    }

    async getProjectsMarketing(interests: { id: string; name: string; }[]): Promise<Project[]> {
        let where = '';

        interests.forEach((interest) => {
            where += where === '' ? '' : ', ';
            where += interest.id.toSql();
        });

        const sql = `
            SELECT pr.* FROM Project pr
                INNER JOIN ProjectInterests ip ON pr.id = ip.idProject
            WHERE
                ip.idInterests in (${where}) AND
                pr.marketing = 1
            LIMIT 5
        `;

        if (where != '') {
            var result:any = await queryPromise(sql);
            return result;
        }

        return [];
    }

    async getCountProjectsByUser(idUser: string) {
        const sql = `SELECT COUNT(id) as count FROM Project WHERE userId = ${idUser.toSql()}`;
        const result:any = await queryPromise(sql);
        return result[0];
    }

    async getCountParticipatingByUser(idUser: string) {
        const sql = `
            SELECT COUNT(pj.id) as count FROM Project pj
            INNER JOIN Participants pt ON pj.id = pt.idProject
            WHERE
                idUser = ${idUser.toSql()}
        `;
        const result:any = await queryPromise(sql);
        return result[0];
    }
    
    convertToProjectObject(project: any): Project | null {
        if (!project) return null;

        return new Project(
            project?.name,
            project?.description,
            project?.photo,
            project?.active,
            project?.publicProject,
            project?.marketing,
            project?.userId,
            project?.id,
            project?.created_at,
            project?.updated_at
        );
    }

}