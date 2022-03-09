import { Email } from "./EmailAbstract";
export declare class EmailMarketingSend extends Email {
    constructor(email: string);
    prepareHTML(link: string): Promise<void>;
}
