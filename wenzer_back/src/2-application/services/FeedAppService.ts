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
        let post = await this.postService.getAllPostsOfUser(userId, Number(page), Number(countPerPage));
        let goodIdea = await this.postService.getAllGoodIdeaFromUser(userId);
        let postViewModel: PostViewModel[] = [];
        let user = await this.userService.findUserById(userId);
        let userViewModel = new UserViewModel(
            user?._id!,
            user?.name!,
            user?.email!,
            user?.password!,
            user?.title!,
            user?.photo!,
            user?.bio!,
            user?.emailValid!,
            user?.created_at!
        );

        post.map((value) => {
            const postAsGoodIdea = goodIdea.find(x => x.idPost === value._id);
            const _postViewModel = new PostViewModel(
                value._id,
                value.idUser,
                value.countViews,
                value.title,
                value.description,
                value.photo,
                value.idProject,
                value.created_at,
                postAsGoodIdea != null,
                userViewModel
            );
            postViewModel.push(_postViewModel);
        });

        return postViewModel;
    }

    async setGoodIdea(userId: string, postId: string): Promise<void> {
        const userPostExist = await this.postService.userPostGoodIdeaAlreadyExist(userId, postId);
        await this.postService.sumCountOfGoodIdeia(postId, userPostExist);
        await this.userService.setPostAsGoodIdea(userId, postId, userPostExist);
    }

    async setComments(userId: string, postId: string, text: string): Promise<void> {
        await this.postService.setComment(userId, postId, text);
    }

    async getAllComments(userId: string, postId: string): Promise<PostCommentsViewModel[]> {
        let comments = await this.postService.getAllComments(postId);
        let idUserArr: string[] = [];
        comments.forEach((comment) => {
            if (idUserArr.filter(x => x == comment.idUser).length == 0)
                idUserArr.push(comment.idUser);
        });
        if (idUserArr.length > 0) {
            let users = await this.userService.getAllUsersByArrOfIds(idUserArr);
            let commentsViewModel: PostCommentsViewModel[] = [];
            comments.forEach((comment) => {
                const user = users.find(x => x._id == comment.idUser);
                if (user != undefined) {
                    const userViewModel = new UserPostCommentViewModel(
                        user?._id!,
                        user?.name!,
                        user?.photo
                    );
                    const postViewModel = new PostCommentsViewModel(
                        comment._id,
                        comment.idUser,
                        comment.idPost,
                        comment.text,
                        userViewModel,
                        comment.created_at
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
            const ids: string[] = [];
            interests.map((data) => {
                ids.push(data._id);
            });
            const projects = await this.projectService.getProjectsByInterests(ids);
            return projects;
        }
        return [];
    }

    async getProjectsMarketing(userId: string): Promise<Project[]> {
        const interests = await this.interestsService.getInterestsByUser(userId);
        if (interests.length > 0) {
            const ids: string[] = [];
            interests.map((data) => {
                ids.push(data._id);
            });
            const projects = await this.projectService.getProjectsMarketing(ids);
            return projects;
        }
        return [];
    }

    async setDateOfLastPost(userId: string, date: Date): Promise<void> {
        await this.postService.setPostAlreadySeenByDate(date, userId);
    }

}