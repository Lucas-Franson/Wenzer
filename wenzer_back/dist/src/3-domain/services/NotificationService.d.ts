import { Db } from "mongodb";
import { NotificationViewModel } from "../../1-presentation/viewmodel/NotificationViewModel";
import { IPostRepository } from "../../4-infra/irepositories/IpostRepository";
import { IUserRepository } from "../../4-infra/irepositories/IuserRepository";
import { Connections } from "../entities/conections";
import INotificationService from "../Iservices/INotificationService";
export default class NotificationService implements INotificationService {
    private postRepository;
    private userRepository;
    constructor(postRepository: IPostRepository, userRepository: IUserRepository);
    getCommentsByPost(idUser: string): Promise<NotificationViewModel[]>;
    getFriendRequest(idUser: string): Promise<NotificationViewModel[]>;
    getCommentsCommentedByUser(idUser: string): Promise<NotificationViewModel[]>;
    acceptFriendRequest(connection: Connections): void;
    getCommentsByPostWebService(dbo: Db, idUser: string): Promise<number>;
    getFriendRequestWebService(dbo: Db, idUser: string): Promise<number>;
    getCommentsCommentedByUserWebService(dbo: Db, idUser: string): Promise<number>;
}
