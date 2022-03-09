import DomainBase from './domainBase';
export declare class Post extends DomainBase {
    _idUser: string;
    _countViews: number;
    _title: string;
    _description: string;
    _photo: Blob;
    _idProject: string;
    _id: string;
    _created_at: Date;
    _updated_at: Date;
    constructor(_idUser: string, _countViews: number, _title: string, _description: string, _photo: Blob, _idProject: string, _id?: string, _created_at?: Date, _updated_at?: Date);
    validateObject: () => boolean;
}
