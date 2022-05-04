"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const AuthUser_1 = require("../../middlewares/AuthUser");
const NotificationController_1 = __importDefault(require("../controllers/NotificationController"));
const Router = require('express');
const routes = Router();
exports.routes = routes;
const notificationController = new NotificationController_1.default();
routes.get('/api/notification', AuthUser_1.AuthUser, notificationController.getAllNotificationByUserId, () => {
    /*
        #swagger.tags = ["Notification"]
        #swagger.description = 'Endpoint obter as notificações do usuário.'
        #swagger.responses[200] = {
            schema: [{
                _id: "string",
                name: "string",
                created_at: "Date"
            }],
            description: "Ok" }
        #swagger.responses[400] = {
            schema: { mensagem: "Erro de parâmetro" },
            description: "Bad Request" }
        #swagger.responses[500] = {
            schema: { mensagem: "<mensagem do erro>" },
            description: "Internal server error" }
    */
})
    .post('/api/notification/acceptFriendRequest', AuthUser_1.AuthUser, notificationController.acceptFriendRequest, () => {
    /*
        #swagger.tags = ["Notification"]
        #swagger.description = 'Endpoint aceitar solicitação de amizade.'
        #swagger.responses[200] = {
            schema: {
                idUser: "string"
            },
            description: "Ok" }
        #swagger.responses[400] = {
            schema: { mensagem: "Erro de parâmetro" },
            description: "Bad Request" }
        #swagger.responses[500] = {
            schema: { mensagem: "<mensagem do erro>" },
            description: "Internal server error" }
    */
})
    .post('/api/notification/rejectFriendRequest', AuthUser_1.AuthUser, notificationController.rejectFriendRequest, () => {
    /*
        #swagger.tags = ["Notification"]
        #swagger.description = 'Endpoint rejeitar solicitação de amizade.'
        #swagger.responses[200] = {
            schema: {
                idUser: "string"
            },
            description: "Ok" }
        #swagger.responses[400] = {
            schema: { mensagem: "Erro de parâmetro" },
            description: "Bad Request" }
        #swagger.responses[500] = {
            schema: { mensagem: "<mensagem do erro>" },
            description: "Internal server error" }
    */
});
routes.options([
    '/api/notification',
    '/api/notification/acceptFriendRequest',
    '/api/notification/rejectFriendRequest'
], (req, res) => {
    res.set('Access-Control-Allow-Methods', ['GET', 'POST']);
    res.set('Access-Control-Allow-Headers', ['content-type', 'auth']);
    res.status(204);
    res.end();
});
//# sourceMappingURL=notificationRoutes.js.map