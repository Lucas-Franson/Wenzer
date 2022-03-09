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
});
routes.options(['api/editProfile'], (req, res) => {
    res.set('Access-Control-Allow-Methods', ['PUT', 'GET']);
    res.set('Access-Control-Allow-Headers', ['content-type', 'auth']);
    res.status(204);
    res.end();
});
//# sourceMappingURL=profileRoutes.js.map