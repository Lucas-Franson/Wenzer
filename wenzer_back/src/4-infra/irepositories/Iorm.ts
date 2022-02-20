export interface IOrm<T> {
    get(whereClause: string): Promise<T>;
    getAll(whereClause: string): Promise<T[]>;
    getById(id: string): Promise<T>;
    insert(object: T): Promise<void>; 
    update(object: T): Promise<void>;
    delete(object: T): Promise<void>;
    validateObject(object: T): Promise<boolean>;
}