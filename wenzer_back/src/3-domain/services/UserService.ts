import { IUserRepository } from "../../4-infra/irepositories/IuserRepository";
import { User } from "../entities/user";
import { IUserService } from "../Iservices/IUserService";
import bcrypt from 'bcrypt';
import { createTokenJWT, verifyTokenJWT } from "../../1-presentation/utils/jwt/token";
import { EmailVerify } from "../utils/email/EmailVerify";
import { EmailResetPassword } from "../utils/email/EmailResetPassword";
import { ProfileViewModel } from "../../1-presentation/viewmodel/ProfileViewModel";
import { IConnectionRepository } from "../../4-infra/irepositories/IconnectionRepository";
import { Connections } from "../entities/conections";
import { UserPostGoodIdea } from "../entities/userPostGoodIdea";
import { Db } from "mongodb";

export default class UserService implements IUserService {

    constructor(
        private readonly userRepository: IUserRepository,
        private readonly connectionRepository: IConnectionRepository
    ) {
    }

    async findUserByEmail(email: string): Promise<User | null> {
        const where = { email };
        const user = await this.userRepository.getByWhereClause(where);
        if (user && user.length > 0) {
            return user[0];
        }
        return null;
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
        return await this.userRepository.insertUser(user);
    }

    async updateUserByProfile(user: User, profile: ProfileViewModel) {
        user.name = profile.getName();
        user.lastName = profile.getLastName();
        user.bio = profile.getBio();
        user.university = profile.getUniversity();
        user.hasCompany = profile.getHasCompany();

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

    async updateUserPhoto(user: User, photo: any) {
        user.photo = photo;

        await this.updateUser(user);
    }

    async sendEmailOfVerification(user: User) {
        const token = createTokenJWT(user.getId());
        const route = '/login?token=';
        const address = `${process.env.BASE_URL_WEB}${route}${token}`;
        
        if (process.env.ENVIRONMENT === 'desenv') console.log(address);

        const emailVerify = new EmailVerify(user.getEmail());
        await emailVerify.prepareHTML(address);
        emailVerify.sendEmail();
    }

    async sendEmailOfResetPassword(user: User) {
        const token = createTokenJWT(user.getId());
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
        const postGoodIdea = new UserPostGoodIdea(
            idUser,
            idPost
        );
        if (userPostExist) {
            await this.userRepository.removePostAsGoodIdea(idUser, idPost);
        } else {
            await this.userRepository.setPostAsGoodIdea(postGoodIdea);
        }
    }

    async getAllUsersByArrOfIds(idUserArr: string[]) {
        return await this.userRepository.getAllUsersByArrOfIds(idUserArr);
    }

    async getConnectionFromUsers(userId: string, idUserToFollow: string): Promise<Connections | null> {
        const where = { idUser: idUserToFollow, idFollower: userId }
        const connection = await this.connectionRepository.getByWhereClause(where);
        if (connection.length > 0)
            return connection[0];
        return null;
    }

    async createConnection(userId: string, idUserToFollow: string) {
        const connection = new Connections(
            idUserToFollow,
            userId,
            false
        );
        this.connectionRepository.insert(connection);
    }

    async deleteConnection(idConnection: string) {
        await this.connectionRepository.delete(idConnection);
    }

    async getConnections(idUser: string) {
        return await this.connectionRepository.getConnectionOfUser(idUser);
    }

    async getFriendRequest(userId: string): Promise<{ _id: string; created_at: Date; name: string; }[]> {
        return this.userRepository.getFriendRequest(userId);
    }

    async search(userId: string, search: string): Promise<User[]> {
        return await this.userRepository.search(userId, search);
    }

    // WEB SERVICE
    async findUserByIdWebService(userId: string, dbo: Db) {
        return await this.userRepository.getByIdWebService(userId, dbo);
    }

}