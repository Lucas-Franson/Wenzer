import { Router } from 'express';
import { LoginController } from '../controllers/LoginController';

const routes = Router();

const loginController = new LoginController();

routes.post('/api/login', loginController.login)
    .post('/api/cadastrar', loginController.cadastrar)
    .post('/api/recupera-senha', loginController.recuperaSenha);

routes.options('/api', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'POST,GET');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.status(204);
    res.end();
})

export { routes };