export default abstract class DomainBase {
    _id: string;
    created_at: Date;
    updated_at: Date;
    constructor(_id: string, created_at: Date, updated_at: Date);
    getId: () => string;
    getCreatedAt: () => Date;
    getUpdatedAt: () => Date;
    abstract validateObject(): boolean;
    toSql(): any;
}
