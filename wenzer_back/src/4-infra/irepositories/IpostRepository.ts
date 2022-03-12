import { Post } from "../../3-domain/entities/post";
import { PostComments } from "../../3-domain/entities/postComments";
import { UserPostGoodIdea } from "../../3-domain/entities/userPostGoodIdea";
import { IOrm } from "./Iorm";

export interface IPostRepository extends IOrm<Post> {
    getAllPostsOfUser(idUser: string, page: number, countPerPage: number): Promise<Post[]>;
    getUserPostGoodIdea(where: string): Promise<UserPostGoodIdea | null>;
    getListUserPostGoodIdea(where: string): Promise<UserPostGoodIdea[]>;
    setComment(userId: string, postId: string, text: string): Promise<void>;
    getCommentsByPostId(postId: string): Promise<PostComments[]>
    convertToPostObject(post: any): Post | null;
}