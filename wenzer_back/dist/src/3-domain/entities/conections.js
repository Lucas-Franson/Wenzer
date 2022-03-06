"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connections = void 0;
const domainBase_1 = __importDefault(require("./domainBase"));
const uuid_1 = require("uuid");
class Connections extends domainBase_1.default {
    constructor(_idUser, _idFollower, _accepted, _id = (0, uuid_1.v4)(), _created_at = new Date(), _updated_at = new Date()) {
        super(_id, _created_at, _updated_at);
        this._idUser = _idUser;
        this._idFollower = _idFollower;
        this._accepted = _accepted;
        this._id = _id;
        this._created_at = _created_at;
        this._updated_at = _updated_at;
        this.validateObject = () => {
            return true;
        };
    }
}
exports.Connections = Connections;
//# sourceMappingURL=conections.js.map