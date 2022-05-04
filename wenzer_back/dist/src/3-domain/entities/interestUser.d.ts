import DomainBase from './domainBase';
export declare class InterestUser extends DomainBase {
    idInterest: string;
    idUser: string;
    _id: string;
    created_at: Date;
    updated_at: Date;
    constructor(idInterest: string, idUser: string, _id?: string, created_at?: Date, updated_at?: Date);
    validateObject: () => boolean;
}
