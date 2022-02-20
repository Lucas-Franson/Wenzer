import { AuthUser } from '../../middlewares/AuthUser';
import FeedController from '../controllers/FeedController';

const Router = require('express');
const routes = Router();

const feedController = new FeedController();

routes.get('/api/getallposts', AuthUser, feedController.getAllPosts, () => {
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

routes.options(['api/getallposts'], (req: any, res: any) => {
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', [ 'Content-Type', 'Authorization' ]);
    res.status(204);
    res.end();
})

export { routes };

