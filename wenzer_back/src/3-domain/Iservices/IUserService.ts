import { User } from "../entities/user";


export interface IUserService {
    findUserByEmail(email: string): Promise<User>;
    findUserByToken(token: string): Promise<User>;
    create(user: User): void;
    updateUserNewPwd(user: User, pwd: string): void;
    sendEmailOfVerification(user: User): void;
    sendEmailOfResetPassword(user: User): void;
    validPasswordOfUser(pwdSent: string, pwdSaved: string): Promise<boolean>;
    validateUserEmail(user: User): void;
}