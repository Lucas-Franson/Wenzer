import PostViewModel from "./1-presentation/viewmodel/PostViewModel";
import UserViewModel from "./1-presentation/viewmodel/UserViewModel";
import FeedAppService from "./2-application/services/FeedAppService";
import { Post } from "./3-domain/entities/post";
import { UserPostGoodIdea } from "./3-domain/entities/userPostGoodIdea";
import InterestsService from "./3-domain/services/InterestService";
import InterestService from "./3-domain/services/InterestService";
import PostService from "./3-domain/services/PostService";
import ProjectService from "./3-domain/services/ProjectService";
import UserService from "./3-domain/services/UserService";
import { ConnectionsRepository } from "./4-infra/repositories/connectionsRepository";
import { FollowersRepository } from "./4-infra/repositories/followersRepository";
import { InterestsRepository } from "./4-infra/repositories/interestsRepository";
import { PostRepository } from "./4-infra/repositories/postRepository";
import { ProjectRepository } from "./4-infra/repositories/projectRepository";
import UserRepository from "./4-infra/repositories/userRepository";

export function websocket(io: any) {
    
    let interval: any;
    
    io.on("connection", (socket: any) => {
        if (interval) {
            clearInterval(interval);
        }
        interval = setInterval(() => {
            getApiAndEmit(socket), 1000
        });
    });

    const getApiAndEmit = (socket: any) => {
        const obj = socket.request._query;
        let feed = { id: obj['id'], date: obj['date'] };
        
        getAllPost(socket, feed);
    };

    async function getAllPost(socket: any, { id, date }: any) {
        const postService = new PostService(new PostRepository());

        const post = await postService.getNewPostToWebService(id, date);
        let goodIdea = await postService.getAllGoodIdeaFromUser(id);

        const userViewModel = await buildUserViewModel(id);
        const postViewModel = await buildPostViewModel(post, goodIdea, userViewModel);

        socket.emit("GetPost", postViewModel);
    }

    async function buildUserViewModel(id: string) {
        const userService = new UserService(new UserRepository(), new ConnectionsRepository());
        let user = await userService.findUserById(id);

        return new UserViewModel(
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
    }

    async function buildPostViewModel(post: Post[], goodIdea: UserPostGoodIdea[], userViewModel: UserViewModel) {
        let postViewModel: PostViewModel[] = [];

        post.map((value: any) => {
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
    

}