import DomainBase from "./domainBase";
export declare class PostAlreadySeen extends DomainBase {
    idUser: string;
    dateLastPost: Date;
    _id: string;
    created_at: Date;
    updated_at: Date;
    constructor(idUser: string, dateLastPost: Date, _id?: string, created_at?: Date, updated_at?: Date);
    validateObject(): boolean;
}
