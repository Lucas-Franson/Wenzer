import { User } from "../../3-domain/entities/user";
export declare class UserRegisterViewModel {
    private name;
    private lastName;
    private email;
    private password;
    private university;
    private hasCompany;
    constructor(name: string, lastName: string, email: string, password: string, university: string, hasCompany: boolean);
    getName: () => string;
    getLastName: () => string;
    getEmail: () => string;
    getPassword: () => string;
    getUniversity: () => string;
    getHasCompany: () => boolean;
    convertToUserEntity(): User;
    validateModel(): void;
}
