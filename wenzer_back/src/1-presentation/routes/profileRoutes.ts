import { AuthUser } from '../../middlewares/AuthUser';
import ProfileController from '../controllers/ProfileController';

const Router = require('express');
const routes = Router();

const profileController = new ProfileController();

routes.put('/api/editProfile', AuthUser, profileController.editProfile, () => {
        /* 
            #swagger.tags = ["Profile"] 
            #swagger.description = 'Endpoint editar as informações de perfil do usuário.'
            #swagger.parameters['name'] = {
                in: 'body',
                description: 'Nome do usuário.',
                required: true,
                schema: "João"
            }
            #swagger.parameters['bio'] = {
                in: 'body',
                description: 'Biografia do usuário.',
                required: false,
                schema: "Eu curto fazer umas miçangas na praia..."
            }
            #swagger.parameters['photo'] = {
                in: 'body',
                description: 'Foto do usuário.',
                required: false,
                schema: new Blob()
            }
            #swagger.parameters['title'] = {
                in: 'body',
                description: 'Título do usuário.',
                required: false,
                schema: 'Software Engineer'
            }
            #swagger.parameters['interests'] = {
                in: 'body',
                description: 'Interesses do usuário.',
                required: false,
                schema: [{ id: "3212312", name: "Tecnologia" }]
            }
            #swagger.responses[200] = { 
                description: "Ok" }
            #swagger.responses[400] = { 
                schema: { mensagem: "Erro de parâmetro" },
                description: "Bad Request" }
            #swagger.responses[500] = { 
                schema: { mensagem: "<mensagem do erro>" },
                description: "Internal server error" }
        */
    })
    .get('/api/getAllInterests', AuthUser, profileController.getAllInterests, () => {
        /* 
            #swagger.tags = ["Profile"] 
            #swagger.description = 'Endpoint buscar todos os interesses.'
            #swagger.responses[200] = { 
                schema: [{
                    $ref: "#/definitions/Interests"
                }]
                description: "Ok" }
            #swagger.responses[400] = { 
                schema: { mensagem: "Erro de parâmetro" },
                description: "Bad Request" }
            #swagger.responses[500] = { 
                schema: { mensagem: "<mensagem do erro>" },
                description: "Internal server error" }
        */
    });

routes.options(['api/editProfile'], (req: any, res: any) => {
    res.set('Access-Control-Allow-Methods', ['PUT', 'GET']);
    res.set('Access-Control-Allow-Headers', [ 'content-type', 'auth' ]);
    res.status(204);
    res.end();
})

export { routes };

