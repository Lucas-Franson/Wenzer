import { User } from "../../3-domain/entities/user";

export class UserRegisterViewModel {
    
    constructor(private name: string, private email: string, private password: string) {

    }

    public getEmail() {
        return this.email;
    }

    public convertToUserEntity() {
        var user = new User();
        user.name = this.name;
        user.email = this.email;
        user.password = this.password;
        return user;
    }
}