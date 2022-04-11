
export default class ProfileController {

    async getAllNotificationByUserId(req: any, res: any, next: any) {
        try {
            const notifications = await req.service.notificationAppService.getAllNotificationByUserId(req.session.userId);

            res.status(200).json(notifications);
        } catch(err) {
            next(err);
        }
    }
}