import DomainBase from './domainBase';
export declare class Connections extends DomainBase {
    _idUser: string;
    _idFollower: string;
    _accepted: boolean;
    _id: string;
    _created_at: Date;
    _updated_at: Date;
    constructor(_idUser: string, _idFollower: string, _accepted: boolean, _id?: string, _created_at?: Date, _updated_at?: Date);
    validateObject: () => boolean;
}
