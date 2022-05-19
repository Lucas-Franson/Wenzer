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
const CommentCommentedViewModel_1 = require("../../1-presentation/viewmodel/CommentCommentedViewModel");
const PostCommentsViewModel_1 = require("../../1-presentation/viewmodel/PostCommentsViewModel");
const PostViewModel_1 = __importDefault(require("../../1-presentation/viewmodel/PostViewModel"));
const UserPostCommentViewModel_1 = require("../../1-presentation/viewmodel/UserPostCommentViewModel");
const UserViewModel_1 = __importDefault(require("../../1-presentation/viewmodel/UserViewModel"));
class FeedAppService {
    constructor(userService, postService, projectService, interestsService) {
        this.userService = userService;
        this.postService = postService;
        this.projectService = projectService;
        this.interestsService = interestsService;
    }
    getAllPosts(userId, page, countPerPage) {
        return __awaiter(this, void 0, void 0, function* () {
            let post = yield this.postService.getAllPostsOfUser(userId, Number(page), Number(countPerPage));
            let goodIdea = yield this.postService.getAllGoodIdeaFromUser(userId);
            let postViewModel = [];
            let idsUser = [];
            post.map((data) => {
                if (idsUser.filter(x => x == data.idUser).length == 0)
                    idsUser.push(data.idUser);
            });
            let listUsers = yield this.userService.getAllUsersByArrOfIds(idsUser);
            post.map((value) => {
                const postAsGoodIdea = goodIdea.find(x => x.idPost === value._id);
                const user = listUsers.find(x => x._id === value.idUser);
                let userViewModel = new UserViewModel_1.default(user === null || user === void 0 ? void 0 : user._id, user === null || user === void 0 ? void 0 : user.name, user === null || user === void 0 ? void 0 : user.email, user === null || user === void 0 ? void 0 : user.password, user === null || user === void 0 ? void 0 : user.title, user === null || user === void 0 ? void 0 : user.photo, user === null || user === void 0 ? void 0 : user.bio, user === null || user === void 0 ? void 0 : user.emailValid, user === null || user === void 0 ? void 0 : user.created_at);
                const _postViewModel = new PostViewModel_1.default(value._id, value.idUser, value.countViews, value.title, value.description, value.photo, value.idProject, value.created_at, postAsGoodIdea != null, userViewModel, 0);
                postViewModel.push(_postViewModel);
            });
            return postViewModel;
        });
    }
    getPostById(idUser, _id) {
        return __awaiter(this, void 0, void 0, function* () {
            let post = yield this.postService.getById(_id);
            if (post) {
                let user = yield this.userService.findUserById(post === null || post === void 0 ? void 0 : post.idUser);
                let participant = yield this.projectService.getParticipantByProjectAndUser(post.idProject, idUser);
                if (!post.publicPost && !participant)
                    throw new Error("Usuário não tem permissão de visualizar essa publicação.");
                let numberGoodIdea = yield this.postService.getCountOfGoodIdeaByPost(_id);
                let goodIdea = yield this.postService.getAllGoodIdeaFromUser(idUser);
                const postAsGoodIdea = goodIdea.find(x => x.idPost === (post === null || post === void 0 ? void 0 : post._id));
                let userViewModel = new UserViewModel_1.default(user === null || user === void 0 ? void 0 : user._id, user === null || user === void 0 ? void 0 : user.name, user === null || user === void 0 ? void 0 : user.email, user === null || user === void 0 ? void 0 : user.password, user === null || user === void 0 ? void 0 : user.title, user === null || user === void 0 ? void 0 : user.photo, user === null || user === void 0 ? void 0 : user.bio, user === null || user === void 0 ? void 0 : user.emailValid, user === null || user === void 0 ? void 0 : user.created_at);
                const _postViewModel = new PostViewModel_1.default(post._id, post.idUser, post.countViews, post.title, post.description, post.photo, post.idProject, post.created_at, postAsGoodIdea != null, userViewModel, numberGoodIdea);
                return _postViewModel;
            }
            return post;
        });
    }
    setGoodIdea(userId, postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userPostExist = yield this.postService.userPostGoodIdeaAlreadyExist(userId, postId);
            yield this.postService.sumCountOfGoodIdeia(postId, userPostExist);
            yield this.userService.setPostAsGoodIdea(userId, postId, userPostExist);
        });
    }
    setPostCommentGoodIdea(userId, idPostComment) {
        return __awaiter(this, void 0, void 0, function* () {
            const userPostExist = yield this.postService.userCommentGoodIdeaAlreadyExist(userId, idPostComment);
            yield this.postService.sumCountOfCommentGoodIdeia(idPostComment, userPostExist != null);
            this.postService.setCommentAsGoodIdea(userId, idPostComment, userPostExist != null);
        });
    }
    setComments(userId, postId, text) {
        return __awaiter(this, void 0, void 0, function* () {
            let comment = yield this.postService.setComment(userId, postId, text);
            let user = yield this.userService.findUserById(comment.idUser);
            let userViewModel = new UserPostCommentViewModel_1.UserPostCommentViewModel(user === null || user === void 0 ? void 0 : user._id, user === null || user === void 0 ? void 0 : user.name, user === null || user === void 0 ? void 0 : user.photo);
            const postViewModel = new PostCommentsViewModel_1.PostCommentsViewModel(comment._id, comment.idUser, comment.idPost, comment.text, userViewModel, [], comment.created_at, false, 0);
            return postViewModel;
        });
    }
    setSubComment(userId, idPostComment, text) {
        return __awaiter(this, void 0, void 0, function* () {
            let comment = yield this.postService.setSubComment(userId, idPostComment, text);
            let user = yield this.userService.findUserById(comment.idUser);
            let userViewModel = new UserPostCommentViewModel_1.UserPostCommentViewModel(user === null || user === void 0 ? void 0 : user._id, user === null || user === void 0 ? void 0 : user.name, user === null || user === void 0 ? void 0 : user.photo);
            const commentCommented = new CommentCommentedViewModel_1.CommentCommentedViewModel(comment._id, comment.idUser, comment.idPostComment, comment.text, userViewModel, comment.created_at);
            return commentCommented;
        });
    }
    getAllComments(userId, postId) {
        return __awaiter(this, void 0, void 0, function* () {
            let comments = yield this.postService.getAllComments(postId);
            let idUserArr = [];
            let idSubCommentArr = [];
            comments.forEach((comment) => {
                if (idUserArr.filter(x => x == comment.idUser).length == 0)
                    idUserArr.push(comment.idUser);
                if (idSubCommentArr.filter(x => x == comment._id).length == 0)
                    idSubCommentArr.push(comment._id);
            });
            if (idUserArr.length > 0) {
                let listSubComments = yield this.postService.getAllSubCommentsByPostCommentArrIds(idSubCommentArr);
                listSubComments.forEach((comment) => {
                    if (idUserArr.filter(x => x == comment.idUser).length == 0)
                        idUserArr.push(comment.idUser);
                });
                let users = yield this.userService.getAllUsersByArrOfIds(idUserArr);
                let userGoodIdea = yield this.postService.getAllCommentGoodIdeaFromUser(userId);
                let commentsViewModel = [];
                comments.forEach((comment) => {
                    const user = users.find(x => x._id == comment.idUser);
                    if (user != undefined) {
                        const userViewModel = new UserPostCommentViewModel_1.UserPostCommentViewModel(user === null || user === void 0 ? void 0 : user._id, user === null || user === void 0 ? void 0 : user.name, user === null || user === void 0 ? void 0 : user.photo);
                        const subComments = [];
                        listSubComments.filter(x => x.idPostComment === comment._id).map((data) => {
                            const userSubComment = users.find(x => x._id == data.idUser);
                            if (userSubComment) {
                                const userSubCommentViewModel = new UserPostCommentViewModel_1.UserPostCommentViewModel(userSubComment === null || userSubComment === void 0 ? void 0 : userSubComment._id, userSubComment === null || userSubComment === void 0 ? void 0 : userSubComment.name, userSubComment === null || userSubComment === void 0 ? void 0 : userSubComment.photo);
                                const commentCommented = new CommentCommentedViewModel_1.CommentCommentedViewModel(data._id, data.idUser, data.idPostComment, data.text, userSubCommentViewModel, data.created_at);
                                subComments.push(commentCommented);
                            }
                        });
                        const goodIdea = userGoodIdea.find(x => x.idPostComment === comment._id);
                        const postViewModel = new PostCommentsViewModel_1.PostCommentsViewModel(comment._id, comment.idUser, comment.idPost, comment.text, userViewModel, subComments, comment.created_at, goodIdea != null, comment.countViews);
                        commentsViewModel.push(postViewModel);
                    }
                });
                return commentsViewModel;
            }
            return [];
        });
    }
    getProjectsByInterests(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const interests = yield this.interestsService.getInterestsByUser(userId);
            if (interests.length > 0) {
                const ids = [];
                interests.map((data) => {
                    ids.push(data._id);
                });
                const projects = yield this.projectService.getProjectsByInterests(ids);
                return projects;
            }
            return [];
        });
    }
    getProjectsMarketing(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const interests = yield this.interestsService.getInterestsByUser(userId);
            if (interests.length > 0) {
                const ids = [];
                interests.map((data) => {
                    ids.push(data._id);
                });
                const projects = yield this.projectService.getProjectsMarketing(ids);
                return projects;
            }
            return [];
        });
    }
    setDateOfLastPost(userId, date) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.postService.setPostAlreadySeenByDate(date, userId);
        });
    }
    deletePost(idUser, idPost) {
        return __awaiter(this, void 0, void 0, function* () {
            let post = yield this.postService.getById(idPost);
            if ((post === null || post === void 0 ? void 0 : post.idUser) != idUser)
                throw new Error("Usuário não tem permissão de deletar este post.");
            this.postService.deletePost(idPost);
        });
    }
}
exports.default = FeedAppService;
//# sourceMappingURL=FeedAppService.js.map