import { Router } from 'express';
import { LoginController } from '../controllers/LoginController';

const routes = Router();

const loginController = new LoginController();

routes.post('/api/login', loginController.login)
    .post('/api/cadastrar', loginController.register)
    .post('/api/recupera-senha', loginController.recoverPassword)
    .post('/api/alterar-senha/:token', loginController.alterPassword)
    .get('/api/verifica-email/:token', loginController.verifyEmail);

routes.options(
    [
        '/api/cadastrar', 
        '/api/login', 
        '/api/recupera-senha', 
        '/api/alterar-senha'
    ], (req, res) => {
    res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.status(204);
    res.end();
})

routes.options('api/verifica-email', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.status(204);
    res.end();
})

export { routes };