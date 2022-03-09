import DomainBase from './domainBase';
export declare class Interests extends DomainBase {
    _name: string;
    _id: string;
    _created_at: Date;
    _updated_at: Date;
    constructor(_name: string, _id?: string, _created_at?: Date, _updated_at?: Date);
    validateObject: () => boolean;
}
