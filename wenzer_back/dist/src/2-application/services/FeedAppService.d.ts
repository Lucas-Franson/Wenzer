import { CommentCommentedViewModel } from "../../1-presentation/viewmodel/CommentCommentedViewModel";
import { PostCommentsViewModel } from "../../1-presentation/viewmodel/PostCommentsViewModel";
import PostViewModel from "../../1-presentation/viewmodel/PostViewModel";
import { Project } from "../../3-domain/entities/project";
import IInterestService from "../../3-domain/Iservices/IInterestService";
import IPostService from "../../3-domain/Iservices/IPostService";
import IProjectService from "../../3-domain/Iservices/IProjectService";
import { IUserService } from "../../3-domain/Iservices/IUserService";
export default class FeedAppService {
    private readonly userService;
    private readonly postService;
    private readonly projectService;
    private readonly interestsService;
    constructor(userService: IUserService, postService: IPostService, projectService: IProjectService, interestsService: IInterestService);
    getAllPosts(userId: string, page: number, countPerPage: number): Promise<PostViewModel[]>;
    getPostById(idUser: string, _id: string): Promise<PostViewModel | null>;
    setGoodIdea(userId: string, postId: string): Promise<void>;
    setPostCommentGoodIdea(userId: string, idPostComment: string): Promise<void>;
    setComments(userId: string, postId: string, text: string): Promise<PostCommentsViewModel>;
    setSubComment(userId: string, idPostComment: string, text: string): Promise<CommentCommentedViewModel>;
    getAllComments(userId: string, postId: string): Promise<PostCommentsViewModel[]>;
    getProjectsByInterests(userId: string): Promise<Project[]>;
    getProjectsMarketing(userId: string): Promise<Project[]>;
    setDateOfLastPost(userId: string, date: Date): Promise<void>;
    deletePost(idUser: string, idPost: string): Promise<void>;
}
