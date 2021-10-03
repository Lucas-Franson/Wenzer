import { conexao, queryPromise } from './conexao';
import { v4 as uuid } from 'uuid';
import { IDomainBase } from '../domain/domainBase';
import { Orm } from './orm/orm';

export class User extends Orm<User> implements IDomainBase {

    ID: string = '';
    Name: string = '';
    Email: string = '';
    EmailValid: boolean = false;
    Password: string = '';
    Created_at: Date = new Date();
    Updated_at: Date = new Date();

    constructor() {
        super();
        if (!this.ID) {
            this.ID = uuid();
        }
    }

}