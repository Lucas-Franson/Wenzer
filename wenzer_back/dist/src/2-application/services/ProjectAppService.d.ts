import PostCreateViewModel from "../../1-presentation/viewmodel/PostCreateViewModel";
import { ProjectCreateViewModel } from "../../1-presentation/viewmodel/ProjectCreateViewModel";
import { SearchType, SearchViewModel } from "../../1-presentation/viewmodel/SearchViewModel";
import { Project } from "../../3-domain/entities/project";
import IInterestService from "../../3-domain/Iservices/IInterestService";
import IPostService from "../../3-domain/Iservices/IPostService";
import IProjectService from "../../3-domain/Iservices/IProjectService";
import { IUserService } from "../../3-domain/Iservices/IUserService";
export default class ProjectAppService {
    private readonly projectService;
    private readonly interestsService;
    private readonly postService;
    private readonly userService;
    constructor(projectService: IProjectService, interestsService: IInterestService, postService: IPostService, userService: IUserService);
    get(idUser: string, _id: string): Promise<ProjectCreateViewModel>;
    getByUser(userId: string): Promise<Project[]>;
    create(userId: string, project: ProjectCreateViewModel): Promise<void>;
    update(userId: string, project: ProjectCreateViewModel): Promise<void>;
    delete(projectId: string): Promise<void>;
    highProjects(): Promise<Project[]>;
    search(userId: string, search: string, types: SearchType[]): Promise<SearchViewModel[]>;
    follow(userId: string, idProject: string): Promise<void>;
    createPost(userId: string, post: PostCreateViewModel): Promise<void>;
    setUserProjectGoodIdea(idUser: string, idProject: string): Promise<void>;
}
