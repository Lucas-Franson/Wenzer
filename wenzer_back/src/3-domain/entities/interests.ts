import { v4 as uuid } from 'uuid';
import { IDomainBase } from './IdomainBase';

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

}