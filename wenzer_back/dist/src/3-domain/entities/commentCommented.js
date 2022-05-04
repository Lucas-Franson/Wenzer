"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentCommented = void 0;
const domainBase_1 = __importDefault(require("./domainBase"));
const uuid_1 = require("uuid");
class CommentCommented extends domainBase_1.default {
    constructor(idUser, idPostComment, text, _id = (0, uuid_1.v4)(), created_at = new Date(), updated_at = new Date()) {
        super(_id, created_at, updated_at);
        this.idUser = idUser;
        this.idPostComment = idPostComment;
        this.text = text;
        this._id = _id;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
    validateObject() {
        if (this.idUser == null)
            throw new Error("Id do usuário deve ser preenchido.");
        if (this.idPostComment == null)
            throw new Error("Id do post comment deve ser preenchido.");
        if (this.text == null || this.text.trim() == '')
            throw new Error("Texto do comentário deve ser preenchido.");
        return true;
    }
}
exports.CommentCommented = CommentCommented;
//# sourceMappingURL=commentCommented.js.map