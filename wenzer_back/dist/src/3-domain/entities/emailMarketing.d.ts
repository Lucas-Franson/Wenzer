import DomainBase from './domainBase';
export declare class EmailMarketing extends DomainBase {
    email: string;
    emailValid: Boolean;
    _id: string;
    created_at: Date;
    updated_at: Date;
    constructor(email: string, emailValid?: Boolean, _id?: string, created_at?: Date, updated_at?: Date);
    emailIsValid: () => Boolean;
    validateEmail: () => void;
    invalidateEmail: () => void;
    validateObject: () => boolean;
}
