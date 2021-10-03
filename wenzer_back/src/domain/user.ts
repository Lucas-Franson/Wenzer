import { v4 as uuid } from 'uuid';
import { IDomainBase } from '../domain/domainBase';

export class User implements IDomainBase {

    id: string = '';
    name: string = '';
    email: string = '';
    emailValid: boolean = false;
    password: string = '';
    created_at: Date = new Date();
    updated_at: Date = new Date();

    constructor(name: string = '', email: string = '', passwordHash: string = '') {
        super();
        if (!this.id) {
            this.id = uuid();
        }
        this.name = name;
        this.email = email;
        this.emailValid = false;
        this.password = passwordHash;
        this.created_at = new Date();
        this.updated_at = new Date();
    }

    validateObject(user: User): boolean {
        return true;
    }
}