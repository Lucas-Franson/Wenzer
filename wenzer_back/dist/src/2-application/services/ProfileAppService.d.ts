import { ProfileViewModel } from "../../1-presentation/viewmodel/ProfileViewModel";
import IInterestService from "../../3-domain/Iservices/IInterestService";
import { IUserService } from "../../3-domain/Iservices/IUserService";
export default class ProfileAppService {
    private readonly userService;
    private readonly interestsService;
    constructor(userService: IUserService, interestsService: IInterestService);
    getAllInterests(): Promise<import("../../3-domain/entities/interests").Interests[]>;
    editProfile(userId: string, profile: ProfileViewModel): Promise<void>;
}
