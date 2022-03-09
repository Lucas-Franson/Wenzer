import { v4 as uuid } from 'uuid';

export default abstract class DomainBase {
    
    constructor(public _id: string, public _created_at: Date, public _updated_at: Date) {
        if (!this._id) {
            this._id = uuid();
            this._created_at = new Date();
            this._updated_at = new Date();
        }
    }

    getId = () => { return this._id }

    getCreatedAt = () => { return this._created_at }

    getUpdatedAt = () => { return this._updated_at }

    abstract validateObject(): boolean;

}
