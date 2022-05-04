import DomainBase from './domainBase';
export declare class Post extends DomainBase {
    idUser: string;
    countViews: number;
    title: string;
    description: string;
    photo: any;
    idProject: string;
    publicPost: boolean;
    _id: string;
    created_at: Date;
    updated_at: Date;
    constructor(idUser: string, countViews: number, title: string, description: string, photo: any, idProject: string, publicPost: boolean, _id?: string, created_at?: Date, updated_at?: Date);
    validateObject: () => boolean;
}
