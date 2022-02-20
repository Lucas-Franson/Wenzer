import { v4 as uuid } from 'uuid';
import { IDomainBase } from './IdomainBase';

export class Participants implements IDomainBase {

    id: string = '';
    active: boolean = false;
    created_at: Date = new Date();
    updated_at: Date = new Date();

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }

}