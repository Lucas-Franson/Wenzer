import { v4 as uuid } from 'uuid';
import { IDomainBase } from '../domain/domainBase';

export class EmailMarketing implements IDomainBase {

    ID: string = '';
    Email: string = '';
    EmailValid: boolean = false;
    Created_at: Date = new Date();
    Updated_at: Date = new Date();

    constructor() {
        if (!this.ID) {
            this.ID = uuid();
        }
    }

}