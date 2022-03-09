import DomainBase from './domainBase';
import { v4 as uuid } from 'uuid';

export class EmailMarketing extends DomainBase {

    constructor(
        public _email: string,
        public _emailValid: Boolean = false,
        public _id: string = uuid(),
        public _created_at: Date = new Date(),
        public _updated_at: Date = new Date()
    ) {

        super(_id, _created_at, _updated_at);
    }

    emailIsValid = () => { return this._emailValid }

    validateEmail = () => { this._emailValid = true }

    invalidateEmail = () => { this._emailValid = false }

    validateObject = () => {
        return true;
    }

}