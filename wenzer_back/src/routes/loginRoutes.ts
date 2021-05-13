import { Router } from 'express';
import { LoginController } from '../controllers/LoginController';

const routes = Router();

const loginController = new LoginController();

routes.get('/api/login', loginController.logar)
    .post('/api/cadastrar', loginController.cadastrar)
    .post('/api/recupera-senha', loginController.recuperaSenha)

export { routes };