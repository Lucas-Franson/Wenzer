import { IPostRepository } from "../../4-infra/irepositories/IpostRepository";
import IPostService from "../Iservices/IPostService";


export default class PostService implements IPostService {

    constructor(private readonly postRepository: IPostRepository) {
        
    }

    getAllPostsOfUser(userId: string, page: number, countPerPage: number) {
        return this.postRepository.getAllPostsOfUser(userId, page, countPerPage);
    }

}