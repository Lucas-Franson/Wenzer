"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const domainBase_1 = __importDefault(require("./domainBase"));
class Project extends domainBase_1.default {
    constructor(name, description, photo, active, publicProject, id = '', created_at = new Date(), updated_at = new Date()) {
        super(id, created_at, updated_at);
        this.name = name;
        this.description = description;
        this.photo = photo;
        this.active = active;
        this.publicProject = publicProject;
        this.id = id;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.validateObject = () => {
            return true;
        };
    }
}
exports.Project = Project;
//# sourceMappingURL=project.js.map