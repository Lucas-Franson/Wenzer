"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const NotificationViewModel_1 = require("../../1-presentation/viewmodel/NotificationViewModel");
class NotificationService {
    constructor(postRepository, userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }
    getCommentsByPost(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            let notifications = [];
            let commentsByPost = yield this.postRepository.getCommentsByPost(idUser);
            let idNotifications = yield this.userRepository.getNotificationSeen(idUser, NotificationViewModel_1.NotificationType.CommentedOnYourPost);
            commentsByPost.map((comment) => {
                if (comment && comment.name) {
                    let name = comment.name.charAt(0).toUpperCase() + comment.name.slice(1);
                    let notification = new NotificationViewModel_1.NotificationViewModel(NotificationViewModel_1.NotificationType.CommentedOnYourPost, `${name.trim()} comentou em uma publicação sua.`, comment._id, comment.created_at);
                    notifications.push(notification);
                    let exist = idNotifications.find(x => x.idNotification === comment._id);
                    if (!exist) {
                        this.userRepository.setNotificationSeen(idUser, NotificationViewModel_1.NotificationType.CommentedOnYourPost, comment._id);
                    }
                }
            });
            return notifications;
        });
    }
    getFriendRequest(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            let notifications = [];
            let friendRequests = yield this.userRepository.getFriendRequest(idUser);
            let idNotifications = yield this.userRepository.getNotificationSeen(idUser, NotificationViewModel_1.NotificationType.FriendRequest);
            friendRequests.map((request) => {
                if (request && request.name) {
                    let name = request.name.charAt(0).toUpperCase() + request.name.slice(1);
                    let notification = new NotificationViewModel_1.NotificationViewModel(NotificationViewModel_1.NotificationType.FriendRequest, `${name.trim()} enviou uma solicitação de amizade.`, request._id, request.created_at);
                    notifications.push(notification);
                    let exist = idNotifications.find(x => x.idNotification === request._id);
                    if (!exist) {
                        this.userRepository.setNotificationSeen(idUser, NotificationViewModel_1.NotificationType.FriendRequest, request._id);
                    }
                }
            });
            return notifications;
        });
    }
    getCommentsCommentedByUser(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            let notifications = [];
            let commentsCommentedByUser = yield this.postRepository.getCommentsCommentedByUser(idUser);
            let idNotifications = yield this.userRepository.getNotificationSeen(idUser, NotificationViewModel_1.NotificationType.CommentedOnYourComment);
            commentsCommentedByUser.map((comment) => {
                if (comment && comment.name) {
                    let name = comment.name.charAt(0).toUpperCase() + comment.name.slice(1);
                    let notification = new NotificationViewModel_1.NotificationViewModel(NotificationViewModel_1.NotificationType.CommentedOnYourComment, `${name.trim()} comentou em um comentário seu.`, comment._id, comment.created_at);
                    notifications.push(notification);
                    let exist = idNotifications.find(x => x.idNotification === comment._id);
                    if (!exist) {
                        this.userRepository.setNotificationSeen(idUser, NotificationViewModel_1.NotificationType.CommentedOnYourComment, comment._id);
                    }
                }
            });
            return notifications;
        });
    }
    acceptFriendRequest(connection) {
        connection.accepted = true;
        this.userRepository.updateConnection(connection);
    }
    // WEB SERVICE
    getCommentsByPostWebService(dbo, idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            let idNotifications = [];
            let notificationSeen = yield this.userRepository.getNotificationSeenWebSocket(dbo, idUser, NotificationViewModel_1.NotificationType.CommentedOnYourPost);
            if (notificationSeen) {
                notificationSeen.map((value) => {
                    idNotifications.push(value.idNotification);
                });
            }
            return yield this.postRepository.getCommentsByPostWebService(dbo, idUser, idNotifications);
        });
    }
    getFriendRequestWebService(dbo, idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            let idNotifications = [];
            let notificationSeen = yield this.userRepository.getNotificationSeenWebSocket(dbo, idUser, NotificationViewModel_1.NotificationType.FriendRequest);
            notificationSeen.map((value) => {
                idNotifications.push(value.idNotification);
            });
            return yield this.userRepository.getFriendRequestWebService(dbo, idUser, idNotifications);
        });
    }
    getCommentsCommentedByUserWebService(dbo, idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            let idNotifications = [];
            let notificationSeen = yield this.userRepository.getNotificationSeenWebSocket(dbo, idUser, NotificationViewModel_1.NotificationType.CommentedOnYourComment);
            notificationSeen.map((value) => {
                idNotifications.push(value.idNotification);
            });
            return yield this.postRepository.getCommentsCommentedByUserWebService(dbo, idUser, idNotifications);
        });
    }
}
exports.default = NotificationService;
//# sourceMappingURL=NotificationService.js.map