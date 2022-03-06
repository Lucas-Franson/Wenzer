import DomainBase from './domainBase';
import { v4 as uuid } from 'uuid';

export class EmailMarketing extends DomainBase {

    constructor(
        public email: string,
        public emailValid: Boolean = false,
        public id: string = uuid(),
        public created_at: Date = new Date(),
        public updated_at: Date = new Date()
    ) {

        super(id, created_at, updated_at);
    }

    emailIsValid = () => { return this.emailValid }

    validateEmail = () => { this.emailValid = true }

    invalidateEmail = () => { this.emailValid = false }

    validateObject = () => {
        return true;
    }

}