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
    })
    .post('/api/setPostAsGoodIdea', AuthUser, feedController.setPostAsGoodIdea, () => {
        /* 
            #swagger.tags = ["Feed"] 
            #swagger.description = 'Endpoint para setar boa ideia no post.'
            #swagger.parameters['postId'] = {
                in: 'body',
                description: 'Id do post que receberá o boa idéia.',
                required: true,
                schema: "GUID"
            }
            #swagger.responses[200] = { 
                description: "Ok" }
            #swagger.responses[500] = { 
                schema: { mensagem: "<mensagem do erro>" },
                description: "Internal server error" }
        */
    })
    .post('/api/setComments', AuthUser, feedController.setComments, () => {
        /* 
            #swagger.tags = ["Feed"] 
            #swagger.description = 'Endpoint para setar novo comentário ao post.'
            #swagger.parameters['postId'] = {
                in: 'body',
                description: 'Id do post que receberá o boa idéia.',
                required: true,
                schema: "GUID"
            }
            #swagger.parameters['text'] = {
                in: 'body',
                description: 'Texto do usuário para o comentário.',
                required: true,
                schema: "Isso aqui ta uma porra..."
            }
            #swagger.responses[200] = { 
                description: "Ok" }
            #swagger.responses[500] = { 
                schema: { mensagem: "<mensagem do erro>" },
                description: "Internal server error" }
        */
    })
    .get('/api/getAllComments', AuthUser, feedController.getAllComments, () => {
        /* 
            #swagger.tags = ["Feed"] 
            #swagger.description = 'Endpoint obter todos os comentários de um post.'
            #swagger.parameters['postId'] = {
                in: 'body',
                description: 'Id do post que será buscado os comentários.',
                required: true,
                schema: "GUID"
            }
            #swagger.responses[200] = { 
                schema: [{$ref: "#/definitions/PostCommentsViewModel"}]
                description: "Ok" }
            #swagger.responses[500] = { 
                schema: { mensagem: "<mensagem do erro>" },
                description: "Internal server error" }
        */
    })
    .get('/api/feed/projectsByInterests', AuthUser, feedController.projectsByInterests, () => {
        /* 
            #swagger.tags = ["Feed"] 
            #swagger.description = 'Endpoint projetos por interesse do usuário.'
            #swagger.responses[200] = { 
                schema: [{$ref: "#/definitions/Project"}]
                description: "Ok" }
            #swagger.responses[500] = { 
                schema: { mensagem: "<mensagem do erro>" },
                description: "Internal server error" }
        */
    })
    .get('/api/feed/projectsMarketing', AuthUser, feedController.getProjectsMarketing, () => {
        /* 
            #swagger.tags = ["Feed"] 
            #swagger.description = 'Endpoint projetos impulsionados.'
            #swagger.responses[200] = { 
                schema: [{$ref: "#/definitions/Project"}]
                description: "Ok" }
            #swagger.responses[500] = { 
                schema: { mensagem: "<mensagem do erro>" },
                description: "Internal server error" }
        */
    })
    .post('/api/feed/setDateOfLastPost', AuthUser, feedController.setDateOfLastPost, () => {
        /* 
            #swagger.tags = ["Feed"] 
            #swagger.description = 'Endpoint setar data último post lido.'
            #swagger.responses[200] = { 
                schema: {
                    date: "Date"
                },
                description: "Ok" }
            #swagger.responses[500] = { 
                schema: { mensagem: "<mensagem do erro>" },
                description: "Internal server error" }
        */
    });

routes.options([
        'api/getallposts',
        '/api/setPostAsGoodIdea',
        '/api/setComments',
        '/api/getAllComments',
        '/api/feed/projectsByInterests',
        '/api/feed/projectsMarketing',
        '/api/feed/setDateOfLastPost'
    ], (req: any, res: any) => {
    res.set('Access-Control-Allow-Methods', ['GET', 'POST']);
    res.set('Access-Control-Allow-Headers', [ 'content-type', 'auth' ]);
    res.status(204);
    res.end();
})

export { routes };

