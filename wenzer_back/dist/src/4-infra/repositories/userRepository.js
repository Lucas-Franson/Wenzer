"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../3-domain/entities/user");
const orm_1 = require("./orm");
const conexao_1 = require("../dbContext/conexao");
class UserRepository extends orm_1.Orm {
    constructor() {
        super(...arguments);
        this.TABLENAME = 'User';
    }
    get(whereClause) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT * FROM ${this.TABLENAME} ${whereClause}`;
            let result = yield (0, conexao_1.queryPromise)(sql);
            return this.convertToObjectUser(result[0]);
        });
    }
    getAll(whereClause) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT * FROM ${this.TABLENAME} ${whereClause}`;
            let result = yield (0, conexao_1.queryPromise)(sql);
            let users = [];
            if (result) {
                result.array.forEach((user) => {
                    const obj = this.convertToObjectUser(user);
                    if (obj) {
                        users.push(obj);
                    }
                });
            }
            return users;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT * FROM ${this.TABLENAME} WHERE ID = '${id}' LIMIT 1`;
            let result = yield (0, conexao_1.queryPromise)(sql);
            return result.length > 0 ? result[0] : null;
        });
    }
    convertToObjectUser(user) {
        if (!user)
            return null;
        return new user_1.User(user === null || user === void 0 ? void 0 : user.name, user === null || user === void 0 ? void 0 : user.email, user === null || user === void 0 ? void 0 : user.password, user === null || user === void 0 ? void 0 : user.title, user === null || user === void 0 ? void 0 : user.photo, user === null || user === void 0 ? void 0 : user.bio, user === null || user === void 0 ? void 0 : user.emailValid, user === null || user === void 0 ? void 0 : user.id, user === null || user === void 0 ? void 0 : user.created_at, user === null || user === void 0 ? void 0 : user.updated_at);
    }
}
exports.default = UserRepository;
//# sourceMappingURL=userRepository.js.map