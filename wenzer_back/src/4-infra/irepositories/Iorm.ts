export interface IOrm<T> {
    get(whereClause: string): Promise<T | null>;
    getAll(whereClause: string): Promise<T[]>;
    getById(id: string): Promise<T | null>;
    insert(object: T): Promise<void>; 
    update(object: T): Promise<void>;
    delete(object: T): Promise<void>;
}