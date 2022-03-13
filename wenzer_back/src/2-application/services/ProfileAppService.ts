import { ProfileViewModel } from "../../1-presentation/viewmodel/ProfileViewModel";
import { User } from "../../3-domain/entities/user";
import IInterestService from "../../3-domain/Iservices/IInterestService";
import { IUserService } from "../../3-domain/Iservices/IUserService";

export default class ProfileAppService {

    constructor(private readonly userService: IUserService, private readonly interestsService: IInterestService){

    }

    async getAllInterests() {
        return await this.interestsService.getAllInterests();
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