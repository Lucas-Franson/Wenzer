"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class DomainBase {
    constructor(_id, _created_at, _updated_at) {
        this._id = _id;
        this._created_at = _created_at;
        this._updated_at = _updated_at;
        this.getId = () => { return this._id; };
        this.getCreatedAt = () => { return this._created_at; };
        this.getUpdatedAt = () => { return this._updated_at; };
        if (!this._id) {
            this._id = (0, uuid_1.v4)();
            this._created_at = new Date();
            this._updated_at = new Date();
        }
    }
}
exports.default = DomainBase;
//# sourceMappingURL=domainBase.js.map