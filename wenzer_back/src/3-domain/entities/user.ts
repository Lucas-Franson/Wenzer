import DomainBase from './domainBase';
import { v4 as uuid } from 'uuid';

export class User extends DomainBase {

    constructor(
        public _name: string,
        public _email: string, 
        public _password: string,
        public _title: string = '',
        public _photo: any = '',
        public _bio: string = '',
        public _emailValid: boolean = false,
        public _id: string = uuid(),
        public _created_at: Date = new Date(),
        public _updated_at: Date = new Date()
    ) {
        
        super(_id, _created_at, _updated_at);
    }

    emailIsValid = () => { return this._emailValid; }

    getName = () => { return this._name }

    getEmail = () => { return this._email }

    getPhoto = () => { return this._photo }

    getPassword = () => { return this._password }

    setPassword = (pwd: string) => { this._password = pwd }

    validateEmail = () => { this._emailValid = true }

    invalidateEmail = () => { this._emailValid = false }

    validateObject = () => {
        return true;
    }
    
}