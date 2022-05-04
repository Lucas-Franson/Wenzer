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
class ProfileController {
    getAllNotificationByUserId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notifications = yield req.service.notificationAppService.getAllNotificationByUserId(req.session.userId);
                res.status(200).json(notifications);
            }
            catch (err) {
                next(err);
            }
        });
    }
    acceptFriendRequest(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idUser } = req.body;
            try {
                if (!idUser)
                    throw new erros_1.ErroParametro("Falta o id do usuário para aceitar a solicitação.");
                yield req.service.notificationAppService.acceptFriendRequest(idUser, req.session.userId);
                res.status(200).json();
            }
            catch (err) {
                next(err);
            }
        });
    }
    rejectFriendRequest(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idUser } = req.body;
            try {
                if (!idUser)
                    throw new erros_1.ErroParametro("Falta o id do usuário para aceitar a solicitação.");
                yield req.service.notificationAppService.rejectFriendRequest(idUser, req.session.userId);
                res.status(200).json();
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = ProfileController;
//# sourceMappingURL=NotificationController.js.map