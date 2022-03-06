"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterestUser = void 0;
const domainBase_1 = __importDefault(require("./domainBase"));
const uuid_1 = require("uuid");
class InterestUser extends domainBase_1.default {
    constructor(_idInterests, _idUser, _id = (0, uuid_1.v4)(), _created_at = new Date(), _updated_at = new Date()) {
        super(_id, _created_at, _updated_at);
        this._idInterests = _idInterests;
        this._idUser = _idUser;
        this._id = _id;
        this._created_at = _created_at;
        this._updated_at = _updated_at;
        this.validateObject = () => {
            return true;
        };
    }
}
exports.InterestUser = InterestUser;
//# sourceMappingURL=interestUser.js.map