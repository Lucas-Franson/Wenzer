import { IOrm } from "../irepositories/Iorm";
import DomainBase from "../../3-domain/entities/domainBase";
export declare class Orm<T extends DomainBase> implements IOrm<T> {
    get(whereClause: string): Promise<T | null>;
    getAll(whereClause: string): Promise<T[]>;
    getById(id: string): Promise<T | null>;
    insert(object: T): Promise<void>;
    update(object: T): Promise<void>;
    private _capitalizeFirstLetter;
    private _createSetOfData;
    private _formatPropertyValueToSQL;
    delete(object: T): Promise<void>;
}
