import { Request, Response } from 'express';
import { Usuario } from '../entities/Usuario';
import { LoginService } from '../services/LoginService';

class LoginController {

    public async logar(req: Request, res: Response) {
        return res.status(200).json({ message: 'endpoint de login' });
    }

    public async cadastrar(req: Request, res: Response) {
        const { nome, email, senha } = req.body;
        const loginService = new LoginService();

        try {
            const id = await loginService.cadastrar({ nome, email, senha });

            return res.status(201).json({ id });
        } catch(err) {
            console.log(err);
            return res.status(500).json({ message: err.message });
        }
    }

    public async recuperaSenha(req: Request, res: Response) {
        return res.status(200).json({ message: "endpoint de recuperar senha" });
    }

}

export { LoginController };