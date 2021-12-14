import { v4 as uuid } from 'uuid';
import { IDomainBase } from '../domain/domainBase';

export class EmailMarketing implements IDomainBase {

    id: string = '';
    email: string = '';
    emailValid: boolean = false;
    created_at: Date = new Date();
    updated_at: Date = new Date();

    constructor(email: string = "") {
        if (!this.id) {
            this.id = uuid();
        }
        this.email = email;
    }

    async validateObject(emailMarketing: EmailMarketing): Promise<boolean> {
        return true;
    }

}