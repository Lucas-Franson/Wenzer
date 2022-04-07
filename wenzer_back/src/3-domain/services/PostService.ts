import { Db } from "mongodb";
import PostCreateViewModel from "../../1-presentation/viewmodel/PostCreateViewModel";
import { IPostRepository } from "../../4-infra/irepositories/IpostRepository";
import { Post } from "../entities/post";
import { PostComments } from "../entities/postComments";
import IPostService from "../Iservices/IPostService";


export default class PostService implements IPostService {

    constructor(private readonly postRepository: IPostRepository) {
        
    }

    async create(userId: string, post: PostCreateViewModel) {
        if (post != null) {
            const objPost = new Post(
                userId,
                0,
                post.title,
                post.description,
                post.photo,
                post.idProject,
            );
            await this.postRepository.insert(objPost);
        }
    }

    async getAllPostsOfUser(userId: string, page: number, countPerPage: number) {
        return await this.postRepository.getAllPostsOfUser(userId, page, countPerPage);
    }

    async getAllGoodIdeaFromUser(userId: string) {
        const where = { idUser: userId };
        let userPost = await this.postRepository.getListUserPostGoodIdea(where);
        return userPost;
    }

    async sumCountOfGoodIdeia(postId: string, userPostExist: boolean) {
        const post: any = await this.postRepository.getById(postId);
        if (!post) throw new Error("Post não encontrado.");

        if (userPostExist) {
            post!.countViews--;
        } else {
            post!.countViews++;
        }
        await this.postRepository.update(post!);
    }

    async userPostGoodIdeaAlreadyExist(userId: string, postId: string): Promise<boolean> {
        const where = { idUser: userId, idPost: postId };
        let userPost = await this.postRepository.getUserPostGoodIdea(where);
        return userPost != null;
    }

    async setComment(userId: string, postId: string, text: string): Promise<void> {
        const postComment = new PostComments(
            userId,
            postId,
            text
        );
        await this.postRepository.setComment(postComment);
    }

    async getAllComments(postId: string): Promise<PostComments[]> {
        return await this.postRepository.getCommentsByPostId(postId);
    }

    // WEB SERVICE
    async getNewPostToWebService(id: string, date: Date, dbo: Db) {
        return await this.postRepository.getNewPostToWebService(id, date, dbo);
    }

    async getAllGoodIdeaFromUserWebService(userId: string, dbo: Db) {
        const where = { idUser: userId };
        let userPost = await this.postRepository.getListUserPostGoodIdeaWebService(where, dbo);
        return userPost;
    }

}