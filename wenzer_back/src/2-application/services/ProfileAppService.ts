import { InterestsFormViewModel } from "../../1-presentation/viewmodel/InterestsFormViewModel";
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
        const interests = await this.interestsService.getAllInterests();
        let newInterests: InterestsFormViewModel[] = [];
        interests.map((value) => {
            let obj = new InterestsFormViewModel(value.name, value._id);
            newInterests.push(obj);
        });
        return newInterests;
    }

    async getInfoUser(idUser: string) {
        let user = await this.userService.findUserById(idUser);
        let countProjects = await this.projectService.getCountOfProjectsByUser(idUser);
        let countParticipating = await this.projectService.getCountOfParticipatingByUser(idUser);

        return new ProfileViewModel(
            user?._id!,
            user?.name!,
            user?.bio!,
            [],
            user?.photo,
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
        if (connection.length > 0) {
            await this.userService.deleteConnection(connection[0]._id);
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

}