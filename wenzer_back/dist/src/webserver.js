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
exports.websocket = void 0;
const mongodb_1 = require("mongodb");
const PostViewModel_1 = __importDefault(require("./1-presentation/viewmodel/PostViewModel"));
const UserViewModel_1 = __importDefault(require("./1-presentation/viewmodel/UserViewModel"));
const NotificationService_1 = __importDefault(require("./3-domain/services/NotificationService"));
const PostService_1 = __importDefault(require("./3-domain/services/PostService"));
const UserService_1 = __importDefault(require("./3-domain/services/UserService"));
const connectionRepository_1 = require("./4-infra/repositories/connectionRepository");
const postRepository_1 = require("./4-infra/repositories/postRepository");
const userRepository_1 = __importDefault(require("./4-infra/repositories/userRepository"));
const url = process.env.BASE_URL_DATABASE;
const database = process.env.BASE_NAME_DATABASE;
function websocket(io) {
    let interval;
    io.on("connection", (socket) => {
        if (interval) {
            clearInterval(interval);
        }
        mongodb_1.MongoClient.connect(url, function (err, db) {
            if (err)
                throw err;
            var dbo = db === null || db === void 0 ? void 0 : db.db(database);
            if (dbo) {
                interval = setInterval(() => {
                    getApiAndEmit(socket, dbo), 1000;
                });
            }
        });
    });
    const getApiAndEmit = (socket, dbo) => {
        const obj = socket.request._query;
        let user = { id: obj['id'] };
        getAllPost(socket, user, dbo);
        getAllNotifications(socket, dbo, user);
    };
    function getAllPost(socket, { id }, dbo) {
        return __awaiter(this, void 0, void 0, function* () {
            const postService = new PostService_1.default(new postRepository_1.PostRepository());
            const post = yield postService.getNewPostToWebService(id, dbo);
            let goodIdea = yield postService.getAllGoodIdeaFromUserWebService(id, dbo);
            const userViewModel = yield buildUserViewModel(id, dbo);
            if (post && (post === null || post === void 0 ? void 0 : post.length) > 0) {
                const postViewModel = yield buildPostViewModel(post, goodIdea, userViewModel);
                socket.emit("GetPost", postViewModel);
            }
            else {
                socket.emit("GetPost", []);
            }
        });
    }
    function buildUserViewModel(id, dbo) {
        return __awaiter(this, void 0, void 0, function* () {
            const userService = new UserService_1.default(new userRepository_1.default(), new connectionRepository_1.ConnectionRepository());
            let user = yield userService.findUserByIdWebService(id, dbo);
            return new UserViewModel_1.default(user === null || user === void 0 ? void 0 : user._id, user === null || user === void 0 ? void 0 : user.name, user === null || user === void 0 ? void 0 : user.lastName, user === null || user === void 0 ? void 0 : user.email, user === null || user === void 0 ? void 0 : user.password, user === null || user === void 0 ? void 0 : user.title, user === null || user === void 0 ? void 0 : user.photo, user === null || user === void 0 ? void 0 : user.bio, user === null || user === void 0 ? void 0 : user.emailValid, user === null || user === void 0 ? void 0 : user.created_at);
        });
    }
    function buildPostViewModel(post, goodIdea, userViewModel) {
        return __awaiter(this, void 0, void 0, function* () {
            let postViewModel = [];
            post.map((value) => {
                const postAsGoodIdea = goodIdea.find(x => x.idPost === value._id);
                const _postViewModel = new PostViewModel_1.default(value._id, value.idUser, value.countViews, value.title, value.description, value.photo, value.idProject, value.created_at, postAsGoodIdea != null, userViewModel, 0);
                postViewModel.push(_postViewModel);
            });
            return postViewModel;
        });
    }
    function getAllNotifications(socket, dbo, { id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const notificationService = new NotificationService_1.default(new postRepository_1.PostRepository(), new userRepository_1.default());
            let commentsByPostNumber = yield notificationService.getCommentsByPostWebService(dbo, id);
            let commentsCommentedByUserNumber = yield notificationService.getCommentsCommentedByUserWebService(dbo, id);
            let friendRequestNumber = yield notificationService.getFriendRequestWebService(dbo, id);
            socket.emit("GetNotification", (commentsByPostNumber + commentsCommentedByUserNumber + friendRequestNumber));
        });
    }
}
exports.websocket = websocket;
//# sourceMappingURL=webserver.js.map