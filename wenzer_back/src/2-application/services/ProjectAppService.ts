import { ProjectCreateViewModel } from "../../1-presentation/viewmodel/ProjectCreateViewModel";
import IProjectService from "../../3-domain/Iservices/IProjectService";

export default class ProjectAppService {

    constructor(private readonly projectService: IProjectService){

    }

    async create(userId: string, project: ProjectCreateViewModel) {
        const proj = this.projectService.convertToProjectObject(project);
        proj._userId = userId;
        await this.projectService.create(proj);
    }

    async update(userId: string, project: ProjectCreateViewModel) {
        const proj = this.projectService.convertToProjectObject(project);
        proj._userId = userId;
        await this.projectService.update(proj);
    }

    async delete(userId: string, projectId: string) {
        await this.projectService.delete(projectId);
    }

}