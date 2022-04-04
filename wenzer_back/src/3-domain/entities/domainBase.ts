import { v4 as uuid } from 'uuid';

export default abstract class DomainBase {
    
    constructor(public _id: string, public created_at: Date, public updated_at: Date) {
        if (!this._id) {
            this._id = uuid();
            this.created_at = new Date();
            this.updated_at = new Date();
        }
    }

    getId = () => { return this._id }

    getCreatedAt = () => { return this.created_at }

    getUpdatedAt = () => { return this.updated_at }

    abstract validateObject(): boolean;

    toSql() {
        let newObj: any = {};
        let _self: any = this;
        Object.keys(_self).forEach((key: any) => {
            const newKey = key.replace('_', '');
            newObj[newKey] = _self[key];
        });
        return newObj;
    }

}
