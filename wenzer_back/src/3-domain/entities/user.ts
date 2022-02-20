import { v4 as uuid } from 'uuid';
import { IDomainBase } from './IdomainBase';

export class User implements IDomainBase {

    id: string = '';
    name: string = '';
    email: string = '';
    emailValid: boolean = false;
    password: string = '';
    created_at: Date = new Date();
    updated_at: Date = new Date();

    constructor(name: string = "", email: string = "", password: string = "") {
        if (!this.id) {
            this.id = uuid();
        }
        this.name = name;
        this.email = email;
        this.password = password;
    }
    
}