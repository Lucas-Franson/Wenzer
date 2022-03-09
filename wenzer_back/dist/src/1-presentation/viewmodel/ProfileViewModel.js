"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileViewModel = void 0;
const erros_1 = require("../../erros");
class ProfileViewModel {
    constructor(name, bio, photo, title, interests) {
        this.name = name;
        this.bio = bio;
        this.photo = photo;
        this.title = title;
        this.interests = interests;
        this.getName = () => { return this.name; };
        this.getBio = () => { return this.bio; };
        this.getPhoto = () => { return this.photo; };
        this.getTitle = () => { return this.title; };
        this.getInterests = () => { return this.interests; };
    }
    validateModel() {
        if (typeof this.name !== 'string')
            throw new erros_1.ErroParametro('Nome: deve ser texto.');
        if (typeof this.bio !== 'string')
            throw new erros_1.ErroParametro('Bio: deve ser texto.');
        if (typeof this.photo !== 'object')
            throw new erros_1.ErroParametro('Foto: deve ser uma imagem.');
        if (typeof this.title !== 'string')
            throw new erros_1.ErroParametro('Titulo: deve ser um texto.');
        if (typeof this.interests !== 'object')
            throw new erros_1.ErroParametro('Interesses: deve ser um array de objeto.');
        if (this.name !== '')
            throw new erros_1.ErroParametro('Nome: não deve ser vazio.');
    }
}
exports.ProfileViewModel = ProfileViewModel;
//# sourceMappingURL=ProfileViewModel.js.map