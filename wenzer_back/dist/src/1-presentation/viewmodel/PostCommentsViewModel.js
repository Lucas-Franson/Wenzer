"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostCommentsViewModel = void 0;
class PostCommentsViewModel {
    constructor(_id, idUser, idPost, text, usuario, subComments, createdAt, goodIdea, countGoodIdea) {
        this._id = _id;
        this.idUser = idUser;
        this.idPost = idPost;
        this.text = text;
        this.usuario = usuario;
        this.subComments = subComments;
        this.createdAt = createdAt;
        this.goodIdea = goodIdea;
        this.countGoodIdea = countGoodIdea;
    }
}
exports.PostCommentsViewModel = PostCommentsViewModel;
//# sourceMappingURL=PostCommentsViewModel.js.map