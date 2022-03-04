import DomainBase from './domainBase';
export declare class Interests extends DomainBase {
    name: string;
    id: string;
    created_at: Date;
    updated_at: Date;
    constructor(name: string, id?: string, created_at?: Date, updated_at?: Date);
    validateObject: () => boolean;
}
