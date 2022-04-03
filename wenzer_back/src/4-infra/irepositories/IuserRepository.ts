import { User } from "../../3-domain/entities/user";
import { IOrm } from "./Iorm";

export interface IUserRepository extends IOrm<User> {
    setPostAsGoodIdea(idUser: string, idPost: string): Promise<void>;
    removePostAsGoodIdea(idUser: string, idPost: string): Promise<void>;
    getAllUsersByArrOfIds(idUserArr: { id: string }[]): Promise<User[]>
}