import { ProfileViewModel } from "../../1-presentation/viewmodel/ProfileViewModel";
import { User } from "../../3-domain/entities/user";
import IInterestService from "../../3-domain/Iservices/IInterestService";
import IProjectService from "../../3-domain/Iservices/IProjectService";
import { IUserService } from "../../3-domain/Iservices/IUserService";

export default class ProfileAppService {

    constructor(
        private readonly userService: IUserService, 
        private readonly interestsService: IInterestService,
        private readonly projectService: IProjectService,
    ){

    }

    async getAllInterests() {
        return await this.interestsService.getAllInterests();
    }

    async getInfoUser(idUser: string) {
        let user = await this.userService.findUserById(idUser);
        let countProjects = await this.projectService.getCountOfProjectsByUser(idUser);
        let countParticipating = await this.projectService.getCountOfParticipatingByUser(idUser);

        return new ProfileViewModel(
            user?._id!,
            user?._name!,
            user?._bio!,
            user?._photo!,
            user?._title!,
            [],
            countProjects?.count,
            countParticipating?.count
        )
    }

    async editProfile(userId: string, profile: ProfileViewModel) {
        var user: any = await this.userService.findUserById(userId);

        if (!user) throw new Error('Usuário não encontrado.');

        await this.userService.updateUserByProfile(user, profile);

        await this.interestsService.linkUserToInterests(user, profile.getInterests());
    }

    async followUser(userId: string, idUserToFollow: string) {
        const connection = await this.userService.getConnectionFromUsers(userId, idUserToFollow);
        if (!connection) {
            await this.userService.createConnection(userId, idUserToFollow);
        } else {
            await this.userService.deleteConnection(connection._id);
        }
    }

    async getConnections(idUser: string) {
        return await this.userService.getConnections(idUser);
    }

    async getInterests(idUser: string) {
        return await this.interestsService.getInterestsByUser(idUser);
    }

}