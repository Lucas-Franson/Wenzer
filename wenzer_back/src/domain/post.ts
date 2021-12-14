import { v4 as uuid } from 'uuid';
import { IDomainBase } from '../domain/domainBase';

export class Post implements IDomainBase{

    id: string = '';
    qtView: number = 0;
    title: string = '';
    description: string = '';
    photo: string = '';
    created_at: Date = new Date();
    updated_at: Date = new Date();

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }

    async validateObject(post: Post): Promise<boolean> {
        return true;
    }

}