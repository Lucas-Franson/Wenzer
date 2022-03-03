import { Post } from "../../3-domain/entities/post";
import { IOrm } from "../irepositories/Iorm";
import { Orm } from "./orm";
import { IPostRepository } from "../irepositories/IpostRepository";
import { queryPromise } from '../dbContext/conexao';

export class PostRepository extends Orm<Post> implements IPostRepository {
    
    async getAllPostsOfUser(idUser: string, page: number, countPerPage: number): Promise<Post[]> {
        const sql = `
        SELECT Post.* 
        FROM Post 
        LEFT JOIN Project ON Post.idProject = Project.id
        LEFT JOIN Followers ON Project.id = Followers.idProject
        LEFT JOIN Connections AS UserOne ON Post.idUser = UserOne.idUser
        LEFT JOIN Connections AS UserTwo ON Post.idUser = UserTwo.id
        WHERE (Followers.idUser = ${idUser.toSql()} 
            OR Post.idUser = ${idUser.toSql()}
            OR UserOne.idFollower = ${idUser.toSql()}
            OR UserTwo.idUser = ${idUser.toSql()})
        ORDER BY created_at DESC
        LIMIT ${(page-1)*countPerPage}, ${countPerPage}
        `;
        let result: any = await queryPromise(sql);
        return result;
    }

    
}

