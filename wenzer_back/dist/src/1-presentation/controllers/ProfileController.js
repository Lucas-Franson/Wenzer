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
const ProfileViewModel_1 = require("../viewmodel/ProfileViewModel");
class ProfileController {
    getAllInterests(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const interests = yield req.service.profileAppService.getAllInterests();
                res.status(200).json(interests);
            }
            catch (err) {
                next(err);
            }
        });
    }
    getInfoUserProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idUser } = req.params;
            try {
                const user = yield req.service.profileAppService.getInfoUser(req.session.userId, idUser);
                res.status(200).json(user);
            }
            catch (err) {
                next(err);
            }
        });
    }
    editProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, lastName, bio, university, hasCompany, interests } = req.body;
            const profile = new ProfileViewModel_1.ProfileViewModel('', name, lastName, bio, university, interests, null, hasCompany, 0, 0);
            try {
                profile.validateModel();
                yield req.service.profileAppService.editProfile(req.session.userId, profile);
                res.status(204).json();
            }
            catch (err) {
                next(err);
            }
        });
    }
    editPhoto(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const file = yield req.service.profileAppService.editPhoto(req.session.userId, req.files.file);
                res.status(200).json({ photo: file });
            }
            catch (err) {
                next(err);
            }
        });
    }
    followUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idUserToFollow } = req.body;
            try {
                yield req.service.profileAppService.followUser(req.session.userId, idUserToFollow);
                res.status(204).json();
            }
            catch (err) {
                next(err);
            }
        });
    }
    connections(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idUser } = req.params;
            try {
                const connections = yield req.service.profileAppService.getConnections(idUser);
                res.status(200).json(connections);
            }
            catch (err) {
                next(err);
            }
        });
    }
    interests(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idUser } = req.params;
            try {
                const interests = yield req.service.profileAppService.getInterests(idUser);
                res.status(200).json(interests);
            }
            catch (err) {
                next(err);
            }
        });
    }
    getAllPosts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, countPerPage } = req.query;
            const { idUser } = req.params;
            try {
                if (!page || !countPerPage) {
                    throw new erros_1.ErroParametro('Falta parâmetro para recuperar os registros de publicações.');
                }
                const posts = yield req.service.profileAppService.getAllPosts(Number(page), Number(countPerPage), idUser, req.session.userId);
                res.status(200).json(posts);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = ProfileController;
//# sourceMappingURL=ProfileController.js.map