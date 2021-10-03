"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const Router = require('express');
const LoginController = require('../controllers/LoginController');
const routes = Router();
exports.routes = routes;
const loginController = new LoginController();
routes.post('/api/login', loginController.login)
    .post('/api/cadastrar', loginController.register)
    .post('/api/recupera-senha', loginController.recoverPassword)
    .post('/api/alterar-senha/:token', loginController.alterPassword)
    .post('/api/salvar-email-marketing', loginController.emailMarketing)
    .post('/api/confirmar-email-marketing/:token', loginController.confirmarEmailMarketing)
    .get('/api/verifica-email/:token', loginController.verifyEmail);
routes.options([
    '/api/cadastrar',
    '/api/login',
    '/api/recupera-senha',
    '/api/alterar-senha',
    '/api/confirmar-email-marketing',
    '/api/salvar-email-marketing'
], (req, res) => {
    res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Allow-Headers', ['Content-Type', 'Authorization']);
    res.status(204);
    res.end();
});
routes.options(['api/verifica-email'], (req, res) => {
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', ['Content-Type', 'Authorization']);
    res.status(204);
    res.end();
});
//# sourceMappingURL=loginRoutes.js.map