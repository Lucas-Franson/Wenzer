"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRegisterViewModel = void 0;
const user_1 = require("../../3-domain/entities/user");
const erros_1 = require("../../erros");
class UserRegisterViewModel {
    constructor(name, lastName, email, password, university, hasCompany) {
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.university = university;
        this.hasCompany = hasCompany;
        this.getName = () => { return this.name; };
        this.getLastName = () => { return this.lastName; };
        this.getEmail = () => { return this.email; };
        this.getPassword = () => { return this.password; };
        this.getUniversity = () => { return this.university; };
        this.getHasCompany = () => { return this.hasCompany; };
    }
    convertToUserEntity() {
        const user = new user_1.User(this.name, this.lastName, this.email, this.password, this.university, '', '', '', this.hasCompany);
        return user;
    }
    validateModel() {
        if (typeof this.name !== 'string')
            throw new erros_1.ErroParametro('Nome: deve ser texto.');
        if (typeof this.lastName !== 'string')
            throw new erros_1.ErroParametro('Sobrenome: deve ser texto.');
        if (typeof this.email !== 'string')
            throw new erros_1.ErroParametro('Email: deve ser texto.');
        if (typeof this.password !== 'string')
            throw new erros_1.ErroParametro('Senha: deve ser texto.');
        if (typeof this.university !== 'string')
            throw new erros_1.ErroParametro('Universidade: deve ser texto.');
        if (this.name === '')
            throw new erros_1.ErroParametro('Nome: não pode ser vazio.');
        if (this.lastName === '')
            throw new erros_1.ErroParametro('Sobrenome: não pode ser vazio.');
        if (this.email === '')
            throw new erros_1.ErroParametro('Email: não pode ser vazio.');
        if (this.password === '')
            throw new erros_1.ErroParametro('Senha: não pode ser vazio.');
    }
}
exports.UserRegisterViewModel = UserRegisterViewModel;
//# sourceMappingURL=UserRegisterViewModel.js.map