import DomainBase from './domainBase';
export declare class EmailMarketing extends DomainBase {
    _email: string;
    _emailValid: Boolean;
    _id: string;
    _created_at: Date;
    _updated_at: Date;
    constructor(_email: string, _emailValid?: Boolean, _id?: string, _created_at?: Date, _updated_at?: Date);
    emailIsValid: () => Boolean;
    validateEmail: () => void;
    invalidateEmail: () => void;
    validateObject: () => boolean;
}
