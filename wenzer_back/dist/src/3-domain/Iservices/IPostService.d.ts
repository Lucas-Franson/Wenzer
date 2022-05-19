import { Db } from "mongodb";
import PostCreateViewModel from "../../1-presentation/viewmodel/PostCreateViewModel";
import { CommentCommented } from "../entities/commentCommented";
import { Post } from "../entities/post";
import { PostComments } from "../entities/postComments";
import { UserCommentGoodIdea } from "../entities/userCommentGoodIdea";
import { UserPostGoodIdea } from "../entities/userPostGoodIdea";
export default interface IPostService {
    getById(_id: string): Promise<Post | null>;
    create(userId: string, post: PostCreateViewModel): Promise<void>;
    getAllPostsOfUser(userId: string, page: number, countPerPage: number): Promise<Post[]>;
    getAllPostsByUserId(userId: string, page: number, countPerPage: number): Promise<Post[]>;
    getNewPostToWebService(id: string, dbo: Db): Promise<Post[] | null>;
    getAllGoodIdeaFromUserWebService(userId: string, dbo: Db): Promise<UserPostGoodIdea[]>;
    getAllGoodIdeaFromUser(userId: string): Promise<UserPostGoodIdea[]>;
    sumCountOfGoodIdeia(postId: string, userPostExist: boolean): Promise<void>;
    sumCountOfCommentGoodIdeia(idPostComment: string, userPostExist: boolean): Promise<void>;
    setCommentAsGoodIdea(userId: string, idPostComment: string, userPostExist: boolean): void;
    userPostGoodIdeaAlreadyExist(userId: string, postId: string): Promise<boolean>;
    userCommentGoodIdeaAlreadyExist(userId: string, idPostComment: string): Promise<UserCommentGoodIdea>;
    setComment(userId: string, postId: string, text: string): Promise<PostComments>;
    setSubComment(userId: string, idPostComment: string, text: string): Promise<CommentCommented>;
    getAllComments(postId: string): Promise<PostComments[]>;
    getAllSubCommentsByPostCommentArrIds(idSubCommentArr: string[]): Promise<CommentCommented[]>;
    getCommentsByPost(userId: string): Promise<{
        _id: string;
        created_at: Date;
        name: string;
    }[]>;
    getCommentsCommentedByUser(userId: string): Promise<{
        _id: string;
        created_at: Date;
        name: string;
    }[]>;
    setPostAlreadySeenByDate(date: Date, idUser: string): void;
    deletePost(idPost: string): void;
    getAllCommentGoodIdeaFromUser(userId: string): Promise<UserCommentGoodIdea[]>;
    search(userId: string, search: string): Promise<Post[]>;
    getCountOfGoodIdeaByPost(_id: string): Promise<number>;
}
