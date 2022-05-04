import DomainBase from "./domainBase";
export declare class CommentCommented extends DomainBase {
    idUser: string;
    idPostComment: string;
    text: string;
    _id: string;
    created_at: Date;
    updated_at: Date;
    constructor(idUser: string, idPostComment: string, text: string, _id?: string, created_at?: Date, updated_at?: Date);
    validateObject(): boolean;
}
