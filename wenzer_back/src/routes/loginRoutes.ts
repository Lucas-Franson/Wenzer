import { Router } from 'express';
import { LoginController } from '../controllers/LoginController';

const routes = Router();

const loginController = new LoginController();

routes.post('/api/login', loginController.login)
    .post('/api/cadastrar', loginController.cadastrar)
    .post('/api/recupera-senha', loginController.recuperaSenha);

routes.options('/api/cadastrar', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.status(204);
    res.end();
})

routes.options('/api/login', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.status(204);
    res.end();
})

routes.options('/api/recupera-senha', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.status(204);
    res.end();
})

export { routes };