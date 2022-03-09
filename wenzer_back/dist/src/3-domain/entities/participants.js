"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Participants = void 0;
const domainBase_1 = __importDefault(require("./domainBase"));
const uuid_1 = require("uuid");
class Participants extends domainBase_1.default {
    constructor(_active, _id = (0, uuid_1.v4)(), _created_at = new Date(), _updated_at = new Date()) {
        super(_id, _created_at, _updated_at);
        this._active = _active;
        this._id = _id;
        this._created_at = _created_at;
        this._updated_at = _updated_at;
        this.validateObject = () => {
            return true;
        };
    }
}
exports.Participants = Participants;
//# sourceMappingURL=participants.js.map