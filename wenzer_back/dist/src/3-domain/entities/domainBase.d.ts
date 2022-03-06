export default abstract class DomainBase {
    _id: string;
    _created_at: Date;
    _updated_at: Date;
    constructor(_id: string, _created_at: Date, _updated_at: Date);
    getId: () => string;
    getCreatedAt: () => Date;
    getUpdatedAt: () => Date;
    abstract validateObject(): boolean;
}
