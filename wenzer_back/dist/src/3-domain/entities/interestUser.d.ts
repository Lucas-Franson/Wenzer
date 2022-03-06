import DomainBase from './domainBase';
export declare class InterestUser extends DomainBase {
    _idInterests: string;
    _idUser: string;
    _id: string;
    _created_at: Date;
    _updated_at: Date;
    constructor(_idInterests: string, _idUser: string, _id?: string, _created_at?: Date, _updated_at?: Date);
    validateObject: () => boolean;
}
