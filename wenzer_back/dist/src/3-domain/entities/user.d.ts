import DomainBase from './domainBase';
export declare class User extends DomainBase {
    name: string;
    email: string;
    password: string;
    title: string;
    photo: any;
    bio: string;
    emailValid: boolean;
    id: string;
    created_at: Date;
    updated_at: Date;
    constructor(name: string, email: string, password: string, title?: string, photo?: any, bio?: string, emailValid?: boolean, id?: string, created_at?: Date, updated_at?: Date);
    emailIsValid: () => boolean;
    getName: () => string;
    getEmail: () => string;
    getPassword: () => string;
    setPassword: (pwd: string) => void;
    validateEmail: () => void;
    invalidateEmail: () => void;
    validateObject: () => boolean;
}
