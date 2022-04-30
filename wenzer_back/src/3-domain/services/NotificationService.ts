import { Db } from "mongodb";
import { NotificationViewModel, NotificationType } from "../../1-presentation/viewmodel/NotificationViewModel";
import { IPostRepository } from "../../4-infra/irepositories/IpostRepository";
import { IUserRepository } from "../../4-infra/irepositories/IuserRepository";
import { Connections } from "../entities/conections";
import INotificationService from "../Iservices/INotificationService";

export default class NotificationService implements INotificationService {

    constructor(
        private postRepository: IPostRepository,
        private userRepository: IUserRepository
    ) {
        
    }

    async getCommentsByPost(idUser: string): Promise<NotificationViewModel[]> {
        let notifications: NotificationViewModel[] = [];

        let commentsByPost = await this.postRepository.getCommentsByPost(idUser);
        let idNotifications = await this.userRepository.getNotificationSeen(idUser, NotificationType.CommentedOnYourPost);
        commentsByPost.map((comment: any) => {
            if (comment && comment.name) {
                let name = comment.name.charAt(0).toUpperCase() + comment.name.slice(1);
                let notification = new NotificationViewModel(NotificationType.CommentedOnYourPost, `${name.trim()} comentou em uma publicação sua.`, comment._id, comment.created_at);
                notifications.push(notification);
                let exist = idNotifications.find(x => x.idNotification === comment._id);
                if (!exist) {
                    this.userRepository.setNotificationSeen(idUser, NotificationType.CommentedOnYourPost, comment._id);
                }
            }
        });

        return notifications;
    }

    async getFriendRequest(idUser: string): Promise<NotificationViewModel[]> {
        let notifications: NotificationViewModel[] = [];

        let friendRequests = await this.userRepository.getFriendRequest(idUser);
        let idNotifications = await this.userRepository.getNotificationSeen(idUser, NotificationType.FriendRequest);
        friendRequests.map((request: any) => {
            if (request && request.name) {
                let name = request.name.charAt(0).toUpperCase() + request.name.slice(1);
                let notification = new NotificationViewModel(NotificationType.FriendRequest, `${name.trim()} enviou uma solicitação de amizade.`, request._id, request.created_at);
                notifications.push(notification);
                let exist = idNotifications.find(x => x.idNotification === request._id);
                if (!exist) {
                    this.userRepository.setNotificationSeen(idUser, NotificationType.FriendRequest, request._id);
                }
            }
        });
        return notifications;
    }

    async getCommentsCommentedByUser(idUser: string): Promise<NotificationViewModel[]> {
        let notifications: NotificationViewModel[] = [];

        let commentsCommentedByUser = await this.postRepository.getCommentsCommentedByUser(idUser);
        let idNotifications = await this.userRepository.getNotificationSeen(idUser, NotificationType.CommentedOnYourComment);
        commentsCommentedByUser.map((comment: any) => {
            if (comment && comment.name) {
                let name = comment.name.charAt(0).toUpperCase() + comment.name.slice(1);
                let notification = new NotificationViewModel(NotificationType.CommentedOnYourComment, `${name.trim()} comentou em um comentário seu.`, comment._id, comment.created_at);
                notifications.push(notification);
                let exist = idNotifications.find(x => x.idNotification === comment._id);
                if (!exist) {
                    this.userRepository.setNotificationSeen(idUser, NotificationType.CommentedOnYourComment, comment._id);
                }
            }
        });

        return notifications;
    }

    acceptFriendRequest(connection: Connections): void {
        connection.accepted = true;
        this.userRepository.updateConnection(connection);    
    }

    // WEB SERVICE
    async getCommentsByPostWebService(dbo: Db, idUser: string): Promise<number> {
        let idNotifications: string[] = [];

        let notificationSeen = await this.userRepository.getNotificationSeenWebSocket(dbo, idUser, NotificationType.CommentedOnYourPost);
        if (notificationSeen) {
            notificationSeen.map((value) => {
                idNotifications.push(value.idNotification);
            });
        }

        return await this.postRepository.getCommentsByPostWebService(dbo, idUser, idNotifications);
    }

    async getFriendRequestWebService(dbo: Db, idUser: string): Promise<number> {
        let idNotifications: string[] = [];

        let notificationSeen = await this.userRepository.getNotificationSeenWebSocket(dbo, idUser, NotificationType.FriendRequest);
        notificationSeen.map((value) => {
            idNotifications.push(value.idNotification);
        });

        return await this.userRepository.getFriendRequestWebService(dbo, idUser, idNotifications);
    }

    async getCommentsCommentedByUserWebService(dbo: Db, idUser: string): Promise<number> {
        let idNotifications: string[] = [];

        let notificationSeen = await this.userRepository.getNotificationSeenWebSocket(dbo, idUser, NotificationType.CommentedOnYourComment);
        notificationSeen.map((value) => {
            idNotifications.push(value.idNotification);
        });

        return await this.postRepository.getCommentsCommentedByUserWebService(dbo, idUser, idNotifications);
    }

}