import DomainBase from './domainBase';
export declare class Participants extends DomainBase {
    _active: boolean;
    _id: string;
    _created_at: Date;
    _updated_at: Date;
    constructor(_active: boolean, _id?: string, _created_at?: Date, _updated_at?: Date);
    validateObject: () => boolean;
}
