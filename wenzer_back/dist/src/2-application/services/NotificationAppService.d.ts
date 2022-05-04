import { NotificationViewModel } from "../../1-presentation/viewmodel/NotificationViewModel";
import INotificationService from "../../3-domain/Iservices/INotificationService";
import { IUserService } from "../../3-domain/Iservices/IUserService";
export default class NotificationAppService {
    private notificationService;
    private userService;
    constructor(notificationService: INotificationService, userService: IUserService);
    getAllNotificationByUserId(userId: string): Promise<NotificationViewModel[]>;
    acceptFriendRequest(idFollower: string, idUser: string): Promise<void>;
    rejectFriendRequest(idFollower: string, idUser: string): Promise<void>;
    orderByCreatedAt(arr: NotificationViewModel[]): NotificationViewModel[];
}
