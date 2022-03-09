import { Post } from "../../3-domain/entities/post";
import { Orm } from "./orm";
import { IPostRepository } from "../irepositories/IpostRepository";
export declare class PostRepository extends Orm<Post> implements IPostRepository {
    getAllPostsOfUser(idUser: string, page: number, countPerPage: number): Promise<Post[]>;
}
