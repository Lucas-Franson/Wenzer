import DomainBase from './domainBase';
export declare class Connections extends DomainBase {
    idUser: string;
    idFollower: string;
    accepted: boolean;
    _id: string;
    created_at: Date;
    updated_at: Date;
    constructor(idUser: string, idFollower: string, accepted: boolean, _id?: string, created_at?: Date, updated_at?: Date);
    validateObject: () => boolean;
}
