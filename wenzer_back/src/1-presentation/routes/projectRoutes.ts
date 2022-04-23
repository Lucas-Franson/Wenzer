import { AuthUser } from '../../middlewares/AuthUser';
import ProjectController from '../controllers/ProjectController';

const Router = require('express');
const routes = Router();

const projectController = new ProjectController();

routes.post('/api/project', AuthUser, projectController.create, () => {
    /* 
        #swagger.tags = ["Project"] 
        #swagger.description = 'Endpoint para criar projeto.'
        #swagger.parameters['project'] = {
            in: 'body',
            description: 'Projeto.',
            required: true,
            schema: {$ref: "#/definitions/Project"}
        }
        #swagger.responses[201] = { 
            description: "Created" }
        #swagger.responses[500] = { 
            schema: { mensagem: "<mensagem do erro>" },
            description: "Internal server error" }
    */
})
.put('/api/project', AuthUser, projectController.update, () => {
    /* 
        #swagger.tags = ["Project"] 
        #swagger.description = 'Endpoint para atualizar projeto.'
        #swagger.parameters['project'] = {
            in: 'body',
            description: 'Projeto.',
            required: true,
            schema: {$ref: "#/definitions/Project"}
        }
        #swagger.responses[204] = { 
            description: "No content" }
        #swagger.responses[500] = { 
            schema: { mensagem: "<mensagem do erro>" },
            description: "Internal server error" }
    */
})
.delete('/api/project/:projectId', AuthUser, projectController.delete, () => {
    /* 
        #swagger.tags = ["Project"] 
        #swagger.description = 'Endpoint para deletar projeto.'
        #swagger.responses[204] = { 
            description: "No content" }
        #swagger.responses[500] = { 
            schema: { mensagem: "<mensagem do erro>" },
            description: "Internal server error" }
    */
})
.get('/api/project/onhigh', AuthUser, projectController.highProjects, () => {
    /* 
        #swagger.tags = ["Project"] 
        #swagger.description = 'Endpoint para buscar projetos em alta.'
        #swagger.responses[200] = { 
            schema: [{
                $ref: "#/definitions/Project"
            }],
            description: "No content" }
        #swagger.responses[500] = { 
            schema: { mensagem: "<mensagem do erro>" },
            description: "Internal server error" }
    */
})
.post('/api/project/follower', AuthUser, projectController.follow, () => {
    /* 
        #swagger.tags = ["Project"] 
        #swagger.description = 'Endpoint para seguir projeto.'
        #swagger.parameters['idProject'] = {
            in: 'body',
            description: 'Id do Projeto',
            required: true,
            schema: "GUID"
        }
        #swagger.responses[204] = {
            description: "No content" }
        #swagger.responses[500] = { 
            schema: { mensagem: "<mensagem do erro>" },
            description: "Internal server error" }
    */
})
.post('/api/project/post', AuthUser, projectController.createPost, () => {
    /* 
        #swagger.tags = ["Project"] 
        #swagger.description = 'Endpoint para criar post.'
        #swagger.parameters['Post'] = {
            in: 'body',
            description: 'Post',
            required: true,
            schema: { $ref: "#/definitions/Post" }
        }
        #swagger.responses[201] = {
            description: "Created" }
        #swagger.responses[500] = { 
            schema: { mensagem: "<mensagem do erro>" },
            description: "Internal server error" }
    */
})
.get('/api/project/:idUser', AuthUser, projectController.getByUser, () => {
    /* 
        #swagger.tags = ["Project"] 
        #swagger.description = 'Endpoint para buscar projetos por usuário.'
        #swagger.responses[200] = {
            schema: [{
                $ref: "#/definitions/Project"
            }],
            description: "Ok" }
        #swagger.responses[500] = { 
            schema: { mensagem: "<mensagem do erro>" },
            description: "Internal server error" }
    */
})
.get('/api/project/byid/:_id', AuthUser, projectController.get, () => {
    /* 
        #swagger.tags = ["Project"] 
        #swagger.description = 'Endpoint para buscar projeto por id.'
        #swagger.responses[200] = {
            schema: {
                $ref: "#/definitions/Project"
            },
            description: "Ok" }
        #swagger.responses[500] = { 
            schema: { mensagem: "<mensagem do erro>" },
            description: "Internal server error" }
    */
});

routes.options([
    '/api/project',
    '/api/project/onhigh',
    '/api/project/follower',
    '/api/project/post',
    '/api/project/byid'
], (req: any, res: any) => {
    res.set('Access-Control-Allow-Methods', ['PUT', 'GET', 'POST', 'DELETE']);
    res.set('Access-Control-Allow-Headers', [ 'content-type', 'auth' ]);
    res.status(204);
    res.end();
})

export { routes };