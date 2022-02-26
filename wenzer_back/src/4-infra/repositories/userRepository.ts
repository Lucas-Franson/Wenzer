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
        let users: User[] = [];
        if (result) {
            result.array.forEach((user: User) => {
                const obj = this.convertToObjectUser(user);
                if (obj) {
                    users.push(obj);
                }
            });
        }
        return users;
    }

    async getById(id: string): Promise<User | null> {
        const sql = `SELECT * FROM ${this.TABLENAME} WHERE ID = '${id}' LIMIT 1`;
        let result: any = await queryPromise(sql);
        return result.length > 0 ? result[0] : null;
    }

    convertToObjectUser(user: User): User | null {
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
