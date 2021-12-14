import { v4 as uuid } from 'uuid';
import { IDomainBase } from '../domain/domainBase';

export class Followers implements IDomainBase {

    id: string = '';
    created_at: Date = new Date();
    updated_at: Date = new Date();

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }

    async validateObject(followers: Followers): Promise<boolean> {
        return true;
    }

}