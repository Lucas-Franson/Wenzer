import { IUserRepository } from "../../4-infra/irepositories/IuserRepository";
import { User } from "../entities/user";
import { IUserService } from "../Iservices/IUserService";
import { ProfileViewModel } from "../../1-presentation/viewmodel/ProfileViewModel";
export default class UserService implements IUserService {
    private readonly userRepository;
    constructor(userRepository: IUserRepository);
    findUserByEmail(email: string): Promise<User | null>;
    findUserByToken(token: string): Promise<User | null>;
    findUserById(userId: string): Promise<User | null>;
    create(user: User): Promise<void>;
    updateUserByProfile(user: User, profile: ProfileViewModel): Promise<void>;
    updateUser(user: User): Promise<void>;
    updateUserNewPwd(user: User, pwd: string): Promise<void>;
    sendEmailOfVerification(user: User): Promise<void>;
    sendEmailOfResetPassword(user: User): Promise<void>;
    validPasswordOfUser(pwdSent: string, pwdSaved: string): Promise<boolean>;
    validateUserEmail(user: User): Promise<void>;
    verifyPassword(password: string, passwordHash: string): Promise<boolean>;
    generatePasswordHash(password: string): Promise<string>;
}
