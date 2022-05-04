export interface IOrm<T> {
    getByWhereClause(whereClause: any): Promise<T[]>;
    getById(id: string): Promise<T | null>;
    insert(object: T): Promise<void>;
    update(object: T): Promise<void>;
    delete(id: string): Promise<void>;
    handleArrayResult(result: T[]): T[];
    handleResult(result: T): T | null;
}
