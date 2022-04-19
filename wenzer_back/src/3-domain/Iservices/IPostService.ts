import { Db } from "mongodb";
import PostCreateViewModel from "../../1-presentation/viewmodel/PostCreateViewModel";
import { Post } from "../entities/post";
import { PostComments } from "../entities/postComments";
import { UserPostGoodIdea } from "../entities/userPostGoodIdea";

export default interface IPostService {
    create(userId: string, post: PostCreateViewModel): Promise<void>;
    getAllPostsOfUser(userId: string, page: number, countPerPage: number): Promise<Post[]>;
    getAllPostsByUserId(userId: string, page: number, countPerPage: number): Promise<Post[]>;
    getNewPostToWebService(id: string, dbo: Db): Promise<Post[] | null>;
    getAllGoodIdeaFromUserWebService(userId: string, dbo: Db): Promise<UserPostGoodIdea[]>;
    getAllGoodIdeaFromUser(userId: string): Promise<UserPostGoodIdea[]>;
    sumCountOfGoodIdeia(postId: string, userPostExist: boolean): Promise<void>;
    userPostGoodIdeaAlreadyExist(userId: string, postId: string): Promise<boolean>;
    setComment(userId: string, postId: string, text: string): Promise<void>;
    getAllComments(postId: string): Promise<PostComments[]>;
    getCommentsByPost(userId: string): Promise<{ _id: string, created_at: Date, name: string}[]>;
    getCommentsCommentedByUser(userId: string): Promise<{ _id: string, created_at: Date, name: string}[]>;
    setPostAlreadySeenByDate(date: Date, idUser: string): void;
}