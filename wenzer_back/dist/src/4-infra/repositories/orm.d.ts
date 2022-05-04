import { IOrm } from "../irepositories/Iorm";
import DomainBase from "../../3-domain/entities/domainBase";
export declare class Orm<T extends DomainBase> implements IOrm<T> {
    getByWhereClause(whereClause: any): Promise<T[]>;
    getById(id: string): Promise<T | null>;
    insert(object: any): Promise<void>;
    update(object: T): Promise<void>;
    delete(id: string): Promise<void>;
    handleArrayResult(result: T[]): T[];
    handleResult(result: T): T | null;
}
