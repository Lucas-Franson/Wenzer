import DomainBase from './domainBase';
export declare class React extends DomainBase {
    _type: string;
    _id: string;
    _created_at: Date;
    _updated_at: Date;
    constructor(_type: string, _id?: string, _created_at?: Date, _updated_at?: Date);
    validateObject: () => boolean;
}
