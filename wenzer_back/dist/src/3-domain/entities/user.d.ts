import DomainBase from './domainBase';
export declare class User extends DomainBase {
    name: string;
    lastName: string;
    email: string;
    password: string;
    university: string;
    title: string;
    photo: any;
    bio: string;
    hasCompany: boolean;
    emailValid: boolean;
    _id: string;
    created_at: Date;
    updated_at: Date;
    constructor(name: string, lastName: string, email: string, password: string, university: string, title?: string, photo?: any, bio?: string, hasCompany?: boolean, emailValid?: boolean, _id?: string, created_at?: Date, updated_at?: Date);
    emailIsValid: () => boolean;
    getName: () => string;
    getEmail: () => string;
    getPhoto: () => any;
    getPassword: () => string;
    setPassword: (pwd: string) => void;
    validateEmail: () => void;
    invalidateEmail: () => void;
    validateObject: () => boolean;
}
