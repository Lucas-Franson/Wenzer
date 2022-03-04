"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailMarketing = void 0;
const domainBase_1 = __importDefault(require("./domainBase"));
class EmailMarketing extends domainBase_1.default {
    constructor(email, emailValid = false, id = '', created_at = new Date(), updated_at = new Date()) {
        super(id, created_at, updated_at);
        this.email = email;
        this.emailValid = emailValid;
        this.id = id;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.emailIsValid = () => { return this.emailValid; };
        this.validateEmail = () => { this.emailValid = true; };
        this.invalidateEmail = () => { this.emailValid = false; };
        this.validateObject = () => {
            return true;
        };
    }
}
exports.EmailMarketing = EmailMarketing;
//# sourceMappingURL=emailMarketing.js.map