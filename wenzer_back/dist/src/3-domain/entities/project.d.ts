import DomainBase from './domainBase';
export declare class Project extends DomainBase {
    name: string;
    description: string;
    photo: Blob;
    active: boolean;
    publicProject: boolean;
    id: string;
    created_at: Date;
    updated_at: Date;
    constructor(name: string, description: string, photo: Blob, active: boolean, publicProject: boolean, id?: string, created_at?: Date, updated_at?: Date);
    validateObject: () => boolean;
}
