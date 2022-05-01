import { Db } from "mongodb";
import { CommentCommentedViewModel } from "../../1-presentation/viewmodel/CommentCommentedViewModel";
import { PostCommentsViewModel } from "../../1-presentation/viewmodel/PostCommentsViewModel";
import PostCreateViewModel from "../../1-presentation/viewmodel/PostCreateViewModel";
import { IPostRepository } from "../../4-infra/irepositories/IpostRepository";
import { CommentCommented } from "../entities/commentCommented";
import { Post } from "../entities/post";
import { PostAlreadySeen } from "../entities/postAlreadySeen";
import { PostComments } from "../entities/postComments";
import { UserCommentGoodIdea } from "../entities/userCommentGoodIdea";
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

    setCommentAsGoodIdea(userId: string, idPostComment: string, userPostExist: boolean): void {
        const commentGoodIdea = new UserCommentGoodIdea(
            userId,
            idPostComment
        );
        if (userPostExist) {
            this.postRepository.removeCommentAsGoodIdea(userId, idPostComment);
        } else {
            this.postRepository.setCommentAsGoodIdea(commentGoodIdea);
        }
    }

    async sumCountOfCommentGoodIdeia(idPostComment: string, userPostExist: boolean): Promise<void> {
        const comment: any = await this.postRepository.getCommentById(idPostComment);
        if (!comment) throw new Error("Post não encontrado.");

        if (userPostExist) {
            comment!.countViews--;
        } else {
            comment!.countViews++;
        }
        await this.postRepository.updateComment(comment!);
    }

    async userPostGoodIdeaAlreadyExist(userId: string, postId: string): Promise<boolean> {
        const where = { idUser: userId, idPost: postId };
        let userPost = await this.postRepository.getUserPostGoodIdea(where);
        return userPost != null;
    }

    async userCommentGoodIdeaAlreadyExist(userId: string, idPostComment: string): Promise<UserCommentGoodIdea> {
        let commentPost = await this.postRepository.getUserCommentGoodIdea(userId, idPostComment);
        return commentPost!;
    }

    async setComment(userId: string, postId: string, text: string): Promise<PostComments> {
        const postComment = new PostComments(
            userId,
            postId,
            text,
            0
        );
        await this.postRepository.setComment(postComment);
        return postComment;
    }

    async setSubComment(userId: string, idPostComment: string, text: string): Promise<CommentCommented> {
        const commentCommented = new CommentCommented(
            userId,
            idPostComment,
            text
        );
        await this.postRepository.setSubComment(commentCommented);
        return commentCommented;
    }

    async getAllComments(postId: string): Promise<PostComments[]> {
        return await this.postRepository.getCommentsByPostId(postId);
    }

    async getAllSubCommentsByPostCommentArrIds(idSubCommentArr: string[]): Promise<CommentCommented[]> {
        return await this.postRepository.getAllSubCommentsByPostCommentArrIds(idSubCommentArr);
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

    async getAllCommentGoodIdeaFromUser(userId: string): Promise<UserCommentGoodIdea[]> {
        return await this.postRepository.getAllCommentGoodIdeaFromUser(userId);
    }

    async search(userId: string, search: string): Promise<Post[]> {
        return await this.postRepository.search(userId, search);
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