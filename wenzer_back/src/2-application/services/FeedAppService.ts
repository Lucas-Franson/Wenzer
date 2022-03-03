import { Post } from "../../3-domain/entities/post";
import IPostService from "../../3-domain/Iservices/IPostService";
import { IUserService } from "../../3-domain/Iservices/IUserService";

export default class FeedAppService {

    constructor(private readonly userService: IUserService, private readonly postService: IPostService){

    }

    async getAllPosts(userId: string,  page: number, countPerPage: number): Promise<Post[]> {
        return this.postService.getAllPostsOfUser(userId, page, countPerPage);
    }

}