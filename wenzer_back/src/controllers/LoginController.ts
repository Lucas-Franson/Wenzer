import { Request, Response } from 'express';
import { Usuario } from '../entities/Usuario';
import { LoginService } from '../services/LoginService';
import { EmailVerificacao } from '../utils/Email';

class LoginController {

    public async login(req: Request, res: Response, proximo) {
        const { email, senha } = req.body;
        const loginService = new LoginService();
        
        try {
            const user = await loginService.verificarUsuario({ email, senha });
            const accessToken = await Usuario.criaTokenJWT(user.id, [1, 'h']);

            res.set('Authorization', accessToken);
            res.status(200);
            res.end();
        } catch(err) {
            proximo(err);
        }
    }

    public async cadastrar(req: Request, res: Response, proximo) {
        const { nome, email, senha } = req.body;
        const loginService = new LoginService();

        try {
            const id = await loginService.cadastrar({ nome, email, senha });

            const token = await Usuario.criaTokenJWT(id, [1, 'h']);
            const rota = '/api/verifica_email/';
            const endereco = `${process.env.BASE_URL}${rota}${token}`;
            const emailVerificacao = new EmailVerificacao(email, endereco);
            
            emailVerificacao.enviaEmail();
            
            return res.status(201).json({ id });
        } catch(err) {
            proximo(err);
        }
    }

    public async recuperaSenha(req: Request, res: Response, proximo) {
        const resposta = { mensagem: 'Se encontrarmos um usuário com este email, enviaremos o link para alterar a senha.' };
        try {

        } catch(err) {
            proximo(err);
        }
    }

}

export { LoginController };