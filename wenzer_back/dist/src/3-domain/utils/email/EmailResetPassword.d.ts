import { Email } from "./EmailAbstract";
import { User } from "../../entities/user";
export declare class EmailResetPassword extends Email {
    constructor(user: User, address: string);
    prepareHTML(link: string): Promise<void>;
}
