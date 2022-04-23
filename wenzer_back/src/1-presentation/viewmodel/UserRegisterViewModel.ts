import { User } from "../../3-domain/entities/user";
import { ErroParametro } from "../../erros";

export class UserRegisterViewModel {
    
    constructor(
        private name: string, 
        private lastName: string,
        private email: string, 
        private password: string,
        private university: string,
        private hasCompany: boolean
    ) {

    }

    getName = () => { return this.name }
    
    getLastName = () => { return this.lastName }

    getEmail = () => { return this.email }

    getPassword = () => { return this.password }

    getUniversity = () => { return this.university }

    getHasCompany = () => { return this.hasCompany }


    public convertToUserEntity() {
        const user: User = new User(this.name, this.lastName, this.email, this.password, this.university, '', '', '', this.hasCompany);
        return user;
    }

    public validateModel() {
        if (typeof this.name !== 'string') throw new ErroParametro('Nome: deve ser texto.');
        
        if (typeof this.lastName !== 'string') throw new ErroParametro('Sobrenome: deve ser texto.');

        if (typeof this.email !== 'string') throw new ErroParametro('Email: deve ser texto.');

        if (typeof this.password !== 'string') throw new ErroParametro('Senha: deve ser texto.');

        if (typeof this.university !== 'string') throw new ErroParametro('Universidade: deve ser texto.');

        if (this.name === '') throw new ErroParametro('Nome: não pode ser vazio.');

        if (this.lastName === '') throw new ErroParametro('Sobrenome: não pode ser vazio.');

        if (this.email === '') throw new ErroParametro('Email: não pode ser vazio.');

        if (this.password === '') throw new ErroParametro('Senha: não pode ser vazio.');

    }

}