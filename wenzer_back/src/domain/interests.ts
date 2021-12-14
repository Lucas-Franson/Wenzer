import { v4 as uuid } from 'uuid';
import { IDomainBase } from '../domain/domainBase';

export class Interests implements IDomainBase {

    id: string = '';
    name: string = '';
    created_at: Date = new Date();
    updated_at: Date = new Date();

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }

    async validateObject(interests: Interests): Promise<boolean> {
        return true;
    }

}