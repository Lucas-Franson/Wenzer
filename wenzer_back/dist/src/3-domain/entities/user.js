"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const domainBase_1 = __importDefault(require("./domainBase"));
const uuid_1 = require("uuid");
class User extends domainBase_1.default {
    constructor(_name, _email, _password, _title = '', _photo = null, _bio = '', _emailValid = false, _id = (0, uuid_1.v4)(), _created_at = new Date(), _updated_at = new Date()) {
        super(_id, _created_at, _updated_at);
        this._name = _name;
        this._email = _email;
        this._password = _password;
        this._title = _title;
        this._photo = _photo;
        this._bio = _bio;
        this._emailValid = _emailValid;
        this._id = _id;
        this._created_at = _created_at;
        this._updated_at = _updated_at;
        this.emailIsValid = () => { return this._emailValid; };
        this.getName = () => { return this._name; };
        this.getEmail = () => { return this._email; };
        this.getPassword = () => { return this._password; };
        this.setPassword = (pwd) => { this._password = pwd; };
        this.validateEmail = () => { this._emailValid = true; };
        this.invalidateEmail = () => { this._emailValid = false; };
        this.validateObject = () => {
            return true;
        };
    }
}
exports.User = User;
//# sourceMappingURL=user.js.map