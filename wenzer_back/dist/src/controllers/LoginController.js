"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const LoginService = require("../services/LoginService");
module.exports = class LoginController {
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const loginService = new LoginService();
            try {
                const accessToken = yield loginService.verifyUsuario({ email, password });
                res.status(200).json({ token: accessToken });
            }
            catch (err) {
                next(err);
            }
        });
    }
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            const loginService = new LoginService();
            try {
                const id = yield loginService.register({ name, email, password });
                return res.status(201).json({ id });
            }
            catch (err) {
                next(err);
            }
        });
    }
    recoverPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = { mensagem: 'Se encontrarmos um usuário com este email, enviaremos o link para alterar a senha.' };
            const loginService = new LoginService();
            try {
                const { email } = req.body;
                yield loginService.recoverPassword({ email });
                res.status(200).json(response);
            }
            catch (err) {
                next(err);
            }
        });
    }
    verifyEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = req.params;
            const loginService = new LoginService();
            try {
                yield loginService.verifyEmail(token);
                return res.status(200).end();
            }
            catch (err) {
                if (err.name === 'JsonWebTokenError') {
                    err.message = 'Token de verificação de email não identificado.';
                }
                next(err);
            }
        });
    }
    alterPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = req.params;
            const { password } = req.body;
            const loginService = new LoginService();
            try {
                yield loginService.alterPassword(token, password);
                return res.status(200).end();
            }
            catch (err) {
                if (err.name === 'JsonWebTokenError') {
                    err.message = 'Token de alteração de senha não identificado.';
                }
                next(err);
            }
        });
    }
    emailMarketing(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            const loginService = new LoginService();
            try {
                yield loginService.salvarEmailMarketing(email);
                return res.status(200).end();
            }
            catch (err) {
                console.log(err);
                next(err);
            }
        });
    }
    confirmarEmailMarketing(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = req.params;
            const loginService = new LoginService();
            try {
                yield loginService.confirmarEmailMarketing(token);
                return res.status(200).end();
            }
            catch (err) {
                if (err.name === 'JsonWebTokenError') {
                    err.message = 'Token de verificação de email não identificado.';
                }
                next(err);
            }
        });
    }
};
//# sourceMappingURL=LoginController.js.map