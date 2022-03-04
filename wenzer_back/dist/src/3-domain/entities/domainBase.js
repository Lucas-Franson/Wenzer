"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class DomainBase {
    constructor(id, created_at, updated_at) {
        this.id = id;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.getId = () => { return this.id; };
        this.getCreatedAt = () => { return this.created_at; };
        this.getUpdatedAt = () => { return this.updated_at; };
        if (!this.id) {
            this.id = (0, uuid_1.v4)();
            this.created_at = new Date();
            this.updated_at = new Date();
        }
    }
}
exports.default = DomainBase;
//# sourceMappingURL=domainBase.js.map