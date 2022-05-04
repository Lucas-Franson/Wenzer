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
const erros_1 = require("../../erros");
class NotificationAppService {
    constructor(notificationService, userService) {
        this.notificationService = notificationService;
        this.userService = userService;
    }
    getAllNotificationByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let commentsByUser = yield this.notificationService.getCommentsByPost(userId);
            let friendRequests = yield this.notificationService.getFriendRequest(userId);
            let commentsCommentedByUser = yield this.notificationService.getCommentsCommentedByUser(userId);
            return this.orderByCreatedAt([...commentsByUser, ...friendRequests, ...commentsCommentedByUser]);
        });
    }
    acceptFriendRequest(idFollower, idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield this.userService.getConnectionFromUsers(idFollower, idUser);
            if (!connection)
                throw new erros_1.NaoEncontrado("Solicitação de amizade não encontrado.");
            if (connection.accepted)
                throw new erros_1.ErroParametro("Solicitação de amizade já aceita.");
            this.notificationService.acceptFriendRequest(connection);
        });
    }
    rejectFriendRequest(idFollower, idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield this.userService.getConnectionFromUsers(idFollower, idUser);
            if (!connection)
                throw new erros_1.NaoEncontrado("Solicitação de amizade não encontrado.");
            if (connection.accepted)
                throw new erros_1.ErroParametro("Solicitação de amizade já aceita.");
            this.userService.deleteConnection(connection._id);
        });
    }
    orderByCreatedAt(arr) {
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
exports.default = NotificationAppService;
//# sourceMappingURL=NotificationAppService.js.map