"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PostViewModel {
    constructor(_id, idUser, countViews, title, description, photo, idProject, created_at, goodIdea, user, countGoodIdea) {
        this._id = _id;
        this.idUser = idUser;
        this.countViews = countViews;
        this.title = title;
        this.description = description;
        this.photo = photo;
        this.idProject = idProject;
        this.created_at = created_at;
        this.goodIdea = goodIdea;
        this.user = user;
        this.countGoodIdea = countGoodIdea;
    }
}
exports.default = PostViewModel;
//# sourceMappingURL=PostViewModel.js.map