import PostCreateViewModel from "../../1-presentation/viewmodel/PostCreateViewModel";
import { IPostRepository } from "../../4-infra/irepositories/IpostRepository";
import { PostComments } from "../entities/postComments";
import IPostService from "../Iservices/IPostService";


export default class PostService implements IPostService {

    constructor(private readonly postRepository: IPostRepository) {
        
    }

    async create(userId: string, post: PostCreateViewModel) {
        const postObj = this.postRepository.convertToPostObject(post);
        
        if (postObj != null) {
            postObj._idUser = userId;
            postObj._countViews = 0;
            await this.postRepository.insert(postObj);
        }
    }

    async getAllPostsOfUser(userId: string, page: number, countPerPage: number) {
        return await this.postRepository.getAllPostsOfUser(userId, page, countPerPage);
    }

    async sumCountOfGoodIdeia(postId: string, userPostExist: boolean) {
        const post: any = await this.postRepository.getById(postId);
        if (!post) throw new Error("Post não encontrado.");
        let postObj = this.postRepository.convertToPostObject(post);
        if (userPostExist) {
            postObj!._countViews--;
        } else {
            postObj!._countViews++;
        }
        await this.postRepository.update(postObj!);
    }

    async userPostGoodIdeaAlreadyExist(userId: string, postId: string): Promise<boolean> {
        const where = `idUser = ${userId.toSql()} and idPost = ${postId.toSql()}`;
        let userPost = await this.postRepository.getUserPostGoodIdea(where);
        return userPost != null;
    }

    async setComment(userId: string, postId: string, text: string): Promise<void> {
        await this.postRepository.setComment(userId, postId, text);
    }

    async getAllComments(postId: string): Promise<PostComments[]> {
        return await this.postRepository.getCommentsByPostId(postId);
    }

}