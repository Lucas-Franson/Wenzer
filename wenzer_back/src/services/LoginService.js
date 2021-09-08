const NotAuthorized = require("../errors/notAuthorized");
const NotFound = require("../errors/notFound");
const AlreadyRegistered = require("../errors/alreadyRegistered");
const EmailNotValid = require("../errors/emailNotValid");
const { EmailVerify, EmailResetPassword, EmailMarketingSend } = require('../utils/Email.js');
const jwt =  require('jsonwebtoken');
const User = require('../repositories/user');
const EmailMarketing = require('../repositories/emailMarketing');
const e = require('express');
const bcrypt = require('bcrypt');

module.exports = class LoginService {

    constructor() {
        
    }

    async register({ name, email, password }) {
        let userToFind = new User();
        userToFind.email = email;
        userToFind.id = null;
        await userToFind.get();

        if (userToFind.id) {
            throw new AlreadyRegistered("Usuário já cadastrado na plataforma.");
        }

        const passwordHash = await this.generatePasswordHash(password);
        
        var userToCreate = new User();
        userToCreate.name = name;
        userToCreate.email = email;
        userToCreate.emailValid = false;
        userToCreate.password = passwordHash;
        userToCreate.created_at = new Date();
        userToCreate.updated_at = new Date();
        
        try {
            await userToCreate.add(userToCreate);
            
            const token = this.createTokenJWT(userToCreate.id, [1, 'h']);
            const route = '/welcome?token=';
            const address = `${process.env.BASE_URL_WEB}${route}${token}`;
            
            if (process.env.ENVIRONMENT === 'desenv') console.log(address);

            const emailVerify = new EmailVerify(email);
            await emailVerify.prepareHTML(address);
            emailVerify.sendEmail();

            return userToCreate.id;
        } catch(err) {
            throw err;
        }
    }

    async verifyUser({ email, password }) {
        let userToFind = new User();
        userToFind.id = null;
        userToFind.email = email;
        await userToFind.get();

        if (!userToFind.id) {
            throw new NotFound('Email ou senha não encontrados.');
        }

        const valid = await this.verifyPassword(password, userToFind.password);

        if (!valid) {
            throw new NotAuthorized('Email ou senha não encontrados');
        }

        if (!userToFind.emailValid) {
            throw new EmailNotValid("Valide seu email para continuar.");
        }

        const accessToken = this.createTokenJWT(user.id, [1, 'h']);

        return accessToken;
    }

    async generatePasswordHash(password) {
        const custoHash = 12;
        return bcrypt.hash(password, custoHash);
    }

    verifyPassword(password, passwordHash) {
        const passwordValid = bcrypt.compare(password, passwordHash);    
        return passwordValid;
    }

    createTokenJWT(id, [timeAmount, timeUnit]) {
        const payload = { 
          id
        };
        const token = jwt.sign(payload, process.env.CHAVE_JWT, { expiresIn: timeAmount+timeUnit });
        return token;
    }

    verifyTokenJWT(token) {
        const payload = jwt.verify(token, process.env.CHAVE_JWT);
        return payload.id;
    }

    async recoverPassword({ email }) {
        let userToFind = new User();
        userToFind.email = email;
        userToFind.id = null;
        await userToFind.get();
        
        if (!userToFind.id) {
            throw new NotFound('Email não encontrado.');
        }

        const token = this.createTokenJWT(userToFind.id, [1, 'h']);
        const route = '/api/alterar-senha/';
        const address = `${process.env.BASE_URL}${route}${token}`;

        try {
            const emailVerify = new EmailResetPassword(userToFind, address);
            await emailVerify.sendEmail();
        } catch(err) {
            throw err;
        }
    }

    async verifyEmail(token) {
        const id = this.verifyTokenJWT(token);
        let userToFind = new User();
        userToFind.id = id;
        await userToFind.get();
        
        if (!userToFind.id) {
            throw new NotFound('Usuário não encontrado na plataforma.');
        }

        if (userToFind.emailValid) {
            throw new Error('Email já validado.');
        }

        try {
            userToFind.emailValid = true;
            userToFind.update(userToFind);
        } catch(err) {
            throw err;
        }
    }

    async alterPassword(token, password) {
        const id = await this.verifyTokenJWT(token);

        let userToFind = new User();
        userToFind.id = id;
        await userToFind.get();

        if (!userToFind) {
            throw new NotFound('Email ou senha não encontrados.');
        }

        const valid = await this.verifyPassword(password, userToFind.password);

        if (valid) {
            throw new Error("Essa senha é a mesma da sua conta atual.");
        }

        userToFind.password = await this.generatePasswordHash(password);
        userToFind.update(userToFind);
    }

    async salvarEmailMarketing(email) {
        let emailToSave = new EmailMarketing();
        emailToSave.email = email;
        emailToSave.id = null;
        await emailToSave.get();

        if (emailToSave.id) {
            throw new AlreadyRegistered('E-mail já cadastrado, verifique sua caixa de entrada.');
        }

        const token = this.createTokenJWT(emailToSave.email, [1, 'h']);
        const route = '?token=';
        const address = `${process.env.BASE_URL_WEB}${route}${token}`;
        
        if (process.env.ENVIRONMENT === 'desenv') console.log(address);

        emailToSave.add(emailToSave);
        const sendEmail = new EmailMarketingSend(emailToSave.email);
        await sendEmail.prepareHTML(address);
        sendEmail.sendEmail();
    }

    async confirmEmailMarketing(token) {
        const email = this.verifyTokenJWT(token);
        let emailMarketing = new EmailMarketing();
        emailMarketing.email = email;
        emailMarketing.id = null;
        await emailMarketing.get();
        
        if (!emailMarketing.id) {
            throw new NotFound('Email não encontrado na plataforma.');
        }

        if (emailMarketing.emailValid) {
            throw new Error('Email já validado.');
        }

        try {
            emailMarketing.emailValid = 1;
            emailMarketing.update(emailMarketing);
        } catch(err) {
            throw err;
        }
    }

}