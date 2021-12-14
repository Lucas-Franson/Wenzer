import { v4 as uuid } from 'uuid';
import { IDomainBase } from '../domain/domainBase';

export class InterestUser implements IDomainBase {

    id: string = '';
    created_at: Date = new Date();
    updated_at: Date = new Date();


    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }

    async validateObject(interestUser: InterestUser): Promise<boolean> {
        return true;
    }

}