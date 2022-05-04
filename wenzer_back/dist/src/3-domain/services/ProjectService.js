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
const followers_1 = require("../entities/followers");
const userProjectGoodIdea_1 = require("../entities/userProjectGoodIdea");
class ProjectService {
    constructor(projectRepository, followerRepository, interestRepository, postRepository) {
        this.projectRepository = projectRepository;
        this.followerRepository = followerRepository;
        this.interestRepository = interestRepository;
        this.postRepository = postRepository;
    }
    getById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.projectRepository.getById(_id);
        });
    }
    getProjectsByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.projectRepository.getProjectsByUser(userId);
        });
    }
    create(project) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.projectRepository.insert(project);
        });
    }
    update(project) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.projectRepository.update(project);
        });
    }
    delete(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const interests = yield this.interestRepository.findLinkProjectToInterests(projectId);
            const idLinkInterestToProject = [];
            interests.map((data) => {
                idLinkInterestToProject.push(data._id);
            });
            const posts = yield this.postRepository.getPostsByProject(projectId);
            const idsPost = [];
            posts.map((data) => {
                idsPost.push(data._id);
            });
            if (idsPost.length > 0)
                this.postRepository.deleteListPost(idsPost);
            if (idLinkInterestToProject.length > 0)
                yield this.interestRepository.deleteLinkToProject(idLinkInterestToProject);
            yield this.projectRepository.delete(projectId);
        });
    }
    highProjects() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.projectRepository.getAllProjectsInHigh();
        });
    }
    follow(idUser, idProject) {
        return __awaiter(this, void 0, void 0, function* () {
            const follower = new followers_1.Followers(idProject, idUser);
            yield this.followerRepository.insert(follower);
        });
    }
    unfollow(idFollower) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.followerRepository.delete(idFollower);
        });
    }
    followerByIdExist(userId, idProject) {
        return __awaiter(this, void 0, void 0, function* () {
            const where = { idUser: userId, idProject };
            const follower = yield this.followerRepository.getByWhereClause(where);
            if (follower && follower.length > 0) {
                return this.followerRepository.handleResult(follower[0]);
            }
            return null;
        });
    }
    getProjectsByInterests(interests) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.projectRepository.getProjectsByInterests(interests);
        });
    }
    getProjectsMarketing(interests) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.projectRepository.getProjectsMarketing(interests);
        });
    }
    getCountOfProjectsByUser(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.projectRepository.getCountProjectsByUser(idUser);
        });
    }
    getCountOfParticipatingByUser(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.projectRepository.getCountParticipatingByUser(idUser);
        });
    }
    verifyIfUserIsFollowingProject(idUser, idProject) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.projectRepository.verifyIfUserIsFollowingProject(idUser, idProject);
        });
    }
    setUserProjectGoodIdea(idUser, idProject, userProjectAlreadyExist) {
        let goodIdea = new userProjectGoodIdea_1.UserProjectGoodIdea(idUser, idProject);
        if (userProjectAlreadyExist) {
            this.projectRepository.deleteProjectGoodIdea(goodIdea);
        }
        else {
            this.projectRepository.setProjectGoodIdea(goodIdea);
        }
    }
    userProjectGoodIdeaAlreadyExist(idUser, idProject) {
        return __awaiter(this, void 0, void 0, function* () {
            let userProject = yield this.projectRepository.findUserProjectGoodIdeaById(idUser, idProject);
            return userProject;
        });
    }
    sumCountOfGoodIdeia(idProject, userProjectExist) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield this.projectRepository.getById(idProject);
            if (!project)
                throw new Error("Project não encontrado.");
            if (userProjectExist) {
                project.countGoodIdea--;
            }
            else {
                project.countGoodIdea++;
            }
            yield this.projectRepository.update(project);
        });
    }
    search(userId, search) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.projectRepository.search(userId, search);
        });
    }
}
exports.default = ProjectService;
//# sourceMappingURL=ProjectService.js.map