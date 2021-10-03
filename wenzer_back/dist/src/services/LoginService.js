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
const { NaoAutorizado, NaoEncontrado, UsuarioJaCadastrado, ValideSeuEmail } = require('../erros');
const { EmailVerify, EmailResetPassword, EmailMarketingSend } = require('../utils/Email');
const jwt = require('jsonwebtoken');
const User = require('../repositories/user');
const EmailMarketing = require('../repositories/emailMarketing');
const e = require('express');
const bcrypt = require('bcrypt');
module.exports = class LoginService {
    constructor() {
    }
    register({ name, email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = new User();
            user.email = email;
            user.id = null;
            yield user.Buscar();
            if (user.id) {
                throw new UsuarioJaCadastrado("Usuário já cadastrado na plataforma.");
            }
            const passwordHash = yield this.generatePasswordHash(password);
            var usuario = new User();
            usuario.name = name;
            usuario.email = email;
            usuario.emailValid = false;
            usuario.password = passwordHash;
            usuario.created_at = new Date();
            usuario.updated_at = new Date();
            try {
                yield usuario.Adiciona();
                const token = this.createTokenJWT(usuario.id, [1, 'h']);
                const route = '/welcome?token=';
                const address = `${process.env.BASE_URL_WEB}${route}${token}`;
                if (process.env.ENVIRONMENT === 'desenv')
                    console.log(address);
                const emailVerify = new EmailVerify(email);
                yield emailVerify.prepareHTML(address);
                emailVerify.sendEmail();
                return usuario.id;
            }
            catch (err) {
                console.log("Chegou aqui");
                throw err;
            }
        });
    }
    verifyUsuario({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = new User();
            user.id = null;
            user.email = email;
            yield user.Buscar();
            if (!user.id) {
                throw new NaoEncontrado('Email ou senha não encontrados.');
            }
            const valid = yield this.verifyPassword(password, user.password);
            if (!valid) {
                throw new NaoAutorizado('Email ou senha não encontrados');
            }
            if (!user.emailValid) {
                throw new ValideSeuEmail("Valide seu email para continuar.");
            }
            const accessToken = this.createTokenJWT(user.id, [1, 'h']);
            return accessToken;
        });
    }
    generatePasswordHash(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const custoHash = 12;
            return bcrypt.hash(password, custoHash);
        });
    }
    verifyPassword(password, passwordHash) {
        const passwordValid = bcrypt.compare(password, passwordHash);
        return passwordValid;
    }
    createTokenJWT(id, [timeAmount, timeUnit]) {
        const payload = {
            id
        };
        const token = jwt.sign(payload, process.env.CHAVE_JWT, { expiresIn: timeAmount + timeUnit });
        return token;
    }
    verifyTokenJWT(token) {
        const payload = jwt.verify(token, process.env.CHAVE_JWT);
        return payload.id;
    }
    recoverPassword({ email }) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = new User();
            user.email = email;
            user.id = null;
            yield user.Buscar();
            if (!user.id) {
                throw new NaoEncontrado('Email não encontrado.');
            }
            const token = this.createTokenJWT(user.id, [1, 'h']);
            const route = '/api/alterar-senha/';
            const address = `${process.env.BASE_URL}${route}${token}`;
            try {
                const emailVerify = new EmailResetPassword(user, address);
                yield emailVerify.sendEmail();
            }
            catch (err) {
                throw err;
            }
        });
    }
    verifyEmail(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = this.verifyTokenJWT(token);
            let user = new User();
            user.id = id;
            yield user.Buscar();
            if (!user.id) {
                throw new NaoEncontrado('Usuário não encontrado na plataforma.');
            }
            if (user.emailValid) {
                throw new Error('Email já validado.');
            }
            try {
                user.emailValid = true;
                user.Update();
            }
            catch (err) {
                throw err;
            }
        });
    }
    alterPassword(token, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = yield this.verifyTokenJWT(token);
            let user = new User();
            user.id = id;
            yield user.Buscar();
            if (!user) {
                throw new NaoEncontrado('Email ou senha não encontrados.');
            }
            const valid = yield this.verifyPassword(password, user.password);
            if (valid) {
                throw new Error("Essa senha é a mesma da sua conta atual.");
            }
            user.password = yield this.generatePasswordHash(password);
            user.Update();
        });
    }
    salvarEmailMarketing(email) {
        return __awaiter(this, void 0, void 0, function* () {
            let save = new EmailMarketing();
            save.email = email;
            save.id = null;
            yield save.Buscar();
            if (save.id) {
                throw new NaoEncontrado('E-mail já cadastrado, verifique sua caixa de entrada.');
            }
            const token = this.createTokenJWT(save.email, [1, 'h']);
            const route = '?token=';
            const address = `${process.env.BASE_URL_WEB}${route}${token}`;
            if (process.env.ENVIRONMENT === 'desenv')
                console.log(address);
            save.Adiciona();
            const sendEmail = new EmailMarketingSend(save.email);
            yield sendEmail.prepareHTML(address);
            sendEmail.sendEmail();
        });
    }
    confirmarEmailMarketing(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = this.verifyTokenJWT(token);
            let emailMarketing = new EmailMarketing();
            emailMarketing.email = email;
            emailMarketing.id = null;
            yield emailMarketing.Buscar();
            if (!emailMarketing.id) {
                throw new NaoEncontrado('Email não encontrado na plataforma.');
            }
            if (emailMarketing.emailValid) {
                throw new Error('Email já validado.');
            }
            try {
                emailMarketing.emailValid = 1;
                emailMarketing.Update();
            }
            catch (err) {
                throw err;
            }
        });
    }
};
//# sourceMappingURL=LoginService.js.map