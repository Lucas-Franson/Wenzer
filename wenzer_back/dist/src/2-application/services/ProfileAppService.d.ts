import { InterestsFormViewModel } from "../../1-presentation/viewmodel/InterestsFormViewModel";
import PostViewModel from "../../1-presentation/viewmodel/PostViewModel";
import { ProfileViewModel } from "../../1-presentation/viewmodel/ProfileViewModel";
import IInterestService from "../../3-domain/Iservices/IInterestService";
import IPostService from "../../3-domain/Iservices/IPostService";
import IProjectService from "../../3-domain/Iservices/IProjectService";
import { IUserService } from "../../3-domain/Iservices/IUserService";
export default class ProfileAppService {
    private readonly userService;
    private readonly interestsService;
    private readonly projectService;
    private readonly postService;
    constructor(userService: IUserService, interestsService: IInterestService, projectService: IProjectService, postService: IPostService);
    getAllInterests(): Promise<InterestsFormViewModel[]>;
    getInfoUser(idUser: string): Promise<ProfileViewModel>;
    editProfile(userId: string, profile: ProfileViewModel): Promise<void>;
    editPhoto(userId: string, photo: any): Promise<string>;
    followUser(userId: string, idUserToFollow: string): Promise<void>;
    getConnections(idUser: string): Promise<any>;
    getInterests(idUser: string): Promise<InterestsFormViewModel[]>;
    getAllPosts(page: number, countPerPage: number, idUser: string, idUserServer: string): Promise<PostViewModel[]>;
}
