import { User } from "../../3-domain/entities/user";
import { Orm } from "./orm";
import { IUserRepository } from "../irepositories/IuserRepository";

export default class UserRepository extends Orm<User> implements IUserRepository {
    
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
