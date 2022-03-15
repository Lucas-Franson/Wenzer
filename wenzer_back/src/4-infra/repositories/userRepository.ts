import { User } from "../../3-domain/entities/user";
import { Orm } from "./orm";
import { IUserRepository } from "../irepositories/IuserRepository";
import { queryPromise } from '../dbContext/conexao';

export default class UserRepository extends Orm<User> implements IUserRepository {

    private TABLENAME: string = 'User';
 
    async get(whereClause: string): Promise<User | null> {
        const sql = `SELECT * FROM ${this.TABLENAME} ${whereClause}`;
        let result: any = await queryPromise(sql);
        return this.convertToObjectUser(result[0]);
    }

    async getAll(whereClause: string): Promise<User[]> {
        const sql = `SELECT * FROM ${this.TABLENAME} ${whereClause}`;
        let result: any = await queryPromise(sql);
        return this.convertArrayToUserObject(result);
    }

    async getById(id: string): Promise<User | null> {
        const sql = `SELECT * FROM ${this.TABLENAME} WHERE ID = '${id}' LIMIT 1`;
        let result: any = await queryPromise(sql);
        if (result) {
            return this.convertToObjectUser(result[0]);
        }
        return null;
    }

    async setPostAsGoodIdea(idUser: string, idPost: string) {
        const sql = `INSERT INTO UserPostGoodIdea (id, idUser, idPost, created_at, updated_at) VALUES (uuid(), ${idUser.toSql()}, ${idPost.toSql()}, ${new Date().toSql()}, ${new Date().toSql()});`;
        await queryPromise(sql);
    }

    async removePostAsGoodIdea(idUser: string, idPost: string) {
        const sql = `DELETE FROM UserPostGoodIdea WHERE idUser = ${idUser.toSql()} and idPost = ${idPost.toSql()}`;
        await queryPromise(sql);
    }

    async getAllUsersByArrOfIds(idUserArr: string[]) {
        let sql = `SELECT * FROM ${this.TABLENAME} WHERE id in (`;
        let where = '';
        idUserArr.forEach((id) => {
            where += where == '' ? '' : ', ';
            where += id.toSql();
        });
        let finalQuery = sql + where + ')';
        let result: any = await queryPromise(finalQuery);
        return this.convertArrayToUserObject(result);
    }

    convertArrayToUserObject(userArr: any) {
        let users: User[] = [];
        if (userArr) {
            userArr.forEach((user: User) => {
                const obj = this.convertToObjectUser(user);
                if (obj) {
                    users.push(obj);
                }
            });
        }
        return users;
    }

    convertToObjectUser(user: any): User | null {
        if (!user) return null;

        return new User(
            user?.name,
            user?.email,
            user?.password,
            user?.title,
            user?.photo,
            user?.bio,
            user?.emailValid,
            user?.id,
            user?.created_at,
            user?.updated_at
        );
    }

}
