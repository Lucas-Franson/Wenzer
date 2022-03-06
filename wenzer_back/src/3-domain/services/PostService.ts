import { IPostRepository } from "../../4-infra/irepositories/IpostRepository";
import { Post } from "../entities/post";
import IPostService from "../Iservices/IPostService";


export default class PostService implements IPostService {

    constructor(private readonly postRepository: IPostRepository) {
        
    }

    async getAllPostsOfUser(userId: string, page: number, countPerPage: number) {
        return await this.postRepository.getAllPostsOfUser(userId, page, countPerPage);
    }

}