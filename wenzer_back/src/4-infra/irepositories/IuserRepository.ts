import { Db } from "mongodb";
import { User } from "../../3-domain/entities/user";
import { IOrm } from "./Iorm";

export interface IUserRepository extends IOrm<User> {
    setPostAsGoodIdea(postGoodIdea: any): Promise<void>;
    removePostAsGoodIdea(idUser: string, idPost: string): Promise<void>;
    getAllUsersByArrOfIds(idUserArr: string[]): Promise<User[]>
    getByIdWebService(userId: string, dbo: Db): Promise<User | null>;
}