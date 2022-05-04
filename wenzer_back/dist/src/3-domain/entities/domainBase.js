"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class DomainBase {
    constructor(_id, created_at, updated_at) {
        this._id = _id;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.getId = () => { return this._id; };
        this.getCreatedAt = () => { return this.created_at; };
        this.getUpdatedAt = () => { return this.updated_at; };
        if (!this._id) {
            this._id = (0, uuid_1.v4)();
            this.created_at = new Date();
            this.updated_at = new Date();
        }
    }
    toSql() {
        let newObj = {};
        let _self = this;
        Object.keys(_self).forEach((key) => {
            const newKey = key.replace('_', '');
            newObj[newKey] = _self[key];
        });
        return newObj;
    }
}
exports.default = DomainBase;
//# sourceMappingURL=domainBase.js.map