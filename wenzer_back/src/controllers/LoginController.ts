const LoginService = require("../services/LoginService");

module.exports = class LoginController {

    async login(req: any, res: any, next: any) {
        const { email, password } = req.body;
        const loginService = new LoginService();
        
        try {
            const accessToken = await loginService.verifyUsuario({ email, password });

            res.status(200).json({ token: accessToken });
        } catch(err) {
            next(err);
        }
    }

    async register(req: any, res: any, next: any) {
        const { name, email, password } = req.body;
        const loginService = new LoginService();

        try {
            const id = await loginService.register({ name, email, password });

            return res.status(201).json({ id });
        } catch(err) {
            next(err);
        }
    }

    async recoverPassword(req: any, res: any, next: any) {
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

    async verifyEmail(req: any, res: any, next: any) {
        const {token} = req.params;
        const loginService = new LoginService();

        try {
            await loginService.verifyEmail(token);
            return res.status(200).end();
        } catch(err: any) {
            if (err.name === 'JsonWebTokenError') {
                err.message = 'Token de verificação de email não identificado.';
            }
            
            next(err);
        }
    }

    async alterPassword(req: any, res: any, next: any) {
        const { token } = req.params;
        const { password } = req.body;
        const loginService = new LoginService();

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
        const { email } = req.body;
        const loginService = new LoginService();

        try {
            await loginService.salvarEmailMarketing(email);
            return res.status(200).end()
        } catch(err) {
            console.log(err);
            next(err);
        }
    }

      async confirmarEmailMarketing(req: any, res: any, next: any) {
        const { token } = req.params;
        const loginService = new LoginService();

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