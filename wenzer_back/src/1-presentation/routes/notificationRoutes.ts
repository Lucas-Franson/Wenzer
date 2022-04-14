import { AuthUser } from '../../middlewares/AuthUser';
import NotificationController from '../controllers/NotificationController';

const Router = require('express');
const routes = Router();

const notificationController = new NotificationController();

routes.get('/api/notification', AuthUser, notificationController.getAllNotificationByUserId, () => {
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
    });


routes.options([
    '/api/notification',
], (req: any, res: any) => {
    res.set('Access-Control-Allow-Methods', ['GET']);
    res.set('Access-Control-Allow-Headers', [ 'content-type', 'auth' ]);
    res.status(204);
    res.end();
})

export { routes };