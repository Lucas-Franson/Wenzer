import { User } from "../../3-domain/entities/user";
import { Orm } from "./orm";
import { IUserRepository } from "../irepositories/IuserRepository";
export default class UserRepository extends Orm<User> implements IUserRepository {
    private TABLENAME;
    get(whereClause: string): Promise<User | null>;
    getAll(whereClause: string): Promise<User[]>;
    getById(id: string): Promise<User | null>;
    convertToObjectUser(user: User): User | null;
}
