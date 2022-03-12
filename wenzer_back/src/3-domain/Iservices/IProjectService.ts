import { Project } from "../entities/project";

export default interface IProjectService {
    create(project: Project): Promise<void>;
    update(project: Project): Promise<void>;
    delete(projectId: string): Promise<void>;
    convertToProjectObject(project: any): Project;
}