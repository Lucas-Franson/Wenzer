import { v4 as uuid } from 'uuid';
import { IDomainBase } from './IdomainBase';

export class Post implements IDomainBase{

    id: string = '';
    idUser: string = '';
    countViews: number = 0;
    title: string = '';
    description: string = '';
    photo: string = '';
    idProject: string = '';
    created_at: Date = new Date();
    updated_at: Date = new Date();

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }

}