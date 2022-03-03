import { verifyTokenJWT } from "../1-presentation/utils/jwt/token";

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

export { AuthUser }