import DomainBase from './domainBase';
export declare class Participants extends DomainBase {
    active: boolean;
    id: string;
    created_at: Date;
    updated_at: Date;
    constructor(active: boolean, id?: string, created_at?: Date, updated_at?: Date);
    validateObject: () => boolean;
}
