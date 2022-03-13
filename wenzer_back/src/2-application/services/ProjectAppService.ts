import { ProjectCreateViewModel } from "../../1-presentation/viewmodel/ProjectCreateViewModel";
import IInterestService from "../../3-domain/Iservices/IInterestService";
import IProjectService from "../../3-domain/Iservices/IProjectService";

export default class ProjectAppService {

    constructor(
        private readonly projectService: IProjectService,
        private readonly interestsService: IInterestService
    ){

    }

    async create(userId: string, project: ProjectCreateViewModel) {
        const proj = this.projectService.convertToProjectObject(project);
        proj._userId = userId;
        await this.projectService.create(proj);
        this.interestsService.linkProjectToInterests(proj, project.tags);
    }

    async update(userId: string, project: ProjectCreateViewModel) {
        const proj = this.projectService.convertToProjectObject(project);
        proj._userId = userId;
        await this.projectService.update(proj);
        this.interestsService.linkProjectToInterests(proj, project.tags);
    }

    async delete(projectId: string) {
        await this.projectService.delete(projectId);
    }

    async highProjects() {
        return await this.projectService.highProjects();
    }

    async follow(userId: string, idProject: string) {
        const follower = await this.projectService.followerByIdExist(userId, idProject);
        if (!follower) {
            await this.projectService.follow(userId, idProject);
        } else {
            await this.projectService.unfollow(follower._id);
        }
    }

}