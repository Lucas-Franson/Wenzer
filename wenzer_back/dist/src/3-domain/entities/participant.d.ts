import DomainBase from './domainBase';
export declare class Participant extends DomainBase {
    idProject: string;
    idUser: string;
    accepted: boolean;
    role: string;
    _id: string;
    created_at: Date;
    updated_at: Date;
    constructor(idProject: string, idUser: string, accepted: boolean, role: string, _id?: string, created_at?: Date, updated_at?: Date);
    validateObject: () => boolean;
}
