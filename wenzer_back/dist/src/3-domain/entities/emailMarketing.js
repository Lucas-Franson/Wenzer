"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailMarketing = void 0;
const domainBase_1 = __importDefault(require("./domainBase"));
const uuid_1 = require("uuid");
class EmailMarketing extends domainBase_1.default {
    constructor(_email, _emailValid = false, _id = (0, uuid_1.v4)(), _created_at = new Date(), _updated_at = new Date()) {
        super(_id, _created_at, _updated_at);
        this._email = _email;
        this._emailValid = _emailValid;
        this._id = _id;
        this._created_at = _created_at;
        this._updated_at = _updated_at;
        this.emailIsValid = () => { return this._emailValid; };
        this.validateEmail = () => { this._emailValid = true; };
        this.invalidateEmail = () => { this._emailValid = false; };
        this.validateObject = () => {
            return true;
        };
    }
}
exports.EmailMarketing = EmailMarketing;
//# sourceMappingURL=emailMarketing.js.map