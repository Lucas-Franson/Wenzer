import { IUserRepository } from "../../4-infra/irepositories/IuserRepository";
import { NaoAutorizado, UsuarioJaCadastrado } from "../../erros";
import { User } from "../entities/user";
import { IUserService } from "../Iservices/IUserService";
import bcrypt from 'bcrypt';
import { createTokenJWT, verifyTokenJWT } from "../../1-presentation/utils/jwt/token";
import { EmailVerify } from "../utils/email/EmailVerify";
import { EmailResetPassword } from "../utils/email/EmailResetPassword";

export default class UserService implements IUserService {

    userRepository: IUserRepository;

    constructor(_userRepository: IUserRepository) {
        this.userRepository = _userRepository;
    }

    async findUserByEmail(email: string) {
        const where = `WHERE Email = '${email}'`;
        return await this.userRepository.get(where);
    }

    async findUserByToken(token: string) {
        const id = verifyTokenJWT(token);
        return await this.userRepository.getById(id);
    }

    async create(user: User) {
        user.password = await this.generatePasswordHash(user.password);
        await this.userRepository.insert(user);
    }

    async updateUserNewPwd(user: User, pwd: string) {
        user.password = await this.generatePasswordHash(pwd);
        this.userRepository.update(user);
    }

    async sendEmailOfVerification(user: User) {
        const token = createTokenJWT(user.id, [1, 'h']);
        const route = '/welcome?token=';
        const address = `${process.env.BASE_URL_WEB}${route}${token}`;
        
        if (process.env.ENVIRONMENT === 'desenv') console.log(address);

        const emailVerify = new EmailVerify(user.email);
        await emailVerify.prepareHTML(address);
        emailVerify.sendEmail();
    }

    async sendEmailOfResetPassword(user: User) {
        const token = createTokenJWT(user.id, [1, 'h']);
        const route = '/api/alterar-senha/';
        const address = `${process.env.BASE_URL}${route}${token}`;
        const emailVerify = new EmailResetPassword(user, address);
        await emailVerify.sendEmail();
    }

    async validPasswordOfUser(pwdSent: string, pwdSaved: string) {
        const valid = await this.verifyPassword(pwdSent, pwdSaved);

        return valid;
    }

    async validateUserEmail(user: User) {
        if (user.emailValid) {
            throw new Error('Email já validado.');
        }

        user.emailValid = true;
        await this.userRepository.update(user);
    }

    verifyPassword(password: string, passwordHash: string) {
        const passwordValid = bcrypt.compare(password, passwordHash);    
        return passwordValid;
    }

    generatePasswordHash(password: string) {
        const custoHash = 12;
        return bcrypt.hash(password, custoHash);
    }

}