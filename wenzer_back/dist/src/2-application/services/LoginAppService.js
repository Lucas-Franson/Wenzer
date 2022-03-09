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
const erros_1 = require("../../erros");
const token_1 = require("../../1-presentation/utils/jwt/token");
const user_1 = require("../../3-domain/entities/user");
class LoginAppService {
    constructor(userService, emailMarketingService) {
        this.userService = userService;
        this.emailMarketingService = emailMarketingService;
    }
    register(userViewModel) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var userFound = yield this.userService.findUserByEmail(userViewModel.getEmail());
                if (userFound && userFound.emailIsValid()) {
                    throw new erros_1.UsuarioJaCadastrado("Usuário já cadastrado na plataforma.");
                }
                let user = userViewModel.convertToUserEntity();
                if (userFound && !userFound.emailIsValid()) {
                    user = new user_1.User(userViewModel.getName(), userViewModel.getEmail(), userViewModel.getPassword(), userFound._title, userFound._photo, userFound._bio, false, userFound.getId(), userFound.getCreatedAt(), new Date());
                    yield this.userService.updateUserNewPwd(user, userViewModel.getPassword());
                }
                else {
                    yield this.userService.create(user);
                }
                yield this.userService.sendEmailOfVerification(user);
                return user.getId();
            }
            catch (err) {
                // LOG
                throw err;
            }
        });
    }
    verifyUser({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            let found = yield this.userService.findUserByEmail(email);
            if (!found) {
                throw new erros_1.NaoEncontrado('Email ou senha não encontrados.');
            }
            var valid = yield this.userService.validPasswordOfUser(password, found.getPassword());
            if (!valid) {
                throw new erros_1.NaoAutorizado('Email ou senha não encontrados.');
            }
            if (!found.emailIsValid()) {
                throw new erros_1.ValideSeuEmail("Valide seu email para continuar.");
            }
            const accessToken = (0, token_1.createTokenJWT)(found.getId(), [1, 'h']);
            return accessToken;
        });
    }
    logout(session) {
        return __awaiter(this, void 0, void 0, function* () {
            session.destroy((err) => {
                console.log(err);
            });
        });
    }
    recoverPassword({ email }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userFound = yield this.userService.findUserByEmail(email);
            if (!userFound) {
                throw new erros_1.NaoEncontrado('Email não encontrado.');
            }
            try {
                yield this.userService.sendEmailOfResetPassword(userFound);
            }
            catch (err) {
                throw err;
            }
        });
    }
    verifyEmail(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var user = yield this.userService.findUserByToken(token);
                if (!user) {
                    throw new erros_1.NaoEncontrado('Usuário não encontrado na plataforma.');
                }
                yield this.userService.validateUserEmail(user);
            }
            catch (err) {
                throw err;
            }
        });
    }
    alterPassword(token, password) {
        return __awaiter(this, void 0, void 0, function* () {
            var user = yield this.userService.findUserByToken(token);
            if (!user) {
                throw new erros_1.NaoEncontrado('Email ou senha não encontrados.');
            }
            const valid = yield this.userService.validPasswordOfUser(password, user.getPassword());
            if (valid) {
                throw new Error("Essa senha é a mesma da sua conta atual.");
            }
            yield this.userService.updateUserNewPwd(user, password);
        });
    }
    salvarEmailMarketing(email) {
        return __awaiter(this, void 0, void 0, function* () {
            var emailMarketing = yield this.emailMarketingService.findEmailMarketing(email);
            if (emailMarketing === null || emailMarketing === void 0 ? void 0 : emailMarketing.getId())
                throw new erros_1.NaoEncontrado('E-mail já cadastrado, verifique sua caixa de entrada.');
            yield this.emailMarketingService.create(email);
        });
    }
    confirmarEmailMarketing(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var emailMarketing = yield this.emailMarketingService.findEmailMarketingByToken(token);
                if (!emailMarketing) {
                    throw new erros_1.NaoEncontrado('Email não encontrado na plataforma.');
                }
                yield this.emailMarketingService.validateEmailMarketing(emailMarketing);
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = LoginAppService;
//# sourceMappingURL=LoginAppService.js.map