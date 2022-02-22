import { AuthUser } from '../../middlewares/AuthUser';
import LoginController from '../controllers/LoginController';

const Router = require('express');

const routes = Router();

const loginController = new LoginController();

routes.post('/api/login', loginController.login, () =>{ 
        /* 
            #swagger.tags = ["Login"] 
            #swagger.description = 'Endpoint para realizar login na plataforma.'
            #swagger.parameters['email'] = {
                in: 'body',
                description: 'Email do usuário.',
                required: true,
                schema: "joao@gmail.com"
            }
            #swagger.parameters['password'] = {
                in: 'body',
                description: 'Senha do usuário.',
                required: true,
                schema: "******"
            }
            #swagger.responses[200] = { 
                schema: { token: '<token do usuário>' },
                description: "Ok" }
            #swagger.responses[400] = { 
                schema: { mensagem: "Valide seu email para continuar." },
                description: "Bad request" }
            #swagger.responses[403] = { 
                schema: { mensagem: "Email ou senha não encontrados." },
                description: "Forbidden" }
            #swagger.responses[404] = { 
                schema: { mensagem: "Email ou senha não encontrados." },
                description: "Not found" }
        */
    })
    .post('/api/cadastrar', loginController.register, () =>{ 
        /* 
            #swagger.tags = ["Login"] 
            #swagger.description = 'Endpoint para cadastrar um novo usuário.'
            #swagger.parameters['name'] = {
                in: 'body',
                description: 'Nome do usuário.',
                required: true,
                schema: "João Paulo"
            }
            #swagger.parameters['email'] = {
                in: 'body',
                description: 'Email do usuário.',
                required: true,
                schema: "joao@gmail.com"
            }
            #swagger.parameters['password'] = {
                in: 'body',
                description: 'Senha do usuário.',
                required: true,
                schema: "*******"
            }
            #swagger.responses[201] = { 
                schema: { id: '<id do usuário>' },
                description: "Created" }
            #swagger.responses[400] = { 
                schema: { mensagem: "Usuário já cadastrado na plataforma." },
                description: "Bad request" }
            #swagger.responses[500] = { 
                schema: { mensagem: "<mensagem do erro>" },
                description: "Internal server error" }
        */ 
    })
    .post('/api/recupera-senha', loginController.recoverPassword, () =>{ 
        /* 
            #swagger.tags = ["Login"] 
            #swagger.description = 'Endpoint para recuperar a senha do usuário.'
            #swagger.parameters['email'] = {
                in: 'body',
                description: 'Email do usuário.',
                required: true,
                schema: "joao@gmail.com"
            }
            #swagger.responses[200] = { 
                schema: { mensagem: 'Se encontrarmos um usuário com este email, enviaremos o link para alterar a senha.' },
                description: "Ok" }
            #swagger.responses[404] = { 
                schema: { mensagem: "Email não encontrado." },
                description: "Not found" }
            #swagger.responses[500] = { 
                schema: { mensagem: "<mensagem do erro>" },
                description: "Internal server error" }
        */ 
    })
    .post('/api/alterar-senha/:token', loginController.alterPassword, () =>{ 
        /* 
            #swagger.tags = ["Login"] 
            #swagger.description = 'Endpoint para alterar a senha do usuário enviando o token enviado por email.'
            #swagger.parameters['password'] = {
                in: 'body',
                description: 'Nova senha do usuário.',
                required: true,
                schema: "*******"
            }
            #swagger.responses[200] = { 
                description: "OK" }
            #swagger.responses[400] = { 
                schema: { mensagem: 'Token de alteração de senha não identificado.' },
                description: "Bad request" }
            #swagger.responses[404] = { 
                schema: { mensagem: 'Email ou senha não encontrados.' },
                description: "Not found" }
            #swagger.responses[500] = { 
                schema: { mensagem: 'Essa senha é a mesma da sua conta atual.' },
                description: "Interna server error" }
        */ 
    })
    .post('/api/salvar-email-marketing', loginController.emailMarketing, () =>{ 
        /* 
            #swagger.tags = ["Login"] 
            #swagger.description = 'Endpoint para salvar o email de marketing.'
            #swagger.parameters['email'] = {
                in: 'body',
                description: 'Email do usuário.',
                required: true,
                schema: "joao@gmail.com"
            }
            #swagger.responses[200] = { 
                description: "OK" }
            #swagger.responses[404] = { 
                schema: { mensagem: "E-mail já cadastrado, verifique sua caixa de entrada." },
                description: "Not found" }
            #swagger.responses[500] = { 
                schema: { mensagem: "<mensagem do erro>" },
                description: "Internal server error" }
        */ 
    })
    .post('/api/confirmar-email-marketing/:token', loginController.confirmarEmailMarketing, () =>{ 
        /* 
            #swagger.tags = ["Login"] 
            #swagger.description = 'Endpoint para confirmar o envio de email de marketing.'
            #swagger.responses[200] = { 
                description: "OK" }
            #swagger.responses[400] = { 
                schema: { mensagem: "Token de verificação de email não identificado." },
                description: "Bad request" }
            #swagger.responses[404] = { 
                schema: { mensagem: "Email não encontrado na plataforma." },
                description: "Not found" }
            #swagger.responses[500] = { 
                schema: { mensagem: "Email já validado." },
                description: "Internal server error" }
        */ 
    })
    .get('/api/verifica-email/:token', loginController.verifyEmail, () =>{ 
        /* 
            #swagger.tags = ["Login"] 
            #swagger.description = 'Endpoint para verificar email enviado para o usuário na hora do cadastro.'
            #swagger.responses[200] = { 
                description: "OK" }
            #swagger.responses[400] = { 
                schema: { mensagem: "Token de verificação de email não identificado." },
                description: "Bad request" }
            #swagger.responses[404] = { 
                schema: { mensagem: "Usuário não encontrado na plataforma." },
                description: "Not found" }
            #swagger.responses[500] = { 
                schema: { mensagem: "Email já validado." },
                description: "Internal server error" }
        */ 
    })
    .get('/api/logout', AuthUser, loginController.logout, () =>{ 
        /* 
            #swagger.tags = ["Login"] 
            #swagger.description = 'Endpoint para desconectar o usuário da plataforma.'
            #swagger.responses[200] = { 
                schema: { message: "Usuário desconectado" },
                description: "Ok" }
            #swagger.responses[500] = { 
                schema: { message: "<mensagem do erro>" },
                description: "Internal server error" }
        */ 
    });

routes.options(
    [
        '/api/cadastrar', 
        '/api/login', 
        '/api/recupera-senha', 
        '/api/alterar-senha',
        '/api/confirmar-email-marketing',
        '/api/salvar-email-marketing'
    ], (req: any, res: any) => {
    res.set('Access-Control-Allow-Methods', ['POST', 'GET']);
    res.set('Access-Control-Allow-Headers', [ 'Content-Type', 'Authorization' ]);
    res.status(204);
    res.end();
})

routes.options(
    [
        '/api/verifica-email',
        '/api/logout'
    ], (req: any, res: any) => {
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', [ 'Content-Type', 'auth' ]);
    res.status(204);
    res.end();
})

export { routes };