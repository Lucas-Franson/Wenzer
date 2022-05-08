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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InterestsFormViewModel_1 = require("../../1-presentation/viewmodel/InterestsFormViewModel");
const PostViewModel_1 = __importDefault(require("../../1-presentation/viewmodel/PostViewModel"));
const ProfileViewModel_1 = require("../../1-presentation/viewmodel/ProfileViewModel");
const UserViewModel_1 = __importDefault(require("../../1-presentation/viewmodel/UserViewModel"));
class ProfileAppService {
    constructor(userService, interestsService, projectService, postService) {
        this.userService = userService;
        this.interestsService = interestsService;
        this.projectService = projectService;
        this.postService = postService;
    }
    getAllInterests() {
        return __awaiter(this, void 0, void 0, function* () {
            const interests = yield this.interestsService.getAllInterests();
            let newInterests = [];
            interests.map((value) => {
                let obj = new InterestsFormViewModel_1.InterestsFormViewModel(value.name, value._id);
                newInterests.push(obj);
            });
            return newInterests;
        });
    }
    getInfoUser(idUserServer, idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.userService.findUserById(idUser);
            let countProjects = yield this.projectService.getCountOfProjectsByUser(idUser);
            let countParticipating = yield this.projectService.getCountOfParticipatingByUser(idUser);
            let alreadyConnected = false;
            if (idUser != idUserServer) {
                alreadyConnected = yield this.userService.alreadyConnected(idUserServer, idUser);
            }
            return new ProfileViewModel_1.ProfileViewModel(user === null || user === void 0 ? void 0 : user._id, user === null || user === void 0 ? void 0 : user.name, user === null || user === void 0 ? void 0 : user.lastName, user === null || user === void 0 ? void 0 : user.bio, user === null || user === void 0 ? void 0 : user.university, [], user === null || user === void 0 ? void 0 : user.photo, user === null || user === void 0 ? void 0 : user.hasCompany, countProjects === null || countProjects === void 0 ? void 0 : countProjects.count, countParticipating === null || countParticipating === void 0 ? void 0 : countParticipating.count, alreadyConnected);
        });
    }
    editProfile(userId, profile) {
        return __awaiter(this, void 0, void 0, function* () {
            var user = yield this.userService.findUserById(userId);
            if (!user)
                throw new Error('Usuário não encontrado.');
            yield this.userService.updateUserByProfile(user, profile);
            yield this.interestsService.linkUserToInterests(user, profile.getInterests());
        });
    }
    editPhoto(userId, photo) {
        return __awaiter(this, void 0, void 0, function* () {
            var user = yield this.userService.findUserById(userId);
            if (!user)
                throw new Error('Usuário não encontrado.');
            const reader = Buffer.from(new Uint8Array(photo.data));
            const file = `data:${photo.mimetype};base64, ${reader.toString("base64")}`;
            yield this.userService.updateUserPhoto(user, file);
            return file;
        });
    }
    followUser(userId, idUserToFollow) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield this.userService.getConnectionFromUsers(userId, idUserToFollow);
            if (connection) {
                yield this.userService.deleteConnection(connection._id);
            }
            else {
                yield this.userService.createConnection(userId, idUserToFollow);
            }
        });
    }
    getConnections(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userService.getConnections(idUser);
        });
    }
    getInterests(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            let interests = yield this.interestsService.getInterestsByUser(idUser);
            let obj = [];
            interests.map((value) => {
                const interest = new InterestsFormViewModel_1.InterestsFormViewModel(value.name, value._id);
                obj.push(interest);
            });
            return obj;
        });
    }
    getAllPosts(page, countPerPage, idUser, idUserServer) {
        return __awaiter(this, void 0, void 0, function* () {
            let post = yield this.postService.getAllPostsByUserId(idUser, page, countPerPage);
            let goodIdea = yield this.postService.getAllGoodIdeaFromUser(idUserServer);
            let postViewModel = [];
            let user = yield this.userService.findUserById(idUser);
            let userViewModel = new UserViewModel_1.default(user === null || user === void 0 ? void 0 : user._id, user === null || user === void 0 ? void 0 : user.name, user === null || user === void 0 ? void 0 : user.email, user === null || user === void 0 ? void 0 : user.password, user === null || user === void 0 ? void 0 : user.title, user === null || user === void 0 ? void 0 : user.photo, user === null || user === void 0 ? void 0 : user.bio, user === null || user === void 0 ? void 0 : user.emailValid, user === null || user === void 0 ? void 0 : user.created_at);
            post.map((value) => {
                const postAsGoodIdea = goodIdea.find(x => x.idPost === value._id);
                const _postViewModel = new PostViewModel_1.default(value._id, value.idUser, value.countViews, value.title, value.description, value.photo, value.idProject, value.created_at, postAsGoodIdea != null, userViewModel);
                postViewModel.push(_postViewModel);
            });
            return postViewModel;
        });
    }
}
exports.default = ProfileAppService;
//# sourceMappingURL=ProfileAppService.js.map