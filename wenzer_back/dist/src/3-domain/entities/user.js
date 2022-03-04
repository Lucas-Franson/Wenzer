"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const domainBase_1 = __importDefault(require("./domainBase"));
class User extends domainBase_1.default {
    constructor(name, email, password, title = '', photo = new Blob([]), bio = '', emailValid = false, id = '', created_at = new Date(), updated_at = new Date()) {
        super(id, created_at, updated_at);
        this.name = name;
        this.email = email;
        this.password = password;
        this.title = title;
        this.photo = photo;
        this.bio = bio;
        this.emailValid = emailValid;
        this.id = id;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.emailIsValid = () => { return this.emailValid; };
        this.getName = () => { return this.name; };
        this.getEmail = () => { return this.email; };
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