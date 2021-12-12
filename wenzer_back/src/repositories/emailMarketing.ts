import { IDomainBase } from "../domain/domainBase";
import { Orm } from "./orm/orm";

const { v4: uuid } = require('uuid');

export class EmailMarketing extends Orm<EmailMarketing> implements IDomainBase {

    id = '';
    email = '';
    emailValid = false;
    created_at = new Date();
    updated_at = new Date();

    constructor(email: string = '') {
        super();
        if (!this.id) {
            this.id = uuid();
        }
        this.email = email;
    }

    validateObject(object: EmailMarketing): boolean {
        return true;
    }
}