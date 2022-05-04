"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PostCreateViewModel {
    constructor(_id, countViews, title, description, publicPost, photo, idProject, created_at) {
        this._id = _id;
        this.countViews = countViews;
        this.title = title;
        this.description = description;
        this.publicPost = publicPost;
        this.photo = photo;
        this.idProject = idProject;
        this.created_at = created_at;
    }
}
exports.default = PostCreateViewModel;
//# sourceMappingURL=PostCreateViewModel.js.map