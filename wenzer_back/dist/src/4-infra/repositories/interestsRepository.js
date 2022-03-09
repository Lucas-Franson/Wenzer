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
exports.InterestsRepository = void 0;
const orm_1 = require("./orm");
const interestUser_1 = require("../../3-domain/entities/interestUser");
const conexao_1 = require("../dbContext/conexao");
class InterestsRepository extends orm_1.Orm {
    constructor() {
        super(...arguments);
        this.TABLENAME = 'Interests';
    }
    createLinkToUser(userInterests) {
        return __awaiter(this, void 0, void 0, function* () {
            let sqlInsertInto = "INSERT INTO InterestUser (id, idInterests, idUser, created_at, updated_at) VALUES ";
            let sqlValues = "";
            userInterests.forEach((interest) => {
                sqlValues += sqlValues !== "" ? "," : "";
                sqlValues += `(
                ${interest._id.toSql()}, 
                ${interest._idInterests.toSql()},
                ${interest._idUser.toSql()},
                ${interest._created_at.toSql()},
                ${interest._updated_at.toSql()}
            )`;
            });
            if (sqlValues) {
                sqlInsertInto += sqlValues + ";";
                yield (0, conexao_1.queryPromise)(sqlInsertInto);
            }
        });
    }
    findLinkUserToInterests(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT * FROM InterestUser WHERE idUser = ${userId}`;
            let result = yield (0, conexao_1.queryPromise)(sql);
            let arrInterestUser = [];
            if (result) {
                result.array.forEach((interestUser) => {
                    const obj = this.convertToObjectUser(interestUser);
                    if (obj) {
                        arrInterestUser.push(obj);
                    }
                });
            }
            return arrInterestUser;
        });
    }
    convertToObjectUser(interest) {
        if (!interest)
            return null;
        return new interestUser_1.InterestUser(interest === null || interest === void 0 ? void 0 : interest.idInterests, interest === null || interest === void 0 ? void 0 : interest.idUser, interest === null || interest === void 0 ? void 0 : interest.id, interest === null || interest === void 0 ? void 0 : interest.created_at, interest === null || interest === void 0 ? void 0 : interest.updated_at);
    }
}
exports.InterestsRepository = InterestsRepository;
//# sourceMappingURL=interestsRepository.js.map