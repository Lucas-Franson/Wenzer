import { User } from "../../3-domain/entities/user";
import { IUserRepository } from "../irepositories/IuserRepository";
import { Db } from "mongodb";
import { Orm } from "./orm";
import { NotificationType } from "../../1-presentation/viewmodel/NotificationViewModel";
import { Connections } from "../../3-domain/entities/conections";
export default class UserRepository extends Orm<User> implements IUserRepository {
    setPostAsGoodIdea(postGoodIdea: any): Promise<void>;
    removePostAsGoodIdea(idUser: string, idPost: string): Promise<void>;
    getAllUsersByArrOfIds(idUserArr: string[]): Promise<User[]>;
    getFriendRequest(userId: string): Promise<{
        _id: string;
        created_at: Date;
        name: string;
    }[]>;
    getNotificationSeen(userId: string, type: NotificationType): Promise<{
        idNotification: string;
    }[]>;
    insertUser(object: any): Promise<string>;
    updateConnection(connection: Connections): void;
    setNotificationSeen(userId: string, type: NotificationType, idNotification: string): void;
    search(userId: string, search: string): Promise<User[]>;
    getByIdWebService(userId: string, dbo: Db): Promise<User | null>;
    getFriendRequestWebService(dbo: Db, idUser: string, idNotifications: string[]): Promise<number>;
    getNotificationSeenWebSocket(dbo: Db, userId: string, type: NotificationType): Promise<{
        idNotification: string;
    }[]>;
    handleArrayResult(result: User[]): any[];
    handleResult(results: User): User | null;
}
