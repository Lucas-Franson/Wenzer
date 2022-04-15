import { NotificationViewModel } from "../../1-presentation/viewmodel/NotificationViewModel";
import INotificationService from "../../3-domain/Iservices/INotificationService";
import IPostService from "../../3-domain/Iservices/IPostService";
import { IUserService } from "../../3-domain/Iservices/IUserService";
import { ErroParametro, NaoEncontrado } from "../../erros";

export default class NotificationAppService {

    constructor(
        private notificationService: INotificationService,
        private userService: IUserService
    ){

    }

    async getAllNotificationByUserId(userId: string): Promise<NotificationViewModel[]> {
        let commentsByUser = await this.notificationService.getCommentsByPost(userId);

        let friendRequests = await this.notificationService.getFriendRequest(userId);

        let commentsCommentedByUser = await this.notificationService.getCommentsCommentedByUser(userId);

        return this.orderByCreatedAt([...commentsByUser, ...friendRequests, ...commentsCommentedByUser]);
    }

    async acceptFriendRequest(idUser: string, idFollower: string) {
      const connection = await this.userService.getConnectionFromUsers(idFollower, idUser);
      
      if (!connection) throw new NaoEncontrado("Solicitação de amizade não encontrado.");

      if (connection.accepted) throw new ErroParametro("Solicitação de amizade já aceita.");

      this.notificationService.acceptFriendRequest(connection);
    }

    async rejectFriendRequest(idUser: string, idFollower: string) {
      const connection = await this.userService.getConnectionFromUsers(idFollower, idUser);
      
      if (!connection) throw new NaoEncontrado("Solicitação de amizade não encontrado.");

      if (connection.accepted) throw new ErroParametro("Solicitação de amizade já aceita.");

      this.userService.deleteConnection(connection._id);
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