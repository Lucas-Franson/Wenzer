import { Db } from "mongodb";
import PostCreateViewModel from "../../1-presentation/viewmodel/PostCreateViewModel";
import { IPostRepository } from "../../4-infra/irepositories/IpostRepository";
import { Post } from "../entities/post";
import { PostAlreadySeen } from "../entities/postAlreadySeen";
import { PostComments } from "../entities/postComments";
import IPostService from "../Iservices/IPostService";


export default class PostService implements IPostService {

    constructor(private readonly postRepository: IPostRepository) {
        
    }

    async getById(_id: string): Promise<Post | null> {
        return await this.postRepository.getById(_id);
    }

    async create(userId: string, post: PostCreateViewModel) {
        if (post != null) {
            let photo = "";
            if (post.photo) {
                const reader = Buffer.from(new Uint8Array(post.photo.data));
                photo = `data:${post.photo.mimetype};base64, ${reader.toString("base64")}`;
            }

            const objPost = new Post(
                userId,
                0,
                post.title,
                post.description,
                photo,
                post.idProject,
                post.publicPost == "true"
            );
            await this.postRepository.insert(objPost);
        }
    }

    async getAllPostsOfUser(userId: string, page: number, countPerPage: number) {
        let posts = await this.postRepository.getAllPostsOfUser(userId, page, countPerPage);
        await this.setPostAlreadySeen(posts, userId);
        return posts;
    }

    async getAllPostsByUserId(userId: string, page: number, countPerPage: number) {
        let posts = await this.postRepository.getAllPostsByUserId(userId, page, countPerPage);
        await this.setPostAlreadySeen(posts, userId);
        return posts;
    }

    async setPostAlreadySeen(posts: Post[], idUser: string) {
        let datePostAlreadySeen = await this.postRepository.getDateLastPostSeen(idUser);
        if (posts.length > 0) {
            if (!datePostAlreadySeen) {
                let obj = new PostAlreadySeen(
                    idUser,
                    posts[0].created_at
                );
                this.postRepository.setPostAlreadySeen(obj);
            } else {
                let postNotSeenYet = posts.filter(x => x.created_at > datePostAlreadySeen.dateLastPost);
                
                if (postNotSeenYet.length > 0) {
                    datePostAlreadySeen.dateLastPost = postNotSeenYet[0].created_at;
                    this.postRepository.updatePostAlreadySeen(datePostAlreadySeen);
                }
            }
        }
    }

    async setPostAlreadySeenByDate(date: Date, idUser: string) {
        let datePostAlreadySeen = await this.postRepository.getDateLastPostSeen(idUser);
        if (date) {
            if (!datePostAlreadySeen) {
                let obj = new PostAlreadySeen(
                    idUser,
                    date
                );
                this.postRepository.setPostAlreadySeen(obj);
            } else if(datePostAlreadySeen && datePostAlreadySeen.dateLastPost < date) {
                datePostAlreadySeen.dateLastPost = date;
                this.postRepository.updatePostAlreadySeen(datePostAlreadySeen);
            }
        }
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

    async getCommentsByPost(userId: string): Promise<{ _id: string; created_at: Date; name: string; }[]> {
        return this.postRepository.getCommentsByPost(userId);
    }
    
    async getCommentsCommentedByUser(userId: string): Promise<{ _id: string; created_at: Date; name: string; }[]> {
        return this.postRepository.getCommentsCommentedByUser(userId);
    }

    deletePost(idPost: string): void {
        this.postRepository.deleteListPost([idPost]);
    }

    // WEB SERVICE
    async getNewPostToWebService(id: string, dbo: Db) {
        let alreadySeen = await this.postRepository.getDateLastPostSeenWebService(id, dbo);
        if (alreadySeen) {
            return await this.postRepository.getNewPostToWebService(id, alreadySeen, dbo);
        }
        return null;
    }

    async getAllGoodIdeaFromUserWebService(userId: string, dbo: Db) {
        const where = { idUser: userId };
        let userPost = await this.postRepository.getListUserPostGoodIdeaWebService(where, dbo);
        return userPost;
    }

}