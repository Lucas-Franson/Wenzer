import { InterestsFormViewModel } from "../../1-presentation/viewmodel/InterestsFormViewModel";
import PostViewModel from "../../1-presentation/viewmodel/PostViewModel";
import { ProfileViewModel } from "../../1-presentation/viewmodel/ProfileViewModel";
import UserViewModel from "../../1-presentation/viewmodel/UserViewModel";
import { User } from "../../3-domain/entities/user";
import IInterestService from "../../3-domain/Iservices/IInterestService";
import IPostService from "../../3-domain/Iservices/IPostService";
import IProjectService from "../../3-domain/Iservices/IProjectService";
import { IUserService } from "../../3-domain/Iservices/IUserService";

export default class ProfileAppService {

    constructor(
        private readonly userService: IUserService, 
        private readonly interestsService: IInterestService,
        private readonly projectService: IProjectService,
        private readonly postService: IPostService,
    ){

    }

    async getAllInterests() {
        const interests = await this.interestsService.getAllInterests();
        let newInterests: InterestsFormViewModel[] = [];
        interests.map((value) => {
            let obj = new InterestsFormViewModel(value.name, value._id);
            newInterests.push(obj);
        });
        return newInterests;
    }

    async getInfoUser(idUserServer: string, idUser: string) {
        let user = await this.userService.findUserById(idUser);
        let countProjects = await this.projectService.getCountOfProjectsByUser(idUser);
        let countParticipating = await this.projectService.getCountOfParticipatingByUser(idUser);
        let alreadyConnected = false;

        if (idUser != idUserServer) {
            alreadyConnected = await this.userService.alreadyConnected(idUserServer, idUser);
        }

        return new ProfileViewModel(
            user?._id!,
            user?.name!,
            user?.lastName!,
            user?.bio!,
            user?.university!,
            [],
            user?.photo,
            user?.hasCompany!,
            countProjects?.count,
            countParticipating?.count,
            alreadyConnected
        )
    }

    async editProfile(userId: string, profile: ProfileViewModel) {
        var user: any = await this.userService.findUserById(userId);

        if (!user) throw new Error('Usuário não encontrado.');

        await this.userService.updateUserByProfile(user, profile);

        await this.interestsService.linkUserToInterests(user, profile.getInterests());
    }

    async editPhoto(userId: string, photo: any) {
        var user: any = await this.userService.findUserById(userId);

        if (!user) throw new Error('Usuário não encontrado.');

        const reader = Buffer.from(new Uint8Array(photo.data));
        const file = `data:${photo.mimetype};base64, ${reader.toString("base64")}`;

        await this.userService.updateUserPhoto(user, file);
        return file;
    }

    async followUser(userId: string, idUserToFollow: string) {
        const connection = await this.userService.getConnectionFromUsers(userId, idUserToFollow);
        if (connection) {
            await this.userService.deleteConnection(connection._id);
        } 
        else {
            await this.userService.createConnection(userId, idUserToFollow);
        }
    }

    async getConnections(idUser: string) {
        return await this.userService.getConnections(idUser);
    }

    async getInterests(idUser: string) {
        let interests = await this.interestsService.getInterestsByUser(idUser);
        let obj: InterestsFormViewModel[] = [];
        interests.map((value) => {
            const interest = new InterestsFormViewModel(value.name, value._id);
            obj.push(interest);
        });
        return obj;
    }

    async getAllPosts(page: number, countPerPage: number, idUser: string, idUserServer: string) {
        let post = await this.postService.getAllPostsByUserId(idUser, page, countPerPage);
        let goodIdea = await this.postService.getAllGoodIdeaFromUser(idUserServer);
        let postViewModel: PostViewModel[] = [];
        let user = await this.userService.findUserById(idUser);
        let userViewModel = new UserViewModel(
            user?._id!,
            user?.name!,
            user?.email!,
            user?.password!,
            user?.title!,
            user?.photo!,
            user?.bio!,
            user?.emailValid!,
            user?.created_at!
        );

        post.map((value) => {
            const postAsGoodIdea = goodIdea.find(x => x.idPost === value._id);
            const _postViewModel = new PostViewModel(
                value._id,
                value.idUser,
                value.countViews,
                value.title,
                value.description,
                value.photo,
                value.idProject,
                value.created_at,
                postAsGoodIdea != null,
                userViewModel,
                0
            );
            postViewModel.push(_postViewModel);
        });

        return postViewModel;
    }

}