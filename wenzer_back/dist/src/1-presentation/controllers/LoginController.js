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
Object.defineProperty(exports, "__esModule", { value: true });
const UserRegisterViewModel_1 = require("../viewmodel/UserRegisterViewModel");
class LoginController {
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const accessToken = yield req.service.loginService.verifyUser({ email, password });
                res.status(200).json({ token: accessToken });
            }
            catch (err) {
                next(err);
                console.log(err);
            }
        });
    }
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield req.service.loginService.logout(req.session);
                res.status(200).json({ message: "Usuário desconectado" });
            }
            catch (err) {
                next(err);
            }
        });
    }
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new UserRegisterViewModel_1.UserRegisterViewModel(req.body.name, req.body.email, req.body.password);
            try {
                user.validateModel();
                const id = yield req.service.loginService.register(user);
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
            try {
                const { email } = req.body;
                yield req.service.loginService.recoverPassword({ email });
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
            try {
                yield req.service.loginService.verifyEmail(token);
                return res.status(200).end();
            }
            catch (err) {
                if (err.name === 'JsonWebTokenError') {
                    err.message = 'Token de verificação de email não identificado.';
                }
                if (err.name === 'TokenExpiredError') {
                    err.message = 'Token de verificação de email expirou.';
                }
                next(err);
            }
        });
    }
    alterPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = req.params;
            const { password } = req.body;
            try {
                yield req.service.loginService.alterPassword(token, password);
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
            try {
                yield req.service.loginService.salvarEmailMarketing(email);
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
            try {
                yield req.service.loginService.confirmarEmailMarketing(token);
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
}
exports.default = LoginController;
//# sourceMappingURL=LoginController.js.map