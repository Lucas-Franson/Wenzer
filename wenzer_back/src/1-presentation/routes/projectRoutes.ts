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
});

routes.options([
    '/api/project'
], (req: any, res: any) => {
    res.set('Access-Control-Allow-Methods', ['PUT', 'GET', 'POST', 'DELETE']);
    res.set('Access-Control-Allow-Headers', [ 'content-type', 'auth' ]);
    res.status(204);
    res.end();
})

export { routes };