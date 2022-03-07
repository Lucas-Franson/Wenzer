import Logger from "../../4-infra/utils/logger";
import { UserRegisterViewModel } from "../viewmodel/UserRegisterViewModel";

export default class LoginController {

    async login(req: any, res: any, next: any) {
        const { email, password } = req.body;
        
        try {
            const accessToken = await req.service.loginService.verifyUser({ email, password });

            res.status(200).json({ token: accessToken });
        } catch(err: any) {
            next(err);
            new Logger('Login', err).log();
        } 
    }

    async logout(req: any, res: any, next: any) {
        try {
            await req.service.loginService.logout(req.session);

            res.status(200).json({ message: "Usuário desconectado" });
        } catch(err) {
            next(err);
        }
    }

    async register(req: any, res: any, next: any) {
        const user = new UserRegisterViewModel(req.body.name, req.body.email, req.body.password);

        try {
            user.validateModel();
            const id = await req.service.loginService.register(user);

            return res.status(201).json({ id });
        } catch(err) {
            next(err);
        }
    }

    async recoverPassword(req: any, res: any, next: any) {
        const response = { mensagem: 'Se encontrarmos um usuário com este email, enviaremos o link para alterar a senha.' };

        try {
            const { email } = req.body;
            await req.service.loginService.recoverPassword({ email });

            res.status(200).json(response);
        } catch(err) {
            next(err);
        }
    }

    async verifyEmail(req: any, res: any, next: any) {
        const {token} = req.params;

        try {
            await req.service.loginService.verifyEmail(token);
            return res.status(200).end();
        } catch(err: any) {
            if (err.name === 'JsonWebTokenError') {
                err.message = 'Token de verificação de email não identificado.';
            }

            if (err.name === 'TokenExpiredError') {
                err.message = 'Token de verificação de email expirou.';
            }
            
            next(err);
        }
    }

    async alterPassword(req: any, res: any, next: any) {
        const { token } = req.params;
        const { password } = req.body;

        try {
            await req.service.loginService.alterPassword(token, password);
            return res.status(200).end();
        } catch(err: any) {
            if (err.name === 'JsonWebTokenError') {
                err.message = 'Token de alteração de senha não identificado.';
            }

            next(err);
        }
    }

    async emailMarketing(req: any, res: any, next: any) {
        const { email } = req.body;

        try {
            await req.service.loginService.salvarEmailMarketing(email);
            return res.status(200).end()
        } catch(err: any) {
            new Logger('Email Marketing', err).log();
            next(err);
        }
    }

    async confirmarEmailMarketing(req: any, res: any, next: any) {
        const { token } = req.params;

        try {
            await req.service.loginService.confirmarEmailMarketing(token);
            return res.status(200).end();
        } catch(err: any) {
            if (err.name === 'JsonWebTokenError') {
                err.message = 'Token de verificação de email não identificado.';
            }

            next(err);
        } 
    }

}