"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileViewModel = void 0;
const erros_1 = require("../../erros");
class ProfileViewModel {
    constructor(_id, name, lastName, bio, university, interests, photo, hasCompany, countProjects, countParticipating) {
        this._id = _id;
        this.name = name;
        this.lastName = lastName;
        this.bio = bio;
        this.university = university;
        this.interests = interests;
        this.photo = photo;
        this.hasCompany = hasCompany;
        this.countProjects = countProjects;
        this.countParticipating = countParticipating;
        this.getName = () => { return this.name; };
        this.getLastName = () => { return this.lastName; };
        this.getBio = () => { return this.bio; };
        this.getUniversity = () => { return this.university; };
        this.getHasCompany = () => { return this.hasCompany; };
        this.getInterests = () => { return this.interests; };
    }
    validateModel() {
        if (typeof this.name !== 'string')
            throw new erros_1.ErroParametro('Nome: deve ser texto.');
        if (this.bio != '' && typeof this.bio !== 'string')
            throw new erros_1.ErroParametro('Bio: deve ser texto.');
        if (this.interests != null && typeof this.interests !== 'object')
            throw new erros_1.ErroParametro('Interesses: deve ser um array de objeto.');
        if (this.name == '')
            throw new erros_1.ErroParametro('Nome: não deve ser vazio.');
    }
}
exports.ProfileViewModel = ProfileViewModel;
//# sourceMappingURL=ProfileViewModel.js.map