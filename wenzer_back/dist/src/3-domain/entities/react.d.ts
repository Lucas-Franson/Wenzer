import DomainBase from './domainBase';
export declare class React extends DomainBase {
    type: string;
    id: string;
    created_at: Date;
    updated_at: Date;
    constructor(type: string, id?: string, created_at?: Date, updated_at?: Date);
    validateObject: () => boolean;
}
