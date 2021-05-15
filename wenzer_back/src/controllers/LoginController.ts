import { Request, Response } from 'express';
import { Usuario } from '../entities/Usuario';
import { LoginService } from '../services/LoginService';

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

            return res.status(201).json({ id });
        } catch(err) {
            proximo(err);
        }
    }

    public async recuperaSenha(req: Request, res: Response, proximo) {
        const resposta = { mensagem: 'Se encontrarmos um usuário com este email, enviaremos o link para alterar a senha.' };
        const loginService = new LoginService();

        try {
            const { email } = req.body;
            await loginService.recuperarSenha({ email });

            res.status(200).json(resposta);
        } catch(err) {
            proximo(err);
        }
    }

    public async verificaEmail(req: Request, res: Response, proximo) {
        const {token} = req.params;
        const loginService = new LoginService();

        try {
            const id = await Usuario.verificaTokenJWT(token);
            await loginService.verificaEmail(id);
            return res.status(200).end();
        } catch(err) {
            if (err.name === 'JsonWebTokenError') {
                err.message = 'Token de verificação de email não identificado.';
            }
            
            proximo(err);
        }
    }

    public async alterarSenha(req: Request, res: Response, proximo) {
        const { token } = req.params;
        const { senha } = req.body;
        const loginService = new LoginService();

        try {
            const id = await Usuario.verificaTokenJWT(token);
            await loginService.alterarSenha(id, senha);
            return res.status(200).end();
        } catch(err) {
            if (err.name === 'JsonWebTokenError') {
                err.message = 'Token de alteração de senha não identificado.';
            }

            proximo(err);
        }
    }

}

export { LoginController };