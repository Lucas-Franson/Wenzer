import { NotificationViewModel, Type } from "../../1-presentation/viewmodel/NotificationViewModel";
import IPostService from "../../3-domain/Iservices/IPostService";
import { IUserService } from "../../3-domain/Iservices/IUserService";

export default class NotificationAppService {

    constructor(
        private postService: IPostService,
        private userService: IUserService
    ){

    }

    async getAllNotificationByUserId(userId: string): Promise<NotificationViewModel[]> {
        let notifications: NotificationViewModel[] = [];

        let commentsByPost = await this.postService.getCommentsByPost(userId);
        commentsByPost.map((comment) => {
            if (comment && comment.name) {
                let name = comment.name.charAt(0).toUpperCase() + comment.name.slice(1);
                let notification = new NotificationViewModel(Type.CommentedOnYourPost, `${name.trim()} comentou em uma publicação sua.`, comment._id, comment.created_at);
                notifications.push(notification);
            }
        });

        let friendRequests = await this.userService.getFriendRequest(userId);
        friendRequests.map((request) => {
            if (request && request.name) {
                let name = request.name.charAt(0).toUpperCase() + request.name.slice(1);
                let notification = new NotificationViewModel(Type.FriendRequest, `${name.trim()} enviou uma solicitação de amizade.`, request._id, request.created_at);
                notifications.push(notification);
            }
        });

        let commentsCommentedByUser = await this.postService.getCommentsCommentedByUser(userId);
        commentsCommentedByUser.map((comment) => {
            if (comment && comment.name) {
                let name = comment.name.charAt(0).toUpperCase() + comment.name.slice(1);
                let notification = new NotificationViewModel(Type.CommentedOnYourComment, `${name.trim()} comentou em um comentário seu.`, comment._id, comment.created_at);
                notifications.push(notification);
            }
        });

        return this.orderByCreatedAt(notifications);
    }

    orderByCreatedAt(arr: NotificationViewModel[]) {
        return arr.sort(function (a, b) {
            if (a.created_at < b.created_at) {
              return 1;
            }
            if (a.created_at > b.created_at) {
              return -1;
            }
            return 0;
          });
    }
}