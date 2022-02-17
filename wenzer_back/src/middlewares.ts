import { verifyTokenJWT } from './utils/jwt/Token';

function GlobalErrorHandler(app: any) {
    app.use((err: any, req: any, res: any, next: any) => {
        let status = 500;
        
        const corpo = {
            mensagem: err.message
        };

        if (err.name === 'NaoEncontrado') {
            status = 404;
        }

        if (err.name === 'NaoAutorizado') {
            status = 403;
        }

        if (err.name === 'JsonWebTokenError' || err.name === 'ValideSeuEmail' || err.name === 'UsuarioJaCadastrado') {
            status = 400;
        }
        
        res.status(status).json(corpo);
    });
}

const AuthUser = (req: any, res: any, next: any) => {
    const token = req.headers.auth;
    const userId = verifyTokenJWT(token);

    if (token && userId) {
        req.session.userId = userId;
        next();
    } else {
        res.status(403).json({ mensagem: "Usuário não está autenticado!" });
    }
}

export { AuthUser, GlobalErrorHandler };