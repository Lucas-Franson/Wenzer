"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PostService {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }
    getAllPostsOfUser(userId, page, countPerPage) {
        return this.postRepository.getAllPostsOfUser(userId, page, countPerPage);
    }
}
exports.default = PostService;
//# sourceMappingURL=PostService.js.map