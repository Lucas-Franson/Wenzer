import { Request, Response } from 'express';
import { User } from '../entities/User';
import { LoginService } from '../services/LoginService';

class LoginController {

    public async login(req: Request, res: Response, next) {
        const { email, password } = req.body;
        const loginService = new LoginService();
        
        try {
            const user = await loginService.verifyUsuario({ email, password });
            const accessToken = await User.createTokenJWT(user.id, [1, 'h']);

            res.status(200).json({ token: accessToken });
        } catch(err) {

            next(err);
        }
    }

    public async register(req: Request, res: Response, next) {
        const { name, email, password } = req.body;
        const loginService = new LoginService();

        try {
            const id = await loginService.register({ name, email, password });

            return res.status(201).json({ id });
        } catch(err) {
            next(err);
        }
    }

    public async recoverPassword(req: Request, res: Response, next) {
        const response = { mensagem: 'Se encontrarmos um usuário com este email, enviaremos o link para alterar a senha.' };
        const loginService = new LoginService();

        try {
            const { email } = req.body;
            await loginService.recoverPassword({ email });

            res.status(200).json(response);
        } catch(err) {
            next(err);
        }
    }

    public async verifyEmail(req: Request, res: Response, next) {
        const {token} = req.params;
        const loginService = new LoginService();

        try {
            const id = await User.verifyTokenJWT(token);
            await loginService.verifyEmail(id);
            return res.status(200).end();
        } catch(err) {
            if (err.name === 'JsonWebTokenError') {
                err.message = 'Token de verificação de email não identificado.';
            }
            
            next(err);
        }
    }

    public async alterPassword(req: Request, res: Response, next) {
        const { token } = req.params;
        const { password } = req.body;
        const loginService = new LoginService();

        try {
            const id = await User.verifyTokenJWT(token);
            await loginService.alterPassword(id, password);
            return res.status(200).end();
        } catch(err) {
            if (err.name === 'JsonWebTokenError') {
                err.message = 'Token de alteração de senha não identificado.';
            }

            next(err);
        }
    }

}

export { LoginController };