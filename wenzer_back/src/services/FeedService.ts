import { Post } from "../domain/post";
import { PostRepository } from "../repositories/post/postRepository";
import { UserRepository } from "../repositories/user/userRepository";

module.exports = class FeedService {

    _userRepository: UserRepository = new UserRepository();
    _postRepository: PostRepository = new PostRepository();

    async getAllPosts(userId: string,  page: number, countPerPage: number): Promise<Post[]> {
        return this._postRepository.getAllPostsOfUser(userId, page, countPerPage);
    }

}