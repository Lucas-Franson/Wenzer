import { ProfileViewModel } from "../viewmodel/ProfileViewModel";

export default class ProfileController {

    async getAllInterests(req: any, res: any, next: any) {
        try {
            const interests = await req.service.profileAppService.getAllInterests();

            res.status(200).json(interests);
        } catch(err) {
            next(err);
        }
    }

    async getInfoUserProfile(req: any, res: any, next: any) {
        const { idUser } = req.params;
        
        try {
            const user = await req.service.profileAppService.getInfoUser(idUser);

            res.status(200).json(user);
        } catch(err) {
            next(err);
        }
    }

    async editProfile(req: any, res: any, next: any) {
        const { name, bio, interests } = req.body;
        const profile = new ProfileViewModel('', name, bio, interests, null, 0, 0);
        
        try {
            profile.validateModel();
            await req.service.profileAppService.editProfile(req.session.userId, profile);

            res.status(204).json();
        } catch(err) {
            next(err);
        }
    }

    async editPhoto(req: any, res: any, next: any) {
        try {
            const file = await req.service.profileAppService.editPhoto(req.session.userId, req.files.file);

            res.status(200).json({ photo: file });
        } catch(err) {
            next(err);
        }
    }

    async followUser(req: any, res: any, next: any) {
        const { idUserToFollow } = req.body;
        try {
            await req.service.profileAppService.followUser(req.session.userId, idUserToFollow);

            res.status(204).json();
        } catch(err) {
            next(err);
        }
    }

    async connections(req: any, res: any, next: any) {
        const { idUser } = req.params;
        try {
            const connections = await req.service.profileAppService.getConnections(idUser);

            res.status(200).json(connections);
        } catch(err) {
            next(err);
        }
    }

    async interests(req: any, res: any, next: any) {
        const { idUser } = req.params;
        try {
            const interests = await req.service.profileAppService.getInterests(idUser);

            res.status(200).json(interests);
        } catch(err) {
            next(err);
        }
    }

}