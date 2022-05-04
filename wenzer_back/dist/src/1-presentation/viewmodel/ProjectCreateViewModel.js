"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectCreateViewModel = void 0;
class ProjectCreateViewModel {
    constructor(_id, name, description, photo, active, publicProject, marketing, tags, created_at, countGoodIdea, userId = "", following = false, user = null, goodIdea = false) {
        this._id = _id;
        this.name = name;
        this.description = description;
        this.photo = photo;
        this.active = active;
        this.publicProject = publicProject;
        this.marketing = marketing;
        this.tags = tags;
        this.created_at = created_at;
        this.countGoodIdea = countGoodIdea;
        this.userId = userId;
        this.following = following;
        this.user = user;
        this.goodIdea = goodIdea;
    }
}
exports.ProjectCreateViewModel = ProjectCreateViewModel;
//# sourceMappingURL=ProjectCreateViewModel.js.map