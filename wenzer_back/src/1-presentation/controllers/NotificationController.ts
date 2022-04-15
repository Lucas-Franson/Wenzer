import { ErroParametro } from "../../erros";

export default class ProfileController {

    async getAllNotificationByUserId(req: any, res: any, next: any) {
        try {
            const notifications = await req.service.notificationAppService.getAllNotificationByUserId(req.session.userId);

            res.status(200).json(notifications);
        } catch(err) {
            next(err);
        }
    }

    async acceptFriendRequest(req: any, res: any, next: any) {
        const { idUser } = req.body;

        try {
            if (!idUser) throw new ErroParametro("Falta o id do usuário para aceitar a solicitação.");

            await req.service.notificationAppService.acceptFriendRequest(idUser, req.session.userId);

            res.status(200).json();
        } catch(err) {
            next(err);
        }
    }

    async rejectFriendRequest(req: any, res: any, next: any) {
        const { idUser } = req.body;

        try {
            if (!idUser) throw new ErroParametro("Falta o id do usuário para aceitar a solicitação.");

            await req.service.notificationAppService.rejectFriendRequest(idUser, req.session.userId);

            res.status(200).json();
        } catch(err) {
            next(err);
        }
    }

}