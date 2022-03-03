import DomainBase from './domainBase';

export class EmailMarketing extends DomainBase {

    constructor(
        public email: string,
        public emailValid: Boolean = false,
        public id: string = '',
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