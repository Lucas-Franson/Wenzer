import { Db } from "mongodb";
import { NotificationType } from "../../1-presentation/viewmodel/NotificationViewModel";
import { Connections } from "../../3-domain/entities/conections";
import { User } from "../../3-domain/entities/user";
import { IOrm } from "./Iorm";

export interface IUserRepository extends IOrm<User> {
    setPostAsGoodIdea(postGoodIdea: any): Promise<void>;
    removePostAsGoodIdea(idUser: string, idPost: string): Promise<void>;
    getAllUsersByArrOfIds(idUserArr: string[]): Promise<User[]>
    getByIdWebService(userId: string, dbo: Db): Promise<User | null>;
    getFriendRequest(userId: string): Promise<{ _id: string; created_at: Date; name: string; }[]>;
    setNotificationSeen(userId: string, type: NotificationType, idNotification: string): void;
    getNotificationSeen(userId: string, type: NotificationType): Promise<{ idNotification: string}[]>;
    getNotificationSeenWebSocket(dbo: Db, userId: string, type: NotificationType): Promise<{ idNotification: string }[]>;
    getFriendRequestWebService(dbo: Db, idUser: string, idNotifications: string[]): Promise<number>;
    updateConnection(connection: Connections): void;
    insertUser(object: any): Promise<string>;
    search(userId: string, search: string): Promise<User[]>;
    getUsersActive(): Promise<number>;
}