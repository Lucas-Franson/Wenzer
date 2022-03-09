import DomainBase from './domainBase';
export declare class Project extends DomainBase {
    _name: string;
    _description: string;
    _photo: Blob;
    _active: boolean;
    _publicProject: boolean;
    _id: string;
    _created_at: Date;
    _updated_at: Date;
    constructor(_name: string, _description: string, _photo: Blob, _active: boolean, _publicProject: boolean, _id?: string, _created_at?: Date, _updated_at?: Date);
    validateObject: () => boolean;
}
