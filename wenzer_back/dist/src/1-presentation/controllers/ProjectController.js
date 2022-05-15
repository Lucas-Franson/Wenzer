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
class ProjectController {
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id } = req.params;
            try {
                let project = yield req.service.projectAppService.get(req.session.userId, _id);
                res.status(200).json(project);
            }
            catch (err) {
                next(err);
            }
        });
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = req.body;
            try {
                if (req.files) {
                    project.photo = req.files.photo;
                }
                if (typeof project.tags === 'string' && project.tags != '') {
                    project.tags = JSON.parse(project.tags);
                }
                yield req.service.projectAppService.create(req.session.userId, project);
                res.status(201).json();
            }
            catch (err) {
                next(err);
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = req.body;
            try {
                if (req.files) {
                    project.photo = req.files.photo;
                }
                if (typeof project.tags === 'string' && project.tags != '') {
                    project.tags = JSON.parse(project.tags);
                }
                yield req.service.projectAppService.update(req.session.userId, project);
                res.status(204).json();
            }
            catch (err) {
                next(err);
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { projectId } = req.params;
            try {
                yield req.service.projectAppService.delete(projectId);
                res.status(204).json();
            }
            catch (err) {
                next(err);
            }
        });
    }
    getByUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idUser } = req.params;
            try {
                const projects = yield req.service.projectAppService.getByUser(idUser);
                res.status(200).json(projects);
            }
            catch (err) {
                next(err);
            }
        });
    }
    highProjects(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const projects = yield req.service.projectAppService.highProjects();
                res.status(200).json(projects);
            }
            catch (err) {
                next(err);
            }
        });
    }
    search(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var { search, types } = req.query;
            try {
                if (search && search != '' && search.trim() != '' && search.length > 0) {
                    if (!types)
                        types = [];
                    const objFound = yield req.service.projectAppService.search(req.session.userId, search, types);
                    res.status(200).json(objFound);
                }
                else {
                    throw new erros_1.ErroParametro("Preencha o que deseja pesquisar.");
                }
            }
            catch (err) {
                next(err);
            }
        });
    }
    follow(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idProject } = req.body;
            try {
                yield req.service.projectAppService.follow(req.session.userId, idProject);
                res.status(204).json();
            }
            catch (err) {
                next(err);
            }
        });
    }
    createPost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = req.body;
            try {
                if (req.files) {
                    post.photo = req.files.photo;
                }
                yield req.service.projectAppService.createPost(req.session.userId, post);
                res.status(201).json();
            }
            catch (err) {
                next(err);
            }
        });
    }
    setUserProjectGoodIdea(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id } = req.params;
            try {
                if (!_id) {
                    throw new erros_1.ErroParametro('Falta parâmetro para setar os registros de boa ideia.');
                }
                yield req.service.projectAppService.setUserProjectGoodIdea(req.session.userId, _id);
                res.status(201).json();
            }
            catch (err) {
                next(err);
            }
        });
    }
    getParticipants(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id } = req.params;
            try {
                if (!_id) {
                    throw new erros_1.ErroParametro('Falta parâmetro para recuperar participantes do projeto.');
                }
                const participants = yield req.service.projectAppService.getParticipants(_id);
                res.status(200).json(participants);
            }
            catch (err) {
                next(err);
            }
        });
    }
    acceptParticipant(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idProject, idUser } = req.params;
            const { role } = req.body;
            try {
                if (!idProject || !idUser) {
                    throw new erros_1.ErroParametro('Falta parâmetro para aceitar solicitação para participar de projeto.');
                }
                yield req.service.projectAppService.acceptParticipant(req.session.userId, idProject, idUser, role);
                res.status(204).json();
            }
            catch (err) {
                next(err);
            }
        });
    }
    rejectParticipant(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idProject, idUser } = req.params;
            try {
                if (!idProject || !idUser) {
                    throw new erros_1.ErroParametro('Falta parâmetro para rejeitar solicitação para participar de projeto.');
                }
                yield req.service.projectAppService.rejectParticipant(req.session.userId, idProject, idUser);
                res.status(204).json();
            }
            catch (err) {
                next(err);
            }
        });
    }
    requestParticipant(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id } = req.params;
            try {
                if (!_id) {
                    throw new erros_1.ErroParametro('Falta parâmetro para solicitar participação no projeto.');
                }
                yield req.service.projectAppService.requestParticipant(req.session.userId, _id);
                res.status(204).json();
            }
            catch (err) {
                next(err);
            }
        });
    }
    removeParticipant(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idProject, idUser } = req.params;
            try {
                if (!idProject || !idUser) {
                    throw new erros_1.ErroParametro('Falta parâmetro para remover participante do projeto.');
                }
                yield req.service.projectAppService.removeParticipant(req.session.userId, idProject, idUser);
                res.status(204).json();
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = ProjectController;
//# sourceMappingURL=ProjectController.js.map