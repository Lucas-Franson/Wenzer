import DomainBase from './domainBase';
import { v4 as uuid } from 'uuid';

export class User extends DomainBase {

    constructor(
        public name: string,
        public lastName: string,
        public email: string, 
        public password: string,
        public university: string,
        public title: string = '',
        public photo: any = '',
        public bio: string = '',
        public hasCompany: boolean = false,
        public emailValid: boolean = false,
        public _id: string = uuid(),
        public created_at: Date = new Date(),
        public updated_at: Date = new Date()
    ) {
        
        super(_id, created_at, updated_at);
    }

    emailIsValid = () => { return this.emailValid; }

    getName = () => { return this.name }

    getEmail = () => { return this.email }

    getPhoto = () => { return this.photo }

    getPassword = () => { return this.password }

    setPassword = (pwd: string) => { this.password = pwd }

    validateEmail = () => { this.emailValid = true }

    invalidateEmail = () => { this.emailValid = false }

    validateObject = () => {
        return true;
    }
    
}