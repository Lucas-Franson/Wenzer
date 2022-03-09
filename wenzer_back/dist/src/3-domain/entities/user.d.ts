import DomainBase from './domainBase';
export declare class User extends DomainBase {
    _name: string;
    _email: string;
    _password: string;
    _title: string;
    _photo: any;
    _bio: string;
    _emailValid: boolean;
    _id: string;
    _created_at: Date;
    _updated_at: Date;
    constructor(_name: string, _email: string, _password: string, _title?: string, _photo?: any, _bio?: string, _emailValid?: boolean, _id?: string, _created_at?: Date, _updated_at?: Date);
    emailIsValid: () => boolean;
    getName: () => string;
    getEmail: () => string;
    getPassword: () => string;
    setPassword: (pwd: string) => void;
    validateEmail: () => void;
    invalidateEmail: () => void;
    validateObject: () => boolean;
}
