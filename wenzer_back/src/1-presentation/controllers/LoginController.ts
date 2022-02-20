import UserRepository from "../../4-infra/repositories/userRepository";
import LoginService from "../../2-application/services/LoginAppService";
import UserService from "../../3-domain/services/UserService";
import EmailMarketingService from "../../3-domain/services/EmailMarketingService";
import EmailMarketingRepository from "../../4-infra/repositories/emailMarketingRepository";
import { UserRegisterViewModel } from "../viewmodel/UserRegisterViewModel";

export default class LoginController {

    loginService: LoginService;

    constructor() {
        this.loginService = new LoginService(new UserService(new UserRepository()), new EmailMarketingService(new EmailMarketingRepository));
    }

    async login(req: any, res: any, next: any) {
        const { email, password } = req.body;
        
        try {
            const accessToken = await this.loginService.verifyUser({ email, password });

            res.status(200).json({ token: accessToken });
        } catch(err) {
            next(err);
        } 
    }

    async logout(req: any, res: any, next: any) {
        const loginService = new LoginService(new UserService(new UserRepository()), new EmailMarketingService(new EmailMarketingRepository));
        
        try {
            await loginService.logout(req.session);

            res.status(200).json({ message: "Usuário desconectado" });
        } catch(err) {
            next(err);
        }
    }

    async register(req: any, res: any, next: any) {
        const loginService = new LoginService(new UserService(new UserRepository()), new EmailMarketingService(new EmailMarketingRepository));
        const user: UserRegisterViewModel = req.body;

        try {
            const id = await loginService.register(user);

            return res.status(201).json({ id });
        } catch(err) {
            next(err);
        }
    }

    async recoverPassword(req: any, res: any, next: any) {
        const loginService = new LoginService(new UserService(new UserRepository()), new EmailMarketingService(new EmailMarketingRepository));
        const response = { mensagem: 'Se encontrarmos um usuário com este email, enviaremos o link para alterar a senha.' };

        try {
            const { email } = req.body;
            await loginService.recoverPassword({ email });

            res.status(200).json(response);
        } catch(err) {
            next(err);
        }
    }

    async verifyEmail(req: any, res: any, next: any) {
        const loginService = new LoginService(new UserService(new UserRepository()), new EmailMarketingService(new EmailMarketingRepository));
        const {token} = req.params;

        try {
            await loginService.verifyEmail(token);
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
        const loginService = new LoginService(new UserService(new UserRepository()), new EmailMarketingService(new EmailMarketingRepository));
        const { token } = req.params;
        const { password } = req.body;

        try {
            await loginService.alterPassword(token, password);
            return res.status(200).end();
        } catch(err: any) {
            if (err.name === 'JsonWebTokenError') {
                err.message = 'Token de alteração de senha não identificado.';
            }

            next(err);
        }
    }

    async emailMarketing(req: any, res: any, next: any) {
        const loginService = new LoginService(new UserService(new UserRepository()), new EmailMarketingService(new EmailMarketingRepository));
        const { email } = req.body;

        try {
            await loginService.salvarEmailMarketing(email);
            return res.status(200).end()
        } catch(err) {
            console.log(err);
            next(err);
        }
    }

    async confirmarEmailMarketing(req: any, res: any, next: any) {
        const loginService = new LoginService(new UserService(new UserRepository()), new EmailMarketingService(new EmailMarketingRepository));
        const { token } = req.params;

        try {
            await loginService.confirmarEmailMarketing(token);
            return res.status(200).end();
        } catch(err: any) {
            if (err.name === 'JsonWebTokenError') {
                err.message = 'Token de verificação de email não identificado.';
            }

            next(err);
        } 
    }

}