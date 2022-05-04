"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const erros_1 = require("../../erros");
class FeedController {
    getAllPosts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, countPerPage } = req.query;
            try {
                if (!page || !countPerPage) {
                    throw new erros_1.ErroParametro('Falta parâmetro para recuperar os registros de feed.');
                }
                const posts = yield req.service.feedAppService.getAllPosts(req.session.userId, page, countPerPage);
                res.status(200).json(posts);
            }
            catch (err) {
                next(err);
            }
        });
    }
    getPostById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id } = req.params;
            try {
                if (!_id) {
                    throw new erros_1.ErroParametro('Falta parâmetro para buscar post.');
                }
                const post = yield req.service.feedAppService.getPostById(req.session.userId, _id);
                res.status(200).json(post);
            }
            catch (err) {
                next(err);
            }
        });
    }
    setPostAsGoodIdea(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { postId } = req.body;
            try {
                if (!postId) {
                    throw new erros_1.ErroParametro('Falta parâmetro para dar boa ideia no post.');
                }
                yield req.service.feedAppService.setGoodIdea(req.session.userId, postId);
                res.status(200).json();
            }
            catch (err) {
                next(err);
            }
        });
    }
    getAllComments(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { postId } = req.params;
            try {
                if (!postId) {
                    throw new erros_1.ErroParametro('Falta parâmetro para buscar comentários do post.');
                }
                const comments = yield req.service.feedAppService.getAllComments(req.session.userId, postId);
                res.status(200).json(comments);
            }
            catch (err) {
                next(err);
            }
        });
    }
    setComments(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { postId, text } = req.body;
            try {
                if (!postId || !text || text.trim() == '') {
                    throw new erros_1.ErroParametro('Falta parâmetro para buscar comentários do post.');
                }
                let comment = yield req.service.feedAppService.setComments(req.session.userId, postId, text);
                res.status(200).json(comment);
            }
            catch (err) {
                next(err);
            }
        });
    }
    setCommentAsGoodIdea(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id } = req.params;
            try {
                if (!_id) {
                    throw new erros_1.ErroParametro('Falta parâmetro para dar boa ideia no comentário.');
                }
                yield req.service.feedAppService.setPostCommentGoodIdea(req.session.userId, _id);
                res.status(200).json();
            }
            catch (err) {
                next(err);
            }
        });
    }
    setSubComment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idPostComment, text } = req.body;
            try {
                if (!idPostComment || !text || text.trim() == '') {
                    throw new erros_1.ErroParametro('Falta parâmetro para buscar sub comentários.');
                }
                let comment = yield req.service.feedAppService.setSubComment(req.session.userId, idPostComment, text);
                res.status(200).json(comment);
            }
            catch (err) {
                next(err);
            }
        });
    }
    projectsByInterests(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const projects = yield req.service.feedAppService.getProjectsByInterests(req.session.userId);
                res.status(200).json(projects);
            }
            catch (err) {
                next(err);
            }
        });
    }
    getProjectsMarketing(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const projects = yield req.service.feedAppService.getProjectsMarketing(req.session.userId);
                res.status(200).json(projects);
            }
            catch (err) {
                next(err);
            }
        });
    }
    setDateOfLastPost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { date } = req.body;
            try {
                if (!date) {
                    throw new erros_1.ErroParametro("Falta enviar a data.");
                }
                yield req.service.feedAppService.setDateOfLastPost(req.session.userId, date);
                res.status(200).json();
            }
            catch (err) {
                next(err);
            }
        });
    }
    deletePost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id } = req.params;
            try {
                if (!_id) {
                    throw new erros_1.ErroParametro("Falta enviar o id do post.");
                }
                yield req.service.feedAppService.deletePost(req.session.userId, _id);
                res.status(204).json();
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = FeedController;
//# sourceMappingURL=FeedController.js.map