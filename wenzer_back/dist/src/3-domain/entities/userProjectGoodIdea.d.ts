import DomainBase from "./domainBase";
export declare class UserProjectGoodIdea extends DomainBase {
    idUser: string;
    idProject: string;
    _id: string;
    created_at: Date;
    updated_at: Date;
    constructor(idUser: string, idProject: string, _id?: string, created_at?: Date, updated_at?: Date);
    validateObject(): boolean;
}
