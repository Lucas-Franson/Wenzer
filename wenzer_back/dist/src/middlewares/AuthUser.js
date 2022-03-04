"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUser = void 0;
const token_1 = require("../1-presentation/utils/jwt/token");
const AuthUser = (req, res, next) => {
    const token = req.headers.auth;
    const userId = (0, token_1.verifyTokenJWT)(token);
    if (token && userId) {
        req.session.userId = userId;
        next();
    }
    else {
        res.status(403).json({ mensagem: "Usuário não está autenticado!" });
    }
};
exports.AuthUser = AuthUser;
//# sourceMappingURL=AuthUser.js.map