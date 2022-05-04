import DomainBase from "./domainBase";
export declare class PostComments extends DomainBase {
    idUser: string;
    idPost: string;
    text: string;
    countViews: number;
    _id: string;
    created_at: Date;
    updated_at: Date;
    constructor(idUser: string, idPost: string, text: string, countViews: number, _id?: string, created_at?: Date, updated_at?: Date);
    validateObject(): boolean;
}
