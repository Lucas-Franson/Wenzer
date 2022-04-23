import { InterestsFormViewModel } from "../../1-presentation/viewmodel/InterestsFormViewModel";
import PostCreateViewModel from "../../1-presentation/viewmodel/PostCreateViewModel";
import { ProjectCreateViewModel } from "../../1-presentation/viewmodel/ProjectCreateViewModel";
import { Project } from "../../3-domain/entities/project";
import IInterestService from "../../3-domain/Iservices/IInterestService";
import IPostService from "../../3-domain/Iservices/IPostService";
import IProjectService from "../../3-domain/Iservices/IProjectService";
import { IUserService } from "../../3-domain/Iservices/IUserService";

export default class ProjectAppService {

    constructor(
        private readonly projectService: IProjectService,
        private readonly interestsService: IInterestService,
        private readonly postService: IPostService,
        private readonly userService: IUserService,
    ){

    }

    async get(idUser: string, _id: string) {
        let project = await this.projectService.getById(_id);
        let user = null;
        if (project) {
            user = await this.userService.findUserById(project?.userId);
        }
        let interest = await this.interestsService.getInterestsByProject(_id);
        let interestViewModel: InterestsFormViewModel[] = [];

        interest.map((data) => {
            interestViewModel.push(new InterestsFormViewModel(data.name, data._id));
        });

        let following = false;

        if (project?.userId != idUser) {
            following = await this.projectService.verifyIfUserIsFollowingProject(idUser, _id);
        }

        let viewModel = new ProjectCreateViewModel(
            project?._id ? project._id : "",
            project?.name!,
            project?.description!,
            project?.photo,
            project?.active!,
            project?.publicProject!,
            project?.marketing!,
            interestViewModel,
            project?.created_at!,
            project?.userId,
            following,
            user
        );

        return viewModel;
    }

    async getByUser(userId: string) {
        return await this.projectService.getProjectsByUser(userId);
    }

    async create(userId: string, project: ProjectCreateViewModel) {
        const proj = new Project(
            project.name,
            project.description,
            project.photo,
            project.active,
            project.publicProject,
            project.marketing,
            userId
        );
        await this.projectService.create(proj);
        this.interestsService.linkProjectToInterests(proj, project.tags);
    }

    async update(userId: string, project: ProjectCreateViewModel) {
        const proj = new Project(
            project.name,
            project.description,
            project.photo,
            project.active,
            project.publicProject,
            project.marketing,
            userId,
            project._id,
            project.created_at
        );
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

    async createPost(userId: string, post: PostCreateViewModel) {
        await this.postService.create(userId, post);
    }

}