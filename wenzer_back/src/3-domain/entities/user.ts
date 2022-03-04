import DomainBase from './domainBase';

export class User extends DomainBase {

    constructor(
        public name: string,
        public email: string, 
        public password: string,
        public title: string = '',
        public photo: any = null,
        public bio: string = '',
        public emailValid: boolean = false,
        public id: string = '',
        public created_at: Date = new Date(),
        public updated_at: Date = new Date()
    ) {
        
        super(id, created_at, updated_at);
    }

    emailIsValid = () => { return this.emailValid; }

    getName = () => { return this.name }

    getEmail = () => { return this.email }

    getPassword = () => { return this.password }

    setPassword = (pwd: string) => { this.password = pwd }

    validateEmail = () => { this.emailValid = true }

    invalidateEmail = () => { this.emailValid = false }

    validateObject = () => {
        return true;
    }
    
}