import { v4 as uuid } from 'uuid';
import { IDomainBase } from '../domain/domainBase';

export class InterestUser implements IDomainBase {

    ID: string = '';
    Created_at: Date = new Date();
    Updated_at: Date = new Date();


    constructor() {
        if (!this.ID) {
            this.ID = uuid();
        }
    }

}