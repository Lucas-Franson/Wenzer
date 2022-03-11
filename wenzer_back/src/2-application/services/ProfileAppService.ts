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

}