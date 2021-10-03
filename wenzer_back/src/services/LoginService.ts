import { NaoAutorizado, NaoEncontrado, UsuarioJaCadastrado, ValideSeuEmail } from '../erros';
const { EmailVerify, EmailResetPassword, EmailMarketingSend } = require('../utils/Email');
import jwt from 'jsonwebtoken';
import { User } from '../repositories/user';
import { EmailMarketing } from '../repositories/emailMarketing';
import e from 'express';
import bcrypt from 'bcrypt';

module.exports = class LoginService {

    constructor() {
        
    }

    async register({ name, email, password }: any) {
        let user = new User();
        const where = `WHERE Email = '${email}'`;
        await user.get(where);

        if (user.ID) {
            throw new UsuarioJaCadastrado("Usuário já cadastrado na plataforma.");
        }

        const passwordHash = await this.generatePasswordHash(password);
        
        var usuario = new User();
        usuario.Name = name;
        usuario.Email = email;
        usuario.EmailValid = false;
        usuario.Password = passwordHash;
        usuario.Created_at = new Date();
        usuario.Updated_at = new Date();
        
        try {
            await usuario.insert(usuario);
            
            const token = this.createTokenJWT(usuario.ID, [1, 'h']);
            const route = '/welcome?token=';
            const address = `${process.env.BASE_URL_WEB}${route}${token}`;
            
            if (process.env.ENVIRONMENT === 'desenv') console.log(address);

            const emailVerify = new EmailVerify(email);
            await emailVerify.prepareHTML(address);
            emailVerify.sendEmail();

            return usuario.ID;
        } catch(err) {
            console.log("Chegou aqui")
            throw err;
        }
    }

    async verifyUsuario({ email, password }: any) {
        let user = new User();
        const sql = `WHERE Email = '${email}'`;
        await user.get(sql);

        if (!user.ID) {
            throw new NaoEncontrado('Email ou senha não encontrados.');
        }

        const valid = await this.verifyPassword(password, user.Password);

        if (!valid) {
            throw new NaoAutorizado('Email ou senha não encontrados');
        }

        if (!user.EmailValid) {
            throw new ValideSeuEmail("Valide seu email para continuar.");
        }

        const accessToken = this.createTokenJWT(user.ID, [1, 'h']);

        return accessToken;
    }

    async generatePasswordHash(password: string) {
        const custoHash = 12;
        return bcrypt.hash(password, custoHash);
    }

    verifyPassword(password: string, passwordHash: string) {
        const passwordValid = bcrypt.compare(password, passwordHash);    
        return passwordValid;
    }

    createTokenJWT(id: string, [timeAmount, timeUnit]: any) {
        const payload = { 
          id
        };
        const chave: string = process.env.CHAVE_JWT ?? '';
        const token = jwt.sign(payload, chave, { expiresIn: timeAmount+timeUnit });
        return token;
    }

    verifyTokenJWT(token: string) {
        const chave: string = process.env.CHAVE_JWT ?? '';
        const payload: any = jwt.verify(token, chave);
        return payload.id;
    }

    async recoverPassword({ email }: any) {
        let user = new User();
        const sql = `WHERE Email = ${email}`;
        await user.get(sql);
        
        if (!user.ID) {
            throw new NaoEncontrado('Email não encontrado.');
        }

        const token = this.createTokenJWT(user.ID, [1, 'h']);
        const route = '/api/alterar-senha/';
        const address = `${process.env.BASE_URL}${route}${token}`;

        try {
            const emailVerify = new EmailResetPassword(user, address);
            await emailVerify.sendEmail();
        } catch(err) {
            throw err;
        }
    }

    async verifyEmail(token: string) {
        const id = this.verifyTokenJWT(token);
        let user = new User();
        await user.getById(id);
        
        if (!user.ID) {
            throw new NaoEncontrado('Usuário não encontrado na plataforma.');
        }

        if (user.EmailValid) {
            throw new Error('Email já validado.');
        }

        try {
            user.EmailValid = true;
            user.update(user);
        } catch(err) {
            throw err;
        }
    }

    async alterPassword(token: string, password: string) {
        const id = await this.verifyTokenJWT(token);

        let user = new User();
        await user.getById(id);

        if (!user) {
            throw new NaoEncontrado('Email ou senha não encontrados.');
        }

        const valid = await this.verifyPassword(password, user.Password);

        if (valid) {
            throw new Error("Essa senha é a mesma da sua conta atual.");
        }

        user.Password = await this.generatePasswordHash(password);
        user.update(user);
    }

    async salvarEmailMarketing(email: string) {
        let save = new EmailMarketing();
        save.email = email;
        await save.Buscar();

        if (save.id) {
            throw new  NaoEncontrado('E-mail já cadastrado, verifique sua caixa de entrada.');
        }

        const token = this.createTokenJWT(save.email, [1, 'h']);
        const route = '?token=';
        const address = `${process.env.BASE_URL_WEB}${route}${token}`;
        
        if (process.env.ENVIRONMENT === 'desenv') console.log(address);

        save.Adiciona();
        const sendEmail = new EmailMarketingSend(save.email);
        await sendEmail.prepareHTML(address);
        sendEmail.sendEmail();
    }

    async confirmarEmailMarketing(token: string) {
        const email = this.verifyTokenJWT(token);
        let emailMarketing = new EmailMarketing();
        emailMarketing.email = email;
        await emailMarketing.Buscar();
        
        if (!emailMarketing.id) {
            throw new NaoEncontrado('Email não encontrado na plataforma.');
        }

        if (emailMarketing.emailValid) {
            throw new Error('Email já validado.');
        }

        try {
            emailMarketing.emailValid = true;
            emailMarketing.Update();
        } catch(err) {
            throw err;
        }
    }

}