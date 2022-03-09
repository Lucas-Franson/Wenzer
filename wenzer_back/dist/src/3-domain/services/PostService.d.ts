import { IPostRepository } from "../../4-infra/irepositories/IpostRepository";
import { Post } from "../entities/post";
import IPostService from "../Iservices/IPostService";
export default class PostService implements IPostService {
    private readonly postRepository;
    constructor(postRepository: IPostRepository);
    getAllPostsOfUser(userId: string, page: number, countPerPage: number): Promise<Post[]>;
}
