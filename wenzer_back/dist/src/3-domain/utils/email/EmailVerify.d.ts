import { Email } from './EmailAbstract';
import { IEmail } from "./IEmail";
export declare class EmailVerify extends Email implements IEmail {
    constructor(email: string);
    prepareHTML(link: string): Promise<void>;
}
