import { Db, MongoClient } from "mongodb";
import PostViewModel from "./1-presentation/viewmodel/PostViewModel";
import UserViewModel from "./1-presentation/viewmodel/UserViewModel";
import NotificationAppService from "./2-application/services/NotificationAppService";
import { Post } from "./3-domain/entities/post";
import { UserPostGoodIdea } from "./3-domain/entities/userPostGoodIdea";
import NotificationService from "./3-domain/services/NotificationService";
import PostService from "./3-domain/services/PostService";
import UserService from "./3-domain/services/UserService";
import { ConnectionRepository } from "./4-infra/repositories/connectionRepository";
import { PostRepository } from "./4-infra/repositories/postRepository";
import UserRepository from "./4-infra/repositories/userRepository";

const url: string = process.env.BASE_URL_DATABASE!;
const database = "WenzerDB";

export function websocket(io: any) {
    
    let interval: any;
    
    io.on("connection", (socket: any) => {
        if (interval) {
            clearInterval(interval);
        }
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db?.db(database);
            if (dbo) {
                interval = setInterval(() => {
                    getApiAndEmit(socket, dbo!), 1000
                }); 
            }
        });
    });

    const getApiAndEmit = (socket: any, dbo: Db) => {
        const obj = socket.request._query;
        let user = { id: obj['id'] };
        
        getAllPost(socket, user, dbo);
        getAllNotifications(socket, dbo, user);
    };

    async function getAllPost(socket: any, { id }: any, dbo: Db) {
        const postService = new PostService(new PostRepository());

        const post = await postService.getNewPostToWebService(id, dbo);
        let goodIdea = await postService.getAllGoodIdeaFromUserWebService(id, dbo);

        const userViewModel = await buildUserViewModel(id, dbo);
        if (post && post?.length > 0) {
            const postViewModel = await buildPostViewModel(post, goodIdea, userViewModel);
            socket.emit("GetPost", postViewModel);
        } else {
            socket.emit("GetPost", []);
        }
    }

    async function buildUserViewModel(id: string, dbo: Db) {
        const userService = new UserService(new UserRepository(), new ConnectionRepository());
        let user = await userService.findUserByIdWebService(id, dbo);

        return new UserViewModel(
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
    }

    async function buildPostViewModel(post: Post[], goodIdea: UserPostGoodIdea[], userViewModel: UserViewModel) {
        let postViewModel: PostViewModel[] = [];

        post.map((value: any) => {
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

    async function getAllNotifications(socket: any, dbo: Db, { id }: any) {
        const notificationService = new NotificationService(new PostRepository(), new UserRepository());

        let commentsByPostNumber = await notificationService.getCommentsByPostWebService(dbo, id);

        let commentsCommentedByUserNumber = await notificationService.getCommentsCommentedByUserWebService(dbo, id);

        let friendRequestNumber = await notificationService.getFriendRequestWebService(dbo, id);

        socket.emit("GetNotification", (commentsByPostNumber + commentsCommentedByUserNumber + friendRequestNumber));
    }
    

}