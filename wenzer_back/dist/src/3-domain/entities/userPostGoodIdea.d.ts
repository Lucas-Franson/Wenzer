import DomainBase from "./domainBase";
export declare class UserPostGoodIdea extends DomainBase {
    idUser: string;
    idPost: string;
    _id: string;
    created_at: Date;
    updated_at: Date;
    constructor(idUser: string, idPost: string, _id?: string, created_at?: Date, updated_at?: Date);
    validateObject(): boolean;
}
