import DomainBase from './domainBase';
export declare class InterestUser extends DomainBase {
    idInterests: string;
    idUser: string;
    id: string;
    created_at: Date;
    updated_at: Date;
    constructor(idInterests: string, idUser: string, id?: string, created_at?: Date, updated_at?: Date);
    validateObject: () => boolean;
}
