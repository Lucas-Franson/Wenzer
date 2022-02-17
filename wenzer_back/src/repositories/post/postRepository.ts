import { Post } from "../../domain/post";
import { IOrm } from "../orm/iorm";
import { Orm } from "../orm/orm";
import { IPostRepository } from "./IpostRepository";
import { conexao, queryPromise } from '../conexao';

export class PostRepository extends Orm<Post> implements IPostRepository, IOrm<Post> {
    
    async getAllPostsOfUser(idUser: string, page: number, countPerPage: number): Promise<Post[]> {
        const sql = `
        SELECT Post.* 
        FROM Post 
        LEFT JOIN Project ON Post.idProject = Project.id
        LEFT JOIN Followers ON Project.id = Followers.idProject
        LEFT JOIN Connections AS UserOne ON Post.idUser = UserOne.idUser
        LEFT JOIN Connections AS UserTwo ON Post.idUserFollower = UserTwo.id
        WHERE (Followers.idUser = ${idUser} 
            OR Post.idUser = ${idUser}
            OR UserOne.idUserFollower = ${idUser}
            OR UserTwo.idUser = ${idUser})
        ORDER BY created_at DESC
        LIMIT ${(page-1)*countPerPage}, ${countPerPage}
        `;
        let result: Post[] = await conexao.query(sql);
        return result;
    }

    async validateObject(object: Post):Promise<boolean> {
        let isValid = true;

        if (object.id == null) {
            isValid = false;
        }

        if (object.countViews == null) {
            isValid = false;
        }

        if (object.title == null) {
            isValid = false;
        }

        if (object.description == null) {
            isValid = false;
        }

        if (object.photo == null) {
            isValid = false;
        }

        return isValid;
    }
}