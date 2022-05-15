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
.get('/api/project/search', AuthUser, projectController.search, () => {
    /* 
        #swagger.tags = ["Project"] 
        #swagger.description = 'Endpoint para buscar pessoas, projetos e publicações.'
        #swagger.responses[200] = {
            description: "Ok" }
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
})
.post('/api/project/goodidea/:_id', AuthUser, projectController.setUserProjectGoodIdea, () => {
    /* 
        #swagger.tags = ["Project"] 
        #swagger.description = 'Endpoint para setar projeto como boa ideia.'
        #swagger.responses[200] = {
            description: "Ok" }
        #swagger.responses[500] = { 
            schema: { mensagem: "<mensagem do erro>" },
            description: "Internal server error" }
    */
})
.get('/api/project/participant/:_id', AuthUser, projectController.getParticipants, () => {
    /* 
        #swagger.tags = ["Project"] 
        #swagger.description = 'Endpoint para buscar participants do projeto.'
        #swagger.responses[200] = {
            description: "Ok" }
        #swagger.responses[500] = { 
            schema: { mensagem: "<mensagem do erro>" },
            description: "Internal server error" }
    */
})
.post('/api/project/participant/accept/:idProject/:idUser', AuthUser, projectController.acceptParticipant, () => {
    /* 
        #swagger.tags = ["Project"] 
        #swagger.description = 'Endpoint para aceitar participação de usuário no projeto.'
        #swagger.responses[200] = {
            description: "Ok" }
        #swagger.responses[500] = { 
            schema: { mensagem: "<mensagem do erro>" },
            description: "Internal server error" }
    */
})
.post('/api/project/participant/reject/:idProject/:idUser', AuthUser, projectController.rejectParticipant, () => {
    /* 
        #swagger.tags = ["Project"] 
        #swagger.description = 'Endpoint para rejeitar participação de usuário no projeto.'
        #swagger.responses[200] = {
            description: "Ok" }
        #swagger.responses[500] = { 
            schema: { mensagem: "<mensagem do erro>" },
            description: "Internal server error" }
    */
})
.post('/api/project/participant/:_id', AuthUser, projectController.requestParticipant, () => {
    /* 
        #swagger.tags = ["Project"] 
        #swagger.description = 'Endpoint para solicitar participação em projeto.'
        #swagger.responses[200] = {
            description: "Ok" }
        #swagger.responses[500] = { 
            schema: { mensagem: "<mensagem do erro>" },
            description: "Internal server error" }
    */
})
.delete('/api/project/participant/:idProject/:idUser', AuthUser, projectController.removeParticipant, () => {
    /* 
        #swagger.tags = ["Project"] 
        #swagger.description = 'Endpoint para remover participante do projeto.'
        #swagger.responses[200] = {
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
    '/api/project/byid',
    '/api/project/goodidea',
    '/api/project/search',
    '/api/project/participant/',
    '/api/project/participant/accept',
    '/api/project/participant/reject'
], (req: any, res: any) => {
    res.set('Access-Control-Allow-Methods', ['PUT', 'GET', 'POST', 'DELETE']);
    res.set('Access-Control-Allow-Headers', [ 'content-type', 'auth' ]);
    res.status(204);
    res.end();
})

export { routes };