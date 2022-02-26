import { v4 as uuid } from 'uuid';

export default abstract class DomainBase {
    
    constructor(public id: string, public created_at: Date, public updated_at: Date) {
        if (!this.id) {
            this.id = uuid();
            this.created_at = new Date();
            this.updated_at = new Date();
        }
    }

    getId = () => { return this.id }

    getCreatedAt = () => { return this.created_at }

    getUpdatedAt = () => { return this.updated_at }

    abstract validateObject(): boolean;

}
