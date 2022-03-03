import { ProfileViewModel } from "../viewmodel/ProfileViewModel";

export default class ProfileController {

    async getAllInterests(req: any, res: any, next: any) {
        try {
            const interests = req.service.profileService.getAllInterests();

            res.status(200).json(interests);
        } catch(err) {
            next(err);
        }
    }

    async editProfile(req: any, res: any, next: any) {
        const { name, bio, photo, title, interests } = req.body;
        const profile = new ProfileViewModel(name, bio, photo, title, interests);
        
        try {
            profile.validateModel();
            req.service.profileService.editProfile(req.session.userId, profile);

            res.status(200).json();
        } catch(err) {
            next(err);
        }
    }

}