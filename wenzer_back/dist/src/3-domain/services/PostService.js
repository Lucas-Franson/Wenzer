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
const commentCommented_1 = require("../entities/commentCommented");
const post_1 = require("../entities/post");
const postAlreadySeen_1 = require("../entities/postAlreadySeen");
const postComments_1 = require("../entities/postComments");
const userCommentGoodIdea_1 = require("../entities/userCommentGoodIdea");
class PostService {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }
    getById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.postRepository.getById(_id);
        });
    }
    create(userId, post) {
        return __awaiter(this, void 0, void 0, function* () {
            if (post != null) {
                const objPost = new post_1.Post(userId, 0, post.title, post.description, post.photo, post.idProject, post.publicPost == "true");
                yield this.postRepository.insert(objPost);
            }
        });
    }
    getAllPostsOfUser(userId, page, countPerPage) {
        return __awaiter(this, void 0, void 0, function* () {
            let posts = yield this.postRepository.getAllPostsOfUser(userId, page, countPerPage);
            yield this.setPostAlreadySeen(posts, userId);
            return posts;
        });
    }
    getAllPostsByUserId(userId, page, countPerPage) {
        return __awaiter(this, void 0, void 0, function* () {
            let posts = yield this.postRepository.getAllPostsByUserId(userId, page, countPerPage);
            yield this.setPostAlreadySeen(posts, userId);
            return posts;
        });
    }
    setPostAlreadySeen(posts, idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            let datePostAlreadySeen = yield this.postRepository.getDateLastPostSeen(idUser);
            if (posts.length > 0) {
                if (!datePostAlreadySeen) {
                    let obj = new postAlreadySeen_1.PostAlreadySeen(idUser, posts[0].created_at);
                    this.postRepository.setPostAlreadySeen(obj);
                }
                else {
                    let postNotSeenYet = posts.filter(x => x.created_at > datePostAlreadySeen.dateLastPost);
                    if (postNotSeenYet.length > 0) {
                        datePostAlreadySeen.dateLastPost = postNotSeenYet[0].created_at;
                        this.postRepository.updatePostAlreadySeen(datePostAlreadySeen);
                    }
                }
            }
        });
    }
    setPostAlreadySeenByDate(date, idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            let datePostAlreadySeen = yield this.postRepository.getDateLastPostSeen(idUser);
            if (date) {
                if (!datePostAlreadySeen) {
                    let obj = new postAlreadySeen_1.PostAlreadySeen(idUser, date);
                    this.postRepository.setPostAlreadySeen(obj);
                }
                else if (datePostAlreadySeen && datePostAlreadySeen.dateLastPost < date) {
                    datePostAlreadySeen.dateLastPost = date;
                    this.postRepository.updatePostAlreadySeen(datePostAlreadySeen);
                }
            }
        });
    }
    getAllGoodIdeaFromUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const where = { idUser: userId };
            let userPost = yield this.postRepository.getListUserPostGoodIdea(where);
            return userPost;
        });
    }
    sumCountOfGoodIdeia(postId, userPostExist) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield this.postRepository.getById(postId);
            if (!post)
                throw new Error("Post não encontrado.");
            if (userPostExist) {
                post.countViews--;
            }
            else {
                post.countViews++;
            }
            yield this.postRepository.update(post);
        });
    }
    setCommentAsGoodIdea(userId, idPostComment, userPostExist) {
        const commentGoodIdea = new userCommentGoodIdea_1.UserCommentGoodIdea(userId, idPostComment);
        if (userPostExist) {
            this.postRepository.removeCommentAsGoodIdea(userId, idPostComment);
        }
        else {
            this.postRepository.setCommentAsGoodIdea(commentGoodIdea);
        }
    }
    sumCountOfCommentGoodIdeia(idPostComment, userPostExist) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield this.postRepository.getCommentById(idPostComment);
            if (!comment)
                throw new Error("Post não encontrado.");
            if (userPostExist) {
                comment.countViews--;
            }
            else {
                comment.countViews++;
            }
            yield this.postRepository.updateComment(comment);
        });
    }
    userPostGoodIdeaAlreadyExist(userId, postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const where = { idUser: userId, idPost: postId };
            let userPost = yield this.postRepository.getUserPostGoodIdea(where);
            return userPost != null;
        });
    }
    userCommentGoodIdeaAlreadyExist(userId, idPostComment) {
        return __awaiter(this, void 0, void 0, function* () {
            let commentPost = yield this.postRepository.getUserCommentGoodIdea(userId, idPostComment);
            return commentPost;
        });
    }
    setComment(userId, postId, text) {
        return __awaiter(this, void 0, void 0, function* () {
            const postComment = new postComments_1.PostComments(userId, postId, text, 0);
            yield this.postRepository.setComment(postComment);
            return postComment;
        });
    }
    setSubComment(userId, idPostComment, text) {
        return __awaiter(this, void 0, void 0, function* () {
            const commentCommented = new commentCommented_1.CommentCommented(userId, idPostComment, text);
            yield this.postRepository.setSubComment(commentCommented);
            return commentCommented;
        });
    }
    getAllComments(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.postRepository.getCommentsByPostId(postId);
        });
    }
    getAllSubCommentsByPostCommentArrIds(idSubCommentArr) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.postRepository.getAllSubCommentsByPostCommentArrIds(idSubCommentArr);
        });
    }
    getCommentsByPost(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.postRepository.getCommentsByPost(userId);
        });
    }
    getCommentsCommentedByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.postRepository.getCommentsCommentedByUser(userId);
        });
    }
    deletePost(idPost) {
        this.postRepository.deleteListPost([idPost]);
    }
    getAllCommentGoodIdeaFromUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.postRepository.getAllCommentGoodIdeaFromUser(userId);
        });
    }
    search(userId, search) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.postRepository.search(userId, search);
        });
    }
    getCountOfGoodIdeaByPost(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let count = yield this.postRepository.getCountOfGoodIdeaByProject(_id);
            return count[0].idPost;
        });
    }
    // WEB SERVICE
    getNewPostToWebService(id, dbo) {
        return __awaiter(this, void 0, void 0, function* () {
            let alreadySeen = yield this.postRepository.getDateLastPostSeenWebService(id, dbo);
            if (alreadySeen) {
                return yield this.postRepository.getNewPostToWebService(id, alreadySeen, dbo);
            }
            return null;
        });
    }
    getAllGoodIdeaFromUserWebService(userId, dbo) {
        return __awaiter(this, void 0, void 0, function* () {
            const where = { idUser: userId };
            let userPost = yield this.postRepository.getListUserPostGoodIdeaWebService(where, dbo);
            return userPost;
        });
    }
}
exports.default = PostService;
//# sourceMappingURL=PostService.js.map