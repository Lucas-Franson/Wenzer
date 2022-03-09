import { User } from "../../3-domain/entities/user";
export declare class UserRegisterViewModel {
    private name;
    private email;
    private password;
    constructor(name: string, email: string, password: string);
    getName: () => string;
    getEmail: () => string;
    getPassword: () => string;
    convertToUserEntity(): User;
    validateModel(): void;
}
