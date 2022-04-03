import PostCreateViewModel from "../../1-presentation/viewmodel/PostCreateViewModel";
import { Post } from "../entities/post";
import { PostComments } from "../entities/postComments";
import { UserPostGoodIdea } from "../entities/userPostGoodIdea";

export default interface IPostService {
    create(userId: string, post: PostCreateViewModel): Promise<void>;
    getAllPostsOfUser(userId: string, page: number, countPerPage: number): Promise<Post[]>;
    getNewPostToWebService(id: string, date: Date): Promise<Post[]>;
    getAllGoodIdeaFromUser(userId: string): Promise<UserPostGoodIdea[]>;
    sumCountOfGoodIdeia(postId: string, userPostExist: boolean): Promise<void>;
    userPostGoodIdeaAlreadyExist(userId: string, postId: string): Promise<boolean>;
    setComment(userId: string, postId: string, text: string): Promise<void>;
    getAllComments(postId: string): Promise<PostComments[]>;
}