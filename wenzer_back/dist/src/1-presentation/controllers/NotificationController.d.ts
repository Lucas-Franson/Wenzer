export default class ProfileController {
    getAllNotificationByUserId(req: any, res: any, next: any): Promise<void>;
    acceptFriendRequest(req: any, res: any, next: any): Promise<void>;
    rejectFriendRequest(req: any, res: any, next: any): Promise<void>;
}
