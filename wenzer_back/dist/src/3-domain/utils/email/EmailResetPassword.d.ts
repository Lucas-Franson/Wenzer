import { Email } from "./EmailAbstract";
export declare class EmailResetPassword extends Email {
    constructor(user: any, address: string);
    prepareHTML(link: string): Promise<void>;
}
