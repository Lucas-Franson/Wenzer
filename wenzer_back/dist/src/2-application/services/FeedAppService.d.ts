import { Post } from "../../3-domain/entities/post";
import IPostService from "../../3-domain/Iservices/IPostService";
import { IUserService } from "../../3-domain/Iservices/IUserService";
export default class FeedAppService {
    private readonly userService;
    private readonly postService;
    constructor(userService: IUserService, postService: IPostService);
    getAllPosts(userId: string, page: number, countPerPage: number): Promise<Post[]>;
}
