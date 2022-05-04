"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const domainBase_1 = __importDefault(require("./domainBase"));
const uuid_1 = require("uuid");
class Project extends domainBase_1.default {
    constructor(name, description, photo, active, publicProject, marketing, userId, countGoodIdea, _id = (0, uuid_1.v4)(), created_at = new Date(), updated_at = new Date()) {
        super(_id, created_at, updated_at);
        this.name = name;
        this.description = description;
        this.photo = photo;
        this.active = active;
        this.publicProject = publicProject;
        this.marketing = marketing;
        this.userId = userId;
        this.countGoodIdea = countGoodIdea;
        this._id = _id;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.getId = () => { return this._id; };
        this.validateObject = () => {
            return true;
        };
    }
}
exports.Project = Project;
//# sourceMappingURL=project.js.map