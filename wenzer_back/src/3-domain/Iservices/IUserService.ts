import { ProfileViewModel } from "../../1-presentation/viewmodel/ProfileViewModel";
import { User } from "../entities/user";


export interface IUserService {
    findUserByEmail(email: string): Promise<User | null>;
    findUserByToken(token: string): Promise<User | null>;
    findUserById(userId: string): Promise<User | null>;
    create(user: User): void;
    updateUser(user: User): void;
    updateUserNewPwd(user: User, pwd: string): void;
    updateUserByProfile(user: User, profile: ProfileViewModel): void;
    sendEmailOfVerification(user: User): void;
    sendEmailOfResetPassword(user: User): void;
    validPasswordOfUser(pwdSent: string, pwdSaved: string): Promise<boolean>;
    validateUserEmail(user: User): void;
    setPostAsGoodIdea(idUser: string, idPost: string, userPostExist: boolean): Promise<void>;
    getAllUsersByArrOfIds(idUserArr: string[]): Promise<User[]>;
}