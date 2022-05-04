"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const AuthUser_1 = require("../../middlewares/AuthUser");
const ProfileController_1 = __importDefault(require("../controllers/ProfileController"));
const Router = require('express');
const routes = Router();
exports.routes = routes;
const profileController = new ProfileController_1.default();
routes.put('/api/editProfile', AuthUser_1.AuthUser, profileController.editProfile, () => {
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
    .put('/api/editPhoto', AuthUser_1.AuthUser, profileController.editPhoto, () => {
    /*
        #swagger.tags = ["Profile"]
        #swagger.description = 'Endpoint editar a foto do usuário.'
        #swagger.parameters['photo'] = {
            in: 'body',
            description: 'Foto do usuário.',
            required: false,
            schema: new Blob()
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
    .get('/api/getAllInterests', AuthUser_1.AuthUser, profileController.getAllInterests, () => {
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
})
    .post('/api/profile/follow', AuthUser_1.AuthUser, profileController.followUser, () => {
    /*
        #swagger.tags = ["Profile"]
        #swagger.description = 'Endpoint seguir usuário.'
        #swagger.parameters['idUserToFollow'] = {
            in: 'body',
            description: 'Id do usuário a ser seguido.',
            required: true,
            schema: "GUID"
        }
        #swagger.responses[204] = {
            description: "Ok" }
        #swagger.responses[500] = {
            schema: { mensagem: "<mensagem do erro>" },
            description: "Internal server error" }
    */
})
    .get('/api/profile/connections/:idUser', AuthUser_1.AuthUser, profileController.connections, () => {
    /*
        #swagger.tags = ["Profile"]
        #swagger.description = 'Endpoint obter conexões do usuário.'
        #swagger.responses[200] = {
            schema: [{
                id: "GUID",
                name: "João",
                photo: "BLOB"
            }]
            description: "Ok" }
        #swagger.responses[500] = {
            schema: { mensagem: "<mensagem do erro>" },
            description: "Internal server error" }
    */
})
    .get('/api/profile/interests/:idUser', AuthUser_1.AuthUser, profileController.interests, () => {
    /*
        #swagger.tags = ["Profile"]
        #swagger.description = 'Endpoint obter interesses do usuário.'
        #swagger.responses[200] = {
            schema: [{
                name: "Tecnologia"
            }]
            description: "Ok" }
        #swagger.responses[500] = {
            schema: { mensagem: "<mensagem do erro>" },
            description: "Internal server error" }
    */
})
    .get('/api/profile/info/:idUser', AuthUser_1.AuthUser, profileController.getInfoUserProfile, () => {
    /*
        #swagger.tags = ["Profile"]
        #swagger.description = 'Endpoint obter informações do usuário.'
        #swagger.responses[200] = {
            description: "Ok" }
        #swagger.responses[500] = {
            schema: { mensagem: "<mensagem do erro>" },
            description: "Internal server error" }
    */
})
    .get('/api/profile/publications/:idUser', AuthUser_1.AuthUser, profileController.getAllPosts, () => {
    /*
        #swagger.tags = ["Profile"]
        #swagger.description = 'Endpoint obter publicações do usuário.'
        #swagger.parameters['page'] = {
            in: 'body',
            description: 'Página da listagem.',
            required: true,
            type: "integer",
            schema: "8"
        }
        #swagger.parameters['countPerPage'] = {
            in: 'body',
            description: 'Quantidade de registro por página.',
            required: true,
            type: "integer",
            schema: "15"
        }
        #swagger.responses[200] = {
            schema: [{
                $ref: "#/definitions/Post"
            }],
            description: "Ok" }
        #swagger.responses[500] = {
            schema: { mensagem: "<mensagem do erro>" },
            description: "Internal server error" }
    */
});
routes.options([
    '/api/editProfile',
    '/api/getAllInterests',
    '/api/profile/follow',
    '/api/profile/connections',
    '/api/profile/interests/:idUser',
    '/api/profile/info/:idUser',
    '/api/profile/publications/:idUser'
], (req, res) => {
    res.set('Access-Control-Allow-Methods', ['PUT', 'GET', 'POST']);
    res.set('Access-Control-Allow-Headers', ['content-type', 'auth']);
    res.status(204);
    res.end();
});
//# sourceMappingURL=profileRoutes.js.map