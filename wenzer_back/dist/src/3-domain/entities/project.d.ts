import DomainBase from './domainBase';
export declare class Project extends DomainBase {
    name: string;
    description: string;
    photo: Blob;
    active: boolean;
    publicProject: boolean;
    marketing: boolean;
    userId: string;
    countGoodIdea: number;
    _id: string;
    created_at: Date;
    updated_at: Date;
    constructor(name: string, description: string, photo: Blob, active: boolean, publicProject: boolean, marketing: boolean, userId: string, countGoodIdea: number, _id?: string, created_at?: Date, updated_at?: Date);
    getId: () => string;
    validateObject: () => boolean;
}
