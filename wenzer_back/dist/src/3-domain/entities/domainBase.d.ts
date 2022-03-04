export default abstract class DomainBase {
    id: string;
    created_at: Date;
    updated_at: Date;
    constructor(id: string, created_at: Date, updated_at: Date);
    getId: () => string;
    getCreatedAt: () => Date;
    getUpdatedAt: () => Date;
    abstract validateObject(): boolean;
}
