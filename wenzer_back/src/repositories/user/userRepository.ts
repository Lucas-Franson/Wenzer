import { User } from "../../domain/user";
import { IOrm } from "../orm/iorm";
import { Orm } from "../orm/orm";
import { IUserRepository } from "./IuserRepository";

export class UserRepository extends Orm<User> implements IUserRepository, IOrm<User> {
    
    async validateObject(object: User):Promise<boolean> {
        let isValid = true;

        if (object.ID == null) {
            isValid = false;
        }

        if (object.Name == null) {
            isValid = false;
        }

        if (object.Email == null) {
            isValid = false;
        }

        if (object.EmailValid == null) {
            isValid = false;
        }

        if (object.Password == null) {
            isValid = false;
        }

        return isValid;
    }
}
