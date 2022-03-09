import { Post } from "../../3-domain/entities/post";
export interface IPostRepository {
    getAllPostsOfUser(idUser: string, page: number, countPerPage: number): Promise<Post[]>;
}
