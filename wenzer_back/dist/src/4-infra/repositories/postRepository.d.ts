import { Post } from "../../3-domain/entities/post";
import { IPostRepository } from "../irepositories/IpostRepository";
import { UserPostGoodIdea } from "../../3-domain/entities/userPostGoodIdea";
import { PostComments } from "../../3-domain/entities/postComments";
import { Db } from "mongodb";
import { Orm } from "./orm";
import { PostAlreadySeen } from "../../3-domain/entities/postAlreadySeen";
import { CommentCommented } from "../../3-domain/entities/commentCommented";
import { UserCommentGoodIdea } from "../../3-domain/entities/userCommentGoodIdea";
export declare class PostRepository extends Orm<Post> implements IPostRepository {
    getAllPostsOfUser(idUser: string, page: number, countPerPage: number): Promise<Post[]>;
    getAllPostsByUserId(userId: string, page: number, countPerPage: number): Promise<Post[]>;
    getUserPostGoodIdea(where: any): Promise<UserPostGoodIdea | null>;
    getListUserPostGoodIdea(whereClause: any): Promise<UserPostGoodIdea[]>;
    getUserCommentGoodIdea(userId: string, idPostComment: string): Promise<UserCommentGoodIdea | null>;
    setComment(postComments: any): Promise<void>;
    setSubComment(commentCommented: any): Promise<void>;
    getCommentsByPostId(postId: string): Promise<PostComments[]>;
    getAllSubCommentsByPostCommentArrIds(idSubCommentArr: string[]): Promise<CommentCommented[]>;
    getCommentsByPost(userId: string): Promise<{
        _id: string;
        created_at: Date;
        name: string;
    }[]>;
    getCommentsCommentedByUser(userId: string): Promise<{
        _id: string;
        idPost: string;
        created_at: Date;
        name: string;
    }[]>;
    setPostAlreadySeen(postAlreadySeen: any): void;
    updatePostAlreadySeen(postAlreadySeen: PostAlreadySeen): void;
    getDateLastPostSeen(id: string): Promise<PostAlreadySeen>;
    getPostsByProject(idProject: string): Promise<Post[]>;
    deleteListPost(idsPost: string[]): void;
    getCommentById(idPostComment: string): Promise<PostComments>;
    updateComment(comment: PostComments): void;
    removeCommentAsGoodIdea(userId: string, idPostComment: string): void;
    setCommentAsGoodIdea(commentGoodIdea: any): void;
    getAllCommentGoodIdeaFromUser(userId: string): Promise<UserCommentGoodIdea[]>;
    search(userId: string, search: string): Promise<Post[]>;
    getCountOfGoodIdeaByProject(_id: string): Promise<{
        idPost: number;
    }[]>;
    getListUserPostGoodIdeaWebService(whereClause: any, dbo: Db): Promise<UserPostGoodIdea[]>;
    getNewPostToWebService(id: string, alreadySeen: PostAlreadySeen, dbo: Db): Promise<Post[]>;
    getCommentsByPostWebService(dbo: Db, idUser: string, idNotifications: string[]): Promise<number>;
    getCommentsCommentedByUserWebService(dbo: Db, idUser: string, idNotifications: string[]): Promise<number>;
    getDateLastPostSeenWebService(id: string, dbo: Db): Promise<PostAlreadySeen>;
    handlePostCommentsArrayResult(result: PostComments[]): any[];
    handleArrayResult(result: Post[]): any[];
    handleResult(results: Post): Post | null;
    handleUserPostGoodIdeaArrayResult(result: UserPostGoodIdea[]): any[];
    handleUserPostGoodIdeaResult(results: UserPostGoodIdea): UserPostGoodIdea | null;
}
