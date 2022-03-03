import { User } from "../../3-domain/entities/user";
import { IOrm } from "./Iorm";

export interface IUserRepository extends IOrm<User> {
    
}