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
exports.PostRepository = void 0;
const orm_1 = require("./orm");
const conexao_1 = require("../dbContext/conexao");
class PostRepository extends orm_1.Orm {
    getAllPostsOfUser(idUser, page, countPerPage) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
        SELECT Post.* 
        FROM Post 
        LEFT JOIN Project ON Post.idProject = Project.id
        LEFT JOIN Followers ON Project.id = Followers.idProject
        LEFT JOIN Connections AS UserOne ON Post.idUser = UserOne.idUser
        LEFT JOIN Connections AS UserTwo ON Post.idUser = UserTwo.id
        WHERE (Followers.idUser = ${idUser.toSql()} 
            OR Post.idUser = ${idUser.toSql()}
            OR UserOne.idFollower = ${idUser.toSql()}
            OR UserTwo.idUser = ${idUser.toSql()})
        ORDER BY created_at DESC
        LIMIT ${(page - 1) * countPerPage}, ${countPerPage}
        `;
            let result = yield (0, conexao_1.queryPromise)(sql);
            return result;
        });
    }
}
exports.PostRepository = PostRepository;
//# sourceMappingURL=postRepository.js.map