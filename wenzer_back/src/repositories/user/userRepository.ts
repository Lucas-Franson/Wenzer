import { User } from "../../domain/user";
import { IOrm } from "../orm/iorm";
import { Orm } from "../orm/orm";
import { IUserRepository } from "./IuserRepository";

export class UserRepository extends Orm<User> implements IUserRepository, IOrm<User> {
    
    async validateObject(object: User):Promise<boolean> {
        let isValid = true;

        if (object.id == null) {
            isValid = false;
        }

        if (object.name == null) {
            isValid = false;
        }

        if (object.email == null) {
            isValid = false;
        }

        if (object.emailValid == null) {
            isValid = false;
        }

        if (object.password == null) {
            isValid = false;
        }

        return isValid;
    }
}
