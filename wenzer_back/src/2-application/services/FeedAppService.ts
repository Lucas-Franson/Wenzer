import { Post } from "../../3-domain/entities/post";
import { PostRepository } from "../../4-infra/repositories/postRepository";
import UserRepository from "../../4-infra/repositories/userRepository";

module.exports = class FeedAppService {

    _userRepository: UserRepository = new UserRepository();
    _postRepository: PostRepository = new PostRepository();

    async getAllPosts(userId: string,  page: number, countPerPage: number): Promise<Post[]> {
        return this._postRepository.getAllPostsOfUser(userId, page, countPerPage);
    }

}