import { NaoAutorizado, NaoEncontrado, UsuarioJaCadastrado, ValideSeuEmail } from '../erros';
import { EmailMarketingSend } from '../utils/Email/EmailMarketingSend';
import { EmailResetPassword } from '../utils/Email/EmailResetPassword';
import { EmailVerify } from '../utils/Email/EmailVerify';
import { createTokenJWT, verifyTokenJWT } from '../utils/jwt/Token';
import { User } from '../domain/user';
import { EmailMarketing } from '../domain/emailMarketing';
import bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/user/userRepository';
import { EmailMarketingRepository } from '../repositories/emailMarketing/emailMarketingRepository';

module.exports = class LoginService {

    _userRepository: UserRepository = new UserRepository();
    _emailMarketingRepository: EmailMarketingRepository = new EmailMarketingRepository();

    constructor() {
        
    }

    async register({ name, email, password }: any) {
        const where = `WHERE Email = '${email}'`;
        const userFound = await this._userRepository.get(where);

        if (userFound) {
            throw new UsuarioJaCadastrado("Usuário já cadastrado na plataforma.");
        }

        const passwordHash = await this.generatePasswordHash(password);
        
        var usuario = new User(name, email, passwordHash);
        
        try {
            await this._userRepository.insert(usuario);
            
            const token = createTokenJWT(usuario.id, [1, 'h']);
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
        const sql = `WHERE Email = '${email}'`;
        const userFound = await this._userRepository.get(sql);

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

        const accessToken = createTokenJWT(userFound.id, [1, 'h']);

        return accessToken;
    }

    async logout(session: any) {
        session.destroy((err: any) => {
            console.log(err);
        });
    }

    async generatePasswordHash(password: string) {
        const custoHash = 12;
        return bcrypt.hash(password, custoHash);
    }

    verifyPassword(password: string, passwordHash: string) {
        const passwordValid = bcrypt.compare(password, passwordHash);    
        return passwordValid;
    }

    async recoverPassword({ email }: any) {
        const sql = `WHERE Email = "${email}"`;
        const userFound = await this._userRepository.get(sql);
        
        if (!userFound) {
            throw new NaoEncontrado('Email não encontrado.');
        }

        const token = createTokenJWT(userFound.id, [1, 'h']);
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
        const id = verifyTokenJWT(token);
        const userFound = await this._userRepository.getById(id);
        
        if (!userFound) {
            throw new NaoEncontrado('Usuário não encontrado na plataforma.');
        }

        if (userFound.emailValid) {
            throw new Error('Email já validado.');
        }

        try {
            userFound.emailValid = true;
            await this._userRepository.update(userFound);
        } catch(err) {
            throw err;
        }
    }

    async alterPassword(token: string, password: string) {
        const id = await verifyTokenJWT(token);

        const userFound = await this._userRepository.getById(id);

        if (!userFound) {
            throw new NaoEncontrado('Email ou senha não encontrados.');
        }

        const valid = await this.verifyPassword(password, userFound.password);

        if (valid) {
            throw new Error("Essa senha é a mesma da sua conta atual.");
        }

        userFound.password = await this.generatePasswordHash(password);
        this._userRepository.update(userFound);
    }

    async salvarEmailMarketing(email: string) {
        const where = `WHERE Email = '${email}'`;
        const emailFound = await this._emailMarketingRepository.get(where);
        
        if(emailFound?.id) throw new NaoEncontrado('E-mail já cadastrado, verifique sua caixa de entrada.');
        
        const token = createTokenJWT(email, [1, 'h']);
        const route = '?token=';
        const address = `${process.env.BASE_URL_WEB}${route}${token}`;
        
        if (process.env.ENVIRONMENT === 'desenv') console.log(address);

        let emailToCreate = new EmailMarketing(email);
        this._emailMarketingRepository.insert(emailToCreate);

        const sendEmail = new EmailMarketingSend(emailToCreate.email);
        await sendEmail.prepareHTML(address);
        sendEmail.sendEmail();
    }

    async confirmarEmailMarketing(token: string) {
        const email = verifyTokenJWT(token);
        const where = `WHERE Email = '${email}'`;
        const emailFound = await this._emailMarketingRepository.get(where);
        
        if (!emailFound) {
            throw new NaoEncontrado('Email não encontrado na plataforma.');
        }

        if (emailFound.emailValid) {
            throw new Error('Email já validado.');
        }

        try {
            emailFound.emailValid = true;
            await this._emailMarketingRepository.update(emailFound);
        } catch(err) {
            throw err;
        }
    }

}