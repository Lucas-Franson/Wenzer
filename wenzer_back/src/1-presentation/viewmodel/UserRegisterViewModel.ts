import { User } from "../../3-domain/entities/user";

export class UserRegisterViewModel {
    name: string = '';
    email: string = '';
    password: string = '';

    convertToUserEntity() {
        var user = new User();
        user.name = this.name;
        user.email = this.email;
        user.password = this.password;
        return user;
    }
}