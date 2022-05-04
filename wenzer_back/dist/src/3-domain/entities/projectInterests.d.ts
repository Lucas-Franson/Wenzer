import DomainBase from "./domainBase";
export declare class ProjectInterests extends DomainBase {
    idProject: string;
    idInterests: string;
    _id: string;
    created_at: Date;
    updated_at: Date;
    constructor(idProject: string, idInterests: string, _id?: string, created_at?: Date, updated_at?: Date);
    validateObject(): boolean;
}
