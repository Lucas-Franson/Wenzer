import { Project } from "../../3-domain/entities/project";
import { Orm } from "./orm";
import { IProjectRepository } from "../irepositories/IprojectRepository";

export class ProjectRepository extends Orm<Project> implements IProjectRepository {
    
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