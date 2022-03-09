import DomainBase from './domainBase';
export declare class Followers extends DomainBase {
    _idProject: string;
    _idUser: string;
    _id: string;
    _created_at: Date;
    _updated_at: Date;
    constructor(_idProject: string, _idUser: string, _id?: string, _created_at?: Date, _updated_at?: Date);
    validateObject: () => boolean;
}
