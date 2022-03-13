import { IUserRepository } from "../../4-infra/irepositories/IuserRepository";
import { User } from "../entities/user";
import { IUserService } from "../Iservices/IUserService";
import bcrypt from 'bcrypt';
import { createTokenJWT, verifyTokenJWT } from "../../1-presentation/utils/jwt/token";
import { EmailVerify } from "../utils/email/EmailVerify";
import { EmailResetPassword } from "../utils/email/EmailResetPassword";
import { ProfileViewModel } from "../../1-presentation/viewmodel/ProfileViewModel";
import { IConnectionRepository } from "../../4-infra/irepositories/IconnectionsRepository";
import { Connections } from "../entities/conections";

export default class UserService implements IUserService {

    constructor(
        private readonly userRepository: IUserRepository,
        private readonly connectionRepository: IConnectionRepository
    ) {
    }

    async findUserByEmail(email: string) {
        const where = `WHERE Email = '${email}'`;
        return await this.userRepository.get(where);
    }

    async findUserByToken(token: string) {
        const id = verifyTokenJWT(token);
        return await this.findUserById(id);
    }

    async findUserById(userId: string) {
        return await this.userRepository.getById(userId);
    }

    async create(user: User) {
        const newPassword = await this.generatePasswordHash(user.getPassword());
        user.setPassword(newPassword);
        await this.userRepository.insert(user);
    }

    async updateUserByProfile(user: User, profile: ProfileViewModel) {
        user._name = profile.getName();
        user._bio = profile.getBio();
        user._title = profile.getTitle();
        user._photo = profile.getPhoto();

        await this.updateUser(user);
    }

    async updateUser(user: User) {
        await this.userRepository.update(user);
    }

    async updateUserNewPwd(user: User, pwd: string) {
        const newPassword = await this.generatePasswordHash(pwd);
        user.setPassword(newPassword);
        this.updateUser(user);
    }

    async sendEmailOfVerification(user: User) {
        const token = createTokenJWT(user.getId(), [1, 'h']);
        const route = '/login?token=';
        const address = `${process.env.BASE_URL_WEB}${route}${token}`;
        
        if (process.env.ENVIRONMENT === 'desenv') console.log(address);

        const emailVerify = new EmailVerify(user.getEmail());
        await emailVerify.prepareHTML(address);
        emailVerify.sendEmail();
    }

    async sendEmailOfResetPassword(user: User) {
        const token = createTokenJWT(user.getId(), [1, 'h']);
        const route = '/recover-password?token=';
        const address = `${process.env.BASE_URL_WEB}${route}${token}`;

        if (process.env.ENVIRONMENT === 'desenv') console.log(address);

        const emailVerify = new EmailResetPassword(user, address);
        await emailVerify.prepareHTML(address);
        await emailVerify.sendEmail();
    }

    async validPasswordOfUser(pwdSent: string, pwdSaved: string) {
        const valid = await this.verifyPassword(pwdSent, pwdSaved);

        return valid;
    }

    async validateUserEmail(user: User) {
        if (user.emailIsValid()) {
            throw new Error('Email já validado.');
        }

        user.validateEmail();
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

    async setPostAsGoodIdea(idUser: string, idPost: string, userPostExist: boolean) {
        if (userPostExist) {
            await this.userRepository.removePostAsGoodIdea(idUser, idPost);
        } else {
            await this.userRepository.setPostAsGoodIdea(idUser, idPost);
        }
    }

    async getAllUsersByArrOfIds(idUserArr: string[]) {
        return await this.userRepository.getAllUsersByArrOfIds(idUserArr);
    }

    async getConnectionFromUsers(userId: string, idUserToFollow: string) {
        const connection = await this.connectionRepository.get(`WHERE idUser = ${idUserToFollow.toSql()} and idFollower = ${userId.toSql()}`);
        return this.connectionRepository.convertToConnectionObject(connection);
    }

    async createConnection(userId: string, idUserToFollow: string) {
        const connection = new Connections(
            idUserToFollow,
            userId,
            true
        );
        this.connectionRepository.insert(connection);
    }

    async deleteConnection(idConnection: string) {
        await this.connectionRepository.delete(idConnection);
    }

    async getConnections(idUser: string) {
        return await this.connectionRepository.getConnectionOfUser(idUser);
    }

}