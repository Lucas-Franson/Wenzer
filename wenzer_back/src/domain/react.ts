import { v4 as uuid } from 'uuid';
import { IDomainBase } from '../domain/domainBase';

export class React implements IDomainBase {

    id: string = '';
    type: string = '';
    created_at: Date = new Date();
    updated_at: Date = new Date();

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }

    async validateObject(react: React): Promise<boolean> {
        return true;
    }

}