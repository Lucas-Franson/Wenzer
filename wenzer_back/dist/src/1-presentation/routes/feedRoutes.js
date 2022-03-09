"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const AuthUser_1 = require("../../middlewares/AuthUser");
const FeedController_1 = __importDefault(require("../controllers/FeedController"));
const Router = require('express');
const routes = Router();
exports.routes = routes;
const feedController = new FeedController_1.default();
routes.get('/api/getallposts', AuthUser_1.AuthUser, feedController.getAllPosts, () => {
    /*
        #swagger.tags = ["Feed"]
        #swagger.description = 'Endpoint buscar todos os posts para um determinado usuário.'
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
routes.options(['api/getallposts'], (req, res) => {
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', ['content-type', 'auth']);
    res.status(204);
    res.end();
});
//# sourceMappingURL=feedRoutes.js.map