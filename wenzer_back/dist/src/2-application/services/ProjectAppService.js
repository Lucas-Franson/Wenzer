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
const InterestsFormViewModel_1 = require("../../1-presentation/viewmodel/InterestsFormViewModel");
const ProjectCreateViewModel_1 = require("../../1-presentation/viewmodel/ProjectCreateViewModel");
const SearchViewModel_1 = require("../../1-presentation/viewmodel/SearchViewModel");
const project_1 = require("../../3-domain/entities/project");
class ProjectAppService {
    constructor(projectService, interestsService, postService, userService) {
        this.projectService = projectService;
        this.interestsService = interestsService;
        this.postService = postService;
        this.userService = userService;
    }
    get(idUser, _id) {
        return __awaiter(this, void 0, void 0, function* () {
            let project = yield this.projectService.getById(_id);
            let user = null;
            let participant = null;
            if (project) {
                user = yield this.userService.findUserById(project === null || project === void 0 ? void 0 : project.userId);
                participant = yield this.projectService.getParticipantByProjectAndUser(project === null || project === void 0 ? void 0 : project._id, idUser);
            }
            let interest = yield this.interestsService.getInterestsByProject(_id);
            let interestViewModel = [];
            interest.map((data) => {
                interestViewModel.push(new InterestsFormViewModel_1.InterestsFormViewModel(data.name, data._id));
            });
            let following = false;
            if ((project === null || project === void 0 ? void 0 : project.userId) != idUser) {
                following = yield this.projectService.verifyIfUserIsFollowingProject(idUser, _id);
            }
            let goodIdea = yield this.projectService.userProjectGoodIdeaAlreadyExist(idUser, _id);
            let viewModel = new ProjectCreateViewModel_1.ProjectCreateViewModel((project === null || project === void 0 ? void 0 : project._id) ? project._id : "", project === null || project === void 0 ? void 0 : project.name, project === null || project === void 0 ? void 0 : project.description, project === null || project === void 0 ? void 0 : project.photo, project === null || project === void 0 ? void 0 : project.active, project === null || project === void 0 ? void 0 : project.publicProject, project === null || project === void 0 ? void 0 : project.marketing, interestViewModel, project === null || project === void 0 ? void 0 : project.created_at, project === null || project === void 0 ? void 0 : project.countGoodIdea, project === null || project === void 0 ? void 0 : project.userId, following, user, goodIdea != null, participant != null);
            return viewModel;
        });
    }
    getByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.projectService.getProjectsByUser(userId);
        });
    }
    create(userId, project) {
        return __awaiter(this, void 0, void 0, function* () {
            const proj = new project_1.Project(project.name, project.description, project.photo, project.active, project.publicProject, project.marketing, userId, project.countGoodIdea);
            yield this.projectService.create(proj);
            yield this.projectService.createParticipantLeader(proj);
            this.interestsService.linkProjectToInterests(proj, project.tags);
        });
    }
    update(userId, project) {
        return __awaiter(this, void 0, void 0, function* () {
            const proj = new project_1.Project(project.name, project.description, project.photo, project.active, project.publicProject, project.marketing, userId, project.countGoodIdea, project._id, project.created_at);
            yield this.projectService.update(proj);
            this.interestsService.linkProjectToInterests(proj, project.tags);
        });
    }
    delete(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.projectService.delete(projectId);
        });
    }
    highProjects() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.projectService.highProjects();
        });
    }
    search(userId, search, types) {
        return __awaiter(this, void 0, void 0, function* () {
            let found = [];
            // Procurar por usuário
            if (types.find(x => x == 0) || types.length == 0) {
                let user = yield this.userService.search(userId, search.toLowerCase().trim());
                if (user) {
                    user.map((data) => {
                        let searchViewModel = new SearchViewModel_1.SearchViewModel(data._id, data.name + " " + data.lastName, data.bio, SearchViewModel_1.SearchType.People, data.photo);
                        found.push(searchViewModel);
                    });
                }
            }
            // Procurar por projeto
            if (types.find(x => x == 1) || types.length == 0) {
                let project = yield this.projectService.search(userId, search.toLocaleLowerCase().trim());
                if (project) {
                    project.map((data) => {
                        let searchViewModel = new SearchViewModel_1.SearchViewModel(data._id, data.name, data.description, SearchViewModel_1.SearchType.Project, data.photo);
                        found.push(searchViewModel);
                    });
                }
            }
            // Procurar por publicação
            if (types.find(x => x == 2) || types.length == 0) {
                let post = yield this.postService.search(userId, search.toLocaleLowerCase().trim());
                if (post) {
                    post.map((data) => {
                        let searchViewModel = new SearchViewModel_1.SearchViewModel(data._id, data.title, data.description, SearchViewModel_1.SearchType.Post, data.photo);
                        found.push(searchViewModel);
                    });
                }
            }
            return found.sort((a, b) => {
                if (a.name < b.name)
                    return -1;
                if (a.name > b.name)
                    return 1;
                return 0;
            });
        });
    }
    follow(userId, idProject) {
        return __awaiter(this, void 0, void 0, function* () {
            const follower = yield this.projectService.followerByIdExist(userId, idProject);
            if (!follower) {
                yield this.projectService.follow(userId, idProject);
            }
            else {
                yield this.projectService.unfollow(follower._id);
            }
        });
    }
    createPost(userId, post) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.postService.create(userId, post);
        });
    }
    setUserProjectGoodIdea(idUser, idProject) {
        return __awaiter(this, void 0, void 0, function* () {
            const userPostExist = yield this.projectService.userProjectGoodIdeaAlreadyExist(idUser, idProject);
            yield this.projectService.sumCountOfGoodIdeia(idProject, userPostExist != null);
            this.projectService.setUserProjectGoodIdea(idUser, idProject, userPostExist != null);
        });
    }
    getParticipants(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.projectService.getParticipants(_id);
        });
    }
    acceptParticipant(idUserServer, idProject, idUserRequest, role) {
        return __awaiter(this, void 0, void 0, function* () {
            let project = yield this.projectService.getById(idProject);
            if ((project === null || project === void 0 ? void 0 : project.userId) != idUserServer)
                throw Error("Você não possui permissão para aceitar o usuário nesse projeto.");
            yield this.projectService.acceptParticipant(idProject, idUserRequest, role);
        });
    }
    rejectParticipant(idUserServer, idProject, idUserRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            let project = yield this.projectService.getById(idProject);
            if ((project === null || project === void 0 ? void 0 : project.userId) != idUserServer)
                throw Error("Você não possui permissão para rejeitar o usuário nesse projeto.");
            yield this.projectService.rejectParticipant(idProject, idUserRequest);
        });
    }
    requestParticipant(idUserServer, idProject) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.projectService.requestParticipant(idUserServer, idProject);
        });
    }
    removeParticipant(idUserServer, idProject, idUserRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            let project = yield this.projectService.getById(idProject);
            if ((project === null || project === void 0 ? void 0 : project.userId) != idUserServer)
                throw Error("Você não possui permissão para remover o usuário do projeto.");
            yield this.projectService.removeParticipant(idProject, idUserRequest);
        });
    }
}
exports.default = ProjectAppService;
//# sourceMappingURL=ProjectAppService.js.map