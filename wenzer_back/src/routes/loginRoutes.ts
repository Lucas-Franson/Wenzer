import { Router } from 'express';
import { LoginController } from '../controllers/LoginController';

const routes = Router();

const loginController = new LoginController();

routes.post('/api/login', loginController.login)
    .post('/api/cadastrar', loginController.cadastrar)
    .post('/api/recupera-senha', loginController.recuperaSenha)

export { routes };