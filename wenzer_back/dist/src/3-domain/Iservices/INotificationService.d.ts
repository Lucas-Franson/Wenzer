import { Db } from "mongodb";
import { NotificationViewModel } from "../../1-presentation/viewmodel/NotificationViewModel";
import { Connections } from "../entities/conections";
export default interface INotificationService {
    getCommentsByPost(idUser: string): Promise<NotificationViewModel[]>;
    getFriendRequest(idUser: string): Promise<NotificationViewModel[]>;
    getCommentsCommentedByUser(idUser: string): Promise<NotificationViewModel[]>;
    acceptFriendRequest(connection: Connections): void;
    getCommentsByPostWebService(dbo: Db, idUser: string, date: Date): Promise<number>;
    getFriendRequestWebService(dbo: Db, idUser: string, date: Date): Promise<number>;
    getCommentsCommentedByUserWebService(dbo: Db, idUser: string, date: Date): Promise<number>;
}
