import DomainBase from './domainBase';
export declare class Followers extends DomainBase {
    idProject: string;
    idUser: string;
    id: string;
    created_at: Date;
    updated_at: Date;
    constructor(idProject: string, idUser: string, id?: string, created_at?: Date, updated_at?: Date);
    validateObject: () => boolean;
}
