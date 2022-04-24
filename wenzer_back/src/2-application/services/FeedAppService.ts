import { CommentCommentedViewModel } from "../../1-presentation/viewmodel/CommentCommentedViewModel";
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
        let idsUser: string[] = [];

        post.map((data) => {
            if (idsUser.filter(x => x == data.idUser).length == 0) idsUser.push(data.idUser);
        });

        let listUsers = await this.userService.getAllUsersByArrOfIds(idsUser);

        post.map((value) => {
            const postAsGoodIdea = goodIdea.find(x => x.idPost === value._id);
            const user = listUsers.find(x => x._id === value.idUser);

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

    async getPostById(idUser: string, _id: string) {
        let post = await this.postService.getById(_id);
        if (post) {
            let user = await this.userService.findUserById(post?.idUser);
            let goodIdea = await this.postService.getAllGoodIdeaFromUser(idUser);
            const postAsGoodIdea = goodIdea.find(x => x.idPost === post?._id);

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

            const _postViewModel = new PostViewModel(
                post._id,
                post.idUser,
                post.countViews,
                post.title,
                post.description,
                post.photo,
                post.idProject,
                post.created_at,
                postAsGoodIdea != null,
                userViewModel
            );

            return _postViewModel;
        }
        return post;
    }

    async setGoodIdea(userId: string, postId: string): Promise<void> {
        const userPostExist = await this.postService.userPostGoodIdeaAlreadyExist(userId, postId);
        await this.postService.sumCountOfGoodIdeia(postId, userPostExist);
        await this.userService.setPostAsGoodIdea(userId, postId, userPostExist);
    }

    async setPostCommentGoodIdea(userId: string, idPostComment: string): Promise<void> {
        const userPostExist = await this.postService.userCommentGoodIdeaAlreadyExist(userId, idPostComment);
        await this.postService.sumCountOfCommentGoodIdeia(idPostComment, userPostExist != null);
        this.postService.setCommentAsGoodIdea(userId, idPostComment, userPostExist != null);
    }

    async setComments(userId: string, postId: string, text: string): Promise<PostCommentsViewModel> {
        let comment = await this.postService.setComment(userId, postId, text);
        let user = await this.userService.findUserById(comment.idUser);

        let userViewModel = new UserPostCommentViewModel(
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
            [],
            comment.created_at,
            false,
            0
        );

        return postViewModel;
    }

    async setSubComment(userId: string, idPostComment: string, text: string): Promise<CommentCommentedViewModel> {
        let comment = await this.postService.setSubComment(userId, idPostComment, text);

        let user = await this.userService.findUserById(comment.idUser);

        let userViewModel = new UserPostCommentViewModel(
            user?._id!,
            user?.name!,
            user?.photo
        );

        const commentCommented = new CommentCommentedViewModel(
            comment._id,
            comment.idUser,
            comment.idPostComment,
            comment.text,
            userViewModel,
            comment.created_at
        );

        return commentCommented;
    }

    async getAllComments(userId: string, postId: string): Promise<PostCommentsViewModel[]> {
        let comments = await this.postService.getAllComments(postId);
        let idUserArr: string[] = [];
        let idSubCommentArr: string[] = [];

        comments.forEach((comment) => {
            if (idUserArr.filter(x => x == comment.idUser).length == 0)
                idUserArr.push(comment.idUser);
            if (idSubCommentArr.filter(x => x == comment._id).length == 0)
                idSubCommentArr.push(comment._id);
        });

        if (idUserArr.length > 0) {
            let listSubComments = await this.postService.getAllSubCommentsByPostCommentArrIds(idSubCommentArr);
            listSubComments.forEach((comment) => {
                if (idUserArr.filter(x => x == comment.idUser).length == 0)
                    idUserArr.push(comment.idUser);
            });

            let users = await this.userService.getAllUsersByArrOfIds(idUserArr);
            let userGoodIdea = await this.postService.getAllCommentGoodIdeaFromUser(userId);

            let commentsViewModel: PostCommentsViewModel[] = [];
            comments.forEach((comment) => {
                const user = users.find(x => x._id == comment.idUser);
                if (user != undefined) {
                    const userViewModel = new UserPostCommentViewModel(
                        user?._id!,
                        user?.name!,
                        user?.photo
                    );
                    const subComments: CommentCommentedViewModel[] = [];
                    listSubComments.filter(x => x.idPostComment === comment._id).map((data) => {
                        const userSubComment = users.find(x => x._id == data.idUser);
                        if (userSubComment) {
                            const userSubCommentViewModel = new UserPostCommentViewModel(
                                userSubComment?._id!,
                                userSubComment?.name!,
                                userSubComment?.photo
                            );
                            const commentCommented = new CommentCommentedViewModel(
                                data._id,
                                data.idUser,
                                data.idPostComment,
                                data.text,
                                userSubCommentViewModel,
                                data.created_at
                            );
                            subComments.push(commentCommented);
                        }
                    });
                    const goodIdea = userGoodIdea.find(x => x.idPostComment === comment._id);
                    const postViewModel = new PostCommentsViewModel(
                        comment._id,
                        comment.idUser,
                        comment.idPost,
                        comment.text,
                        userViewModel,
                        subComments,
                        comment.created_at,
                        goodIdea != null,
                        comment.countViews
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

    async deletePost(idUser: string, idPost: string) {
        let post = await this.postService.getById(idPost);
        if (post?.idUser != idUser) throw new Error("Usuário não tem permissão de deletar este post.");
        
        this.postService.deletePost(idPost);
    }

}