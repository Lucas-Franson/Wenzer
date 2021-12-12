import { NaoAutorizado, NaoEncontrado, UsuarioJaCadastrado, ValideSeuEmail } from '../erros';
import { EmailMarketingSend } from '../utils/Email/EmailMarketingSend';
import { EmailResetPassword } from '../utils/Email/EmailResetPassword';
import { EmailVerify } from '../utils/Email/EmailVerify';
import jwt from 'jsonwebtoken';
import { User } from '../repositories/user';
import { EmailMarketing } from '../repositories/emailMarketing';
import bcrypt from 'bcrypt';

module.exports = class LoginService {

    constructor() {
        
    }

    async register({ name, email, password }: any) {
        let user = new User();
        const where = `WHERE Email = '${email}'`;
        const userFound = await user.get(where);

        if (userFound) {
            throw new UsuarioJaCadastrado("Usuário já cadastrado na plataforma.");
        }

        const passwordHash = await this.generatePasswordHash(password);
        
        var usuario = new User(name, email, passwordHash);
        
        try {
            await usuario.insert(usuario);
            
            const token = this.createTokenJWT(usuario.id, [1, 'h']);
            const route = '/welcome?token=';
            const address = `${process.env.BASE_URL_WEB}${route}${token}`;
            
            if (process.env.ENVIRONMENT === 'desenv') console.log(address);

            const emailVerify = new EmailVerify(email);
            await emailVerify.prepareHTML(address);
            emailVerify.sendEmail();

            return usuario.id;
        } catch(err) {
            console.log("Chegou aqui")
            throw err;
        }
    }

    async verifyUsuario({ email, password }: any) {
        let user = new User();
        const sql = `WHERE Email = '${email}'`;
        const userFound = await user.get(sql);

        if (!userFound) {
            throw new NaoEncontrado('Email ou senha não encontrados.');
        }

        const valid = await this.verifyPassword(password, userFound.password);

        if (!valid) {
            throw new NaoAutorizado('Email ou senha não encontrados');
        }

        if (!userFound.emailValid) {
            throw new ValideSeuEmail("Valide seu email para continuar.");
        }

        const accessToken = this.createTokenJWT(userFound.id, [1, 'h']);

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
        const sql = `WHERE Email = "${email}"`;
        const userFound = await user.get(sql);
        
        if (!userFound) {
            throw new NaoEncontrado('Email não encontrado.');
        }

        const token = this.createTokenJWT(userFound.id, [1, 'h']);
        const route = '/api/alterar-senha/';
        const address = `${process.env.BASE_URL}${route}${token}`;

        try {
            const emailVerify = new EmailResetPassword(userFound, address);
            await emailVerify.sendEmail();
        } catch(err) {
            throw err;
        }
    }

    async verifyEmail(token: string) {
        const id = this.verifyTokenJWT(token);
        let user = new User();
        const userFound = await user.getById(id);
        
        if (!userFound) {
            throw new NaoEncontrado('Usuário não encontrado na plataforma.');
        }

        if (userFound.emailValid) {
            throw new Error('Email já validado.');
        }

        try {
            userFound.emailValid = true;
            await user.update(userFound);
        } catch(err) {
            throw err;
        }
    }

    async alterPassword(token: string, password: string) {
        const id = await this.verifyTokenJWT(token);

        let user = new User();
        const userFound = await user.getById(id);

        if (!userFound) {
            throw new NaoEncontrado('Email ou senha não encontrados.');
        }

        const valid = await this.verifyPassword(password, userFound.password);

        if (valid) {
            throw new Error("Essa senha é a mesma da sua conta atual.");
        }

        userFound.password = await this.generatePasswordHash(password);
        user.update(userFound);
    }

    async salvarEmailMarketing(email: string) {
        const where = `WHERE Email = '${email}'`;
        const emailFound = await new EmailMarketing().get(where);
        
        if(emailFound?.id) throw new NaoEncontrado('E-mail já cadastrado, verifique sua caixa de entrada.');
        
        const token = this.createTokenJWT(email, [1, 'h']);
        const route = '?token=';
        const address = `${process.env.BASE_URL_WEB}${route}${token}`;
        
        if (process.env.ENVIRONMENT === 'desenv') console.log(address);

        let emailToCreate = new EmailMarketing(email);
        new EmailMarketing().insert(emailToCreate);

        const sendEmail = new EmailMarketingSend(emailToCreate.email);
        await sendEmail.prepareHTML(address);
        sendEmail.sendEmail();
    }

    async confirmarEmailMarketing(token: string) {
        const email = this.verifyTokenJWT(token);
        const where = `WHERE Email = '${email}'`;
        const emailFound = await new EmailMarketing().get(where);
        
        if (!emailFound) {
            throw new NaoEncontrado('Email não encontrado na plataforma.');
        }

        if (emailFound.emailValid) {
            throw new Error('Email já validado.');
        }

        try {
            emailFound.emailValid = true;
            await new EmailMarketing().update(emailFound);
        } catch(err) {
            throw err;
        }
    }

}