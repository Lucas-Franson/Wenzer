import { Db } from "mongodb";
import { Post } from "../../3-domain/entities/post";
import { PostComments } from "../../3-domain/entities/postComments";
import { UserPostGoodIdea } from "../../3-domain/entities/userPostGoodIdea";
import { IOrm } from "./Iorm";

export interface IPostRepository extends IOrm<Post> {
    getAllPostsOfUser(idUser: string, page: number, countPerPage: number): Promise<Post[]>;
    getNewPostToWebService(id: string, date: Date, dbo: Db): Promise<Post[]>;
    getUserPostGoodIdea(where: any): Promise<UserPostGoodIdea | null>;
    getListUserPostGoodIdeaWebService(where: any, dbo: Db): Promise<UserPostGoodIdea[]>;
    getListUserPostGoodIdea(where: any): Promise<UserPostGoodIdea[]>;
    setComment(postComment: any): Promise<void>;
    getCommentsByPostId(postId: string): Promise<PostComments[]>
}