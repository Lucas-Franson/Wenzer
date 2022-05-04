"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const domainBase_1 = __importDefault(require("./domainBase"));
const uuid_1 = require("uuid");
class User extends domainBase_1.default {
    constructor(name, lastName, email, password, university, title = '', photo = '', bio = '', hasCompany = false, emailValid = false, _id = (0, uuid_1.v4)(), created_at = new Date(), updated_at = new Date()) {
        super(_id, created_at, updated_at);
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.university = university;
        this.title = title;
        this.photo = photo;
        this.bio = bio;
        this.hasCompany = hasCompany;
        this.emailValid = emailValid;
        this._id = _id;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.emailIsValid = () => { return this.emailValid; };
        this.getName = () => { return this.name; };
        this.getEmail = () => { return this.email; };
        this.getPhoto = () => { return this.photo; };
        this.getPassword = () => { return this.password; };
        this.setPassword = (pwd) => { this.password = pwd; };
        this.validateEmail = () => { this.emailValid = true; };
        this.invalidateEmail = () => { this.emailValid = false; };
        this.validateObject = () => {
            return true;
        };
    }
}
exports.User = User;
//# sourceMappingURL=user.js.map