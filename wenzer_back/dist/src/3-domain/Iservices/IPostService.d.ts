import { Post } from "../entities/post";
export default interface IPostService {
    getAllPostsOfUser(userId: string, page: number, countPerPage: number): Promise<Post[]>;
}
