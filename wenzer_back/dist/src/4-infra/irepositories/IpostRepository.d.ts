import { Db } from "mongodb";
import { CommentCommented } from "../../3-domain/entities/commentCommented";
import { Post } from "../../3-domain/entities/post";
import { PostAlreadySeen } from "../../3-domain/entities/postAlreadySeen";
import { PostComments } from "../../3-domain/entities/postComments";
import { UserCommentGoodIdea } from "../../3-domain/entities/userCommentGoodIdea";
import { UserPostGoodIdea } from "../../3-domain/entities/userPostGoodIdea";
import { IOrm } from "./Iorm";
export interface IPostRepository extends IOrm<Post> {
    getAllPostsOfUser(idUser: string, page: number, countPerPage: number): Promise<Post[]>;
    getNewPostToWebService(id: string, alreadySeen: PostAlreadySeen, dbo: Db): Promise<Post[]>;
    getDateLastPostSeenWebService(id: string, dbo: Db): Promise<PostAlreadySeen>;
    getDateLastPostSeen(id: string): Promise<PostAlreadySeen>;
    getAllPostsByUserId(userId: string, page: number, countPerPage: number): Promise<Post[]>;
    getUserPostGoodIdea(where: any): Promise<UserPostGoodIdea | null>;
    getUserCommentGoodIdea(userId: string, idPostComment: string): Promise<UserCommentGoodIdea | null>;
    getListUserPostGoodIdeaWebService(where: any, dbo: Db): Promise<UserPostGoodIdea[]>;
    getListUserPostGoodIdea(where: any): Promise<UserPostGoodIdea[]>;
    setComment(postComment: any): Promise<void>;
    setSubComment(commentCommented: any): Promise<void>;
    setPostAlreadySeen(postAlreadySeen: PostAlreadySeen): void;
    updatePostAlreadySeen(postAlreadySeen: PostAlreadySeen): void;
    getCommentsByPostId(postId: string): Promise<PostComments[]>;
    getAllSubCommentsByPostCommentArrIds(idSubCommentArr: string[]): Promise<CommentCommented[]>;
    getCommentsByPost(userId: string): Promise<{
        _id: string;
        created_at: Date;
        name: string;
    }[]>;
    getCommentsByPostWebService(dbo: Db, idUser: string, idNotifications: string[]): Promise<number>;
    getCommentsCommentedByUserWebService(dbo: Db, idUser: string, idNotifications: string[]): Promise<number>;
    getCommentsCommentedByUser(userId: string): Promise<{
        _id: string;
        idPost: string;
        created_at: Date;
        name: string;
    }[]>;
    getPostsByProject(idProject: string): Promise<Post[]>;
    deleteListPost(idsPost: string[]): void;
    getCommentById(idPostComment: string): Promise<PostComments>;
    updateComment(comment: PostComments): void;
    removeCommentAsGoodIdea(userId: string, idPostComment: string): void;
    setCommentAsGoodIdea(commentGoodIdea: UserCommentGoodIdea): void;
    getAllCommentGoodIdeaFromUser(userId: string): Promise<UserCommentGoodIdea[]>;
    search(userId: string, search: string): Promise<Post[]>;
    getCountOfGoodIdeaByProject(_id: string): Promise<{
        idPost: number;
    }[]>;
}
