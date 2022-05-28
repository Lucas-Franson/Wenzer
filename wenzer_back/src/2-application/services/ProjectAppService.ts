import { InterestsFormViewModel } from "../../1-presentation/viewmodel/InterestsFormViewModel";
import PostCreateViewModel from "../../1-presentation/viewmodel/PostCreateViewModel";
import { ProjectCreateViewModel } from "../../1-presentation/viewmodel/ProjectCreateViewModel";
import { SearchType, SearchViewModel } from "../../1-presentation/viewmodel/SearchViewModel";
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
        let participant = null;
        if (project) {
            user = await this.userService.findUserById(project?.userId);
            participant = await this.projectService.getParticipantByProjectAndUser(project?._id, idUser);
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

        let goodIdea = await this.projectService.userProjectGoodIdeaAlreadyExist(idUser, _id);

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
            project?.countGoodIdea!,
            project?.userId,
            following,
            user,
            goodIdea != null,
            participant != null
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
            userId,
            project.countGoodIdea
        );
        await this.projectService.create(proj);
        await this.projectService.createParticipantLeader(proj);
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
            project.countGoodIdea,
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

    async search(userId: string, search: string, types: SearchType[]) {
        let found: SearchViewModel[] = [];

        // Procurar por usuário
        if (types.find(x => x == 0) || types.length == 0) {
            let user = await this.userService.search(userId, search.toLowerCase().trim());
            if (user) {
                user.map((data) => {
                    let searchViewModel = new SearchViewModel(
                        data._id,
                        (data.name ?? "") + " " + (data.lastName ?? ""),
                        data.bio,
                        SearchType.People,
                        data.photo
                    );
                    found.push(searchViewModel);
                });
            }
        }

        // Procurar por projeto
        if (types.find(x => x == 1) || types.length == 0) {
            let project = await this.projectService.search(userId, search.toLocaleLowerCase().trim());
            if (project) {
                project.map((data) => {
                    let searchViewModel = new SearchViewModel(
                        data._id,
                        data.name,
                        data.description,
                        SearchType.Project,
                        data.photo
                    );
                    found.push(searchViewModel);
                });
            }
        }

        // Procurar por publicação
        if (types.find(x => x == 2) || types.length == 0) {
            let post = await this.postService.search(userId, search.toLocaleLowerCase().trim());
            if (post) {
                post.map((data) => {
                    let searchViewModel = new SearchViewModel(
                        data._id,
                        data.title,
                        data.description,
                        SearchType.Post,
                        data.photo
                    );
                    found.push(searchViewModel);
                });
            }
        }

        return found.sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        });
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

    async setUserProjectGoodIdea(idUser: string, idProject: string) {
        const userPostExist = await this.projectService.userProjectGoodIdeaAlreadyExist(idUser, idProject);
        await this.projectService.sumCountOfGoodIdeia(idProject, userPostExist != null);
        this.projectService.setUserProjectGoodIdea(idUser, idProject, userPostExist != null);
    }

    async getParticipants(_id: string) {
        return await this.projectService.getParticipants(_id);
    }

    async acceptParticipant(idUserServer: string, idProject: string, idUserRequest: string, role: string) {
        let project = await this.projectService.getById(idProject);

        if (project?.userId != idUserServer) throw Error("Você não possui permissão para aceitar o usuário nesse projeto.");

        await this.projectService.acceptParticipant(idProject, idUserRequest, role);
    }

    async rejectParticipant(idUserServer: string, idProject: string, idUserRequest: string) {
        let project = await this.projectService.getById(idProject);

        if (project?.userId != idUserServer) throw Error("Você não possui permissão para rejeitar o usuário nesse projeto.");

        await this.projectService.rejectParticipant(idProject, idUserRequest);
    }

    async requestParticipant(idUserServer: string, idProject: string) {
        await this.projectService.requestParticipant(idUserServer, idProject);
    }

    async removeParticipant(idUserServer: string, idProject: string, idUserRequest: string) {
        let project = await this.projectService.getById(idProject);

        if (project?.userId != idUserServer) throw Error("Você não possui permissão para remover o usuário do projeto.");

        await this.projectService.removeParticipant(idProject, idUserRequest);
    }

}