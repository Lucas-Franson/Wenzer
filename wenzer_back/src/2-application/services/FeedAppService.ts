import { PostCommentsViewModel } from "../../1-presentation/viewmodel/PostCommentsViewModel";
import PostViewModel from "../../1-presentation/viewmodel/PostViewModel";
import { UserPostCommentViewModel } from "../../1-presentation/viewmodel/UserPostCommentViewModel";
import UserViewModel from "../../1-presentation/viewmodel/UserViewModel";
import { Post } from "../../3-domain/entities/post";
import { Project } from "../../3-domain/entities/project";
import IInterestService from "../../3-domain/Iservices/IInterestService";
import IPostService from "../../3-domain/Iservices/IPostService";
import IProjectService from "../../3-domain/Iservices/IProjectService";
import { IUserService } from "../../3-domain/Iservices/IUserService";

export default class FeedAppService {

    constructor(
        private readonly userService: IUserService, 
        private readonly postService: IPostService,
        private readonly projectService: IProjectService,
        private readonly interestsService: IInterestService
    ){

    }

    async getAllPosts(userId: string,  page: number, countPerPage: number): Promise<PostViewModel[]> {
        let post = await this.postService.getAllPostsOfUser(userId, page, countPerPage);
        let goodIdea = await this.postService.getAllGoodIdeaFromUser(userId);
        let postViewModel: PostViewModel[] = [];
        let user = await this.userService.findUserById(userId);
        let userViewModel = new UserViewModel(
            user?._id!,
            user?._name!,
            user?._email!,
            user?._password!,
            user?._title!,
            user?._photo!,
            user?._bio!,
            user?._emailValid!,
            user?._created_at!
        );

        post.map((value) => {
            const postAsGoodIdea = goodIdea.find(x => x._idPost === value._id);
            const _postViewModel = new PostViewModel(
                value._id,
                value._idUser,
                value._countViews,
                value._title,
                value._description,
                value._photo,
                value._idProject,
                value._created_at,
                postAsGoodIdea != null,
                userViewModel
            );
            postViewModel.push(_postViewModel);
        });

        return postViewModel;
    }

    async setGoodIdea(userId: string, postId: string): Promise<void> {
        const userPostExist = await this.postService.userPostGoodIdeaAlreadyExist(userId, postId);
        this.postService.sumCountOfGoodIdeia(postId, userPostExist);
        this.userService.setPostAsGoodIdea(userId, postId, userPostExist);
    }

    async setComments(userId: string, postId: string, text: string): Promise<void> {
        await this.postService.setComment(userId, postId, text);
    }

    async getAllComments(userId: string, postId: string): Promise<PostCommentsViewModel[]> {
        let comments = await this.postService.getAllComments(postId);
        let idUserArr: string[] = [];
        comments.forEach((comment) => {
            if (idUserArr.filter(x => x == comment._idUser).length == 0)
                idUserArr.push(comment._idUser);
        });
        if (idUserArr.length > 0) {
            let users = await this.userService.getAllUsersByArrOfIds(idUserArr);
            let commentsViewModel: PostCommentsViewModel[] = [];
            comments.forEach((comment) => {
                const user = users.find(x => x._id == comment._idUser);
                if (user != undefined) {
                    const userViewModel = new UserPostCommentViewModel(
                        user?._id!,
                        user?._name!,
                        user?._photo
                    );
                    const postViewModel = new PostCommentsViewModel(
                        comment._id,
                        comment._idUser,
                        comment._idPost,
                        userViewModel,
                        comment._createdAt
                    );
                    commentsViewModel.push(postViewModel);
                }
            });
            return commentsViewModel;
        }
        return [];
    }

    async getProjectsByInterests(userId: string): Promise<Project[]> {
        const interests = await this.interestsService.getInterestsByUser(userId);
        if (interests.length > 0) {
            const projects = await this.projectService.getProjectsByInterests(interests);
            return projects;
        }
        return [];
    }

    async getProjectsMarketing(userId: string): Promise<Project[]> {
        const interests = await this.interestsService.getInterestsByUser(userId);
        if (interests.length > 0) {
            const projects = await this.projectService.getProjectsMarketing(interests);
            return projects;
        }
        return [];
    }

}