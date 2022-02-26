import { User } from "../../3-domain/entities/user";
import { ErroParametro } from "../../erros";

export class UserRegisterViewModel {
    
    constructor(
        private name: string, 
        private email: string, 
        private password: string
    ) {

    }

    getName = () => { return this.name }

    getEmail = () => { return this.email }

    getPassword = () => { return this.password }

    public convertToUserEntity() {
        const user: User = new User(this.name, this.email, this.password);
        return user;
    }

    public validateModel() {
        if (typeof this.name !== 'string') throw new ErroParametro('Nome: deve ser texto.');

        if (typeof this.email !== 'string') throw new ErroParametro('Email: deve ser texto.');

        if (typeof this.password !== 'string') throw new ErroParametro('Senha: deve ser texto.');

        if (this.name === '') throw new ErroParametro('Nome: não pode ser vazio.');

        if (this.email === '') throw new ErroParametro('Email: não pode ser vazio.');

        if (this.password === '') throw new ErroParametro('Senha: não pode ser vazio.');

    }

}