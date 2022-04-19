import { Db } from "mongodb";
import { Post } from "../../3-domain/entities/post";
import { PostAlreadySeen } from "../../3-domain/entities/postAlreadySeen";
import { PostComments } from "../../3-domain/entities/postComments";
import { UserPostGoodIdea } from "../../3-domain/entities/userPostGoodIdea";
import { IOrm } from "./Iorm";

export interface IPostRepository extends IOrm<Post> {
    getAllPostsOfUser(idUser: string, page: number, countPerPage: number): Promise<Post[]>;
    getNewPostToWebService(id: string, alreadySeen: PostAlreadySeen, dbo: Db): Promise<Post[]>;
    getDateLastPostSeenWebService(id: string, dbo: Db): Promise<PostAlreadySeen>;
    getDateLastPostSeen(id: string): Promise<PostAlreadySeen>;
    getAllPostsByUserId(userId: string, page: number, countPerPage: number): Promise<Post[]>;
    getUserPostGoodIdea(where: any): Promise<UserPostGoodIdea | null>;
    getListUserPostGoodIdeaWebService(where: any, dbo: Db): Promise<UserPostGoodIdea[]>;
    getListUserPostGoodIdea(where: any): Promise<UserPostGoodIdea[]>;
    setComment(postComment: any): Promise<void>;
    setPostAlreadySeen(postAlreadySeen: PostAlreadySeen): void;
    updatePostAlreadySeen(postAlreadySeen: PostAlreadySeen): void;
    getCommentsByPostId(postId: string): Promise<PostComments[]>;
    getCommentsByPost(userId: string): Promise<{ _id: string; created_at: Date; name: string; }[]>;
    getCommentsByPostWebService(dbo: Db, idUser: string, idNotifications: string[]): Promise<number>;
    getCommentsCommentedByUserWebService(dbo: Db, idUser: string, idNotifications: string[]): Promise<number>;
    getCommentsCommentedByUser(userId: string): Promise<{ _id: string; created_at: Date; name: string; }[]>;
}