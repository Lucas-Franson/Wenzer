"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.React = void 0;
const domainBase_1 = __importDefault(require("./domainBase"));
class React extends domainBase_1.default {
    constructor(type, id = '', created_at = new Date(), updated_at = new Date()) {
        super(id, created_at, updated_at);
        this.type = type;
        this.id = id;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.validateObject = () => {
            return true;
        };
    }
}
exports.React = React;
//# sourceMappingURL=react.js.map