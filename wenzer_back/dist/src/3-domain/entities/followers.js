"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Followers = void 0;
const domainBase_1 = __importDefault(require("./domainBase"));
class Followers extends domainBase_1.default {
    constructor(idProject, idUser, id = '', created_at = new Date(), updated_at = new Date()) {
        super(id, created_at, updated_at);
        this.idProject = idProject;
        this.idUser = idUser;
        this.id = id;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.validateObject = () => {
            return true;
        };
    }
}
exports.Followers = Followers;
//# sourceMappingURL=followers.js.map