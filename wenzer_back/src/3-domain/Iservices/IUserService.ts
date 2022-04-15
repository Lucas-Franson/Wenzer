import { Db } from "mongodb";
import { ProfileViewModel } from "../../1-presentation/viewmodel/ProfileViewModel";
import { Connections } from "../entities/conections";
import { User } from "../entities/user";


export interface IUserService {
    findUserByEmail(email: string): Promise<User | null>;
    findUserByToken(token: string): Promise<User | null>;
    findUserById(userId: string): Promise<User | null>;
    findUserByIdWebService(userId: string, dbo: Db): Promise<User | null>;
    create(user: User): void;
    updateUser(user: User): void;
    updateUserNewPwd(user: User, pwd: string): void;
    updateUserByProfile(user: User, profile: ProfileViewModel): void;
    updateUserPhoto(user: User, photo: any): void;
    sendEmailOfVerification(user: User): void;
    sendEmailOfResetPassword(user: User): void;
    validPasswordOfUser(pwdSent: string, pwdSaved: string): Promise<boolean>;
    validateUserEmail(user: User): void;
    setPostAsGoodIdea(idUser: string, idPost: string, userPostExist: boolean): Promise<void>;
    getAllUsersByArrOfIds(idUserArr: string[]): Promise<User[]>;
    getConnectionFromUsers(userId: string, idUserToFollow: string): Promise<Connections | null>;
    createConnection(userId: string, idUserToFollow: string): Promise<void>;
    deleteConnection(idConnection: string): Promise<void>;
    getConnections(idUser: string): Promise<any>;
    getFriendRequest(userId: string): Promise<{ _id: string, created_at: Date, name: string}[]>;
}